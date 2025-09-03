# 🎉 Gelişmiş Discord Çekiliş Botu

[![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen?logo=node.js)](https://nodejs.org/) 
[![discord.js](https://img.shields.io/badge/discord.js-v14-blue?logo=discord)](https://discord.js.org/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?logo=mongodb)](https://www.mongodb.com/) 
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Node.js ve Discord.js v14 kullanılarak geliştirilmiş, **slash komutlu** ve **MongoDB entegreli** gelişmiş bir Discord çekiliş botu. CommonJS formatında olduğu için Windows ve ESM hataları olmadan çalışır.

---

## 🚀 Özellikler

### 🎯 Çekiliş Komutları

| Komut | Açıklama | Yetki |
|-------|----------|-------|
| `/çekiliş başlat` | Yeni bir çekiliş başlatır | ManageMessages |
| `/çekiliş bitir` | Aktif bir çekilişi erken bitirir | ManageMessages |
| `/çekiliş yeniden-çek` | Bir çekilişi yeniden çeker | ManageMessages |

### 📊 Diğer Özellikler

- ✅ Slash komut desteği  
- ✅ Config.json ile kolay yapılandırma  
- ✅ Özelleştirilebilir bot durumu  
- ✅ MongoDB veritabanı entegrasyonu  
- ✅ Çoklu kazanan desteği  
- ✅ Yeniden çekim özelliği  
- ✅ Otomatik çekiliş bitirme  
- ✅ Hata yönetimi  

---

## 🛠️ Gereksinimler

- Node.js v18+  
- Discord.js v14  
- MongoDB veritabanı (yerel veya Atlas)  
- Discord bot tokeni  
- Botu ekleyeceğiniz sunucu için Client ID ve Guild ID  

---

## ⚡ Kurulum

1️⃣ **ZIP'i İndirin ve Açın**  
Proje dosyalarını bilgisayarınıza indirin ve bir klasöre çıkarın.

2️⃣ **Gerekli Paketleri Yükleyin**  
```bash
cd discord-giveaway-bot
npm install
```

3️⃣ **Yapılandırma Dosyasını Düzenleyin**  
`config.json` dosyasını kendi bilgilerinizle düzenleyin:

```json
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
```

4️⃣ **MongoDB Bağlantısını Ayarlayın**  
- Yerel MongoDB: MongoDB’yi kurun, varsayılan bağlantıyı kullanın  
- MongoDB Atlas: Hesap oluşturun, cluster kurun ve URI’yi `mongoURI` alanına ekleyin  

5️⃣ **Botu Başlatın**  
```bash
node index.js
```
Veya `package.json`'daki start script’ini kullanın:
```bash
npm start
```

---

## 📝 Discord Geliştirici Ayarları

### Bot Tokeni Alma

1. [Discord Developer Portal](https://discord.com/developers/applications) adresine gidin  
2. "New Application" butonuna tıklayın  
3. Sol menüden "Bot" sekmesine gidin  
4. "Add Bot" ile bot oluşturun  
5. Tokeni kopyalayın ve `config.json`’a ekleyin  

### Botu Sunucuya Ekleme

1. Developer Portal > "OAuth2" > "URL Generator"  
2. "Scopes" bölümünden `bot` ve `applications.commands` seçin  
3. "Bot Permissions" bölümünden gerekli izinleri seçin:  
   - Manage Messages  
   - View Channels  
   - Send Messages  
   - Embed Links  
   - Read Message History  
4. Oluşturulan URL’yi tarayıcıda açın ve botu sunucuya ekleyin  

---

## 🎮 Kullanım

### Çekiliş Başlatma
Discord sunucunuzda `/çekiliş başlat` yazın ve açılan seçenekleri doldurun:

- `ödül`: Ödül (ör. "50 TL Steam Cüzdan Kodu")  
- `kazanan-sayısı`: Kaç kişi kazanacak (varsayılan: 1)  
- `süre`: Çekiliş süresi (1h, 2d, 30m)  

### Çekilişe Katılma
Bot mesajındaki **Katıl** butonuna tıklayın  

### Çekilişi Bitirme
`/çekiliş bitir` komutunu kullanın ve mesaj ID'sini girin  

### Yeniden Çekim
Bitmiş bir çekiliş için `/çekiliş yeniden-çek` komutunu kullanın  

---

## 🐛 Sorun Giderme

**Bot Çalışmıyor:**  
- Token doğru mu kontrol edin  
- Node.js sürümünüz 18+ olmalı  
- Tüm bağımlılıklar yüklü (`npm install`)  

**Komutlar Görünmüyor:**  
- `applications.commands` scope’unu seçtiğinizden emin olun  
- Bot yeterli izinlere sahip olmalı  

**MongoDB Bağlantı Hatası:**  
- MongoDB çalışıyor mu kontrol edin  
- URI doğru olmalı  

---

## 📜 Lisans

MIT Lisansı © 2025. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

---

## 🤝 Katkıda Bulunma

1. Depoyu fork edin  
2. Özellik dalınızı oluşturun (`git checkout -b feature/AmazingFeature`)  
3. Değişiklikleri commit edin (`git commit -m 'Add some AmazingFeature'`)  
4. Dalınıza push edin (`git push origin feature/AmazingFeature`)  
5. Pull Request oluşturun  

---

## 📞 Destek

Sorular ve problemler için:  
- GitHub Issues  
- Discord: `sterzaofficial`
