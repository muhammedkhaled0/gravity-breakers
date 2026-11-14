# Gravity Breakers — أطول رحلة في الدنيا (The Longest Journey in the World)

رحلة تفاعلية تعليمية للأطفال مصممة باللغتين العربية والإنجليزية، تأخذ الأطفال في مغامرة شيقة مع رائد فضاء من الأرض إلى القمر والمريخ والفضاء البعيد لاكتشاف المركبات الحقيقية التي تركها البشر في الفضاء.

---

## 🚀 بنية المشروع (Project Structure)

```text
gravity-breakers/
├── frontend/               # الواجهة الأمامية التفاعلية (HTML + CSS + JS Modules)
│   ├── index.html          # التطبيق الرئيسي بنظام Hash Routing
│   ├── style.css           # التصميم وتنسيقات الفضاء ودعم RTL / LTR والبطاقات الغنية
│   ├── script.js           # منطق اللعبة والكرة الأرضية ثلاثية الأبعاد والتنقل
│   ├── src/                # وحدات منطق التطبيق
│   │   ├── data/loader.js  # محمل بيانات JSON وإنشاء كائنات القصة
│   │   ├── state.js        # حالة التطبيق والترجمة وحفظ التقدم
│   │   ├── audio.js        # مشغل الصوت والسرد والترجمة البديلة
│   │   ├── quiz.js         # الاختبار العشوائي ذو الـ 5 أسئلة وحساب النتيجة
│   │   └── gallery.js      # معرض الصور عند توفرها
│   ├── public/             # الأصول الثابتة والصور والصوتيات
│   │   ├── images/         # صور المشاهد الفضائية الحقيقية
│   │   └── audio/          # التسجيلات الصوتية (ar/ و en/)
│   └── package.json        # أدوات تشغيل وتطوير الواجهة (Vite)
│
├── backend/                # الخادم وخدمات البيانات
│   ├── data/               # البيانات الموحدة للاستكشاف والواجهة والاختبار
│   │   ├── ui.json         # نصوص الواجهة ثنائية اللغة
│   │   ├── journey.json    # خريطة الرحلة ومحطة الأرض
│   │   ├── moon.json       # مركبات القمر (أبولو 11 و12 و15)
│   │   ├── mars.json       # مركبات المريخ والفضاء البعيد
│   │   └── quiz.json       # اختبار أبطال الفضاء (5 أسئلة)
│   ├── server.ts           # خادم Express لخدمة الشهادات
│   └── package.json        # اعتماديات الخادم (Express, TSX, dotenv)
│
├── scripts/                # سكربتات فحص البيانات وربط الصوتيات
│   ├── validate-data.mjs   # فحص دقة المخطط وتطابق النصوص واللغات
│   ├── attach-audio.mjs    # فحص ومطابقة ملفات الصوت مع البيانات
│   └── migrate-data.mjs    # سكربت ترحيل البيانات إلى المخطط الموحد v2
│
├── DATA_REVIEW.md          # توثيق التدقيق العلمي وترجمة النصوص
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

يتم وضع التسجيلات العربية في `frontend/public/audio/ar/` والتسجيلات الإنجليزية المقابلة في `frontend/public/audio/en/`:

- **خريطة الرحلة والتمهيد:** `map-1.mp3`, `map-2.mp3`, `map-3.mp3`, `map-4.mp3`
- **التنبيهات المقفلة:** `locked-quiz.mp3`, `locked-bonus.mp3`
- **الأرض:** `earth-1.mp3` … `earth-5.mp3`، والبطاقات: `earth-card-air.mp3`, `earth-card-earth.mp3`, `earth-card-moon.mp3`
- **القمر:** `moon-1.mp3` … `moon-3.mp3`، والبطاقات: `moon-card-eagle.mp3`, `moon-card-intrepid.mp3`, `moon-card-rover.mp3`
- **المريخ:** `mars-1.mp3` … `mars-3.mp3`، والبطاقات: `mars-card-viking.mp3`, `mars-card-pathfinder.mp3`, `mars-card-sojourner.mp3`
- **الفضاء البعيد:** `bonus-1.mp3` … `bonus-3.mp3`، والبطاقات: `bonus-card-eros.mp3`, `bonus-card-kepler.mp3`

*(في حالة عدم توفر أي ملف صوتي، يعمل التطبيق تلقائيًا بنظام العرض النصي المتزامن بدقة دون أي توقف).*

---

## 💻 طريقة التشغيل (How to Run)

### 1. تثبيت الاعتماديات:
```bash
npm run install:all
```

### 2. فحص سلامة البيانات:
```bash
npm run data:check
```

### 3. تشغيل الواجهة الأمامية (Frontend):
```bash
npm run dev
```

### 4. تشغيل الخادم الخلفي (Backend):
```bash
npm run dev:backend
```

### 5. بناء المشروع للإنتاج (Production Build):
```bash
npm run build
npm run preview
```
