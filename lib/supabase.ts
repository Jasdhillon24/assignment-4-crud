// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dgszhicdpzhsvkxmzgiz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnc3poaWNkcHpoc3ZreG16Z2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzA1NDYsImV4cCI6MjA1ODU0NjU0Nn0.n2uqGfxgqTcXms67hRcenyJ79ze9_7YbCwwoWt-Dt20';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
