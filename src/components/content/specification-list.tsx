type SpecificationListProps = {
  items: Array<{ label: string; value: string }>;
};

export function SpecificationList({ items }: SpecificationListProps) {
  if (items.length === 0) return null;

  return (
    <dl className="grid border-t border-line sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[minmax(8rem,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-line py-4 sm:odd:pe-6 sm:even:ps-6"
        >
          <dt className="text-sm font-medium text-muted">{item.label}</dt>
          <dd className="font-semibold text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
