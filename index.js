const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, ActivityType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const mongoose = require('mongoose');
const ms = require('ms');
const fs = require('fs');
const path = require('path');

const config = require('./config.json');

// Client oluşturma
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions
  ]
});

// Komut koleksiyonu
client.commands = new Collection();

// MongoDB modelleri
const Giveaway = require('./models/Giveaway');
const Entry = require('./models/Entry');

// Komutları yükleme
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// Etkinlikleri yükleme
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Slash komutları kaydetme
client.once('ready', async () => {
  console.log(`${client.user.tag} olarak giriş yapıldı!`);
  
  // MongoDB bağlantısı
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
  }
  
  // Bot durumunu ayarla
  client.user.setActivity(config.status.message, { 
    type: ActivityType[config.status.type] 
  });
  
  // Slash komutları kaydet
  try {
    const rest = new REST({ version: '10' }).setToken(config.token);
    const commands = [];
    
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
    }
    
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );
    
    console.log('Slash komutları başarıyla kaydedildi!');
  } catch (error) {
    console.error('Komut kaydetme hatası:', error);
  }
  
  // Aktif çekilişleri kontrol et
  checkOngoingGiveaways();
});

// Aktif çekilişleri kontrol etme
async function checkOngoingGiveaways() {
  try {
    const ongoingGiveaways = await Giveaway.find({ 
      ended: false, 
      endTime: { $gt: new Date() } 
    });
    
    for (const giveaway of ongoingGiveaways) {
      const timeLeft = giveaway.endTime - Date.now();
      setTimeout(() => {
        endGiveaway(giveaway.messageId);
      }, timeLeft);
    }
    
    console.log(`${ongoingGiveaways.length} aktif çekiliş yüklendi.`);
  } catch (error) {
    console.error('Çekiliş yükleme hatası:', error);
  }
}

// Çekiliş bitirme fonksiyonu
async function endGiveaway(messageId) {
  try {
    const giveaway = await Giveaway.findOne({ messageId });
    if (!giveaway || giveaway.ended) return;
    
    const channel = await client.channels.fetch(giveaway.channelId);
    if (!channel) return;
    
    const message = await channel.messages.fetch(messageId);
    if (!message) return;
    
    // Katılımcıları al
    const entries = await Entry.find({ giveawayId: giveaway._id });
    const participants = entries.map(entry => entry.userId);
    
    // Kazananları seç
    let winners = [];
    const winnerCount = Math.min(giveaway.winnerCount, participants.length);
    
    for (let i = 0; i < winnerCount; i++) {
      const randomIndex = Math.floor(Math.random() * participants.length);
      winners.push(participants[randomIndex]);
      participants.splice(randomIndex, 1);
    }
    
    // Çekilişi bitir olarak işaretle
    giveaway.ended = true;
    giveaway.winners = winners;
    await giveaway.save();
    
    // Embed'i güncelle
    const winnerMentions = winners.map(winner => `<@${winner}>`).join(', ');
    const embed = new EmbedBuilder()
      .setTitle(`${config.giveaway.defaultEmoji} ${giveaway.prize} ${config.giveaway.defaultEmoji}`)
      .setDescription(
        `**Çekiliş Sona Erdi!**\n\n` +
        `Kazananlar: ${winnerMentions || "Yeterli katılım olmadı"}\n` +
        `Katılımcı Sayısı: ${entries.length}\n\n` +
        `**Çekilişi Başlatan:** <@${giveaway.hostId}>`
      )
      .setColor('#FF0000')
      .setFooter({ text: 'Sonlandırıldı' })
      .setTimestamp();
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('reroll_giveaway')
          .setLabel('Yeniden Çek')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🔁')
      );
    
    await message.edit({ 
      embeds: [embed], 
      components: [row] 
    });
    
    await message.reply(
      `🎉 **Çekiliş Sona Erdi!** 🎉\n` +
      `**Ödül:** ${giveaway.prize}\n` +
      `**Kazananlar:** ${winnerMentions || "Yeterli katılım olmadı"}\n` +
      `Tebrikler!`
    );
  } catch (error) {
    console.error('Çekiliş bitirme hatası:', error);
  }
}

// Button etkileşimlerini handle etme
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  
  if (interaction.customId === 'join_giveaway') {
    try {
      const messageId = interaction.message.id;
      const giveaway = await Giveaway.findOne({ messageId });
      
      if (!giveaway || giveaway.ended) {
        return interaction.reply({ 
          content: 'Bu çekiliş sona ermiş.', 
          ephemeral: true 
        });
      }
      
      // Kullanıcı zaten katılmış mı kontrol et
      const existingEntry = await Entry.findOne({ 
        giveawayId: giveaway._id, 
        userId: interaction.user.id 
      });
      
      if (existingEntry) {
        return interaction.reply({ 
          content: 'Zaten bu çekilişe katıldınız!', 
          ephemeral: true 
        });
      }
      
      // Katılımı kaydet
      const newEntry = new Entry({
        giveawayId: giveaway._id,
        userId: interaction.user.id,
        guildId: interaction.guild.id
      });
      
      await newEntry.save();
      
      await interaction.reply({ 
        content: 'Çekilişe başarıyla katıldınız! 🎉', 
        ephemeral: true 
      });
    } catch (error) {
      console.error('Katılım hatası:', error);
    }
  }
  
  if (interaction.customId === 'reroll_giveaway' && interaction.member.permissions.has('ManageMessages')) {
    try {
      const messageId = interaction.message.id;
      const giveaway = await Giveaway.findOne({ messageId });
      
      if (!giveaway) {
        return interaction.reply({ 
          content: 'Çekiliş bulunamadı.', 
          ephemeral: true 
        });
      }
      
      // Katılımcıları al
      const entries = await Entry.find({ giveawayId: giveaway._id });
      const participants = entries.map(entry => entry.userId);
      
      if (participants.length === 0) {
        return interaction.reply({ 
          content: 'Yeniden çekilebilecek katılımcı yok.', 
          ephemeral: true 
        });
      }
      
      // Yeni kazananları seç
      let newWinners = [];
      const winnerCount = Math.min(giveaway.winnerCount, participants.length);
      
      for (let i = 0; i < winnerCount; i++) {
        const randomIndex = Math.floor(Math.random() * participants.length);
        newWinners.push(participants[randomIndex]);
        participants.splice(randomIndex, 1);
      }
      
      // Kazananları güncelle
      giveaway.winners = newWinners;
      await giveaway.save();
      
      const winnerMentions = newWinners.map(winner => `<@${winner}>`).join(', ');
      
      await interaction.reply(
        `🔁 **Çekiliş Yeniden Çekildi!** 🔁\n` +
        `**Ödül:** ${giveaway.prize}\n` +
        `**Yeni Kazananlar:** ${winnerMentions}\n` +
        `Tebrikler!`
      );
    } catch (error) {
      console.error('Yeniden çekme hatası:', error);
    }
  }
});

client.login(config.token);

// Hata yönetimi
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});