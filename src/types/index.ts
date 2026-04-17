export interface Product {
  id: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  priceInfoEn: string;
  priceInfoZh: string;
  categoryEn: string;
  categoryZh: string;
  imageUrl: string;
  fabricEn: string;
  fabricZh: string;
  processEn: string;
  processZh: string;
  specifications?: {
    nameEn: string;
    nameZh: string;
    descEn: string;
    descZh: string;
  }[];
}

export interface QuoteRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productIds: string[];
  quantities: Record<string, number>;
  comments?: string;
  status: 'pending' | 'reviewed' | 'responded';
  createdAt: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
}
