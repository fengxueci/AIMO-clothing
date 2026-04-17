import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../constants/content';
import { ShoppingBag, Info, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string | null>(null);

  const categoriesSet = new Set(PRODUCTS.map(p => p.categoryEn));
  const categories = Array.from(categoriesSet);

  const filteredProducts = filter 
    ? PRODUCTS.filter(p => p.categoryEn === filter)
    : PRODUCTS;

  return (
    <div className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('Product Catalog', '产品目录')}
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              {t(
                'Explore our wide range of premium garments tailored for volume production. All products are customizable to your specific brand requirements.',
                '浏览我们为大批量生产量身定制的各种优质服装。所有产品均可根据您的品牌具体要求进行定制。'
              )}
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setFilter(null)}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
              filter === null ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-900'
            }`}
          >
            {t('All', '全部')}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                filter === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-900'
              }`}
            >
              {t(cat, PRODUCTS.find(p => p.categoryEn === cat)?.categoryZh || cat)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map((p, i) => (
            <motion.div
              id={p.id}
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border border-gray-100 p-4"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-8 relative">
                <img
                  src={p.imageUrl}
                  alt={p.nameEn}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {t(p.categoryEn, p.categoryZh)}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{t(p.nameEn, p.nameZh)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light min-h-[3rem]">
                  {t(p.descriptionEn, p.descriptionZh)}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      {p.categoryEn === 'Sweaters' ? t('Yarn', '纱线') : t('Fabric', '面料')}
                    </span>
                    <span className="text-xs font-medium text-gray-700">{t(p.fabricEn, p.fabricZh)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">{t('Process', '工艺')}</span>
                    <span className="text-xs font-medium text-gray-700">{t(p.processEn, p.processZh)}</span>
                  </div>
                </div>

                {p.specifications && (
                  <div className="py-2">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-3">
                      {p.categoryEn === 'Sweaters' ? t('Yarn Options', '纱线可选') : t('Fabric Options', '面料可选')}
                    </span>
                    <div className="space-y-3">
                      {p.specifications.map((spec, index) => (
                        <div key={index} className="group/spec">
                          <p className="text-[11px] font-bold text-gray-800 flex items-center">
                            <span className="w-1 h-1 bg-gray-300 mr-2 group-hover/spec:bg-gray-900 transition-colors" />
                            {t(spec.nameEn, spec.nameZh)}
                          </p>
                          <p className="text-[10px] text-gray-500 font-light mt-0.5 pl-3">
                            {t(spec.descEn, spec.descZh)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-bold text-gray-900">{t(p.priceInfoEn, p.priceInfoZh)}</span>
                  <Link
                    to="/quotation"
                    state={{ productId: p.id }}
                    className="p-2 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                    title={t('Request Inquiry', '询价')}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
