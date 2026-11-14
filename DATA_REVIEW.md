# Data Review & Fact-Checking Report

This document records all data transformations, fact checks, new Arabic strings, and items for verification in **Gravity Breakers (أطول رحلة في الدنيا)**.

---

## 1. Story-Only Cards (No Machine Data Backing in Repo)

As per owner decision, the following cards are kept as **story-only cards** without full hardware spec entries:

| Card Key | Mission Name (AR/EN) | Location | Description |
|---|---|---|---|
| `pathfinder` | باثفايندر / Mars Pathfinder | Mars | Landing wrapped in giant airbags, bounced ~15 times. |
| `sojourner` | سوجورنر / Sojourner | Mars | Tiny robot (10.5 kg, 30 cm) school-ruler sized rover. |
| `eros` | نير شوميكر على إيروس / NEAR Shoemaker on Eros | Deep Space | First spacecraft to land on a floating asteroid (433 Eros). |

> **Note:** These cards display kid-friendly text, audio, and heroes without empty detail/chips boxes.

---

## 2. Fact-Check Verifications (NASA Official Sources)

1. **Perseverance vs Opportunity Distance Record**:
   - **Opportunity Record**: 45.16 km (28.06 miles), held until October 2026.
   - **Verification**: NASA Jet Propulsion Laboratory (JPL) Mars Exploration Rovers archive and Mars 2020 mission tracker.
2. **Viking 1 End-of-Mission Date**:
   - **Date**: November 11, 1982.
   - **Verification**: Terminated after an erroneous uplink command sent from Earth overwrote antenna pointing controllers. Confirmed by NASA NSSDCA ID: `1975-075C`.
3. **Apollo 11 EASEP Operating Dates**:
   - **Dates**: July 20, 1969 to August 27, 1969 (two lunar days).
   - **Verification**: Powered by solar cells; passive seismometer operated until heat and radiation exceeded tolerances. LRRR reflector is passive and operational to this day.
4. **Apollo 12 & 15 ALSEP Operating Dates**:
   - **Dates**: Deployed November 19, 1969 & July 31, 1971; officially shut down by NASA on September 30, 1977 due to budget constraints.
   - **Verification**: Powered by SNAP-27 plutonium-238 RTG (~70W continuous).
5. **Kepler Retirement Date**:
   - **Date**: October 30, 2018.
   - **Verification**: NASA retired Kepler following fuel exhaustion after 9.6 years in orbit, completing 19 K2 campaigns and discovering 2,662 confirmed exoplanets.

---

## 3. Previously English-Only Strings Translated to Egyptian Arabic

The following previously untranslated blocks have been translated and added with `{ ar, en }` bilingual pairs:

### Viking 1 Mission Phases
- `Primary Mission (ended November 1976)` → `المهمة الأساسية (انتهت في نوفمبر 1976)`
- `Extended Mission (November 1976 – May 1978)` → `المهمة الممتدة (نوفمبر 1976 - مايو 1978)`
- `Continuation Mission (May 1978 – July 1979)` → `مهمة المتابعة (مايو 1978 - يوليو 1979)`
- `Orbiter Survey Mission (July 1979 – July 1980)` → `مهمة مسح المركبة المدارية (يوليو 1979 - يوليو 1980)`
- `Viking Monitor Mission (daily/weekly weather reports)` → `مهمة رصد فايكنغ (تقارير طقس يومية وأسبوعية)`

### Rover Scientific Contributions
- `Contributed uniquely to the four overarching goals of the Mars Exploration Program` → `المساهمة الفريدة في الأهداف الرئيسية الأربعة لبرنامج استكشاف المريخ التابع لناسا`
- `Confirmed ancient long-standing surface water on Mars via geological and mineralogical analysis` → `تأكيد وجود مياه سطحية قديمة لفترات طويلة على المريخ عبر التحليل الجيولوجي والمعدني للصخور`

### Dawn Key Highlights
- `Fluid flow in Ceres due to core heating` → `تدفق الموائع داخل سيريس بفعل حرارة النواة`
- `Evidence that Ceres may have had long-standing energy to fuel habitability` → `أدلة على أن سيريس ربما امتلك طاقة مستدامة طويلة الأمد لدعم القابلية للحياة`
- `Hidden secrets about the interiors of Vesta and comparisons with the Moon` → `أسرار باطن الكويكب فيستا ومقارنته بتركيب القمر`
- `Observations of crescent Ceres and gullies on giant asteroid Vesta` → `رصد هلال سيريس والأخاديد على الكويكب العملاق فيستا`

### Kepler Specifications & Discoveries
- `Transit photometry` → `قياس الضوء أثناء العبور (رصد الانخفاض الدقيق في سطوع النجم عند مرور كوكب أمامه)`
- `20% to 50% of visible stars...` → `من 20% إلى 50% من النجوم المرئية في سماء الليل من المحتمل أن تدور حولها كواكب صخرية بحجم الأرض داخل منطقتها القابلة للحياة`

---

## 4. UI Strings & Feedback
- `moreDetails` → `تفاصيل أكتر` / `More details`
- `hideDetails` → `إخفاء التفاصيل` / `Hide details`
- `quizScore` → `نتيجتك: {score} من {total}` / `Your score: {score} of {total}`
- `quizPassedMsg` → `ممتاز! عديت الاختبار بنجاح!` / `Awesome! You passed the quiz!`
- `quizRetryMsg` → `تقدر تراجع الكروت وتجرب تاني!` / `Review the cards and try again!`
