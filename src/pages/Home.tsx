import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Award, Factory, Globe2, ShieldCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { COMPANY_INFO, PRODUCTS } from '../constants/content';

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2000"
          alt="Factory"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-8">
            {t('Premium Manufacturing', '优质制造')}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {t('Crafting Excellence', '精益求精')} <br />
            <span className="text-gray-400 font-light">{t('In Every Stitch', '针针完美')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
            {t(COMPANY_INFO.missionEn, COMPANY_INFO.missionZh)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/quotation"
              className="bg-white text-gray-900 px-8 py-4 rounded-none font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors flex items-center justify-center group"
            >
              {t('Request Quotation', '索取报价')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/products"
              className="bg-transparent text-white border border-white/30 px-8 py-4 rounded-none font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              {t('Explore Catalog', '浏览产品')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: <Factory className="w-10 h-10" />,
      titleEn: 'Modern Facility',
      titleZh: '现代化设施',
      descEn: 'State-of-the-art production lines equipped with Italian and German machinery.',
      descZh: '配备意大利和德国机械的先进生产线。'
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      titleEn: 'Strict Quality Control',
      titleZh: '严格质检',
      descEn: 'Four-stage inspection process ensuring zero defects before shipment.',
      descZh: '四阶段检验流程，确保出货前零缺陷。'
    },
    {
      icon: <Globe2 className="w-10 h-10" />,
      titleEn: 'Global Logistics',
      titleZh: '全球物流',
      descEn: 'Efficient shipping solutions to major hubs worldwide with door-to-door tracking.',
      descZh: '通往全球各大枢纽的高效运输方案，提供全程跟踪。'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6 text-gray-400">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t(f.titleEn, f.titleZh)}</h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {t(f.descEn, f.descZh)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 block">
              {t('New Collection', '最新系列')}
            </span>
            <h2 className="text-4xl font-bold text-gray-900">{t('Product Showcase', '产品演示')}</h2>
          </div>
          <Link to="/products" className="text-sm font-bold border-b-2 border-gray-900 pb-1 mb-1">
            {t('View All', '查看全部')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((p) => (
            <Link to={`/products#${p.id}`} key={p.id} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-gray-200 mb-6">
                <img
                  src={p.imageUrl}
                  alt={p.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t(p.nameEn, p.nameZh)}</h3>
              <p className="text-gray-500 text-sm">{t(p.categoryEn, p.categoryZh)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <FeaturedProducts />
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 decoration-gray-200 underline underline-offset-12">
            30+ YEARS OF EXCELLENCE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div>
              <p className="text-4xl font-bold text-gray-900">5k+</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">Daily Production</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">100k+</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">Monthly Capacity</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">15+</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">Export Markets</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">200+</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">Skilled Workers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
