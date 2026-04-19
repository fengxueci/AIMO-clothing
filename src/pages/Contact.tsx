import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { COMPANY_INFO } from '../constants/content';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { rtdb } from '../firebase';
import { ref as dbRef, push, set } from 'firebase/database';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required').max(200),
  message: z.string().min(10, 'Message is too short').max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    const path = 'messages';
    try {
      const newMsgRef = push(dbRef(rtdb, path));
      await set(newMsgRef, {
        ...data,
        createdAt: Date.now(),
      });
      alert(t('Thank you for your message! We will get back to you soon.', '感谢您的留言！我们会尽快给您回复。'));
      reset();
    } catch (error) {
      console.error(error);
      alert(t('Failed to submit. Please try again.', '提交失败，请重试。'));
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tighter">
            {t("Let's Talk", '预约沟通')}
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
            {t(
              'Our global sales team is ready to assist you with inquiries, factory visits, and sample requests.',
              '我们的全球销售团队随时准备为您提供咨询、工厂参观和样品索取方面的协助。'
            )}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border border-gray-100 p-8">
                <Mail className="w-8 h-8 text-gray-400 mb-6" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{t('Email', '电子邮箱')}</h3>
                <p className="text-lg font-medium text-gray-900">{COMPANY_INFO.contact.email}</p>
              </div>
              <div className="border border-gray-100 p-8">
                <Phone className="w-8 h-8 text-gray-400 mb-6" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{t('Phone', '电话')}</h3>
                <p className="text-lg font-medium text-gray-900">{COMPANY_INFO.contact.phone}</p>
              </div>
              <div className="border border-gray-100 p-8">
                <MessageSquare className="w-8 h-8 text-gray-400 mb-6" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">WhatsApp</h3>
                <p className="text-lg font-medium text-gray-900">{COMPANY_INFO.contact.whatsapp}</p>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace('+', '')}`}
                  className="inline-block mt-4 text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1"
                >
                  {t('Send Message', '发送消息')}
                </a>
              </div>
              <div className="border border-gray-100 p-8">
                <MapPin className="w-8 h-8 text-gray-400 mb-6" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{t('Address', '地址')}</h3>
                <p className="text-sm font-medium text-gray-900">{t(COMPANY_INFO.contact.addressEn, COMPANY_INFO.contact.addressZh)}</p>
              </div>
            </div>

            {/* Simulated Map or Factory Photo */}
            <div className="aspect-video bg-gray-100 relative group overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1200" 
                alt="Headquarters"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/20 transition-colors flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-widest text-sm border border-white/40 px-6 py-3">
                    {t('View on Google Maps', '在谷歌地图中查看')}
                  </span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8">{t('General Inquiry', '通用留言')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  {t('Full Name', '姓名')}
                </label>
                <input
                  {...register('name')}
                  className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-gray-900 outline-none transition-colors"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  {t('Email Address', '邮箱地址')}
                </label>
                <input
                  {...register('email')}
                  className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-gray-900 outline-none transition-colors"
                />
                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  {t('Subject', '主题')}
                </label>
                <input
                  {...register('subject')}
                  className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-gray-900 outline-none transition-colors"
                />
                 {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  {t('Message', '留言内容')}
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-gray-900 outline-none transition-colors resize-none"
                />
                 {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-5 flex items-center justify-center space-x-2 hover:bg-black transition-colors"
              >
                <span>{t('Send Message', '提交')}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
