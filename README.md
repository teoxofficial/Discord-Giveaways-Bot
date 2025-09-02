🎉 Gelişmiş Discord Çekiliş Botu
https://img.shields.io/badge/Node.js-v18+-brightgreen?logo=node.js
https://img.shields.io/badge/discord.js-v14-blue?logo=discord
https://img.shields.io/badge/MongoDB-4.4+-green?logo=mongodb
https://img.shields.io/badge/License-MIT-yellow.svg

Node.js ve Discord.js v14 kullanılarak geliştirilmiş, slash komutlu ve MongoDB entegreli gelişmiş bir Discord çekiliş botu. CommonJS formatında olduğu için Windows ve ESM hataları olmadan çalışır.

🚀 Özellikler
🎯 Çekiliş Komutları
Komut	Açıklama	Yetki
/çekiliş başlat	Yeni bir çekiliş başlatır	ManageMessages
/çekiliş bitir	Aktif bir çekilişi erken bitirir	ManageMessages
/çekiliş yeniden-çek	Bir çekilişi yeniden çeker	ManageMessages
📊 Diğer Özellikler
✅ Slash komut desteği

✅ Config.json yapılandırması

✅ Özelleştirilebilir bot durumu

✅ MongoDB veritabanı entegrasyonu

✅ Çoklu kazanan desteği

✅ Yeniden çekim özelliği

✅ Otomatik çekiliş bitirme

✅ Hata yönetimi

🛠️ Gereksinimler
Node.js v18+

Discord.js v14

MongoDB veritabanı (yerel veya Atlas)

Bir Discord bot tokeni

Botu ekleyeceğiniz sunucu için Client ID ve Guild ID

⚡ Kurulum
1️⃣ ZIP'i İndirin ve Açın
Proje dosyalarını bilgisayarınıza indirin ve bir klasöre çıkarın.

2️⃣ Gerekli Paketleri Yükleyin
Terminali açın ve proje klasörüne gidin:

bash
cd discord-giveaway-bot
npm install
3️⃣ Yapılandırma Dosyasını Düzenleyin
config.json dosyasını kendi bilgilerinizle düzenleyin:

json
{
  "token": "BOT_TOKENINIZ_BURAYA",
  "clientId": "BOT_CLIENT_ID_BURAYA",
  "guildId": "SUNUCU_ID_BURAYA",
  "mongoURI": "mongodb://localhost:27017/discord-giveaway",
  "status": {
    "type": "WATCHING",
    "message": "çekilişleri! /çekiliş"
  },
  "giveaway": {
    "hostedBy": true,
    "defaultColor": "#FF0000",
    "defaultEmoji": "🎉",
    "reaction": "🎉",
    "allowMultipleWinners": true
  }
}
4️⃣ MongoDB Bağlantısını Ayarlayın
Yerel MongoDB kullanıyorsanız:

MongoDB'yi bilgisayarınıza kurun

Varsayılan bağlantıyı kullanabilirsiniz

MongoDB Atlas kullanıyorsanız:

Hesap oluşturun ve bir cluster kurun

Bağlantı URI'sini alın ve mongoURI alanına ekleyin

5️⃣ Botu Başlatın
bash
node index.js
Veya package.json'da tanımlı start script'ini kullanın:

bash
npm start
📝 Discord Geliştirici Ayarları
Bot Tokeni Alma
Discord Developer Portal adresine gidin

"New Application" butonuna tıklayarak yeni bir uygulama oluşturun

Sol menüden "Bot" sekmesine gidin

"Add Bot" butonuna tıklayarak bot oluşturun

"Token" bölümünden tokeninizi kopyalayın ve config.json'a ekleyin

Botu Sunucuya Ekleme
Developer Portal'da sol menüden "OAuth2" > "URL Generator" seçin

"Scopes" bölümünden "bot" ve "applications.commands"ı işaretleyin

"Bot Permissions" bölümünden gerekli izinleri seçin:

Manage Messages

View Channels

Send Messages

Embed Links

Read Message History

Oluşturulan URL'yi tarayıcıda açarak botu sunucunuza ekleyin

🎮 Kullanım
Çekiliş Başlatma
Discord sunucunuzda herhangi bir kanala /çekiliş başlat yazın

Açılan seçenekleri doldurun:

ödül: Çekilişin ödülü (örneğin: "50 TL Steam Cüzdan Kodu")

kazanan-sayısı: Kaç kişinin kazanacağı (varsayılan: 1)

süre: Çekilişin süresi (örneğin: 1h, 2d, 30m)

Enter'a basın ve çekiliş başlasın!

Çekilişe Katılma
Botun oluşturduğu çekiliş mesajındaki "Katıl" butonuna tıklayın

Çekilişe katılmış olacaksınız

Çekilişi Bitirme
/çekiliş bitir komutunu kullanın

Çekiliş mesajının ID'sini girin

Çekiliş hemen sonlanacak ve kazananlar açıklanacak

Yeniden Çekim
Bitmiş bir çekiliş için /çekiliş yeniden-çek komutunu kullanın

Çekiliş mesajının ID'sini girin

Yeni kazananlar seçilecek

🐛 Sorun Giderme
Bot Çalışmıyor
Token'in doğru olduğundan emin olun

Node.js sürümünüzün 18 veya üzeri olduğunu kontrol edin

Tüm bağımlılıkların yüklendiğinden emin olun (npm install)

Komutlar Görünmüyor
Botu sunucuya eklerken "applications.commands" scope'unu seçtiğinizden emin olun

Botun yeterli izinlere sahip olduğundan emin olun

MongoDB Bağlantı Hatası
MongoDB'nin çalıştığından emin olun

Bağlantı URI'sinin doğru olduğundan emin olun

📜 Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakın.

🤝 Katkıda Bulunma
Bu depoyu fork edin

Özellik dalınızı oluşturun (git checkout -b feature/AmazingFeature)

Değişikliklerinizi commit edin (git commit -m 'Add some AmazingFeature')

Dalınıza push edin (git push origin feature/AmazingFeature)

Bir Pull Request oluşturun

📞 Destek
Sorularınız veya problemleriniz için:

GitHub Issues sayfasından sorun bildirebilirsiniz

Discord: KullanıcıAdınız#1234

Not: Bu bot eğitim amaçlı hazırlanmıştır. Discord'un Terms of Service kurallarına uygun şekilde kullanın.

