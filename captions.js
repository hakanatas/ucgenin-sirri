/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.4, end: 7.6, tr: 'Bir üçgen çizelim', en: 'Let’s draw a triangle',
      note: 'Nokta bir üçgen çiziyor. Üçgenin üç kenarı, üç köşesi ve üç iç açısı var.' },
    { scene: 2, start: 8.6, end: 12.6, tr: 'İç açıları ölçelim: 50°, 70°, 60°', en: 'Measure the inside angles: 50°, 70°, 60°',
      note: 'Açıölçerle üç iç açıyı ölçelim: 50, 70 ve 60 derece.' },
    { scene: 2, start: 13.0, end: 16.4, tr: 'Toplayalım: 180°', en: 'Add them up: 180°',
      note: '50 artı 70 artı 60, toplam 180 derece ediyor.' },
    { scene: 2, start: 17.2, end: 22.6, tr: 'Köşeleri yan yana koy: doğru açı!', en: 'Put the corners side by side: a straight angle!',
      note: 'Üçgenin köşelerini keser gibi alıp bir doğrunun üzerine yan yana koyalım. Tam bir doğru açı oluşturdular: 180 derece.' },
    { scene: 2, start: 23.2, end: 29.4, tr: 'Üçgenin iç açıları toplamı 180°', en: 'A triangle’s inside angles add up to 180°',
      note: 'Buradan şu çıkarımı yapıyoruz: bir üçgenin iç açılarının ölçüleri toplamı 180 derecedir.' },
    { scene: 3, start: 30.6, end: 35.8, tr: 'Üçgenin şekli değişsin…', en: 'Let the triangle change shape…',
      note: 'Şimdi üçgenin şeklini değiştirelim. Açıların ölçüleri değişiyor.' },
    { scene: 3, start: 36.2, end: 43.4, tr: '…toplam hep 180°', en: '…the sum is always 180°',
      note: 'Ama üçgen nasıl değişirse değişsin, iç açıların toplamı hep 180 derece kalıyor. Farklı örneklerle çıkarımımızı doğruladık.' },
    { scene: 4, start: 44.8, end: 48.8, tr: 'Üç açısı da 90°’den küçük: dar açılı', en: 'All three angles under 90°: acute',
      note: 'Üç açısı da dar açı olan üçgene dar açılı üçgen denir.' },
    { scene: 4, start: 49.2, end: 53.2, tr: 'Bir açısı 90°: dik açılı', en: 'One angle is 90°: right',
      note: 'Bir açısı dik açı olan üçgene dik açılı üçgen denir.' },
    { scene: 4, start: 53.6, end: 57.6, tr: 'Bir açısı 90°’den büyük: geniş açılı', en: 'One angle over 90°: obtuse',
      note: 'Bir açısı geniş açı olan üçgene geniş açılı üçgen denir.' },
    { scene: 5, start: 58.8, end: 62.4, tr: 'Kenarları farklı: çeşitkenar', en: 'All sides different: scalene',
      note: 'Kenar çizgileri eşit uzunlukları gösterir. Bu üçgenin üç kenarı da farklı uzunlukta: çeşitkenar üçgen.' },
    { scene: 5, start: 62.8, end: 66.4, tr: 'İki kenarı eşit: ikizkenar', en: 'Two sides equal: isosceles',
      note: 'İki kenarı eşit uzunlukta olan üçgene ikizkenar üçgen denir.' },
    { scene: 5, start: 66.8, end: 70.4, tr: 'Üç kenarı eşit: eşkenar', en: 'All three sides equal: equilateral',
      note: 'Üç kenarı da eşit uzunlukta olan üçgene eşkenar üçgen denir.' },
    { scene: 5, start: 70.8, end: 75.6, tr: 'Eşit kenarlar, eşit açılar gösterir', en: 'Equal sides face equal angles',
      note: 'İkizkenar üçgende eşit kenarları gören açılar eşittir: 70 ve 70 derece. Eşkenar üçgende üç açı da 60 derecedir.' },
    { scene: 6, start: 76.4, end: 83.6, tr: 'Kenarları da açıları da eşit: düzgün çokgen', en: 'Equal sides and equal angles: regular polygons',
      note: 'Bütün kenarları eşit uzunlukta ve bütün iç açıları eşit ölçüde olan çokgenlere düzgün çokgen denir.' },
    { scene: 7, start: 84.6, end: 90.6, tr: 'Unutma: üçgenin iç açıları toplamı 180°', en: 'Remember: a triangle’s angles add up to 180°',
      note: 'Unutma: her üçgenin iç açılarının ölçüleri toplamı 180 derecedir.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
