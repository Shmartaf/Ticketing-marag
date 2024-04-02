// supabaseClient.jsx
import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
    const url = import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_URL;
    const key = import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_KEY;

    console.log('URL:', url);
    console.log('Key:', key);

    const supabase = createClient(url, key);

    // console.log('Supabase:', supabase);

    return supabase;
};
