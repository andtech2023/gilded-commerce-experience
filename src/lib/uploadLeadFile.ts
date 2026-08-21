import { supabase } from "@/integrations/supabase/client";

export const LEAD_BUCKET = "facturas-leads";
export const MAX_LEAD_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "webp"];

export type UploadResult =
  | { ok: true; path: string | null }
  | { ok: false; error: string };

/**
 * Uploads a lead attachment (utility bill) to the private storage bucket.
 * Returns the stored path so it can be saved with the lead record.
 */
export async function uploadLeadFile(
  file: File | null,
  prefix: string
): Promise<UploadResult> {
  if (!file) return { ok: true, path: null };

  if (file.size > MAX_LEAD_FILE_BYTES) {
    return { ok: false, error: "El archivo supera los 10 MB." };
  }

  const extension = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { ok: false, error: "Formato no admitido. Usa PDF, JPG, PNG o WEBP." };
  }

  const path = `${prefix}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(LEAD_BUCKET)
    .upload(path, file, { contentType: file.type || undefined, upsert: false });

  if (error) {
    return { ok: false, error: "No se ha podido subir la factura." };
  }

  return { ok: true, path };
}
