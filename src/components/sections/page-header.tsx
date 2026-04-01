"use client";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-muted/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
