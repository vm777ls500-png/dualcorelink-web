type ContactCardProps = {
  label: string;
  value: string;
  href: string;
  description: string;
  highlight?: boolean;
};

export function ContactCard({
  label,
  value,
  href,
  description,
  highlight = false,
}: ContactCardProps) {
  return (
    <a
      href={href}
      className={
        highlight
          ? "block border border-brand bg-brand p-6 text-white"
          : "block border border-line bg-surface p-6"
      }
    >
      <p
        className={
          highlight
            ? "text-sm font-semibold uppercase text-white/70"
            : "text-sm font-semibold uppercase text-brand"
        }
      >
        {label}
      </p>
      <p className="mt-3 break-all text-xl font-semibold">{value}</p>
      <p className={highlight ? "mt-3 leading-7 text-white/75" : "mt-3 leading-7 text-muted"}>
        {description}
      </p>
    </a>
  );
}
