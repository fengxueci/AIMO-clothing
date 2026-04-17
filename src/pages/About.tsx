import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { COMPANY_INFO } from '../constants/content';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Truck, Users } from 'lucide-react';

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('A Legacy of Craftsmanship', '匠心传承')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {t(COMPANY_INFO.historyEn, COMPANY_INFO.historyZh)}
            </p>
          </div>
        </div>
      </section>

      {/* Team & Factory */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('Our Mission', '我们的使命')}</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                {t(COMPANY_INFO.missionEn, COMPANY_INFO.missionZh)}
              </p>
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">{t('Core Values', '核心价值')}</h3>
                <ul className="grid grid-cols-2 gap-4">
                  {(useLanguage().language === 'en' ? COMPANY_INFO.valuesEn : COMPANY_INFO.valuesZh).map((v) => (
                    <li key={v} className="flex items-center space-x-2 text-gray-700 font-medium">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800"
                alt="Factory Interior"
                className="w-full aspect-square object-cover rounded-none"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800"
                alt="Finishing"
                className="w-full aspect-square object-cover rounded-none mt-8"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-[0.3em] mb-16 text-gray-500">
            {t('Global Standards', '全球标准')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {COMPANY_INFO.certifications.map((cert) => (
              <div key={cert} className="border border-white/10 p-12 hover:border-white/30 transition-colors">
                <Award className="w-12 h-12 mx-auto mb-6 text-gray-400" />
                <h3 className="text-xl font-bold tracking-widest">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">{t('Ready to Start Your Project?', '准备好开始您的项目了吗？')}</h2>
          <Link
            to="/contact"
            className="inline-block bg-gray-900 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:translate-y-[-2px] transition-transform"
          >
            {t('Contact Our Agents', '联系我们的代理人')}
          </Link>
        </div>
      </section>
    </div>
  );
};
