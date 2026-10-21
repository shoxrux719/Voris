export const films = [
  { id: 'img_1167', duration: '0:45', title: { uz: 'Kadrda — inson', ru: 'Человек в кадре', en: 'A person in frame' }, category: { uz: 'Suhbat formati', ru: 'Разговорный формат', en: 'Talking to camera' } },
  { id: 'img_3846', duration: '0:34', title: { uz: 'Tozalik haqida', ru: 'О чистоте', en: 'A clean story' }, category: { uz: 'Xizmat taqdimoti', ru: 'Презентация услуги', en: 'Service feature' } },
  { id: 'img_4037', duration: '0:47', title: { uz: 'Snow Village', ru: 'Snow Village', en: 'Snow Village' }, category: { uz: 'Mahsulot kadrlari', ru: 'Продукт в кадре', en: 'Product in focus' } },
  { id: 'img_4187', duration: '0:35', title: { uz: 'Shahar ritmida', ru: 'В ритме города', en: 'City rhythm' }, category: { uz: 'Lokatsiyada suratga olish', ru: 'Съёмка на локации', en: 'On location' } },
  { id: 'img_4809', duration: '0:31', title: { uz: 'Yaqindan ko‘ring', ru: 'Взгляд ближе', en: 'A closer look' }, category: { uz: 'Uskunalar taqdimoti', ru: 'Обзор оборудования', en: 'Equipment showcase' } },
] as const;

export type Film = typeof films[number];
export type FilmLanguage = keyof Film['title'];
