import { createClient } from '@supabase/supabase-js';

// 直接硬编码（写死）您的专属数据库地址和公钥
// 这将 100% 排除前端环境变量没读到、或者是缓存到空地址的可能
const supabaseUrl = 'https://mgenhokimsvmauyitamd.supabase.co';
const supabaseAnonKey = 'sb_publishable_bMr36dTuhlABzZl6TEA4nw_rCG_Qgxq';

console.log("Supabase URL initialized directly as:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
