import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Shirt, Footprints, Sparkles } from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Products = () => {
  const { t } = useTranslation();

  const products: ProductItem[] = [
    {
      id: 'suits',
      title: t('products.suits.title'),
      description: t('products.suits.description'),
      icon: <Sparkles size={32} />,
    },
    {
      id: 'pants',
      title: t('products.pants.title'),
      description: t('products.pants.description'),
      icon: <Shirt size={32} />,
    },
    {
      id: 'shoes',
      title: t('products.shoes.title'),
      description: t('products.shoes.description'),
      icon: <Footprints size={32} />,
    },
    {
      id: 'sneakers',
      title: t('products.sneakers.title'),
      description: t('products.sneakers.description'),
      icon: <Footprints size={32} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="products" className="relative py-20 md:py-32 bg-black">
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
            {t('products.title')}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-white/50 mx-auto mt-6"
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="group relative bg-white/5 border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden h-full">
                <CardContent className="p-8 md:p-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white/20 transition-colors duration-300"
                  >
                    {product.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 font-display">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {product.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
