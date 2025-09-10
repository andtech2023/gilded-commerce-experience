-- Primero agregamos las nuevas columnas si no existen
ALTER TABLE public.contactos_formulario 
ADD COLUMN IF NOT EXISTS nombre text,
ADD COLUMN IF NOT EXISTS apellido text,
ADD COLUMN IF NOT EXISTS pagina_origen text,
ADD COLUMN IF NOT EXISTS utm_source text,
ADD COLUMN IF NOT EXISTS utm_medium text,
ADD COLUMN IF NOT EXISTS utm_campaign text,
ADD COLUMN IF NOT EXISTS estado text,
ADD COLUMN IF NOT EXISTS fecha_envio timestamp with time zone DEFAULT now();

-- Migramos los datos existentes de nombre_apellido a nombre
UPDATE public.contactos_formulario 
SET nombre = nombre_apellido 
WHERE nombre IS NULL AND nombre_apellido IS NOT NULL;

-- Ahora podemos eliminar la columna antigua
ALTER TABLE public.contactos_formulario 
DROP COLUMN IF EXISTS nombre_apellido;

-- Hacemos que nombre sea obligatorio
ALTER TABLE public.contactos_formulario 
ALTER COLUMN nombre SET NOT NULL;