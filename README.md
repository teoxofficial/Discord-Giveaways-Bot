# 🎉 Gelişmiş Discord Çekiliş Botu

[![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen?logo=node.js)](https://nodejs.org/)
[![discord.js](https://img.shields.io/badge/discord.js-v14-blue?logo=discord)](https://discord.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Node.js ve Discord.js v14 kullanılarak geliştirilmiş, slash komutlu ve MongoDB entegreli gelişmiş bir Discord çekiliş botu. CommonJS formatında olduğu için Windows ve ESM hataları olmadan çalışır.

---

## 🚀 Özellikler

### 🎯 Çekiliş Komutları

| Komut               | Açıklama                        | Yetki          |
|--------------------|---------------------------------|----------------|
| `/çekiliş başlat`    | Yeni bir çekiliş başlatır       | ManageMessages |
| `/çekiliş bitir`     | Aktif bir çekilişi erken bitirir| ManageMessages |
| `/çekiliş yeniden-çek` | Bir çekilişi yeniden çeker     | ManageMessages |

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
