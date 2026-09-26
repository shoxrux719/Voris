import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  Camera,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { formatUzPhone } from './lib/phone';
import './App.css';

type Lang = 'uz' | 'ru' | 'en';
type Theme = 'dark' | 'light';

const names = {
  uz: ['Madaminbek', 'Ikramov'],
  ru: ['Мадаминбек', 'Икрамов'],
  en: ['Madaminbek', 'Ikramov'],
} as const;

const smmProjects = ['Target Max', '30+ proekt', '4 yil tajriba', 'Namangan viloyati'];
const targetProjects = ['Behruz Saidov', 'Niyat Education', 'Hayot Sharopov'];
const smmLogos = [
  '/assets/client/target-max.svg',
  '/assets/client/projects.svg',
  '/assets/client/experience.svg',
  '/assets/client/namangan.svg',
];
const targetLogos = [
  '/assets/client/behruz.svg',
  '/assets/client/niyat.svg',
  '/assets/client/hayot.svg',
];

const resultShots = [
  '/assets/Result/photo_2026-09-26_16-13-21.jpg',
  '/assets/Result/photo_2026-09-26_16-13-22.jpg',
  '/assets/Result/photo_2026-09-26_16-13-24.jpg',
  '/assets/Result/photo_2026-09-26_16-13-26.jpg',
  '/assets/Result/photo_2026-09-26_16-13-40.jpg',
  '/assets/Result/photo_2026-09-26_16-13-43.jpg',
  '/assets/Result/photo_2026-09-26_16-13-44.jpg',
  '/assets/Result/photo_2026-09-26_16-13-48.jpg',
  '/assets/Result/photo_2026-09-26_16-13-49.jpg',
  '/assets/Result/photo_2026-09-26_16-13-50.jpg',
  '/assets/Result/photo_2026-09-26_16-13-57.jpg',
  '/assets/Result/photo_2026-09-26_16-13-58.jpg',
  '/assets/Result/photo_2026-09-26_16-14-00.jpg',
  '/assets/Result/photo_2026-09-26_16-14-02.jpg',
  '/assets/Result/photo_2026-09-26_18-11-13.jpg',
  '/assets/Result/photo_2026-09-26_18-11-15.jpg',
  '/assets/Result/photo_2026-09-26_18-11-16.jpg',
  '/assets/Result/photo_2026-09-26_18-11-17%20(2).jpg',
  '/assets/Result/photo_2026-09-26_18-11-17.jpg',
  '/assets/Result/photo_2026-09-26_18-11-18.jpg',
];

const liveProjects = [
  { name: 'Shinachi Salim', image: '/LiveProjects/photo_2026-09-26_18-12-07.jpg' },
  { name: 'Yashin Optom', image: '/LiveProjects/photo_2026-09-26_18-12-08.jpg' },
  { name: 'Killer Plus', image: '/LiveProjects/photo_2026-09-26_18-12-09.jpg' },
  { name: 'Edu Tech', image: '/LiveProjects/photo_2026-09-26_18-12-10.jpg' },
  { name: 'Panda TV', image: '/LiveProjects/photo_2026-09-26_18-12-11.jpg' },
  { name: 'Humo Care', image: '/LiveProjects/photo_2026-09-26_18-12-12.jpg' },
  { name: 'IZI Collection', image: '/LiveProjects/photo_2026-09-26_18-12-13.jpg' },
];
const liveProjectImages = liveProjects.map((project) => project.image);

const certificateImagesByLang = {
  uz: ['/assets/Sertificates/photo_2026-09-26_16-31-02.jpg', '/assets/Sertificates/baf57bea-29bc-464c-a433-93e011442093.png'],
  ru: ['/assets/Sertificates/photo_2026-09-26_16-31-02.jpg', '/assets/Sertificates/baf57bea-29bc-464c-a433-93e011442093.png'],
  en: ['/assets/Sertificates/photo_2026-09-26_16-31-02.jpg', '/assets/Sertificates/baf57bea-29bc-464c-a433-93e011442093.png'],
};
const certificateTitles = ['Traffic Master', 'Target Pro'];

