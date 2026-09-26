import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Instagram, Video } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      id: 'telegram',
      icon: <MessageCircle size={20} />,
      href: '',
    },
    {
      id: 'instagram',
      icon: <Instagram size={20} />,
      href: '',
    },
    {
      id: 'tiktok',
      icon: <Video size={20} />,
      href: '',
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white font-display tracking-wider mb-4">
                GENTS_UZ
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                {t('footer.description')}
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <h4 className="text-white font-semibold mb-4">{t('nav.home')}</h4>
              <nav className="flex flex-col gap-2">
                {[
                  { href: '#home', label: t('nav.home') },
                  { href: '#about', label: t('nav.about') },
                  { href: '#products', label: t('nav.products') },
                  { href: '#branches', label: t('nav.branches') },
                  { href: '#contact', label: t('nav.contact') },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-right"
            >
              <h4 className="text-white font-semibold mb-4">
                {t('contact.title')}
              </h4>
              <div className="flex justify-center md:justify-end gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <a
                href="tel:+998958888887"
                className="inline-block mt-4 text-white/50 hover:text-white text-sm transition-colors duration-300"
              >
                +998 95 888 88 87
              </a>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm text-center md:text-left">
                {t('footer.copyright')}
              </p>
              <p className="text-white/30 text-xs tracking-wider">
                | {t('footer.tagline')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
