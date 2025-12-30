interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-brand-900 text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-brand-500 mt-1 text-sm">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
