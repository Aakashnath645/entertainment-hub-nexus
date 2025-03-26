
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rwlowexeuyjojbznfeck.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bG93ZXhldXlqb2piem5mZWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTE5MDYsImV4cCI6MjA1ODU2NzkwNn0.BEuTim9WJGl1bZHyVrtqpqUhUjoV9V-yFMkWA42XXpo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  }
});
