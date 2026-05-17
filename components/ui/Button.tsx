import { forwardRef } from 'react';
import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'link';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center font-display font-medium uppercase tracking-[0.08em] ' +
  'transition-colors duration-slow ease-quiet focus-visible:outline-offset-4 ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-graphite',
  ghost: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  link: 'p-0 underline-offset-4 hover:underline',
};

const SIZES: Record<Size, string> = {
  md: 'h-11 px-6 text-[13px]',
  lg: 'h-14 px-8 text-[14px]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className, children, ...rest } = props;
    const classes = cn(
      BASE,
      VARIANTS[variant],
      variant !== 'link' && SIZES[size],
      className,
    );

    if ('href' in props && typeof props.href === 'string') {
      const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
      const isExternal = /^https?:/.test(href);
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            rel="noopener noreferrer"
            target="_blank"
            {...anchorProps}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
