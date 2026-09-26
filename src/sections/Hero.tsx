import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-wider font-display mb-6"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-px bg-white/50 mx-auto mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 font-light tracking-wide mb-12 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => scrollToSection('#products')}
              whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-300"
            >
              {t('hero.viewCollection')}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-medium rounded-full transition-all duration-300 hover:border-white/60"
            >
              {t('hero.contactUs')}
              <Phone size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
