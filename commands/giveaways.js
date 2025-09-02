const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ms = require('ms');
const Giveaway = require('../models/Giveaway');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('çekiliş')
    .setDescription('Çekiliş yönetimi')
    .addSubcommand(subcommand =>
      subcommand
        .setName('başlat')
        .setDescription('Yeni bir çekiliş başlatır')
        .addStringOption(option =>
          option.setName('ödül')
            .setDescription('Çekiliş ödülü')
            .setRequired(true))
        .addIntegerOption(option =>
          option.setName('kazanan-sayısı')
            .setDescription('Kazanan sayısı (varsayılan: 1)')
            .setRequired(false))
        .addStringOption(option =>
          option.setName('süre')
            .setDescription('Çekiliş süresi (örn: 1h, 1d)')
            .setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('bitir')
        .setDescription('Aktif bir çekilişi erken bitirir')
        .addStringOption(option =>
          option.setName('mesaj-id')
            .setDescription('Çekiliş mesaj ID')
            .setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('yeniden-çek')
        .setDescription('Bir çekilişi yeniden çeker')
        .addStringOption(option =>
          option.setName('mesaj-id')
            .setDescription('Çekiliş mesaj ID')
            .setRequired(true))
    ),
  
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    
    if (subcommand === 'başlat') {
      if (!interaction.member.permissions.has('ManageMessages')) {
        return interaction.reply({ 
          content: 'Çekiliş başlatmak için yetkiniz yok!', 
          ephemeral: true 
        });
      }
      
      const prize = interaction.options.getString('ödül');
      const winnerCount = interaction.options.getInteger('kazanan-sayısı') || 1;
      const duration = interaction.options.getString('süre');
      
      // Süreyi kontrol et
      let durationMs;
      try {
        durationMs = ms(duration);
        if (!durationMs || durationMs < 10000) {
          return interaction.reply({ 
            content: 'Geçersiz süre! En az 10 saniye olmalı.', 
            ephemeral: true 
          });
        }
      } catch {
        return interaction.reply({ 
          content: 'Geçersiz süre formatı! Örnek: 1h, 1d, 10m', 
          ephemeral: true 
        });
      }
      
      const endTime = Date.now() + durationMs;
      
      // Embed oluştur
      const embed = new EmbedBuilder()
        .setTitle(`🎉 ${prize} 🎉`)
        .setDescription(
          `**Katılmak için aşağıdaki butona tıklayın!**\n\n` +
          `Kazanan Sayısı: **${winnerCount}**\n` +
          `Bitiş: <t:${Math.floor(endTime / 1000)}:R>\n\n` +
          `**Çekilişi Başlatan:** ${interaction.user}`
        )
        .setColor('#00FF00')
        .setFooter({ text: 'Çekiliş devam ediyor' })
        .setTimestamp(endTime);
      
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('join_giveaway')
            .setLabel('Katıl')
            .setStyle(ButtonStyle.Success)
            .setEmoji('🎉')
        );
      
      const message = await interaction.reply({ 
        embeds: [embed], 
        components: [row],
        fetchReply: true 
      });
      
      // Veritabanına kaydet
      const giveaway = new Giveaway({
        messageId: message.id,
        channelId: message.channel.id,
        guildId: interaction.guild.id,
        hostId: interaction.user.id,
        prize,
        winnerCount,
        endTime: new Date(endTime)
      });
      
      await giveaway.save();
      
      // Zamanlayıcı ayarla
      setTimeout(() => {
        require('../index').endGiveaway(message.id);
      }, durationMs);
    }
    
    else if (subcommand === 'bitir') {
      if (!interaction.member.permissions.has('ManageMessages')) {
        return interaction.reply({ 
          content: 'Çekiliş bitirmek için yetkiniz yok!', 
          ephemeral: true 
        });
      }
      
      const messageId = interaction.options.getString('mesaj-id');
      
      try {
        require('../index').endGiveaway(messageId);
        await interaction.reply({ 
          content: 'Çekiliş erken bitiriliyor...', 
          ephemeral: true 
        });
      } catch (error) {
        await interaction.reply({ 
          content: 'Çekiliş bitirilirken hata oluştu!', 
          ephemeral: true 
        });
      }
    }
    
    else if (subcommand === 'yeniden-çek') {
      if (!interaction.member.permissions.has('ManageMessages')) {
        return interaction.reply({ 
          content: 'Yeniden çekim için yetkiniz yok!', 
          ephemeral: true 
        });
      }
      
      const messageId = interaction.options.getString('mesaj-id');
      const giveaway = await Giveaway.findOne({ messageId });
      
      if (!giveaway) {
        return interaction.reply({ 
          content: 'Çekiliş bulunamadı!', 
          ephemeral: true 
        });
      }
      
      // Katılımcıları al
      const Entry = require('../models/Entry');
      const entries = await Entry.find({ giveawayId: giveaway._id });
      const participants = entries.map(entry => entry.userId);
      
      if (participants.length === 0) {
        return interaction.reply({ 
          content: 'Yeniden çekilebilecek katılımcı yok!', 
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
    }
  }
};