const content = {
  "uz": {
    "portfolio": "Portfolio",
    "roleTag": "Target Max | Namangan",
    "roleTitle": "Madaminbek Ikramov",
    "roleDescription": "Target reklama yo‘nalishida ishlayman. Namangan viloyatidanman. 4 yillik tajribam va 30 dan ortiq loyiham bor.",
    "stats": [
      "Yillik tajriba",
      "Loyihalar",
      "O‘quv yo‘nalishlari"
    ],
    "contactsTitle": "Kontaktlar",
    "skillsTitle": "Qisqacha ma’lumot",
    "skills": [
      "Target reklama",
      "Namangan viloyati",
      "4 yil tajriba",
      "30+ proekt"
    ],
    "resumeTitle": "Tajriba va ta’lim",
    "experienceTitle": "Tajriba",
    "coursesTitle": "Kurslar",
    "experience": [
      "Tajriba: 4 yil",
      "30+ proekt",
      "Namangan viloyati"
    ],
    "courses": [
      "Behruz Saidov",
      "Niyat Education",
      "Hayot Sharopov kursi"
    ],
    "smmTitle": "Faoliyat haqida",
    "targetTitle": "Ta’lim va ustozlar",
    "resultsTitle": "Natijalar",
    "resultsSubtitle": "Reklama kampaniyalari natijalaridan skrinshotlar.",
    "liveProjectsTitle": "Hozirgi loyihalar",
    "liveProjectsSubtitle": "Hozir faoliyat olib borayotgan loyihalar.",
    "previousProject": "Oldingi loyiha",
    "nextProject": "Keyingi loyiha",
    "certTitle": "Sertifikatlar",
    "storyTitle": "Men haqimda",
    "storyDescription": "Target reklama yo‘nalishida 4 yillik tajribaga egaman. 30 dan ortiq loyiha ustida ishlaganman. Behruz Saidov, Niyat Education va Hayot Sharopov kurslarida tahsil olganman.",
    "storyFeatures": [
      "4 yil tajriba",
      "30+ proekt",
      "Namangan viloyati"
    ],
    "connectTitle": "Bog‘lanish",
    "contactLead": "Loyihangizni muhokama qilish uchun bog‘laning.",
    "formTitle": "Ariza qoldiring",
    "firstName": "Ism",
    "lastName": "Familiya",
    "phoneLabel": "Telefon raqami",
    "formSubmit": "Ariza yuborish",
    "formSending": "Yuborilmoqda...",
    "formSuccess": "Arizangiz yuborildi. Tez orada bog‘lanamiz.",
    "formError": "Ariza yuborilmadi. Iltimos, qayta urinib ko‘ring.",
    "formUnavailable": "Ariza xizmati hozircha sozlanmagan. Telegram orqali bog‘laning.",
    "dockCases": "Faoliyat",
    "dockResults": "Natijalar",
    "dockContact": "Aloqa",
    "contactCity": "Namangan viloyati",
    "light": "Yorug‘",
    "dark": "Qorong‘i",
    "smmResults": [
      "Target reklama yo‘nalishidagi faoliyatim.",
      "30 dan ortiq loyiha tajribasi.",
      "4 yillik amaliy tajriba.",
      "Namangan viloyatidanman."
    ],
    "targetResults": [
      "Behruz Saidov kursi.",
      "Niyat Education kursi.",
      "Hayot Sharopov kursi."
    ]
  },
  "ru": {
    "portfolio": "Портфолио",
    "roleTag": "Target Max | Наманган",
    "roleTitle": "Мадаминбек Икрамов",
    "roleDescription": "Работаю с таргетированной рекламой. Я из Наманганской области. У меня 4 года опыта и более 30 проектов.",
    "stats": [
      "Года опыта",
      "Проектов",
      "Направления обучения"
    ],
    "contactsTitle": "Контакты",
    "skillsTitle": "Кратко обо мне",
    "skills": [
      "Таргетированная реклама",
      "Наманганская область",
      "4 года опыта",
      "30+ проектов"
    ],
    "resumeTitle": "Опыт и обучение",
    "experienceTitle": "Опыт",
    "coursesTitle": "Курсы",
    "experience": [
      "Опыт: 4 года",
      "30+ проектов",
      "Наманганская область"
    ],
    "courses": [
      "Behruz Saidov",
      "Niyat Education",
      "Курс Hayot Sharopov"
    ],
    "smmTitle": "О моей работе",
    "targetTitle": "Обучение и наставники",
    "resultsTitle": "Результаты",
    "resultsSubtitle": "Скриншоты результатов рекламных кампаний.",
    "liveProjectsTitle": "Текущие проекты",
    "liveProjectsSubtitle": "Проекты, над которыми сейчас идёт работа.",
    "previousProject": "Предыдущий проект",
    "nextProject": "Следующий проект",
    "certTitle": "Сертификаты",
    "storyTitle": "Обо мне",
    "storyDescription": "У меня 4 года опыта в таргетированной рекламе и более 30 проектов. Я проходил обучение у Behruz Saidov, в Niyat Education и на курсе Hayot Sharopov.",
    "storyFeatures": [
      "4 года опыта",
      "30+ проектов",
      "Наманганская область"
    ],
    "connectTitle": "Связаться",
    "contactLead": "Свяжитесь со мной, чтобы обсудить ваш проект.",
    "formTitle": "Оставить заявку",
    "firstName": "Имя",
    "lastName": "Фамилия",
    "phoneLabel": "Номер телефона",
    "formSubmit": "Отправить заявку",
    "formSending": "Отправляем...",
    "formSuccess": "Заявка отправлена. Мы скоро свяжемся с вами.",
    "formError": "Не удалось отправить заявку. Попробуйте ещё раз.",
    "formUnavailable": "Форма пока не настроена. Свяжитесь через Telegram.",
    "dockCases": "Работа",
    "dockResults": "Результаты",
    "dockContact": "Связь",
    "contactCity": "Наманганская область",
    "light": "Светлая",
    "dark": "Тёмная",
    "smmResults": [
      "Работаю с таргетированной рекламой.",
      "Опыт в более чем 30 проектах.",
      "4 года практического опыта.",
      "Я из Наманганской области."
    ],
    "targetResults": [
      "Курс Behruz Saidov.",
      "Обучение в Niyat Education.",
      "Курс Hayot Sharopov."
    ]
  },
  "en": {
    "portfolio": "Portfolio",
    "roleTag": "Target Max | Namangan",
    "roleTitle": "Madaminbek Ikramov",
    "roleDescription": "I work with targeted advertising. I am based in the Namangan region, with 4 years of experience and more than 30 projects.",
    "stats": [
      "Years of experience",
      "Projects",
      "Courses"
    ],
    "contactsTitle": "Contacts",
    "skillsTitle": "At a glance",
    "skills": [
      "Targeted advertising",
      "Namangan region",
      "4 years of experience",
      "30+ projects"
    ],
    "resumeTitle": "Experience & education",
    "experienceTitle": "Experience",
    "coursesTitle": "Courses",
    "experience": [
      "Experience: 4 years",
      "30+ projects",
      "Namangan region"
    ],
    "courses": [
      "Behruz Saidov",
      "Niyat Education",
      "Hayot Sharopov course"
    ],
    "smmTitle": "About my work",
    "targetTitle": "Education & mentors",
    "resultsTitle": "Results",
    "resultsSubtitle": "Screenshots of advertising campaign results.",
    "liveProjectsTitle": "Current projects",
    "liveProjectsSubtitle": "Projects currently in progress.",
    "previousProject": "Previous project",
    "nextProject": "Next project",
    "certTitle": "Certificates",
    "storyTitle": "About me",
    "storyDescription": "I have 4 years of experience in targeted advertising and have worked on more than 30 projects. I studied with Behruz Saidov, at Niyat Education, and on Hayot Sharopov's course.",
    "storyFeatures": [
      "4 years of experience",
      "30+ projects",
      "Namangan region"
    ],
    "connectTitle": "Get in touch",
    "contactLead": "Get in touch to discuss your project.",
    "formTitle": "Leave a request",
    "firstName": "First name",
    "lastName": "Last name",
    "phoneLabel": "Phone number",
    "formSubmit": "Send request",
    "formSending": "Sending...",
    "formSuccess": "Your request was sent. We'll be in touch soon.",
    "formError": "The request could not be sent. Please try again.",
    "formUnavailable": "The request form is not configured yet. Please use Telegram.",
    "dockCases": "Work",
    "dockResults": "Results",
    "dockContact": "Contact",
    "contactCity": "Namangan region",
    "light": "Light",
    "dark": "Dark",
    "smmResults": [
      "My work focuses on targeted advertising.",
      "Experience across more than 30 projects.",
      "4 years of practical experience.",
      "Based in the Namangan region."
    ],
    "targetResults": [
      "Behruz Saidov course.",
      "Studied at Niyat Education.",
      "Hayot Sharopov course."
    ]
  }
} as const;

