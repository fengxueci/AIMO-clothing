import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Menu, X, Mail, Phone, MessageCircle, Globe, Shirt } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { COMPANY_INFO } from './constants/content';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', labelEn: 'Home', labelZh: '首页' },
    { to: '/products', labelEn: 'Products', labelZh: '产品中心' },
    { to: '/quotation', labelEn: 'Quotation', labelZh: '索取报价' },
    { to: '/about', labelEn: 'About Us', labelZh: '关于我们' },
    { to: '/contact', labelEn: 'Contact', labelZh: '联系我们' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shirt className="w-8 h-8 text-gray-900" />
            <span className="text-2xl font-bold tracking-tighter text-gray-900">
              Aimo <span className="text-gray-400 font-light">Clothing</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-gray-900 underline underline-offset-8' : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                {t(link.labelEn, link.labelZh)}
              </NavLink>
            ))}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '中文' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="text-gray-500"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-4 text-base font-medium ${
                      isActive ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:text-gray-900'
                    }`
                  }
                >
                  {t(link.labelEn, link.labelZh)}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{t('Aimo Clothing', '爱墨服饰')}</h3>
            <p className="text-gray-400 max-w-md leading-relaxed">
              {t(COMPANY_INFO.historyEn, COMPANY_INFO.historyZh)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-gray-500">
              {t('Contact', '联系方式')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-gray-600" />
                <span>{COMPANY_INFO.contact.email}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-gray-600" />
                <span>{COMPANY_INFO.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <span>WhatsApp: {COMPANY_INFO.contact.whatsapp}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-gray-500">
              {t('Office', '办公室')}
            </h4>
            <p className="text-gray-400 leading-relaxed text-sm">
              {t(COMPANY_INFO.contact.addressEn, COMPANY_INFO.contact.addressZh)}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Aimo Clothing Co., Ltd. {t('All rights reserved.', '版权所有。')}</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t('Privacy Policy', '隐私政策')}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t('Terms of Service', '服务条款')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">
      <Navbar />
      <main className="flex-grow">{children}</main>
      
      {/* Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-40 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </div>
  );
};
