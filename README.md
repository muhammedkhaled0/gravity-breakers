# Gravity Breakers — أطول رحلة في الدنيا (The Longest Journey in the World)

رحلة تفاعلية تعليمية للأطفال مصممة باللغتين العربية والإنجليزية، تأخذ الأطفال في مغامرة شيقة مع رائد فضاء من الأرض إلى القمر والمريخ والفضاء البعيد لاكتشاف المركبات الحقيقية التي تركها البشر في الفضاء.

---

## 🚀 بنية المشروع (Project Structure)

```text
gravity-breakers/
├── frontend/               # الواجهة الأمامية التفاعلية (HTML + CSS + JS)
│   ├── index.html          # التطبيق الرئيسي بنظام Hash Routing
│   ├── style.css           # التصميم وتنسيقات الفضاء ودعم RTL / LTR
│   ├── script.js           # منطق اللعبة والكرة الأرضية ثلاثية الأبعاد والصوتيات والاختبار
│   ├── audio/              # ملفات التعليق الصوتي (عربي في audio/ وإنجليزي في audio/en/)
│   ├── images/             # صور المشاهد الفضائية والمركبات
│   ├── public/             # الأصول الثابتة المجهزة لـ Vite
│   ├── package.json        # أدوات تشغيل وتطوير الواجهة (Vite)
│   └── vite.config.ts      # إعدادات Vite
│
├── backend/                # الخادم وقواعد البيانات والخدمات السحابية
│   ├── data/               # بيانات استكشاف الفضاء (moon.json, mars.json)
│   ├── server.ts           # خادم Express لخدمة الواجهة وتتبع طلبات الشهادات
│   ├── package.json        # اعتماديات الخادم (Express, TSX, dotenv)
│   └── .env.example        # متغيرات البيئة الخاصة بالخادم والبريد
│
├── Ai/                     # أدوات الذكاء الاصطناعي والمخرجات الإبداعية
│   ├── generated-assets/   # الصور الأصلية المولدة بالذكاء الاصطناعي
│   └── metadata.json       # إعدادات ووصف المشروع في AI Studio
│
└── README.md               # الدليل العام للمشروع
```

---

## 📜 خدمة إرسال الشهادة (Certificate Webhook Endpoint)

عند اجتياز الطفل لاختبار أبطال الفضاء وإدخال الاسم والبريد الإلكتروني، يتم إرسال طلب إصدار الشهادة تلقائيًا إلى نقطة النهاية (Endpoint) المنشورة على **n8n**:

- **URL:** `https://omaribrahim5589.app.n8n.cloud/webhook/762125c4-a2f2-427e-856d-e371401a4ef0`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "اسم البطل",
    "email": "user@example.com",
    "lang": "ar"
  }
  ```
- **Fallback:** يتوفر خيار احتياطي محلي عبر `POST /api/certificate` عبر خادم الـ backend عند الحاجة.

---

## 🎙️ تسمية ملفات الصوت (Expected Audio Filenames)

يتم وضع التسجيلات العربية في `frontend/audio/` والتسجيلات الإنجليزية المقابلة في `frontend/audio/en/`:

- **خريطة الرحلة والتمهيد:** `map-1.mp3`, `map-2.mp3`, `map-3.mp3`, `map-4.mp3`
- **التنبيهات المقفلة:** `locked-quiz.mp3`, `locked-bonus.mp3`
- **الأرض:** `earth-1.mp3` … `earth-5.mp3`، والبطاقات: `earth-card-air.mp3`, `earth-card-earth.mp3`, `earth-card-moon.mp3`
- **القمر:** `moon-1.mp3` … `moon-3.mp3`، والبطاقات: `moon-card-eagle.mp3`, `moon-card-intrepid.mp3`, `moon-card-rover.mp3`
- **المريخ:** `mars-1.mp3` … `mars-3.mp3`، والبطاقات: `mars-card-viking.mp3`, `mars-card-pathfinder.mp3`, `mars-card-sojourner.mp3`
- **الفضاء البعيد:** `bonus-1.mp3` … `bonus-3.mp3`، والبطاقات: `bonus-card-eros.mp3`, `bonus-card-kepler.mp3`

*(في حالة عدم توفر أي ملف صوتي، يعمل التطبيق تلقائيًا بنظام العرض النصي المتزامن بدقة دون أي توقف).*

---

## 💻 طريقة التشغيل (How to Run)

### 1. تشغيل الواجهة الأمامية (Frontend):
```bash
cd frontend
npm install
npm run dev
```
أو يمكن فتح `index.html` مباشرة عبر أي خادم ويب ثابت (مثل `npx serve` أو Live Server).

### 2. تشغيل الخادم الخلفي (Backend):
```bash
cd backend
npm install
npm run dev
```
يعمل الخادم على المنفذ `http://localhost:3000`.
