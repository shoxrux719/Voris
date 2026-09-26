import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Gem, Palette, HeadphonesIcon } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const About = () => {
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    {
      id: 'quality',
      title: t('about.quality'),
      description: t('about.qualityDesc'),
      icon: <Gem size={28} />,
    },
    {
      id: 'design',
      title: t('about.design'),
      description: t('about.designDesc'),
      icon: <Palette size={28} />,
    },
    {
      id: 'service',
      title: t('about.service'),
      description: t('about.serviceDesc'),
      icon: <HeadphonesIcon size={28} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="about" className="relative py-20 md:py-32 bg-black">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display tracking-wide mb-6">
              {t('about.title')}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-16 h-px bg-white/50 mx-auto"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group text-center"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-6 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300"
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default About;
