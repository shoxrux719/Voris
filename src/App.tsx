import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Camera,
  Download,
  Mail,
  MapPin,
  Moon,
  Phone,
  Play,
  Send,
  Sparkles,
  Sun,
  Smartphone,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { formatUzPhone } from './lib/phone';
import { FilmPlayer } from './components/FilmPlayer';
import { films, type Film } from './data/films';
import './App.css';

type Lang = 'uz' | 'ru' | 'en';
type Theme = 'dark' | 'light';

const names = {
  uz: ['Voris', 'Turobov'],
  ru: ['Ворис', 'Туробов'],
  en: ['Voris', 'Turobov'],
} as const;

const certificateCopy = {
  uz: {
    title: 'Sertifikatlar', headline: 'Har bir kadr ortida — bilim.',
    description: 'Mobilografiya yo‘nalishi bo‘yicha IT HOUSE sertifikati.',
    course: 'Mobilografiya', recipient: 'Sertifikat egasi', issuer: 'Ta’lim markazi',
    view: 'Sertifikatni ochish', download: 'PDF yuklab olish', preview: 'IT HOUSE — Voris Turobov sertifikati',
  },
  ru: {
    title: 'Сертификаты', headline: 'За каждым кадром — знания.',
    description: 'Сертификат IT HOUSE по направлению «Мобилография».',
    course: 'Мобилография', recipient: 'Владелец сертификата', issuer: 'Учебный центр',
    view: 'Открыть сертификат', download: 'Скачать PDF', preview: 'Сертификат IT HOUSE — Voris Turobov',
  },
  en: {
    title: 'Certificates', headline: 'Knowledge behind every frame.',
    description: 'IT HOUSE certificate in mobile videography.',
    course: 'Mobile videography', recipient: 'Certificate holder', issuer: 'Education centre',
    view: 'Open certificate', download: 'Download PDF', preview: 'IT HOUSE certificate — Voris Turobov',
  },
} as const;

const certificateFile = '/assets/certificates/it-house-voris-turobov.pdf';

const projectLogos = [
  { name: 'Zerona Clean', file: 'IMG_4981.JPG', width: 1280, height: 1280, crop: 640, left: 320, top: 320 },
  { name: 'Nur Baraka', file: 'IMG_4982.PNG', width: 1206, height: 2134, crop: 1000, left: 103, top: 540 },
  { name: 'RS', file: 'IMG_4983.PNG', width: 1206, height: 1268, crop: 1140, left: 33, top: 128 },
  { name: 'Aziz Non Shirinligi', file: 'IMG_4984.PNG', width: 1206, height: 963, crop: 800, left: 203, top: 76 },
  { name: 'Osiyo', file: 'IMG_4985.PNG', width: 1206, height: 1050, crop: 800, left: 203, top: 137 },
  { name: 'SBS', file: 'IMG_4987.PNG', width: 1206, height: 986, crop: 800, left: 203, top: 83 },
  { name: 'SnowVillage', file: 'IMG_6215.JPG', width: 640, height: 640, crop: 600, left: 20, top: -20 },
  { name: 'Vitrini Xolodilnik', file: 'IMG_6649.PNG', width: 1024, height: 1536, crop: 1000, left: 12, top: 235 },
];
const marqueeLogos = Array.from({ length: 4 }, () => projectLogos).flat();

