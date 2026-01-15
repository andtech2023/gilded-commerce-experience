import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef, useImperativeHandle, useRef } from "react";

// Site key from Supabase secrets (public key)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

export interface ReCaptchaRef {
  reset: () => void;
  getValue: () => string | null;
}

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
  className?: string;
}

const ReCaptchaComponent = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onChange, className = "" }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      },
      getValue: () => {
        return recaptchaRef.current?.getValue() ?? null;
      },
    }));

    if (!RECAPTCHA_SITE_KEY) {
      console.warn("RECAPTCHA_SITE_KEY no está configurada");
      return null;
    }

    return (
      <div className={`flex justify-center ${className}`}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onChange}
          theme="light"
          size="normal"
        />
      </div>
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptcha";

export default ReCaptchaComponent;
