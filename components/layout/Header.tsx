import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartButton } from '@/components/shop/CartButton';
import { PRIMARY_NAV } from '@/lib/site';

/**
 * Sticky-Header, ruhig.
 *
 * Markup absichtlich knapp:
 *   - Logo links
 *   - Desktop-Nav mittig-rechts
 *   - Mobile-Burger ab `md:hidden`
 *
 * Cart-Button kommt in Block 4 dazu.
 */
export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-paper/10 bg-black/90 text-paper backdrop-blur"
      role="banner"
    >
      <div className="container-edit flex h-18 items-center justify-between gap-6">
        <Logo variant="header" />

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline font-display text-[14px] uppercase tracking-[0.08em] text-paper/85 hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
