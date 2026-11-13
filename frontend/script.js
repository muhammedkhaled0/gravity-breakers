const realEarthGlobeImg = "images/earth-globe.jpg";
const realEarthTextureImg = "images/earth-texture.jpg";
const realEarthOrbitImg = "images/earth-orbit.jpg";
const realMoonSurfaceImg = "images/moon-surface.jpg";
const realMarsSurfaceImg = "images/mars-surface.jpg";
const realDeepSpaceImg = "images/deep-space.jpg";

// =========================================================
// BILINGUAL STORY DATA, UI COPY & REAL PHOTO MAPPING
// =========================================================
export const UI_STRINGS = {
  ar: {
    pageTitle: "أطول رحلة في الدنيا",
    langToggleLabel: "English",
    introTitle: "أطول رحلة في الدنيا",
    introSubtitle: "رحلة حقيقية من الأرض للقمر للمريخ، ورائد فضاء هيحكيلك الحكاية",
    introCta: "دوس على الأرض عشان نبدأ!",
    scrollMapHint: "انزل لتحت عشان تشوف الخريطة",
    mapTitle: "خريطة الرحلة",
    mapSubtitle: "اختار محطتك، ورائد الفضاء هيحكيلك الحكاية",
    mapFly: "يلا نطير!",
    stopEarthName: "الأرض",
    stopEarthMeta: "البداية",
    stopMoonName: "القمر",
    stopMoonMeta: "٣ مركبات",
    stopMarsName: "المريخ",
    stopMarsMeta: "مركبتين",
    stopQuizName: "اختبار",
    stopQuizMetaLocked: "بعد المريخ",
    stopQuizMetaOpen: "جاهز دلوقتي!",
    stopBonusName: "الفضاء البعيد",
    stopBonusMetaLocked: "مفاجأة!",
    stopBonusMetaOpen: "مفتوح!",
    quizSvgWord: "اختبار",
    quizSvgQ: "؟",
    btnMap: "الخريطة",
    soundOnHome: "الصوت شغال",
    soundOffHome: "الصوت مقفول",
    soundOnShort: "الصوت",
    soundOffShort: "مقفول",
    earthTitle: "الأرض",
    earthSubtitle: "شوف بيتنا من الفضاء، قبل ما نطير",
    earthNext: "يلا للقمر!",
    moonTitle: "القمر",
    moonSubtitle: "أول محطة · ٣ مركبات",
    moonNext: "يلا للمريخ!",
    marsTitle: "المريخ",
    marsSubtitle: "الجار الأحمر · مركبتين وروبوت",
    marsNext: "يلا للاختبار!",
    bonusTitle: "الفضاء البعيد",
    bonusSubtitle: "آخر محطة · صخرة سابحة ونجوم بعيدة",
    bonusBackMap: "ارجع للخريطة",
    factListen: "اسمعها من الرائد",
    factListening: "الرائد بيحكي...",
    quizHeaderTitle: "اختبار أبطال الفضاء",
    quizHeaderSubtitle: "جاوب عشان تستلم شهادتك وتفتح الفضاء البعيد!",
    quizIntroPrompt: "جاهز يا بطل؟ اختار الإجابة الصح!",
    quizCorrectMsg: "برافو عليك يا بطل! إجابة صح مية في المية!",
    quizNextPrompt: "شاطر! يلا نشوف السؤال اللي بعده.",
    quizWrongMsg: "قرّبت! فكّر شوية وجرب اختيار تاني.",
    quizVictoryPrompt: "أحسنت يا بطل الفضاء! اكتب اسمك وإيميلك عشان تستلم شهادتك!",
    victoryTitle: "مبروك يا بطل الفضاء!",
    victoryDesc: "اكتب اسمك وبريدك الإلكتروني عشان نصمم شهادتك ونبعتهالك على الإيميل!",
    certNameLabel: "اسمك الجميل",
    certNamePlaceholder: "مثال: علي محمد",
    certEmailLabel: "البريد الإلكتروني",
    certEmailPlaceholder: "name@example.com",
    certSubmitBtn: "ابعتلي الشهادة على الإيميل!",
    certSending: "بنبعت بياناتك...",
    certSentOk: "تم الإرسال! راجع بريدك الإلكتروني عشان تستلم الشهادة!",
    certReadyLocal: "تم استلام اسمك وإيميلك بنجاح! راجع بريدك الإلكتروني عشان تستلم الشهادة.",
    openBonusBtn: "افتح الفضاء البعيد!",
  },
  en: {
    pageTitle: "The Longest Journey in the World",
    langToggleLabel: "عربي",
    introTitle: "The Longest Journey in the World",
    introSubtitle: "A true journey from Earth to the Moon and Mars, narrated by your astronaut guide",
    introCta: "Tap Earth to Start!",
    scrollMapHint: "Scroll down to see the map",
    mapTitle: "Journey Map",
    mapSubtitle: "Pick your stop, and the astronaut will tell you the true story",
    mapFly: "Let's Fly!",
    stopEarthName: "Earth",
    stopEarthMeta: "Start",
    stopMoonName: "The Moon",
    stopMoonMeta: "3 Spacecraft",
    stopMarsName: "Mars",
    stopMarsMeta: "2 Landers & Rover",
    stopQuizName: "Quiz",
    stopQuizMetaLocked: "After Mars",
    stopQuizMetaOpen: "Ready Now!",
    stopBonusName: "Deep Space",
    stopBonusMetaLocked: "Surprise!",
    stopBonusMetaOpen: "Unlocked!",
    quizSvgWord: "Quiz",
    quizSvgQ: "?",
    btnMap: "Map",
    soundOnHome: "Sound On",
    soundOffHome: "Muted",
    soundOnShort: "Sound",
    soundOffShort: "Muted",
    earthTitle: "Earth",
    earthSubtitle: "See our home from space before we launch",
    earthNext: "Off to the Moon!",
    moonTitle: "The Moon",
    moonSubtitle: "First Stop · 3 Spacecraft",
    moonNext: "Off to Mars!",
    marsTitle: "Mars",
    marsSubtitle: "The Red Neighbor · 2 Landers & a Rover",
    marsNext: "Take the Quiz!",
    bonusTitle: "Deep Space",
    bonusSubtitle: "Final Stop · Floating Asteroid & Distant Stars",
    bonusBackMap: "Back to Map",
    factListen: "Hear from the Astronaut",
    factListening: "Astronaut Speaking...",
    quizHeaderTitle: "Space Explorer Quiz",
    quizHeaderSubtitle: "Answer to earn your certificate and unlock Deep Space!",
    quizIntroPrompt: "Ready, hero? Pick the right answer!",
    quizCorrectMsg: "Awesome job! That answer is 100% right!",
    quizNextPrompt: "Great work! Let's try the next question.",
    quizWrongMsg: "Almost! Think for a second and try another choice.",
    quizVictoryPrompt: "Amazing! Enter your name and email to get your Space Explorer Certificate!",
    victoryTitle: "Congratulations, Space Hero!",
    victoryDesc: "Enter your name and email below so we can send your certificate to your email!",
    certNameLabel: "Your Name",
    certNamePlaceholder: "e.g. Maya Ahmed",
    certEmailLabel: "Email Address",
    certEmailPlaceholder: "name@example.com",
    certSubmitBtn: "Send My Certificate!",
    certSending: "Sending your request...",
    certSentOk: "All set! Check your email for your certificate!",
    certReadyLocal: "Thanks, hero! Check your email for your certificate!",
    openBonusBtn: "Unlock Deep Space!",
  },
};

