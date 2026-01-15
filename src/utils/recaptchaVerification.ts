import { supabase } from "@/integrations/supabase/client";

export async function verifyRecaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
      body: { token }
    });

    if (error) {
      console.error('Error verificando reCAPTCHA:', error);
      return { success: false, error: 'Error al verificar CAPTCHA' };
    }

    return data;
  } catch (error) {
    console.error('Error en verifyRecaptcha:', error);
    return { success: false, error: 'Error de conexión' };
  }
}