const content = {
  "uz": {
    "portfolio": "Portfolio",
    "roleTag": "Mobilograf · Videograf",
    "roleTitle": "Voris Turobov",
    "roleDescription": "Brendingiz, mahsulotingiz va insonlar haqida mobil videolar. 4 yillik tajriba, 20+ ta loyiha — har bir kadrda o‘z qarashim.",
    "heroLine": "Kichik kamera. Katta hikoya.",
    "watchWork": "Ishlarimni ko‘rish",
    "captureNote": "Mobil nigoh · Vertikal format",
    "stats": [
      "Yillik tajriba",
      "Loyihalar",
      "O‘quv yo‘nalishlari"
    ],
    "contactsTitle": "Kontaktlar",
    "skillsTitle": "Qisqacha ma’lumot",
    "skills": [
      "Mobilografiya va videografiya",
      "Yangihayot tumani",
      "4 yil tajriba",
      "20+ ta loyiha"
    ],
    "resumeTitle": "Tajriba va ta’lim",
    "experienceTitle": "Tajriba",
    "coursesTitle": "Kurslar",
    "experience": [
      "Tajriba: 4 yil",
      "20+ ta loyiha",
      "Yangihayot tumani, Choshtepa mahallasi"
    ],
    "courses": [
      "Mobilografiya",
      "Videografiya"
    ],
    "resultsTitle": "Natijalar · Video ishlar",
    "resultsSubtitle": "Insonlar, mahsulotlar va brendlar — mening nigohim orqali. Tomosha qilish uchun videoni tanlang.",
    "filmsHeadline": "Kadrlar o‘zi gapirsin.",
    "playFilm": "Videoni ko‘rish",
    "filmCount": "video ish",
    "filmNote": "Mobilografiya / 9:16",
    "storyTitle": "Men haqimda",
    "storyDescription": "Men Voris Turobovman, mobilograf va videografman. Oddiy vaziyatda ham qiziqarli rakurs izlayman: kadrda insonning xarakteri, mahsulotning detali va joyning kayfiyati ko‘rinsin. 4 yil davomida 20+ ta loyiha ustida ishlaganman, mobilografiya va videografiya bo‘yicha ta’lim olganman.",
    "storyHeadline": "Sizning brendingiz. Mening rakursim.",
    "storyScope": "Story maker xizmati ko‘rsatilmaydi.",
    "storyFeatures": [
      "Inson — kadr markazida",
      "Detallarga e’tibor",
      "Harakat va ritm"
    ],
    "connectTitle": "Bog‘lanish",
    "contactLead": "Keyingi kadr — sizning loyihangiz.",
    "formTitle": "Suratga olishni muhokama qilamiz",
    "firstName": "Ism",
    "lastName": "Familiya",
    "phoneLabel": "Telefon raqami",
    "formSubmit": "Ariza yuborish",
    "formSending": "Yuborilmoqda...",
    "formSuccess": "Arizangiz yuborildi. Tez orada bog‘lanamiz.",
    "formError": "Ariza yuborilmadi. Iltimos, qayta urinib ko‘ring.",
    "formUnavailable": "Arizalar vaqtincha qabul qilinmayapti. Telegram orqali bog‘laning.",
    "formTimeout": "Javob olishga ulgurmadik. Qayta yuborishdan oldin Telegram orqali bog‘laning.",
    "dockCases": "Tajriba",
    "dockResults": "Natijalar",
    "dockContact": "Aloqa",
    "contactCity": "Yangihayot tumani, Choshtepa mahallasi, 301-uy",
    "light": "Yorug‘",
    "dark": "Qorong‘i"
  },
  "ru": {
    "portfolio": "Портфолио",
    "roleTag": "Мобилограф · Видеограф",
    "roleTitle": "Ворис Туробов",
    "roleDescription": "Мобильные видео о брендах, продуктах и людях. 4 года опыта, 20+ проектов — и свой взгляд в каждом кадре.",
    "heroLine": "Маленькая камера. Большая история.",
    "watchWork": "Смотреть работы",
    "captureNote": "Мобильный взгляд · Вертикальный формат",
    "stats": [
      "Года опыта",
      "Проектов",
      "Направления обучения"
    ],
    "contactsTitle": "Контакты",
    "skillsTitle": "Кратко обо мне",
    "skills": [
      "Мобилография и видеография",
      "Янгихаётский район",
      "4 года опыта",
      "20+ проектов"
    ],
    "resumeTitle": "Опыт и обучение",
    "experienceTitle": "Опыт",
    "coursesTitle": "Курсы",
    "experience": [
      "Опыт: 4 года",
      "20+ проектов",
      "Янгихаётский район, махалля Чоштепа"
    ],
    "courses": [
      "Мобилография",
      "Видеография"
    ],
    "resultsTitle": "Результаты · Видеоработы",
    "resultsSubtitle": "Люди, продукты и бренды через мой объектив. Выберите ролик, чтобы посмотреть его целиком.",
    "filmsHeadline": "Пусть говорят кадры.",
    "playFilm": "Смотреть видео",
    "filmCount": "видеоработ",
    "filmNote": "Мобилография / 9:16",
    "storyTitle": "Обо мне",
    "storyDescription": "Я Ворис Туробов, мобилограф и видеограф. Ищу интересный ракурс даже в обычной сцене: характер человека, детали продукта, настроение места. За 4 года работал над 20+ проектами и проходил обучение по мобилографии и видеографии.",
    "storyHeadline": "Ваш бренд. Мой ракурс.",
    "storyScope": "Услуги сторисмейкера не оказываю.",
    "storyFeatures": [
      "Человек в центре кадра",
      "Внимание к деталям",
      "Движение и ритм"
    ],
    "connectTitle": "Связаться",
    "contactLead": "Следующий кадр — ваш проект.",
    "formTitle": "Обсудим съёмку",
    "firstName": "Имя",
    "lastName": "Фамилия",
    "phoneLabel": "Номер телефона",
    "formSubmit": "Отправить заявку",
    "formSending": "Отправляем...",
    "formSuccess": "Заявка отправлена. Мы скоро свяжемся с вами.",
    "formError": "Не удалось отправить заявку. Попробуйте ещё раз.",
    "formUnavailable": "Приём заявок временно недоступен. Свяжитесь через Telegram.",
    "formTimeout": "Не удалось дождаться подтверждения. Перед повторной отправкой свяжитесь через Telegram.",
    "dockCases": "Опыт",
    "dockResults": "Результаты",
    "dockContact": "Связь",
    "contactCity": "Янгихаётский район, махалля Чоштепа, дом 301",
    "light": "Светлая",
    "dark": "Тёмная"
  },
  "en": {
    "portfolio": "Portfolio",
    "roleTag": "Mobile videographer · Videographer",
    "roleTitle": "Voris Turobov",
    "roleDescription": "Mobile films about brands, products and people. 4 years of experience, 20+ projects — and a personal perspective in every frame.",
    "heroLine": "Small camera. Big story.",
    "watchWork": "Watch my work",
    "captureNote": "A mobile perspective · Vertical format",
    "stats": [
      "Years of experience",
      "Projects",
      "Courses"
    ],
    "contactsTitle": "Contacts",
    "skillsTitle": "At a glance",
    "skills": [
      "Mobile videography & videography",
      "Yangihayot district",
      "4 years of experience",
      "20+ projects"
    ],
    "resumeTitle": "Experience & education",
    "experienceTitle": "Experience",
    "coursesTitle": "Courses",
    "experience": [
      "Experience: 4 years",
      "20+ projects",
      "Yangihayot district, Choshtepa mahalla"
    ],
    "courses": [
      "Mobile videography",
      "Videography"
    ],
    "resultsTitle": "Results · Film selection",
    "resultsSubtitle": "People, products and brands through my lens. Select a film to watch it in full.",
    "filmsHeadline": "Let the frames speak.",
    "playFilm": "Watch film",
    "filmCount": "films",
    "filmNote": "Mobile videography / 9:16",
    "storyTitle": "About me",
    "storyDescription": "I’m Voris Turobov, a mobile videographer and videographer. I look for an interesting angle in everyday scenes: a person’s character, a product’s details, the mood of a place. In 4 years I have worked on 20+ projects and studied mobile videography and videography.",
    "storyHeadline": "Your brand. My perspective.",
    "storyScope": "Story maker services are not offered.",
    "storyFeatures": [
      "People at the heart of a frame",
      "An eye for detail",
      "Movement and rhythm"
    ],
    "connectTitle": "Get in touch",
    "contactLead": "The next frame is your project.",
    "formTitle": "Let’s plan a shoot",
    "firstName": "First name",
    "lastName": "Last name",
    "phoneLabel": "Phone number",
    "formSubmit": "Send request",
    "formSending": "Sending...",
    "formSuccess": "Your request was sent. We'll be in touch soon.",
    "formError": "The request could not be sent. Please try again.",
    "formUnavailable": "Requests are temporarily unavailable. Please contact us on Telegram.",
    "formTimeout": "We could not confirm delivery in time. Please contact us on Telegram before resending.",
    "dockCases": "Experience",
    "dockResults": "Results",
    "dockContact": "Contact",
    "contactCity": "301, Choshtepa mahalla, Yangihayot district",
    "light": "Light",
    "dark": "Dark"
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
  const [phoneValue, setPhoneValue] = useState('+998 ');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'unavailable' | 'timeout'>('idle');
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const c = content[lang];
  const certificate = certificateCopy[lang];
  const [firstName, lastName] = names[lang];
  const fullName = `${firstName} ${lastName}`;
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    let cancelled = false;
    // The initial browser jump can happen before React creates the section.
    void document.fonts.ready.then(() => {
      if (!cancelled) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    localStorage.setItem('madaminbek-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${fullName} — ${c.roleTag}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.roleDescription);
  }, [lang, fullName, c.roleTag, c.roleDescription]);

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (leadStatus === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setLeadStatus('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        cache: 'no-store',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.get('firstName') ?? '').trim(),
          lastName: String(data.get('lastName') ?? '').trim(),
          phone: String(data.get('phone') ?? ''),
          website: String(data.get('website') ?? ''),
        }),
      });
      const result = await response.json();
      if (response.ok && result?.ok === true) {
        form.reset();
        setPhoneValue('+998 ');
        setLeadStatus('success');
      } else {
        setLeadStatus(response.status === 503 ? 'unavailable' : 'error');
      }
    } catch (error) {
      setLeadStatus(error instanceof DOMException && error.name === 'AbortError' ? 'timeout' : 'error');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const revealMotion = {
    initial: reduceMotion ? false : { opacity: 0.32, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.04 },
    transition: { duration: reduceMotion ? 0 : 0.72, ease: 'easeOut' as const },
  };

  return (
    <div
      className={`portfolio-page street-mode lang-${lang} ${theme === 'light' ? 'light-mode' : ''} is-ready`}
    >
      <div className="portfolio-noise" />
      <header className="site-header mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <a href="#top" className="site-wordmark">VT<span>•</span></a>
        <nav>
          <a href="#cases">{c.resumeTitle}</a>
          <a href="#results">{c.resultsTitle}</a>
          <a href="#certificates">{certificate.title}</a>
          <a href="#contact">{c.connectTitle}</a>
        </nav>
        <a href="https://t.me/voris_21" target="_blank" rel="noreferrer">Yangihayot / 2026 ↗</a>
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
              <div className="avatar-core h-full w-full rounded-full">
                <img
                  src="/assets/voris-avatar.png"
                  alt={fullName}
                  className="avatar-image"
                  fetchPriority="high"
                  decoding="async"
                  width={1254}
                  height={1254}
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
                <a href="tel:+998956566264">+998 95 656 62 64</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="muted-icon" />
                <a href="mailto:voristurobov@gmail.com">voristurobov@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Send size={16} className="muted-icon" />
                <a href="https://t.me/voris_21" target="_blank" rel="noreferrer">@voris_21</a>
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
              <span>Yangihayot · 2026</span>
            </div>
            <h2 className="display-copy font-display hero-title mt-5 text-5xl font-semibold md:text-7xl">{c.roleTitle}</h2>
            <p className="mobile-film-headline">{c.heroLine}</p>
            <div className="capture-note"><Smartphone size={15} /><span>{c.captureNote}</span><span className="frame-ratio">9:16</span></div>
            <div className="hero-summary mt-7">
              <p className="body-copy max-w-3xl text-base leading-relaxed">{c.roleDescription}</p>
              <a className="hero-contact" href="https://t.me/voris_21" target="_blank" rel="noreferrer">
                {c.connectTitle}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a className="watch-work-link" href="#results"><Play size={15} fill="currentColor" />{c.watchWork}<ArrowDown size={16} /></a>
            <div className="stats-strip mt-8 grid grid-cols-1 sm:grid-cols-3">
              <div className="stat-card">
                <TrendingUp size={18} />
                <AnimatedNumber value={4} suffix="" delay={650} />
                <span>{c.stats[0]}</span>
              </div>
              <div className="stat-card">
                <Users size={18} />
                <AnimatedNumber value={20} suffix="+" delay={760} />
                <span>{c.stats[1]}</span>
              </div>
              <div className="stat-card">
                <BarChart3 size={18} />
                <AnimatedNumber value={2} suffix="" delay={870} />
                <span>{c.stats[2]}</span>
              </div>
            </div>

            <div className="logo-marquee project-logos mt-7">
              <div className="logo-marquee-track">
                {marqueeLogos.map((logo, index) => (
                  <a
                    key={`${logo.file}-${index}`}
                    className="logo-pill"
                    href={`/assets/Logo/logos/${logo.file}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={logo.name}
                    aria-hidden={index >= projectLogos.length ? true : undefined}
                    tabIndex={index >= projectLogos.length ? -1 : undefined}
                  >
                    <img
                      src={`/assets/Logo/logos/${logo.file}`}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      loading={index < projectLogos.length ? 'eager' : 'lazy'}
                      decoding="async"
                      style={{
                        width: `${logo.width / logo.crop * 100}%`,
                        height: `${logo.height / logo.crop * 100}%`,
                        left: `${-logo.left / logo.crop * 100}%`,
                        top: `${-logo.top / logo.crop * 100}%`,
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="01 / Experience" id="cases" className="portfolio-panel resume-panel rounded-3xl p-6 md:p-8">
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

          <motion.article {...revealMotion} data-code="02 / Selected films" id="results" className="portfolio-panel results-panel film-portfolio rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Play size={17} />
              {c.resultsTitle}
            </h3>
            <div className="film-section-heading"><h4>{c.filmsHeadline}</h4><span>{String(films.length).padStart(2, '0')} / {c.filmCount}</span></div>
            <p className="eyebrow-text film-intro">{c.resultsSubtitle}</p>
            <div className="film-grid">
              {films.map((film, index) => (
                <button className="film-card" type="button" key={film.id} onClick={() => setActiveFilm(film)} aria-label={`${c.playFilm}: ${film.title[lang]}`}>
                  <div className="film-cover">
                    <img src={`/assets/videos/${film.id}-poster.jpg`} alt="" width={540} height={960} loading="lazy" decoding="async" />
                    <div className="film-cover-top"><span>0{index + 1}</span><span>{film.duration}</span></div>
                    <span className="film-play"><Play size={21} fill="currentColor" /></span>
                    <span className="film-cover-bottom">9:16 <ArrowUpRight size={17} /></span>
                  </div>
                  <div className="film-caption"><span>{film.category[lang]}</span><h5>{film.title[lang]}</h5></div>
                </button>
              ))}
            </div>
            <div className="film-section-footer"><span>{c.filmNote}</span><span>VORIS TUROBOV © 2026</span></div>
          </motion.article>

          <motion.article {...revealMotion} data-code="03 / About" className="portfolio-panel story-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Camera size={17} />
              {c.storyTitle}
            </h3>
            <h4 className="story-headline">{c.storyHeadline}</h4>
            <p className="body-copy mt-4 max-w-3xl">{c.storyDescription}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {c.storyFeatures.map((feature) => (
                <div key={feature} className="micro-feature">
                  <Sparkles size={16} />
                  {feature}
                </div>
              ))}
            </div>
            <p className="story-scope">{c.storyScope}</p>
          </motion.article>

          <motion.article {...revealMotion} data-code="04 / Certificates" id="certificates" aria-labelledby="certificates-title" className="portfolio-panel certificates-panel rounded-3xl p-6 md:p-8">
            <h3 id="certificates-title" className="section-title"><Award size={17} />{certificate.title}</h3>
            <div className="certificate-layout">
              <div className="certificate-copy">
                <span className="certificate-eyebrow">IT HOUSE / CREATIVE EDUCATION</span>
                <h4 className="certificate-headline">{certificate.headline}</h4>
                <p className="body-copy">{certificate.description}</p>
                <dl className="certificate-details">
                  <div><dt>{certificate.recipient}</dt><dd>Voris Turobov</dd></div>
                  <div><dt>{certificate.issuer}</dt><dd>IT HOUSE</dd></div>
                </dl>
                <div className="certificate-actions">
                  <a className="certificate-open" href={certificateFile} target="_blank" rel="noreferrer">{certificate.view}<ArrowUpRight size={17} /></a>
                  <a className="certificate-download" href={certificateFile} download="IT_HOUSE_Voris_Turobov_Certificate.pdf"><Download size={16} />{certificate.download}</a>
                </div>
              </div>
              <a className="certificate-preview" href={certificateFile} target="_blank" rel="noreferrer" aria-label={certificate.view}>
                <div className="certificate-preview__label"><span>01 / IT HOUSE</span><ArrowUpRight size={18} /></div>
                <div className="certificate-paper">
                  <img src="/assets/certificates/it-house-voris-turobov.webp" alt={certificate.preview} width={1800} height={1273} loading="lazy" decoding="async" />
                </div>
                <div className="certificate-preview__footer"><span>{certificate.course}</span><span>PDF · 82 KB</span></div>
              </a>
            </div>
          </motion.article>

          <motion.article {...revealMotion} data-code="05 / Contact" id="contact" className="portfolio-panel contact-panel rounded-3xl p-6 md:p-8">
            <h3 className="section-title">
              <Mail size={17} />
              {c.connectTitle}
            </h3>
            <p className="contact-lead font-display">{c.contactLead}</p>
            <div className="body-copy mt-5 grid gap-3 sm:grid-cols-2">
              <a className="contact-tile" href="tel:+998956566264">
                +998 95 656 62 64
              </a>
              <a className="contact-tile" href="mailto:voristurobov@gmail.com">
                voristurobov@gmail.com
              </a>
              <a className="contact-tile" href="https://t.me/voris_21" target="_blank" rel="noreferrer">
                Telegram: @voris_21
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
                    maxLength={25}
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
                  {leadStatus === 'success' ? c.formSuccess : leadStatus === 'error' ? c.formError : leadStatus === 'unavailable' ? c.formUnavailable : leadStatus === 'timeout' ? c.formTimeout : ''}
                </p>
              </div>
            </form>
          </motion.article>
        </section>
      </main>

      <nav className="mobile-dock" aria-label="Mobile navigation">
        <a href="#top" className="mobile-dock__brand" aria-label="Back to top">VT</a>
        <a href="#cases">
          <BriefcaseBusiness size={16} />
          <span>{c.dockCases}</span>
        </a>
        <a href="#results">
          <BarChart3 size={16} />
          <span>{c.dockResults}</span>
        </a>
        <a href="#certificates">
          <Award size={16} />
          <span>{certificate.title}</span>
        </a>
        <a href="#contact">
          <Mail size={16} />
          <span>{c.dockContact}</span>
        </a>
      </nav>

      {activeFilm && <FilmPlayer key={activeFilm.id} film={activeFilm} lang={lang} onClose={() => setActiveFilm(null)} />}
    </div>
  );
}

export default App;
