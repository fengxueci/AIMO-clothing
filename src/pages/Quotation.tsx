import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PRODUCTS } from '../constants/content';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileText, Send, Plus, Trash2, Upload, X, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

const quotationSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required').max(20),
  company: z.string().optional().or(z.literal("")),
  items: z.array(z.object({
    productId: z.string().min(1, 'Please select a product'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'At least one product is required').max(20),
  comments: z.string().optional().or(z.literal("")),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

export const Quotation = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const preSelectedProductId = location.state?.productId;
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      items: preSelectedProductId ? [{ productId: preSelectedProductId, quantity: 100 }] : [{ productId: '', quantity: 100 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const onSubmit = async (data: QuotationFormData) => {
    setIsUploading(true);
    try {
      let designFileUrl = '';

      if (designFile) {
        const fileExt = designFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('designs')
          .upload(filePath, designFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('designs')
          .getPublicUrl(filePath);

        designFileUrl = publicUrlData.publicUrl;
      }

      // Remove undefined fields and assure string defaults for optional fields
      const cleanData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || "",
        items: data.items,
        comments: data.comments || "",
      };

      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: cleanData.name,
            email: cleanData.email,
            phone: cleanData.phone,
            company: cleanData.company,
            items: cleanData.items,
            comments: cleanData.comments,
            designFileUrl,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      alert(t('Your quotation request has been sent! Our sales team will contact you with a detailed proposal.', '您的报价请求已发送！我们的销售团队将为您提供详细方案。'));
      setDesignFile(null);
      reset({
        items: [{ productId: '', quantity: 100 }]
      });
    } catch (error) {
      console.error(error);
      alert(t('Failed to submit. Please try again.', '提交失败，请重试。'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <FileText className="w-12 h-12 mx-auto mb-6 text-gray-900" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('Request a Quotation', '索取报价')}
          </h1>
          <p className="text-gray-500 font-light">
            {t(
              'Fill out the form below and receive a personalized manufacturing quote within 24 hours.',
              '填写下方表单，并在24小时内收到个性化的生产报价。'
            )}
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Section 1: Customer Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 md:p-12">
            <div className="md:col-span-2 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
                1. {t('Company Information', '公司信息')}
              </h2>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                {t('Full Name', '姓名')}
              </label>
              <input
                {...register('name')}
                placeholder={t('John Doe', '张三')}
                className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-gray-900 outline-none transition-colors"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                {t('Email Address', '邮箱地址')}
              </label>
              <input
                {...register('email')}
                placeholder="john@example.com"
                className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-gray-900 outline-none transition-colors"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                {t('Phone Number', '电话号码')}
              </label>
              <input
                {...register('phone')}
                placeholder="+1 234 567 890"
                className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-gray-900 outline-none transition-colors"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                {t('Company Name', '公司名称')}
              </label>
              <input
                {...register('company')}
                placeholder={t('Optional', '选填')}
                className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-gray-900 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Section 2: Product Inquiry */}
          <div className="bg-white border border-gray-100 p-8 md:p-12">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  2. {t('Product Inquiry', '产品明细')}
                </h2>
                <button
                  type="button"
                  onClick={() => append({ productId: '', quantity: 100 })}
                  className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-900"
                >
                  <Plus className="w-3 h-3" />
                  <span>{t('Add Product', '添加产品')}</span>
                </button>
             </div>

             <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                    <div className="flex-grow w-full">
                       <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                        {t('Select Product', '选择产品')}
                       </label>
                       <select
                        {...register(`items.${index}.productId` as const)}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-gray-900 appearance-none"
                       >
                         <option value="">{t('Choose a product...', '选择产品...')}</option>
                         {PRODUCTS.map(p => (
                           <option key={p.id} value={p.id}>{t(p.nameEn, p.nameZh)}</option>
                         ))}
                       </select>
                    </div>
                    <div className="w-full md:w-32">
                       <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                        {t('Quantity', '数量')}
                       </label>
                       <input
                        type="number"
                        {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-gray-900"
                       />
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-3 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
             </div>
             {errors.items && <p className="text-red-500 text-xs mt-4">{errors.items.message}</p>}
          </div>

          {/* Section 3: Design Drawing Upload */}
          <div className="bg-white border border-gray-100 p-8 md:p-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
              3. {t('Design Drawings (Optional)', '设计图纸 (选填)')}
            </h2>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed transition-all cursor-pointer p-8 text-center ${
                designFile ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-900 bg-gray-50'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
              />
              {designFile ? (
                <div className="flex flex-col items-center">
                  <Check className="w-10 h-10 text-green-500 mb-3" />
                  <p className="text-gray-900 font-bold mb-1">{designFile.name}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">
                    {(designFile.size / 1024 / 1024).toFixed(2)} MB - {t('Click to change', '点击更换')}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDesignFile(null);
                    }}
                    className="mt-4 text-xs font-bold text-red-500 uppercase tracking-widest flex items-center"
                  >
                    <X className="w-3 h-3 mr-1" />
                    {t('Remove', '移除')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-gray-300 mb-4" />
                  <p className="text-gray-900 font-bold mb-1">{t('Upload Design Drawing', '上传设计图纸')}</p>
                  <p className="text-gray-500 text-sm font-light">
                    {t('PDF, AI, PSD, PNG, JPG (Max 10MB)', '支持 PDF, AI, PSD, PNG, JPG (最大 10MB)')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Requirements */}
          <div className="bg-gray-50 p-8 md:p-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
              4. {t('Additional Requirements', '其他特殊要求')}
            </h2>
            <textarea
              {...register('comments')}
              rows={4}
              placeholder={t('Logo placement, specific fabric blends, shipping deadlines, etc.', 'Logo位置、特定面料混纺、运输期限等。')}
              className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-gray-900 outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-6 flex items-center justify-center space-x-3 transition-colors ${
              isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'
            }`}
          >
            <span>{isUploading ? t('Uploading...', '正在上传...') : t('Submit Quote Request', '提交报价申请')}</span>
            {!isUploading && <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};