export const STORY_DATA = {
  ar: {
    map: {
      lines: [
        { text: "أهلًا يا بطل! أنا رائد الفضاء اللي هيحكيلك الحكاية.", audio: "audio/map-1.mp3" },
        { text: "هنبدأ من الأرض، ونطير للقمر، وبعدين للمريخ.", audio: "audio/map-2.mp3" },
        { text: "وهناك هنلاقي حاجات الناس سابوها من سنين!", audio: "audio/map-3.mp3" },
        { text: "جاهز؟ دوس على «يلا نطير!»", audio: "audio/map-4.mp3" },
      ],
      lockedQuiz: {
        text: "الاختبار بيفتح لما نخلّص القمر والمريخ.",
        audio: "audio/locked-quiz.mp3",
      },
      lockedBonus: {
        text: "دي مفاجأة! بتتفتح في آخر الرحلة.",
        audio: "audio/locked-bonus.mp3",
      },
    },
    earth: {
      lines: [
        { text: "تعالوا يا أصحابي أحكيلكم حكاية.", audio: "audio/earth-1.mp3" },
        { text: "حكاية أطول رحلة في الدنيا!", audio: "audio/earth-2.mp3" },
        {
          text: "رحلة من الأرض، للقمر، للمريخ، لصخرة كبيرة سابحة في الفضاء، ولنجوم بعيدة أوي أوي!",
          audio: "audio/earth-3.mp3",
        },
        { text: "والحكاية دي مش خيال، دي حصلت بجد. جاهزين؟", audio: "audio/earth-4.mp3" },
        { text: "خمسة... أربعة... تلاتة... اتنين... واحد... انطلااااق!", audio: "audio/earth-5.mp3" },
      ],
      cards: {
        air: {
          title: "الخط الأزرق",
          tag: "الغلاف الجوي للأرض",
          text: "ده الهوا والغلاف الجوي اللي حوالين الأرض؛ بيحمينا وبيخلينا نعرف نتنفس. القمر معندوش هوا زيه!",
          audio: "audio/earth-card-air.mp3",
          img: realEarthOrbitImg,
          focus: "48% 24%",
          scale: 1.7,
        },
        earth: {
          title: "كوكب الأرض",
          tag: "بيتنا الكبير",
          text: "الأرض شكلها أزرق من الفضاء عشان معظم سطحها مية. ده بيتنا اللي بننطلق منه لأطول رحلة في الدنيا!",
          audio: "audio/earth-card-earth.mp3",
          img: realEarthGlobeImg,
          focus: "50% 50%",
          scale: 1.15,
        },
        moon: {
          title: "القمر",
          tag: "أول محطة في رحلتنا",
          text: "ده القمر اللي بنشوفه في السما بالليل! هو أول محطة هنروحها، وهناك هبطت مركبة «النسر» سنة ١٩٦٩.",
          audio: "audio/earth-card-moon.mp3",
          img: realEarthOrbitImg,
          focus: "19.8% 14.5%",
          scale: 3.4,
        },
      },
    },
    moon: {
      lines: [
        { text: "وصلنا القمر! بصوا حوالينا... السما سودة والأرض منورة فوقنا.", audio: "audio/moon-1.mp3" },
        {
          text: "هنا مفيش هوا ولا ريح، عشان كده آثار الخطوات والعجل لسه موجودة لحد النهارده!",
          audio: "audio/moon-2.mp3",
        },
        {
          text: "دوسوا على النقط الصفراء عشان نشوف التلات مركبات اللي سابهم البشر على القمر.",
          audio: "audio/moon-3.mp3",
        },
      ],
      cards: {
        eagle: {
          title: "النسر",
          tag: "أبولو ١١ · ١٩٦٩",
          text: "أول مركبة هبطت ببشر على القمر. نصّها التحتاني لسه موجود هناك لحد دلوقتي، وجنبه جهاز صغير كان بيحس بـ «زلازل القمر»!",
          audio: "audio/moon-card-eagle.mp3",
          img: realMoonSurfaceImg,
          focus: "28% 45%",
          scale: 2.1,
        },
        intrepid: {
          title: "إنتربيد وسيرفيور ٣",
          tag: "أبولو ١٢ · ١٩٦٩",
          text: "مركبة إنتربيد هبطت جنب مركبة قديمة اسمها «سيرفيور ٣»، ورواد الفضاء فكّوا منها حوالي ١٠ كيلوجرام من أجزائها ورجعوا بيها للأرض.",
          audio: "audio/moon-card-intrepid.mp3",
          img: realMoonSurfaceImg,
          focus: "53.5% 41%",
          scale: 2.8,
        },
        rover: {
          title: "العربية القمرية",
          tag: "فالكون · أبولو ١٥ · ١٩٧١",
          text: "أول عربية اتساقت على القمر! مشيت حوالي ٢٨ كيلومتر، ولسه راكنة هناك على سطح القمر لحد النهارده.",
          audio: "audio/moon-card-rover.mp3",
          img: realMoonSurfaceImg,
          focus: "78% 50%",
          scale: 2.2,
        },
      },
    },
    mars: {
      lines: [
        { text: "أهلًا بيكم على المريخ... جارنا الأحمر!", audio: "audio/mars-1.mp3" },
        {
          text: "التراب هنا لونه أحمر، والناس بعتوا مركبات وروبوتات وصلت لحد هنا وبعتت صور للأرض.",
          audio: "audio/mars-2.mp3",
        },
        {
          text: "دوسوا على النقط الصفراء عشان تشوفوا فايكنج ١، باثفايندر، والروبوت الصغنن سوجورنر!",
          audio: "audio/mars-3.mp3",
        },
      ],
      cards: {
        viking: {
          title: "فايكنج ١",
          tag: "أول هبوط ناجح على المريخ · ١٩٧٦",
          text: "أول مركبة تنجح في الهبوط على المريخ! فضلت شغالة أكتر من ٦ سنين، لحد ما أمر غلط اتبعت من الأرض قطع الاتصال بيها.",
          audio: "audio/mars-card-viking.mp3",
          img: realMarsSurfaceImg,
          focus: "27.5% 50%",
          scale: 2.2,
        },
        pathfinder: {
          title: "باثفايندر",
          tag: "١٩٩٧ · محطة كارل ساجان",
          text: "هبطت على المريخ جوا وسائد هوائية عملاقة، واتنططت على السطح حوالي ١٥ مرة لحد ما وقفت وفتحت!",
          audio: "audio/mars-card-pathfinder.mp3",
          img: realMarsSurfaceImg,
          focus: "56% 51%",
          scale: 2.1,
        },
        sojourner: {
          title: "سوجورنر",
          tag: "روبوت المريخ الصغير",
          text: "روبوت صغنن خالص! وزنه ١٠٫٥ كيلوجرام، وطوله ٣٠ سنتيمتر... يعني قد مسطرة المدرسة بالظبط! ولسه موجود على المريخ.",
          audio: "audio/mars-card-sojourner.mp3",
          img: realMarsSurfaceImg,
          focus: "76.5% 65%",
          scale: 2.4,
        },
      },
    },
    bonus: {
      lines: [
        { text: "مبروك يا بطل! وصلنا لأبعد حتة في رحلتنا: الفضاء البعيد!", audio: "audio/bonus-1.mp3" },
        {
          text: "البشر مسبوش مركبات على القمر والمريخ بس... دول وصلوا لصخرة كبيرة سابحة في الفضاء، وبعتوا تلسكوب يبص على نجوم بعيدة أوي أوي!",
          audio: "audio/bonus-2.mp3",
        },
        { text: "دوس على النقط الصفراء عشان تعرف حكايتهم.", audio: "audio/bonus-3.mp3" },
      ],
      cards: {
        eros: {
          title: "نير شوميكر على إيروس",
          tag: "صخرة كبيرة سابحة في الفضاء",
          text: "أول مركبة تهبط على كويكب! هبطت على صخرة كبيرة سابحة في الفضاء اسمها «إيروس»، وفضلت مستقرة فوقها.",
          audio: "audio/bonus-card-eros.mp3",
          img: realDeepSpaceImg,
          focus: "35% 24%",
          scale: 2.1,
        },
        kepler: {
          title: "تلسكوب كيبلر الفضائي",
          tag: "نجوم بعيدة أوي أوي",
          text: "تلسكوب طار في الفضاء وبص على نجوم بعيدة أوي أوي عشان يدور على كواكب تانية برا مجموعتنا الشمسية، ولسه سابح في الفضاء.",
          audio: "audio/bonus-card-kepler.mp3",
          img: realDeepSpaceImg,
          focus: "75% 49%",
          scale: 2.1,
        },
      },
    },
    quiz: {
      stepFormat: (cur, total) => `السؤال ${toArabicNum(cur)} من ${toArabicNum(total)}`,
      questions: [
        {
          question: "١. إيه أول مركبة هبطت ببشر على القمر سنة ١٩٦٩؟",
          options: ["النسر (أبولو ١١)", "فايكنج ١", "سوجورنر"],
          correctIndex: 0,
        },
        {
          question: "٢. العربية القمرية (أبولو ١٥) مشيت قد إيه على القمر؟",
          options: ["حوالي ٢٨ كيلومتر", "١٥ سنتيمتر بس", "٦ سنين"],
          correctIndex: 0,
        },
        {
          question: "٣. إزاي مركبة «باثفايندر» هبطت على المريخ سنة ١٩٩٧؟",
          options: [
            "بعجل كبير زي العربية",
            "جوا وسائد هوائية عملاقة اتنططت ١٥ مرة",
            "بشراع في البحر",
          ],
          correctIndex: 1,
        },
        {
          question: "٤. طول الروبوت الصغير «سوجورنر» أد إيه؟",
          options: ["٣٠ سنتيمتر قد مسطرة المدرسة", "طول أتوبيس كبير", "كيلومتر كامل"],
          correctIndex: 0,
        },
        {
          question: "٥. ليه الخط الأزرق اللي حوالين الأرض مهم لينا؟",
          options: [
            "عشان ده لون المية في السما",
            "ده الهوا والغلاف الجوي اللي بيحمينا",
            "دي صخور سابحة في الفضاء",
          ],
          correctIndex: 1,
        },
      ],
    },
  },

  en: {
    map: {
      lines: [
        { text: "Hello, hero! I'm the astronaut who will tell you the story.", audio: "audio/en/map-1.mp3" },
        { text: "We'll start on Earth, fly to the Moon, and then travel to Mars.", audio: "audio/en/map-2.mp3" },
        { text: "There we'll find real spacecraft humans left behind years ago!", audio: "audio/en/map-3.mp3" },
        { text: "Ready? Tap «Let's Fly!»", audio: "audio/en/map-4.mp3" },
      ],
      lockedQuiz: {
        text: "The quiz unlocks after we explore the Moon and Mars.",
        audio: "audio/en/locked-quiz.mp3",
      },
      lockedBonus: {
        text: "That's a surprise! It unlocks at the end of the journey.",
        audio: "audio/en/locked-bonus.mp3",
      },
    },
    earth: {
      lines: [
        { text: "Come along, friends, let me tell you a story.", audio: "audio/en/earth-1.mp3" },
        { text: "The story of the longest journey in the world!", audio: "audio/en/earth-2.mp3" },
        {
          text: "A journey from Earth, to the Moon, to Mars, to a giant rock floating in space, and to stars far, far away!",
          audio: "audio/en/earth-3.mp3",
        },
        { text: "And this story isn't pretend — it really happened. Ready?", audio: "audio/en/earth-4.mp3" },
        { text: "Five... four... three... two... one... Blast off!", audio: "audio/en/earth-5.mp3" },
      ],
      cards: {
        air: {
          title: "The Blue Line",
          tag: "Earth's Atmosphere",
          text: "That thin blue glow is the air around Earth! It protects us and lets us breathe. The Moon has none.",
          audio: "audio/en/earth-card-air.mp3",
          img: realEarthOrbitImg,
          focus: "48% 24%",
          scale: 1.7,
        },
        earth: {
          title: "Planet Earth",
          tag: "Our Home World",
          text: "Earth looks bright blue from space because most of its surface is water. This is where our big trip begins!",
          audio: "audio/en/earth-card-earth.mp3",
          img: realEarthGlobeImg,
          focus: "50% 50%",
          scale: 1.15,
        },
        moon: {
          title: "The Moon",
          tag: "Our First Stop",
          text: "That's our Moon floating in the dark sky! It's our very first stop, where Eagle landed back in 1969.",
          audio: "audio/en/earth-card-moon.mp3",
          img: realEarthOrbitImg,
          focus: "19.8% 14.5%",
          scale: 3.4,
        },
      },
    },
    moon: {
      lines: [
        { text: "We made it to the Moon! Look around — pitch-black sky and bright Earth above us.", audio: "audio/en/moon-1.mp3" },
        {
          text: "There's no wind or air here, so astronaut footprints and tire tracks are still here today!",
          audio: "audio/en/moon-2.mp3",
        },
        {
          text: "Tap the glowing yellow dots to discover 3 real spacecraft humans left on the Moon.",
          audio: "audio/en/moon-3.mp3",
        },
      ],
      cards: {
        eagle: {
          title: "Eagle",
          tag: "Apollo 11 · 1969",
          text: "The first craft to land humans on the Moon! Its lower half is still parked there, right beside a small device that sensed moonquakes.",
          audio: "audio/en/moon-card-eagle.mp3",
          img: realMoonSurfaceImg,
          focus: "28% 45%",
          scale: 2.1,
        },
        intrepid: {
          title: "Intrepid & Surveyor 3",
          tag: "Apollo 12 · 1969",
          text: "Intrepid landed right next to the older Surveyor 3 probe, and astronauts brought back about 10 kg of its parts to study on Earth.",
          audio: "audio/en/moon-card-intrepid.mp3",
          img: realMoonSurfaceImg,
          focus: "53.5% 41%",
          scale: 2.8,
        },
        rover: {
          title: "Lunar Rover",
          tag: "Falcon · Apollo 15 · 1971",
          text: "The very first car driven on the Moon! It traveled about 28 kilometers and is still parked there today.",
          audio: "audio/en/moon-card-rover.mp3",
          img: realMoonSurfaceImg,
          focus: "78% 50%",
          scale: 2.2,
        },
      },
    },
    mars: {
      lines: [
        { text: "Welcome to Mars — our dusty red neighbor!", audio: "audio/en/mars-1.mp3" },
        {
          text: "The soil here is rusty red, and humans sent real landers and clever rovers all the way here.",
          audio: "audio/en/mars-2.mp3",
        },
        {
          text: "Tap the yellow dots to meet Viking 1, Pathfinder, and tiny Sojourner!",
          audio: "audio/en/mars-3.mp3",
        },
      ],
      cards: {
        viking: {
          title: "Viking 1",
          tag: "First Successful Mars Landing · 1976",
          text: "The first craft to land and work successfully on Mars! It operated for over 6 years until a wrong command from Earth cut contact.",
          audio: "audio/en/mars-card-viking.mp3",
          img: realMarsSurfaceImg,
          focus: "27.5% 50%",
          scale: 2.2,
        },
        pathfinder: {
          title: "Mars Pathfinder",
          tag: "1997 · Carl Sagan Station",
          text: "It landed wrapped inside giant airbags and bounced about 15 times across Mars before settling and opening its solar petals!",
          audio: "audio/en/mars-card-pathfinder.mp3",
          img: realMarsSurfaceImg,
          focus: "56% 51%",
          scale: 2.1,
        },
        sojourner: {
          title: "Sojourner",
          tag: "Tiny Mars Rover",
          text: "A super tiny robot! Only 10.5 kg and 30 cm long — just like a school ruler — and it's still on Mars today.",
          audio: "audio/en/mars-card-sojourner.mp3",
          img: realMarsSurfaceImg,
          focus: "76.5% 65%",
          scale: 2.4,
        },
      },
    },
    bonus: {
      lines: [
        { text: "You unlocked Deep Space, hero! Welcome to our farthest stop!", audio: "audio/en/bonus-1.mp3" },
        {
          text: "Humans didn't just stop at the Moon and Mars — they landed on a floating asteroid and sent telescopes to watch faraway stars!",
          audio: "audio/en/bonus-2.mp3",
        },
        { text: "Tap the yellow dots to uncover these amazing space explorers.", audio: "audio/en/bonus-3.mp3" },
      ],
      cards: {
        eros: {
          title: "NEAR Shoemaker on Eros",
          tag: "Floating Rock in Space",
          text: "The first spacecraft ever to land on an asteroid! It touched down on the giant space rock Eros and stayed there.",
          audio: "audio/en/bonus-card-eros.mp3",
          img: realDeepSpaceImg,
          focus: "35% 24%",
          scale: 2.1,
        },
        kepler: {
          title: "Kepler Space Telescope",
          tag: "Stars Far, Far Away",
          text: "A deep-space telescope that stared at distant stars to discover thousands of planets outside our solar system.",
          audio: "audio/en/bonus-card-kepler.mp3",
          img: realDeepSpaceImg,
          focus: "75% 49%",
          scale: 2.1,
        },
      },
    },
    quiz: {
      stepFormat: (cur, total) => `Question ${cur} of ${total}`,
      questions: [
        {
          question: "1. Which spacecraft first landed humans on the Moon in 1969?",
          options: ["Eagle (Apollo 11)", "Viking 1", "Sojourner"],
          correctIndex: 0,
        },
        {
          question: "2. About how far did the Apollo 15 Lunar Rover drive on the Moon?",
          options: ["About 28 kilometers", "Just 15 centimeters", "6 years"],
          correctIndex: 0,
        },
        {
          question: "3. How did Mars Pathfinder land on Mars in 1997?",
          options: [
            "On giant racing wheels",
            "Inside giant airbags that bounced ~15 times",
            "With a sailboat",
          ],
          correctIndex: 1,
        },
        {
          question: "4. How long is the tiny Sojourner rover?",
          options: ["30 cm — like a school ruler", "As long as a big bus", "1 kilometer"],
          correctIndex: 0,
        },
        {
          question: "5. Why is the thin blue line around Earth so important?",
          options: [
            "It's ocean water in the sky",
            "It's our air and atmosphere that protects us",
            "It's a ring of space rocks",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
};

// =========================================================
// INLINE SVG HELPERS (Astronaut Guide & Sound Icons)
// =========================================================
function createAstronautSVG() {
  return `
    <svg class="astronaut-svg" viewBox="0 0 120 150" aria-hidden="true">
      <rect x="64" y="54" width="32" height="46" rx="10" fill="#9C92D8" stroke="#3B4566" stroke-width="3" />
      <path d="M94 74 C108 74, 108 98, 92 104" fill="none" stroke="#9C92D8" stroke-width="6" stroke-linecap="round" />
      <path d="M94 74 C108 74, 108 98, 92 104" fill="none" stroke="#3B4566" stroke-width="2" stroke-linecap="round" />

      <g class="astronaut-pointing-arm">
        <path d="M40 68 C26 62, 16 54, 12 46" fill="none" stroke="#3B4566" stroke-width="16" stroke-linecap="round" />
        <path d="M40 68 C26 62, 16 54, 12 46" fill="none" stroke="#FFFFFF" stroke-width="10.5" stroke-linecap="round" />
        <circle cx="11" cy="44" r="7.5" fill="#8E98B8" stroke="#3B4566" stroke-width="2.5" />
      </g>

      <rect x="40" y="96" width="16" height="28" rx="7" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <rect x="60" y="96" width="16" height="28" rx="7" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <rect x="36" y="120" width="21" height="14" rx="7" fill="#8E98B8" stroke="#3B4566" stroke-width="3" />
      <rect x="59" y="120" width="21" height="14" rx="7" fill="#8E98B8" stroke="#3B4566" stroke-width="3" />

      <rect x="36" y="56" width="44" height="48" rx="16" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <path d="M45 58 L45 102" stroke="#7A6EC2" stroke-width="5" stroke-linecap="round" />
      <path d="M71 58 L71 102" stroke="#7A6EC2" stroke-width="5" stroke-linecap="round" />
      <rect x="37" y="82" width="42" height="7" rx="3" fill="#7A6EC2" />

      <path d="M78 68 C86 78, 76 88, 62 86" fill="none" stroke="#3B4566" stroke-width="15" stroke-linecap="round" />
      <path d="M78 68 C86 78, 76 88, 62 86" fill="none" stroke="#FFFFFF" stroke-width="9.5" stroke-linecap="round" />
      <circle cx="60" cy="86" r="7" fill="#8E98B8" stroke="#3B4566" stroke-width="2.5" />

      <circle cx="58" cy="36" r="26" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <circle cx="55" cy="37" r="18" fill="#2E3A5C" stroke="#3B4566" stroke-width="2.5" />
      <ellipse cx="47" cy="29" rx="5.5" ry="3.2" transform="rotate(-28 47 29)" fill="#FFFFFF" />
      <circle cx="54" cy="25" r="2" fill="#FFFFFF" />
    </svg>
  `;
}

function createSoundIconSVG(isMuted) {
  if (isMuted) {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
        <path d="M16 9L22 15M22 9L16 15" stroke="#D93848" stroke-width="2.8" stroke-linecap="round" />
      </svg>
    `;
  }
  return `
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 5L6 9H2V15H6L11 19V5ZM15.5 8.5C16.8 9.8 17.5 11.4 17.5 13C17.5 14.6 16.8 16.2 15.5 17.5L14.1 16.1C15 15.2 15.5 14.1 15.5 13C15.5 11.9 15 10.8 14.1 9.9L15.5 8.5Z" fill="currentColor" />
    </svg>
  `;
}

function toArabicNum(num) {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num)
    .split("")
    .map((d) => digits[Number(d)] ?? d)
    .join("");
}

// =========================================================
// GLOBAL APPLICATION STATE
// =========================================================
const state = {
  lang: "ar",
  currentScreen: "home",
  isMuted: false,
  visited: {
    earth: false,
    moon: false,
    mars: false,
    bonus: false,
  },
  quizUnlocked: false,
  quizPassed: false,
  quizIndex: 0,
  quizAnsweredCurrent: false,
  activeCardKey: null,
  activeCardScreen: null,
  lastCertName: "",
};

function t(key) {
  return UI_STRINGS[state.lang][key] || UI_STRINGS.ar[key] || "";
}

function currentStory() {
  return STORY_DATA[state.lang];
}

// =========================================================
// AUDIO & NARRATION ENGINE
// =========================================================
class AudioNarrationManager {
  constructor() {
    this.audioEl = new Audio();
    this.audioEl.preload = "auto";
    this.cardAudioEl = new Audio();
    this.fallbackTimer = null;
    this.cardFallbackTimer = null;
    this.audioCtx = null;
    this.sequenceId = 0;
    this.currentScreenId = null;
    this.currentLines = [];
    this.currentIndex = 0;
  }

  playChime(type = "tap") {
    if (state.isMuted) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!this.audioCtx) this.audioCtx = new Ctx();
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const notes =
        type === "success"
          ? [523.25, 659.25, 783.99]
          : type === "unlock"
            ? [587.33, 739.99, 880, 1174.66]
            : [520];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.24);
      });
    } catch {
      // Ignore Web Audio errors
    }
  }

  stopSequence() {
    this.sequenceId++;
    clearTimeout(this.fallbackTimer);
    this.fallbackTimer = null;
    this.audioEl.onended = null;
    this.audioEl.onerror = null;
    this.audioEl.pause();
    this.audioEl.currentTime = 0;
  }

  stopCardAudio() {
    clearTimeout(this.cardFallbackTimer);
    this.cardFallbackTimer = null;
    this.cardAudioEl.onended = null;
    this.cardAudioEl.onerror = null;
    this.cardAudioEl.pause();
    this.cardAudioEl.currentTime = 0;
    setFactAudioButtonState(false);
  }

  stopAll() {
    this.stopSequence();
    this.stopCardAudio();
  }

  playSequence(screenId, lines, startIndex = 0) {
    this.stopSequence();
    this.currentScreenId = screenId;
    this.currentLines = lines;
    this.currentIndex = startIndex;
    this._playStep(this.sequenceId);
  }

  _playStep(seqToken) {
    if (seqToken !== this.sequenceId) return;
    if (!this.currentLines || this.currentIndex >= this.currentLines.length) return;

    const line = this.currentLines[this.currentIndex];
    renderGuideDialogue(this.currentScreenId, this.currentLines, this.currentIndex);

    const advance = () => {
      if (seqToken !== this.sequenceId) return;
      if (this.currentIndex < this.currentLines.length - 1) {
        this.currentIndex += 1;
        this._playStep(seqToken);
      }
    };

    if (state.isMuted) {
      return;
    }

    const fallbackDelay = Math.min(4800, Math.max(2900, line.text.length * 58));

    if (line.audio) {
      this.audioEl.src = line.audio;
      this.audioEl.onended = () => advance();
      this.audioEl.onerror = () => {
        clearTimeout(this.fallbackTimer);
        this.fallbackTimer = setTimeout(advance, fallbackDelay);
      };
      const playPromise = this.audioEl.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          clearTimeout(this.fallbackTimer);
          this.fallbackTimer = setTimeout(advance, fallbackDelay);
        });
      }
    } else {
      this.fallbackTimer = setTimeout(advance, fallbackDelay);
    }
  }

  playSingleHint(screenId, hintObj) {
    this.stopSequence();
    this.currentScreenId = screenId;
    this.currentLines = [hintObj];
    this.currentIndex = 0;
    renderGuideDialogue(screenId, [hintObj], 0);
    if (!state.isMuted && hintObj.audio) {
      this.audioEl.src = hintObj.audio;
      this.audioEl.play().catch(() => {});
    }
  }

  playCardAudio(card) {
    this.stopCardAudio();
    if (state.isMuted) return;

    setFactAudioButtonState(true);
    const fallbackMs = Math.min(5500, Math.max(3000, card.text.length * 55));

    if (card.audio) {
      this.cardAudioEl.src = card.audio;
      this.cardAudioEl.onended = () => setFactAudioButtonState(false);
      this.cardAudioEl.onerror = () => {
        this.cardFallbackTimer = setTimeout(() => setFactAudioButtonState(false), fallbackMs);
      };
      const p = this.cardAudioEl.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          this.cardFallbackTimer = setTimeout(() => setFactAudioButtonState(false), fallbackMs);
        });
      }
    } else {
      this.cardFallbackTimer = setTimeout(() => setFactAudioButtonState(false), fallbackMs);
    }
  }

  setMuted(muted) {
    state.isMuted = muted;
    syncSoundButtons();
    if (muted) {
      this.audioEl.pause();
      clearTimeout(this.fallbackTimer);
      this.stopCardAudio();
    } else if (this.currentScreenId && this.currentLines.length > 0) {
      this._playStep(this.sequenceId);
    }
  }
}

const audioManager = new AudioNarrationManager();

// =========================================================
// MOUNT REAL PHOTOGRAPHS & ASTRONAUT SVGS
// =========================================================
function mountRealSpacePhotos() {
  const earthScene = document.getElementById("scene-img-earth");
  if (earthScene) earthScene.src = realEarthOrbitImg;

  const moonScene = document.getElementById("scene-img-moon");
  if (moonScene) moonScene.src = realMoonSurfaceImg;

  const marsScene = document.getElementById("scene-img-mars");
  if (marsScene) marsScene.src = realMarsSurfaceImg;

  const bonusScene = document.getElementById("scene-img-bonus");
  if (bonusScene) bonusScene.src = realDeepSpaceImg;
}

function initRealisticSpinningEarth() {
  const canvas = document.getElementById("intro-earth-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const S = canvas.width; // 360
  const half = S / 2;
  const R = S * 0.435; // leaves room for atmospheric halo glow
  const TILT = (23.4 * Math.PI) / 180;
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);

  // Upper-left-front normalized sunlight vector
  const lx = -0.52;
  const ly = -0.32;
  const lz = 0.792;

  const frameImg = ctx.createImageData(S, S);
  const out = frameImg.data;

  // Precompute outer atmospheric halo pixels & sphere lookup arrays
  const spherePixels = [];
  const sphereU = [];
  const sphereV = [];
  const sphereLight = [];
  const sphereRim = [];

  for (let py = 0; py < S; py++) {
    const sy = (py - half) / R;
    for (let px = 0; px < S; px++) {
      const sx = (px - half) / R;
      const r2 = sx * sx + sy * sy;
      const idx4 = (py * S + px) * 4;

      if (r2 <= 1.0) {
        const sz = Math.sqrt(1.0 - r2);
        const ndotl = sx * lx + sy * ly + sz * lz;
        const lit = Math.min(1.08, 0.08 + 0.98 * Math.max(0, ndotl));
        const sunSide = Math.max(0, ndotl + 0.28);
        const fresnel = Math.pow(1 - sz, 2.8) * (0.22 + 0.78 * Math.min(1, sunSide));

        // Apply -23.4deg axial tilt to get planet-local latitude & longitude
        const tx = sx * cosT + sy * sinT;
        const ty = -sx * sinT + sy * cosT;
        const lat = Math.asin(Math.max(-1, Math.min(1, ty)));
        const lon = Math.atan2(tx, sz);

        spherePixels.push(idx4);
        sphereU.push(lon / (Math.PI * 2) + 0.5);
        sphereV.push(0.5 + lat / Math.PI);
        sphereLight.push(lit);
        sphereRim.push(Math.min(0.85, fresnel * 0.95));
      } else {
        const dist = Math.sqrt(r2) - 1.0;
        if (dist < 0.16) {
          const ndotlEdge = sx * lx + sy * ly;
          const haloBoost = 0.45 + 0.55 * Math.max(0, ndotlEdge + 0.35);
          const alpha = Math.pow(1 - dist / 0.16, 2.3) * 0.62 * haloBoost;
          out[idx4] = 86;
          out[idx4 + 1] = 178;
          out[idx4 + 2] = 255;
          out[idx4 + 3] = Math.round(alpha * 255);
        }
      }
    }
  }

  const count = spherePixels.length;
  const pIdx = new Int32Array(spherePixels);
  const pU = new Float32Array(sphereU);
  const pV = new Float32Array(sphereV);
  const pLight = new Float32Array(sphereLight);
  const pRim = new Float32Array(sphereRim);

  const img = new Image();
  img.src = realEarthTextureImg;

  img.onload = () => {
    const texW = 1024;
    const texH = 512;
    const texCanvas = document.createElement("canvas");
    texCanvas.width = texW;
    texCanvas.height = texH;
    const texCtx = texCanvas.getContext("2d");
    texCtx.drawImage(img, 0, 0, texW, texH);

    // Cross-blend left/right 5% seam over Pacific Ocean for 100% seamless spin
    const texDataObj = texCtx.getImageData(0, 0, texW, texH);
    const tex = texDataObj.data;
    const seamW = Math.floor(texW * 0.05);
    for (let y = 0; y < texH; y++) {
      const row = y * texW;
      for (let x = 0; x < seamW; x++) {
        const t = x / seamW;
        const leftI = (row + x) * 4;
        const rightI = (row + (texW - seamW + x)) * 4;
        for (let c = 0; c < 3; c++) {
          const avg = Math.round(tex[leftI + c] * t + tex[rightI + c] * (1 - t));
          tex[rightI + c] = avg;
        }
      }
    }

    // Precompute exact integer row offsets for each sphere pixel
    const pRow = new Int32Array(count);
    for (let i = 0; i < count; i++) {
      const ty = Math.min(texH - 1, Math.max(0, Math.floor(pV[i] * texH)));
      pRow[i] = ty * texW;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phase = 0.04; // Start facing Africa / Nile / Atlantic
    let lastTime = performance.now();

    function renderFrame(now) {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (!reducedMotion && state.currentScreen === "home") {
        // Complete one full rotation every ~32 seconds
        phase = (phase + dt / 32) % 1;
      }

      for (let i = 0; i < count; i++) {
        let u = pU[i] - phase;
        if (u < 0) u += 1;
        const tx = Math.floor(u * texW);
        const sIdx = (pRow[i] + tx) * 4;
        const dIdx = pIdx[i];

        const lit = pLight[i];
        const rim = pRim[i];
        const invRim = 1 - rim;

        const r = tex[sIdx] * lit * invRim + 95 * rim;
        const g = tex[sIdx + 1] * lit * invRim + 185 * rim;
        const b = tex[sIdx + 2] * lit * invRim + 255 * rim;

        out[dIdx] = r > 255 ? 255 : r;
        out[dIdx + 1] = g > 255 ? 255 : g;
        out[dIdx + 2] = b > 255 ? 255 : b;
        out[dIdx + 3] = 255;
      }

      ctx.putImageData(frameImg, 0, 0);

      if (!reducedMotion) {
        requestAnimationFrame(renderFrame);
      }
    }

    requestAnimationFrame(renderFrame);
  };
}

function mountAstronautFigures() {
  document.querySelectorAll(".astronaut-figure").forEach((el) => {
    el.innerHTML = createAstronautSVG();
  });
}

// =========================================================
// BILINGUAL I18N SYNC
// =========================================================
function applyLanguage(lang) {
  state.lang = lang === "en" ? "en" : "ar";
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll(".js-lang-toggle").forEach((btn) => {
    btn.textContent = t("langToggleLabel");
  });

  const quizSvgWord = document.getElementById("map-quiz-svg-label");
  if (quizSvgWord) quizSvgWord.textContent = t("quizSvgWord");
  const q1 = document.getElementById("map-quiz-q1");
  const q2 = document.getElementById("map-quiz-q2");
  const badgeQ = document.getElementById("quiz-badge-q");
  if (q1) q1.textContent = t("quizSvgQ");
  if (q2) q2.textContent = t("quizSvgQ");
  if (badgeQ) badgeQ.textContent = t("quizSvgQ");

  const nameInput = document.getElementById("cert-name-input");
  const emailInput = document.getElementById("cert-email-input");
  if (nameInput) nameInput.placeholder = t("certNamePlaceholder");
  if (emailInput) emailInput.placeholder = t("certEmailPlaceholder");

  syncSoundButtons();
  updateMapProgressUI();
  setFactAudioButtonState(false);

  // Refresh active fact card if open
  if (state.activeCardScreen && state.activeCardKey) {
    openFactCard(state.activeCardScreen, state.activeCardKey, { silent: true });
  }

  // Refresh active screen narration or quiz question
  if (state.currentScreen === "home") {
    audioManager.playSequence("map", currentStory().map.lines, 0);
  } else if (state.currentScreen === "quiz") {
    if (document.getElementById("quiz-victory-card").hidden) {
      setQuizAstronautText(t("quizIntroPrompt"));
      renderQuizQuestion();
    } else {
      setQuizAstronautText(t("quizVictoryPrompt"));
    }
  } else {
    const data = currentStory()[state.currentScreen];
    if (data && data.lines) {
      audioManager.playSequence(state.currentScreen, data.lines, 0);
    }
  }
}

function syncSoundButtons() {
  document.querySelectorAll(".js-sound-toggle").forEach((btn) => {
    const slot = btn.querySelector(".sound-icon-slot");
    const label = btn.querySelector(".sound-label");
    btn.setAttribute("aria-pressed", state.isMuted ? "true" : "false");
    if (slot) slot.innerHTML = createSoundIconSVG(state.isMuted);
    if (label) {
      const isHomeMap = Boolean(btn.closest(".map-header") || btn.closest(".intro-top-controls"));
      if (isHomeMap) {
        label.textContent = state.isMuted ? t("soundOffHome") : t("soundOnHome");
      } else {
        label.textContent = state.isMuted ? t("soundOffShort") : t("soundOnShort");
      }
    }
  });
}

function renderGuideDialogue(screenId, lines, activeIndex) {
  const guide = document.querySelector(`.astronaut-companion[data-guide="${screenId}"]`);
  if (!guide) return;

  const textEl = guide.querySelector(".speech-text");
  const dotsEl = guide.querySelector(".speech-dots");
  const line = lines[activeIndex];
  if (textEl && line) {
    textEl.textContent = line.text;
  }

  if (dotsEl) {
    dotsEl.innerHTML = "";
    if (lines.length > 1) {
      lines.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.className = "speech-dot";
        if (idx === activeIndex) dot.classList.add("is-active");
        else if (idx < activeIndex) dot.classList.add("is-done");
        dotsEl.appendChild(dot);
      });
    }
  }
}

function updateMapProgressUI() {
  const earthBtn = document.querySelector('.map-stop[data-stop="earth"]');
  const moonBtn = document.querySelector('.map-stop[data-stop="moon"]');
  const marsBtn = document.querySelector('.map-stop[data-stop="mars"]');
  const quizBtn = document.querySelector('.map-stop[data-stop="quiz"]');
  const bonusBtn = document.querySelector('.map-stop[data-stop="bonus"]');

  if (earthBtn) earthBtn.classList.toggle("is-visited", state.visited.earth);
  if (moonBtn) moonBtn.classList.toggle("is-visited", state.visited.moon);
  if (marsBtn) marsBtn.classList.toggle("is-visited", state.visited.mars);

  if (state.visited.moon && state.visited.mars) {
    state.quizUnlocked = true;
  }

  if (quizBtn) {
    quizBtn.classList.toggle("is-locked", !state.quizUnlocked);
    quizBtn.classList.toggle("is-visited", state.quizPassed);
    const meta = document.getElementById("quiz-stop-meta");
    if (meta) meta.textContent = state.quizUnlocked ? t("stopQuizMetaOpen") : t("stopQuizMetaLocked");
  }

  if (bonusBtn) {
    bonusBtn.classList.toggle("is-locked", !state.quizPassed);
    bonusBtn.classList.toggle("is-visited", state.visited.bonus);
    const meta = document.getElementById("bonus-stop-meta");
    if (meta) meta.textContent = state.quizPassed ? t("stopBonusMetaOpen") : t("stopBonusMetaLocked");
  }
}

// =========================================================
// FACT CARD MODAL (Uses cropped detail of the real photograph!)
// =========================================================
function setFactAudioButtonState(isPlaying) {
  const btn = document.getElementById("btn-fact-audio");
  const label = document.getElementById("fact-audio-label");
  if (!btn || !label) return;
  btn.classList.toggle("is-playing", isPlaying);
  label.textContent = isPlaying ? t("factListening") : t("factListen");
}

function openFactCard(screenId, cardKey, opts = {}) {
  const screenData = currentStory()[screenId];
  if (!screenData || !screenData.cards || !screenData.cards[cardKey]) return;
  const card = screenData.cards[cardKey];
  state.activeCardScreen = screenId;
  state.activeCardKey = cardKey;

  if (!opts.silent) {
    audioManager.playChime("tap");
    audioManager.stopCardAudio();
  }

  document.querySelectorAll(".hotspot").forEach((h) => {
    const match = h.dataset.screen === screenId && h.dataset.card === cardKey;
    h.classList.toggle("is-selected", match);
  });

  const thumbImg = document.getElementById("fact-card-img");
  if (thumbImg) {
    thumbImg.src = card.img;
    thumbImg.alt = card.title;
    thumbImg.style.objectPosition = card.focus || "50% 50%";
    thumbImg.style.transformOrigin = card.focus || "50% 50%";
    thumbImg.style.transform = `scale(${card.scale || 1.4})`;
  }

  document.getElementById("fact-card-title").textContent = card.title;
  document.getElementById("fact-card-tag").textContent = card.tag;
  document.getElementById("fact-card-text").textContent = card.text;

  document.getElementById("fact-card-modal").hidden = false;
}

function closeFactCard() {
  audioManager.stopCardAudio();
  state.activeCardKey = null;
  state.activeCardScreen = null;
  document.querySelectorAll(".hotspot.is-selected").forEach((h) => h.classList.remove("is-selected"));
  const modal = document.getElementById("fact-card-modal");
  if (modal) modal.hidden = true;
}

// =========================================================
// QUIZ ENGINE + CERTIFICATE GENERATOR
// =========================================================
function startQuiz() {
  state.quizIndex = 0;
  state.quizAnsweredCurrent = false;
  document.getElementById("quiz-victory-card").hidden = true;
  document.getElementById("quiz-question-card").hidden = false;
  setQuizAstronautText(t("quizIntroPrompt"));
  renderQuizQuestion();
}

function setQuizAstronautText(text) {
  const el = document.getElementById("quiz-speech-text");
  if (el) el.textContent = text;
}

function renderQuizQuestion() {
  const quizData = currentStory().quiz;
  const questions = quizData.questions;
  const q = questions[state.quizIndex];
  state.quizAnsweredCurrent = false;

  document.getElementById("quiz-step-label").textContent = quizData.stepFormat(
    state.quizIndex + 1,
    questions.length
  );

  const dotsContainer = document.getElementById("quiz-progress-dots");
  dotsContainer.innerHTML = "";
  questions.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.className = "quiz-p-dot";
    if (idx < state.quizIndex) dot.classList.add("is-done");
    else if (idx === state.quizIndex) dot.classList.add("is-current");
    dotsContainer.appendChild(dot);
  });

  document.getElementById("quiz-question-text").textContent = q.question;

  const optionsWrap = document.getElementById("quiz-options");
  optionsWrap.innerHTML = "";
  q.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option-btn";
    btn.textContent = optText;
    btn.addEventListener("click", () => handleQuizOptionClick(btn, idx === q.correctIndex));
    optionsWrap.appendChild(btn);
  });
}

function handleQuizOptionClick(btn, isCorrect) {
  if (state.quizAnsweredCurrent) return;

  if (isCorrect) {
    state.quizAnsweredCurrent = true;
    btn.classList.add("is-correct");
    audioManager.playChime("success");
    setQuizAstronautText(t("quizCorrectMsg"));

    setTimeout(() => {
      if (state.currentScreen !== "quiz") return;
      if (state.quizIndex < currentStory().quiz.questions.length - 1) {
        state.quizIndex += 1;
        setQuizAstronautText(t("quizNextPrompt"));
        renderQuizQuestion();
      } else {
        state.quizPassed = true;
        updateMapProgressUI();
        audioManager.playChime("unlock");
        document.getElementById("quiz-question-card").hidden = true;
        document.getElementById("quiz-victory-card").hidden = false;
        setQuizAstronautText(t("quizVictoryPrompt"));
      }
    }, 900);
  } else {
    btn.classList.add("is-wrong");
    audioManager.playChime("tap");
    setQuizAstronautText(t("quizWrongMsg"));
  }
}

async function handleCertificateSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("cert-name-input");
  const emailInput = document.getElementById("cert-email-input");
  const statusEl = document.getElementById("cert-form-status");
  const submitBtn = document.getElementById("btn-submit-cert");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  statusEl.classList.remove("is-error");

  if (name.length < 2) {
    statusEl.classList.add("is-error");
    statusEl.textContent =
      state.lang === "ar" ? "اكتب اسمك الأول يا بطل!" : "Please enter your name first!";
    nameInput.focus();
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.classList.add("is-error");
    statusEl.textContent =
      state.lang === "ar"
        ? "من فضلك اكتب بريد إلكتروني صحيح."
        : "Please enter a valid email address.";
    emailInput.focus();
    return;
  }

  state.lastCertName = name;
  submitBtn.disabled = true;
  statusEl.textContent = t("certSending");

  try {
    const res = await fetch("/api/certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        lang: state.lang,
      }),
    });
    const payload = await res.json();

    if (res.ok && payload.ok) {
      audioManager.playChime("unlock");
      statusEl.textContent = payload.emailSent ? t("certSentOk") : t("certReadyLocal");
      setQuizAstronautText(payload.emailSent ? t("certSentOk") : t("certReadyLocal"));
    } else {
      statusEl.classList.add("is-error");
      statusEl.textContent = payload.error || t("certReadyLocal");
    }
  } catch {
    statusEl.textContent = t("certReadyLocal");
    setQuizAstronautText(t("certReadyLocal"));
  } finally {
    submitBtn.disabled = false;
  }
}

// =========================================================
// SCREEN ROUTING & HASH NAVIGATION
// =========================================================
const VALID_SCREENS = new Set(["home", "earth", "moon", "mars", "quiz", "bonus"]);

function showScreen(screenId, options = {}) {
  const target = VALID_SCREENS.has(screenId) ? screenId : "home";
  const { scrollToMap = false, fromHash = false } = options;

  closeFactCard();
  audioManager.stopAll();
  state.currentScreen = target;

  document.querySelectorAll(".screen").forEach((sec) => {
    const isMatch = sec.id === `screen-${target}`;
    sec.hidden = !isMatch;
    sec.classList.toggle("is-active", isMatch);
  });

  if (!fromHash) {
    const expectedHash = `#${target}`;
    if (window.location.hash !== expectedHash) {
      window.location.hash = expectedHash;
    }
  }

  if (target === "earth" || target === "moon" || target === "mars" || target === "bonus") {
    state.visited[target] = true;
    updateMapProgressUI();
  }

  if (target === "home") {
    if (scrollToMap) {
      const mapEl = document.getElementById("journey-map");
      if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    audioManager.playSequence("map", currentStory().map.lines, 0);
  } else if (target === "quiz") {
    state.quizUnlocked = true;
    updateMapProgressUI();
    startQuiz();
  } else {
    const data = currentStory()[target];
    if (data && data.lines) {
      audioManager.playSequence(target, data.lines, 0);
    }
    centerSceneViewportOnMobile(target);
  }
}

// =========================================================
// RESPONSIVE 1440:900 COVER SCALING
// =========================================================
function updateSceneScale() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.max(vw / 1440, vh / 900);
  document.documentElement.style.setProperty("--scene-scale", String(scale));
}

function centerSceneViewportOnMobile(screenId) {
  if (window.innerWidth > 680) return;
  const screenEl = document.getElementById(`screen-${screenId}`);
  const vp = screenEl ? screenEl.querySelector(".scene-viewport") : null;
  if (!vp) return;
  requestAnimationFrame(() => {
    const maxScroll = vp.scrollWidth - vp.clientWidth;
    if (maxScroll > 0) {
      vp.scrollLeft = maxScroll / 2;
    }
  });
}

// =========================================================
// INITIALIZATION
// =========================================================
function init() {
  mountRealSpacePhotos();
  initRealisticSpinningEarth();
  mountAstronautFigures();
  applyLanguage("ar");
  updateSceneScale();

  window.addEventListener("resize", updateSceneScale);

  // Language Toggle Buttons
  document.querySelectorAll(".js-lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      applyLanguage(state.lang === "ar" ? "en" : "ar");
    });
  });

  // Intro triggers
  document.getElementById("btn-intro-earth")?.addEventListener("click", () => {
    audioManager.playChime("tap");
    showScreen("earth");
  });

  document.getElementById("btn-start-journey")?.addEventListener("click", () => {
    audioManager.playChime("tap");
    showScreen("earth");
  });

  document.getElementById("btn-scroll-map")?.addEventListener("click", () => {
    const mapEl = document.getElementById("journey-map");
    if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
    audioManager.playSequence("map", currentStory().map.lines, 0);
  });

  document.getElementById("btn-map-fly")?.addEventListener("click", () => {
    audioManager.playChime("tap");
    showScreen("earth");
  });

  // Map Stop Clicks
  document.querySelectorAll(".map-stop").forEach((btn) => {
    btn.addEventListener("click", () => {
      const stop = btn.dataset.stop;
      if (stop === "quiz" && !state.quizUnlocked) {
        audioManager.playChime("tap");
        audioManager.playSingleHint("map", currentStory().map.lockedQuiz);
        return;
      }
      if (stop === "bonus" && !state.quizPassed) {
        audioManager.playChime("tap");
        audioManager.playSingleHint("map", currentStory().map.lockedBonus);
        return;
      }
      audioManager.playChime("tap");
      showScreen(stop);
    });
  });

  // Sound Toggles
  document.querySelectorAll(".js-sound-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.setMuted(!state.isMuted);
    });
  });

  // Back to Map buttons
  document.querySelectorAll(".js-go-map").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      showScreen("home", { scrollToMap: true });
    });
  });

  // Next Stop buttons
  document.querySelectorAll(".js-next-stop").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      showScreen(btn.dataset.next);
    });
  });

  // Replay Story buttons
  document.querySelectorAll(".js-replay-story").forEach((btn) => {
    btn.addEventListener("click", () => {
      const screenId = btn.dataset.screen;
      const lines =
        screenId === "map" ? currentStory().map.lines : currentStory()[screenId]?.lines;
      if (lines) {
        audioManager.playChime("tap");
        audioManager.playSequence(screenId, lines, 0);
      }
    });
  });

  // Hotspots
  document.querySelectorAll(".hotspot").forEach((btn) => {
    btn.addEventListener("click", () => {
      openFactCard(btn.dataset.screen, btn.dataset.card);
    });
  });

  // Fact Card Controls
  document.getElementById("btn-close-fact")?.addEventListener("click", closeFactCard);
  document.getElementById("btn-fact-audio")?.addEventListener("click", () => {
    if (state.activeCardScreen && state.activeCardKey) {
      const card = currentStory()[state.activeCardScreen]?.cards?.[state.activeCardKey];
      if (card) audioManager.playCardAudio(card);
    }
  });

  // Certificate Form & Bonus Buttons
  document.getElementById("certificate-form")?.addEventListener("submit", handleCertificateSubmit);
  document.getElementById("btn-open-bonus")?.addEventListener("click", () => {
    audioManager.playChime("unlock");
    showScreen("bonus");
  });

  // Hash Routing
  const handleHashRoute = () => {
    const raw = window.location.hash.replace("#", "").trim().toLowerCase();
    const target = VALID_SCREENS.has(raw) ? raw : "home";
    if (target === "bonus" && !state.quizPassed) {
      showScreen("home", { scrollToMap: true });
      return;
    }
    showScreen(target, { fromHash: true });
  };

  window.addEventListener("hashchange", handleHashRoute);

  const initialHash = window.location.hash.replace("#", "").trim().toLowerCase();
  if (initialHash && VALID_SCREENS.has(initialHash)) {
    handleHashRoute();
  } else {
    renderGuideDialogue("map", currentStory().map.lines, 0);
    const mapSection = document.getElementById("journey-map");
    if ("IntersectionObserver" in window && mapSection) {
      let triggered = false;
      const obs = new IntersectionObserver(
        (entries) => {
          if (!triggered && entries[0]?.isIntersecting && state.currentScreen === "home") {
            triggered = true;
            audioManager.playSequence("map", currentStory().map.lines, 0);
            obs.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(mapSection);
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
