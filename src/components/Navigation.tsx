import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#products', label: t('nav.products') },
    { href: '#branches', label: t('nav.branches') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="text-xl md:text-2xl font-bold tracking-wider text-white font-display"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              GENTS_UZ
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300 relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                <button
                  onClick={() => changeLanguage('uz')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    i18n.language === 'uz'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t('language.uz')}
                </button>
                <button
                  onClick={() => changeLanguage('ru')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    i18n.language === 'ru'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t('language.ru')}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl text-white/80 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
