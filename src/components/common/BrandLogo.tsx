import Image from 'next/image';

import { cn } from '@/lib/utils';

type BrandLogoProps = {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
};

const variantClasses = {
  header: 'h-9 max-w-[180px] sm:h-10 sm:max-w-[200px] xl:max-w-[220px]',
  footer: 'h-12 max-w-[220px] sm:h-14 sm:max-w-[240px]',
  compact: 'h-9 max-w-[180px]',
};

export function BrandLogo({
  variant = 'header',
  className,
}: BrandLogoProps) {
  return (
    <Image
      src="/brand/chittety-logo-v2.png"
      alt="Chittety Construction"
      width={2508}
      height={627}
      priority={variant === 'header'}
      sizes={variant === 'footer' ? '240px' : '(max-width: 640px) 180px, 220px'}
      className={cn(
        'block w-auto object-contain object-left',
        variantClasses[variant],
        className
      )}
    />
  );
}
