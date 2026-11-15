import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const generateRandomString = (length: number = 12): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({
      success: false,
      error: 'Missing SUPABASE_URL or SUPABASE_KEY environment variables.'
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const randomQuery = generateRandomString(10);

    // 1. Try accessing keep-alive table first (standard travisvn pattern)
    const { data: keepAliveData, error: keepAliveError } = await supabase
      .from('keep-alive')
      .select('*')
      .eq('name', randomQuery);

    if (!keepAliveError) {
      return res.status(200).json({
        success: true,
        message: `Queried 'keep-alive' table successfully`,
        data: keepAliveData,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Fallback to public allowed_emails query to guarantee active DB read
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('allowed_emails')
      .select('count', { count: 'exact', head: true });

    if (fallbackError) {
      return res.status(500).json({
        success: false,
        error: fallbackError.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Keep-alive ping successful via fallback query (allowed_emails)',
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Unknown error occurred during keep-alive ping.'
    });
  }
}
