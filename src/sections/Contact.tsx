import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle, Instagram, Video, Phone, CheckCircle, AlertCircle } from 'lucide-react';

// Telegram Bot Configuration
// Replace these with your actual bot token and chat ID
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CHAT_ID = 'YOUR_CHAT_ID_HERE';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendToTelegram = async (name: string, phone: string) => {
    const message = `
📞 <b>Yangi Murojaat / Новое Обращение</b>

👤 <b>Ism / Имя:</b> ${name}
📱 <b>Telefon / Телефон:</b> ${phone}

🕐 <b>Sana / Дата:</b> ${new Date().toLocaleString()}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Telegram API error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Check if bot token and chat ID are configured
    if (BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || CHAT_ID === 'YOUR_CHAT_ID_HERE') {
      // Demo mode - simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', phone: '' });
    } else {
      const success = await sendToTelegram(formData.name, formData.phone);
      setSubmitStatus(success ? 'success' : 'error');
      if (success) {
        setFormData({ name: '', phone: '' });
      }
    }

    setIsSubmitting(false);
  };

  const socialLinks = [
    {
      id: 'telegram',
      name: t('contact.social.telegram'),
      href: 'https://t.me/rm7177',
      icon: <MessageCircle size={24} />,
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
    },
    {
      id: 'instagram',
      name: t('contact.social.instagram'),
      href: 'https://instagram.com/',
      icon: <Instagram size={24} />,
      color: 'hover:bg-pink-500/20 hover:text-pink-400',
    },
    {
      id: 'tiktok',
      name: t('contact.social.tiktok'),
      href: 'https://tiktok.com/',
      icon: <Video size={24} />,
      color: 'hover:bg-cyan-500/20 hover:text-cyan-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-black">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display tracking-wide mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-white/50 text-lg">{t('contact.subtitle')}</p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-16 h-px bg-white/50 mx-auto mt-6"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Social Links */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 ${social.color}`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    {social.icon}
                  </div>
                  <span className="text-lg font-medium text-white">{social.name}</span>
                </motion.a>
              ))}

              {/* Phone */}
              <motion.a
                href="tel:+998958888887"
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:bg-green-500/20 hover:text-green-400"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <span className="text-lg font-medium text-white">+998 95 888 88 87</span>
              </motion.a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 font-display">
                    {t('contact.form.title')}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        {t('contact.form.name')}
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.name')}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-white/20 h-12"
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+998 __ ___ __ __"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-white/20 h-12"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-white text-black hover:bg-white/90 font-medium rounded-full transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        />
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send size={18} className="ml-2" />
                        </>
                      )}
                    </Button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 text-sm"
                      >
                        <CheckCircle size={16} />
                        {t('contact.form.success')}
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle size={16} />
                        {t('contact.form.error')}
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
