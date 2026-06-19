import { brand, createWhatsAppUrl } from "@/config/brand";

type WhatsAppButtonProps = {
  message?: string;
  className?: string;
};

export function WhatsAppButton({ message, className }: WhatsAppButtonProps) {
  return (
    <a
      href={createWhatsAppUrl(message)}
      className={
        className ??
        "inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
      }
    >
      {brand.whatsapp.label}
    </a>
  );
}
