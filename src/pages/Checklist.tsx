import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ClipboardCheck, Globe, Server, Code, Save, Search } from 'lucide-react';

export const Checklist = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: <Globe className="w-6 h-6" />,
      titleEn: 'Domain Name Selection',
      titleZh: '域名选择',
      itemsEn: [
        'Choose a .com domain for international credibility (e.g., aimoclothing.com)',
        'Check for availability of brand name across social media handles',
        'Consider shorter, memorable alternatives if main domain is taken',
      ],
      itemsZh: [
        '选择 .com 域名以获得国际信誉（例如 aimoclothing.com）',
        '检查各个社交媒体平台上的品牌名可用性',
        '如果主域名已被占用，考虑简短易记的替代方案',
      ]
    },
    {
      icon: <Server className="w-6 h-6" />,
      titleEn: 'Server & Hosting',
      titleZh: '服务器与托管',
      itemsEn: [
        'Select a server region close to your primary export market (e.g., US or Europe for foreign trade)',
        'Ensure SSL certificate (HTTPS) is active for security and SEO',
        'Configure CDN (like Cloudflare) to speed up global access times',
      ],
      itemsZh: [
        '选择靠近主要出口市场的服务器区域（例如，外贸选美国或欧洲）',
        '确保 SSL 证书 (HTTPS) 已激活，以保证安全和 SEO',
        '配置 CDN（如 Cloudflare）以加快全球访问速度',
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      titleEn: 'Content Management (CMS)',
      titleZh: '内容管理 (CMS)',
      itemsEn: [
        'Decide between custom React (current) or platforms like WordPress/Shopify',
        'Ensure all product images are high-resolution but optimized for web',
        'Double-check bilingual translations for technical accuracy',
      ],
      itemsZh: [
        '在自定义 React（当前）或 WordPress/Shopify 等平台之间做出决定',
        '确保所有产品图片均为高分辨率，但针对网页进行了优化',
        '仔细检查双语翻译的技术准确性',
      ]
    },
    {
      icon: <Search className="w-6 h-6" />,
      titleEn: 'SEO Suggestions',
      titleZh: 'SEO 建议',
      itemsEn: [
        'Use descriptive meta tags for each product page',
        'Submit Sitemap.xml to Google Search Console',
        'Optimize local business listings (e.g., Alibaba, Global Sources)',
      ],
      itemsZh: [
        '为每个产品页面使用描述性的元标签',
        '将 Sitemap.xml 提交给 Google Search Console',
        '优化当地商家列表（如阿里巴巴、环球资源）',
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="inline-flex p-4 bg-green-50 rounded-full mb-6">
            <ClipboardCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('Pre-Launch Checklist', '上线前检查清单')}</h1>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            {t(
              'Before making your Aimo Clothing website public, ensure these technical and strategic points are addressed.',
              '在公开您的爱末服饰网站之前，请确保已解决这些技术和战略要点。'
            )}
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-8">
                <div className="text-gray-400">{section.icon}</div>
                <h2 className="text-xl font-bold text-gray-900">{t(section.titleEn, section.titleZh)}</h2>
              </div>
              <ul className="space-y-4">
                {(useLanguage().language === 'en' ? section.itemsEn : section.itemsZh).map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-600">
                    <div className="w-5 h-5 rounded-full border border-gray-200 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