function AnimatedNumber({ value, suffix, delay = 0 }: { value: number; suffix: string; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let startTime = 0;
    const duration = 1250;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) animationFrame = requestAnimationFrame(run);
    };

    const timer = window.setTimeout(() => {
      if (reduceMotion) {
        animationFrame = requestAnimationFrame(() => setDisplayValue(value));
      } else {
        animationFrame = requestAnimationFrame(run);
      }
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, [delay, value]);

  return (
    <p aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{displayValue}</span>{suffix}
    </p>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const [lang, setLang] = useState<Lang>('uz');
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('madaminbek-theme') === 'light' ? 'light' : 'dark',
  );
  const [lightboxItems, setLightboxItems] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const liveProjectsRef = useRef<HTMLDivElement>(null);
  const [projectsPaused, setProjectsPaused] = useState(false);
  const [phoneValue, setPhoneValue] = useState('+998 ');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'unavailable'>('idle');
  const [introActive, setIntroActive] = useState(false);
  const c = content[lang];
  const [firstName, lastName] = names[lang];
  const fullName = `${firstName} ${lastName}`;
  const certificateImages = certificateImagesByLang[lang];

  useEffect(() => {
    if (!introActive) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const finishIntro = () => setIntroActive(false);
    const timer = window.setTimeout(finishIntro, 4050);
    const handleIntroKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') finishIntro();
    };

    window.addEventListener('keydown', handleIntroKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleIntroKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [introActive]);

  useEffect(() => {
    localStorage.setItem('madaminbek-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${fullName} — Target Max`;
  }, [lang, fullName]);

  const logoStrip = useMemo(() => [...smmLogos, ...targetLogos], []);
  const duplicatedLogos = useMemo(
    () => [...logoStrip, ...logoStrip, ...logoStrip, ...logoStrip],
    [logoStrip],
  );

  const smmCases = smmProjects.map((project, index) => ({
    project,
    logo: smmLogos[index],
    result: c.smmResults[index],
  }));

  const targetCases = targetProjects.map((project, index) => ({
    project,
    logo: targetLogos[index],
    result: c.targetResults[index],
  }));

  const openLightbox = (items: string[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxItems([]);
    setLightboxIndex(0);
  };

  const showPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length);
  };

  const showNext = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxItems.length);
  };

  const scrollProjects = useCallback((direction: -1 | 1) => {
    const track = liveProjectsRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const step = track.querySelector<HTMLElement>('.live-project-card')?.offsetWidth ?? track.clientWidth;
    if (direction === 1 && track.scrollLeft >= maxScroll - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && track.scrollLeft <= 8) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: direction * (step + 16), behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (reduceMotion || projectsPaused || lightboxItems.length > 0) return;
    const timer = window.setInterval(() => scrollProjects(1), 3200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, projectsPaused, lightboxItems.length, scrollProjects]);

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (leadStatus === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setLeadStatus('sending');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.get('firstName') ?? ''),
          lastName: String(data.get('lastName') ?? ''),
          phone: String(data.get('phone') ?? ''),
          website: String(data.get('website') ?? ''),
        }),
      });
      if (response.ok) {
        form.reset();
        setPhoneValue('+998 ');
        setLeadStatus('success');
      } else {
        setLeadStatus(response.status === 503 ? 'unavailable' : 'error');
      }
    } catch {
      setLeadStatus('error');
    }
  };

  useEffect(() => {
    if (lightboxItems.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxItems([]);
        setLightboxIndex(0);
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length);
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % lightboxItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItems.length]);

  const revealMotion = {
    initial: reduceMotion ? false : { opacity: 0.32, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.04 },
    transition: { duration: reduceMotion ? 0 : 0.72, ease: 'easeOut' as const },
  };

  return (
    <div
      className={`portfolio-page street-mode lang-${lang} ${theme === 'light' ? 'light-mode' : ''} ${introActive ? 'is-entering' : 'is-ready'}`}
    >
      {introActive && (
        <section className="page-intro" aria-label={`${fullName} portfolio introduction`}>
          <div className="page-intro__backdrop" />
          <div className="page-intro__grid" aria-hidden="true" />

          <div className="page-intro__meta page-intro__meta--top">
            <span>MI / PORTFOLIO</span>
            <span>NAMANGAN · 2026</span>
          </div>

          <div className="page-intro__monogram" aria-hidden="true">MI</div>

          <div className="page-intro__content">
            <p className="page-intro__eyebrow">Target Max · Namangan</p>
            <p className="page-intro__name" aria-label={fullName}>
              <span>{firstName}</span>
              <span>{lastName}</span>
            </p>
            <div className="page-intro__line" aria-hidden="true" />
            <p className="page-intro__role">TARGET MAX / NAMANGAN</p>
          </div>

          <div className="page-intro__ticker" aria-hidden="true">
            <div>
              <span>TAJRIBA · 30+ PROEKT · TARGET MAX · NAMANGAN · </span>
              <span>TAJRIBA · 30+ PROEKT · TARGET MAX · NAMANGAN · </span>
            </div>
          </div>

          <div className="page-intro__meta page-intro__meta--bottom">
            <span>PORTFOLIO / 01</span>
            <span>LOADING EXPERIENCE</span>
          </div>

          <div className="page-intro__progress" aria-hidden="true">
            <span />
          </div>

          <button
            type="button"
            className="page-intro__skip"
            onClick={() => setIntroActive(false)}
            aria-label="Skip introduction"
          >
            Skip <span aria-hidden="true">↗</span>
          </button>

          <div className="page-intro__wipe" aria-hidden="true" />
        </section>
      )}
      <div className="portfolio-noise" />
      <header className="site-header mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <a href="#top" className="site-wordmark">MI<span>•</span></a>
        <nav>
          <a href="#cases">{c.smmTitle}</a>
          <a href="#results">{c.resultsTitle}</a>
          <a href="#contact">{c.connectTitle}</a>
        </nav>
        <a href="https://t.me/Madaminbek_Ikramov" target="_blank" rel="noreferrer">Namangan / 2026 ↗</a>
      </header>
      <main id="top" className="portfolio-layout mx-auto max-w-7xl space-y-5 px-4 pb-8 md:px-6">
        <aside className="portfolio-sidebar portfolio-surface studio-bar slide-up intro-1 rounded-3xl p-5">
          <div className="toolbar-shell settings-card flex items-center justify-between gap-2 rounded-xl p-2">
            <div className="lang-switch">
              {(['uz', 'ru', 'en'] as Lang[]).map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`lang-btn ${lang === language ? 'active' : ''}`}
                  onClick={() => setLang(language)}
                  aria-pressed={lang === language}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="theme-btn"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? c.light : c.dark}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              {theme === 'dark' ? c.light : c.dark}
            </button>
          </div>

          <div className="profile-card flex items-center gap-4">
            <div className="avatar-shell h-24 w-24 shrink-0 rounded-full p-1">
              <div className="avatar-core flex h-full w-full items-center justify-center rounded-full text-xl font-semibold">
                <img
                  src="/assets/client/madaminbek-profile.png"
                  alt={fullName}
                  className="avatar-image"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
            <div>
              <p className="eyebrow-text text-xs uppercase tracking-[0.35em]">{c.portfolio}</p>
              <h1 className="display-copy font-display text-2xl font-semibold leading-tight">
                {firstName} <br />
                {lastName}
              </h1>
            </div>
          </div>

          <div className="portfolio-subcard space-y-4 rounded-2xl p-4">
            <h2 className="subheading text-xs font-medium uppercase tracking-[0.35em]">{c.contactsTitle}</h2>
            <ul className="body-copy space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="muted-icon" />
                <a href="tel:+998936751399">+998 93 675 13 99</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="muted-icon" />
                <a href="mailto:ikramovmadaminbek@gmail.com">ikramovmadaminbek@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Send size={16} className="muted-icon" />
                <a href="https://t.me/Madaminbek_Ikramov" target="_blank" rel="noreferrer">@Madaminbek_Ikramov</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="muted-icon" />
                <span>{c.contactCity}</span>
              </li>
            </ul>
          </div>

          <div className="portfolio-subcard space-y-4 rounded-2xl p-4">
            <h2 className="subheading text-xs font-medium uppercase tracking-[0.35em]">{c.skillsTitle}</h2>
            <ul className="body-copy space-y-2 text-sm">
              {c.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="portfolio-content space-y-5">
          <motion.article {...revealMotion} className="portfolio-panel hero-panel rounded-3xl p-6 md:p-10">
            <div className="hero-kicker">
              <p className="eyebrow-text text-xs uppercase tracking-[0.35em]">{c.roleTag}</p>
              <span className="availability-dot" />
              <span>Namangan · 2026</span>
            </div>
            <h2 className="display-copy font-display hero-title mt-5 text-5xl font-semibold md:text-7xl">{c.roleTitle}</h2>
            <div className="hero-summary mt-7">
              <p className="body-copy max-w-3xl text-base leading-relaxed">{c.roleDescription}</p>
              <a className="hero-contact" href="https://t.me/Madaminbek_Ikramov" target="_blank" rel="noreferrer">
                {c.connectTitle}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="stats-strip mt-8 grid grid-cols-1 sm:grid-cols-3">
              <div className="stat-card">
                <TrendingUp size={18} />
                <AnimatedNumber value={4} suffix="" delay={650} />
                <span>{c.stats[0]}</span>
              </div>
              <div className="stat-card">
                <Users size={18} />
                <AnimatedNumber value={30} suffix="+" delay={760} />
                <span>{c.stats[1]}</span>
              </div>
              <div className="stat-card">
                <BarChart3 size={18} />
                <AnimatedNumber value={3} suffix="" delay={870} />
                <span>{c.stats[2]}</span>
              </div>
            </div>

            <div className="logo-marquee mt-7">
              <div className="logo-marquee-track">
                {duplicatedLogos.map((logo, index) => (
                  <button
                    type="button"
                    key={`${logo}-${index}`}
                    className="logo-pill"
                    onClick={() => openLightbox(logoStrip, index % logoStrip.length)}
                  >
                    <img src={logo} alt={`Portfolio symbol ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </motion.article>

          <div className="street-ticker" aria-hidden="true">
            <div className="street-ticker__track">
              <span>Tajriba · Target Max · 30+ proekt · Namangan · </span>
              <span>Tajriba · Target Max · 30+ proekt · Namangan · </span>
              <span>Tajriba · Target Max · 30+ proekt · Namangan · </span>
              <span>Tajriba · Target Max · 30+ proekt · Namangan · </span>
            </div>
          </div>

          <motion.article {...revealMotion} data-code="01 / Experience" className="portfolio-panel resume-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Award size={17} />
              {c.resumeTitle}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="panel">
                <p className="panel-title">{c.experienceTitle}</p>
                {c.experience.map((line) => (
                  <p key={line} className="panel-text">
                    {line}
                  </p>
                ))}
              </div>
              <div className="panel">
                <p className="panel-title">{c.coursesTitle}</p>
                <ul className="panel-list">
                  {c.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="02 / Practice" id="cases" className="portfolio-panel case-section smm-section rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <BriefcaseBusiness size={17} />
              {c.smmTitle}
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {smmCases.map((item, index) => (
                <div key={item.project} className="case-card">
                  <span className="case-index">0{index + 1}</span>
                  <button
                    type="button"
                    className="case-logo"
                    onClick={() => openLightbox(smmLogos, index)}
                    aria-label={`${item.project} symbol`}
                  >
                    <img src={item.logo} alt={`${item.project} symbol`} loading="lazy" />
                  </button>
                  <div>
                    <p className="case-title">{item.project}</p>
                    <p className="case-result">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="03 / Mentors" className="portfolio-panel case-section target-section rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Target size={17} />
              {c.targetTitle}
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {targetCases.map((item, index) => (
                <div key={item.project} className="case-card">
                  <span className="case-index">0{index + 1}</span>
                  <button
                    type="button"
                    className="case-logo"
                    onClick={() => openLightbox(targetLogos, index)}
                    aria-label={`${item.project} symbol`}
                  >
                    <img src={item.logo} alt={`${item.project} symbol`} loading="lazy" />
                  </button>
                  <div>
                    <p className="case-title">{item.project}</p>
                    <p className="case-result">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="04 / Materials" id="results" className="portfolio-panel results-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <BarChart3 size={17} />
              {c.resultsTitle}
            </h3>
            <p className="eyebrow-text mt-4 text-sm">{c.resultsSubtitle}</p>
            <div className="result-grid mt-5">
              {resultShots.map((shot, index) => (
                <button
                  type="button"
                  key={`${shot}-${index}`}
                  className="result-card"
                  onClick={() => openLightbox(resultShots, index)}
                  aria-label={`${c.resultsTitle} ${index + 1}`}
                >
                  <img src={shot} alt={`Portfolio material ${index + 1}`} loading="lazy" />
                  <span className="result-number">{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <div className="live-projects">
              <div className="live-projects-header">
                <div>
                  <h4 className="live-projects-title">{c.liveProjectsTitle}</h4>
                  <p className="eyebrow-text">{c.liveProjectsSubtitle}</p>
                </div>
                <div className="live-projects-controls">
                  <button type="button" onClick={() => scrollProjects(-1)} aria-label={c.previousProject}>
                    <ChevronLeft size={20} />
                  </button>
                  <button type="button" onClick={() => scrollProjects(1)} aria-label={c.nextProject}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div
                className="live-projects-track"
                ref={liveProjectsRef}
                onMouseEnter={() => setProjectsPaused(true)}
                onMouseLeave={() => setProjectsPaused(false)}
                onFocusCapture={() => setProjectsPaused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setProjectsPaused(false);
                }}
              >
                {liveProjects.map((project, index) => (
                  <button
                    type="button"
                    key={project.image}
                    className="live-project-card"
                    onClick={() => openLightbox(liveProjectImages, index)}
                    aria-label={`${c.liveProjectsTitle}: ${project.name}`}
                  >
                    <img src={project.image} alt={project.name} loading="lazy" />
                    <span>{project.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="05 / Documents" className="portfolio-panel certificates-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Award size={17} />
              {c.certTitle}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {certificateImages.map((certificate, index) => (
                <button
                  type="button"
                  key={`${certificate}-${index}`}
                  className="cert-card"
                  onClick={() => openLightbox(certificateImages, index)}
                  aria-label={`${c.certTitle}: ${certificateTitles[index]}`}
                >
                  <img src={certificate} alt={`${c.certTitle}: ${certificateTitles[index]}`} loading="lazy" />
                  <span className="cert-label">{certificateTitles[index]}</span>
                </button>
              ))}
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="06 / About" className="portfolio-panel story-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Camera size={17} />
              {c.storyTitle}
            </h3>
            <p className="body-copy mt-4 max-w-3xl">{c.storyDescription}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {c.storyFeatures.map((feature) => (
                <div key={feature} className="micro-feature">
                  <Sparkles size={16} />
                  {feature}
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="07 / Contact" id="contact" className="portfolio-panel contact-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Mail size={17} />
              {c.connectTitle}
            </h3>
            <p className="contact-lead font-display">{c.contactLead}</p>
            <div className="body-copy mt-5 grid gap-3 sm:grid-cols-2">
              <a className="contact-tile" href="tel:+998936751399">
                +998 93 675 13 99
              </a>
              <a className="contact-tile" href="mailto:ikramovmadaminbek@gmail.com">
                ikramovmadaminbek@gmail.com
              </a>
              <a className="contact-tile" href="https://t.me/Madaminbek_Ikramov" target="_blank" rel="noreferrer">
                Telegram: @Madaminbek_Ikramov
              </a>
              <div className="contact-tile">{c.contactCity}</div>
            </div>
            <form className="lead-form" onSubmit={submitLead}>
              <h4 className="lead-form-title">{c.formTitle}</h4>
              <div className="lead-form-fields">
                <label>
                  <span>{c.firstName}</span>
                  <input name="firstName" type="text" autoComplete="given-name" maxLength={80} required />
                </label>
                <label>
                  <span>{c.lastName}</span>
                  <input name="lastName" type="text" autoComplete="family-name" maxLength={80} required />
                </label>
                <label>
                  <span>{c.phoneLabel}</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phoneValue}
                    onChange={(event) => setPhoneValue(formatUzPhone(event.target.value))}
                    pattern="[+]998 [0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
                    maxLength={17}
                    required
                  />
                </label>
              </div>
              <label className="lead-form-honey" aria-hidden="true">
                <span>Website</span>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="lead-form-footer">
                <button type="submit" disabled={leadStatus === 'sending'}>
                  {leadStatus === 'sending' ? c.formSending : c.formSubmit}
                  <Send size={17} />
                </button>
                <p className="lead-form-status" role="status" aria-live="polite">
                  {leadStatus === 'success' ? c.formSuccess : leadStatus === 'error' ? c.formError : leadStatus === 'unavailable' ? c.formUnavailable : ''}
                </p>
              </div>
            </form>
          </motion.article>
        </section>
      </main>

      <nav className="mobile-dock" aria-label="Mobile navigation">
        <a href="#top" className="mobile-dock__brand" aria-label="Back to top">MI</a>
        <a href="#cases">
          <BriefcaseBusiness size={16} />
          <span>{c.dockCases}</span>
        </a>
        <a href="#results">
          <BarChart3 size={16} />
          <span>{c.dockResults}</span>
        </a>
        <a href="#contact">
          <Mail size={16} />
          <span>{c.dockContact}</span>
        </a>
      </nav>

      {lightboxItems.length > 0 && (
        <div className="lightbox" onClick={closeLightbox}>
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <X size={18} />
          </button>
          {lightboxItems.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav left"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="lightbox-nav right"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          <img
            src={lightboxItems[lightboxIndex]}
            alt="Preview"
            className="lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default App;
