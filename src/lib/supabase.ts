import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteTemplate {
  id: string;
  template_id: string;
  config: any;
  updated_at: string;
}

export const loadTemplateFromBackend = async (templateId: string): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from('site_templates')
      .select('config')
      .eq('template_id', templateId)
      .single();

    if (error) {
      console.error('Error loading template from backend:', error);
      return null;
    }

    return data?.config || null;
  } catch (error) {
    console.error('Error loading template from backend:', error);
    return null;
  }
};

export const saveTemplateToBackend = async (templateId: string, config: any): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('site_templates')
      .upsert(
        {
          template_id: templateId,
          config: config,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'template_id',
        }
      );

    if (error) {
      console.error('Error saving template to backend:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving template to backend:', error);
    return false;
  }
};
