import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  mapUrl: string;
}

const Branches = () => {
  const { t } = useTranslation();

  const branches: Branch[] = [
    {
      id: 'branch1',
      name: t('branches.branch1.name'),
      address: t('branches.branch1.address'),
      phone: t('branches.branch1.phone'),
      description: t('branches.branch1.description'),
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.2!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzU4LjIiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s',
    },
    {
      id: 'branch2',
      name: t('branches.branch2.name'),
      address: t('branches.branch2.address'),
      phone: t('branches.branch2.phone'),
      description: t('branches.branch2.description'),
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2801!3d41.2895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzIyLjIiTiA2OcKwMTYnNDguNCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="branches" className="relative py-20 md:py-32 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display tracking-wide">
            {t('branches.title')}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-white/50 mx-auto mt-6"
          />
        </motion.div>

        {/* Branches Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto"
        >
          {branches.map((branch) => (
            <motion.div key={branch.id} variants={itemVariants}>
              <Card className="group bg-white/5 border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden h-full">
                <CardContent className="p-0">
                  {/* Map */}
                  <div className="relative w-full h-48 md:h-64 bg-white/5">
                    <iframe
                      src={branch.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={branch.name}
                    />
                    {/* Map Overlay */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Branch Name */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 font-display">
                      {branch.name}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin size={18} className="text-white/50 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          {t('branches.branch1.address').split(':')[0]}
                        </p>
                        <p className="text-white/80 text-sm">{branch.address}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3 mb-4">
                      <Phone size={18} className="text-white/50 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          {t('branches.branch1.phone').split(':')[0]}
                        </p>
                        <a
                          href={`tel:${branch.phone.replace(/\s/g, '')}`}
                          className="text-white/80 text-sm hover:text-white transition-colors"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {branch.description}
                    </p>

                    {/* Map Links */}
                    <div className="flex gap-3">
                      <motion.a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm rounded-full transition-all duration-300"
                      >
                        <ExternalLink size={14} />
                        {t('branches.googleMaps')}
                      </motion.a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Branches;
