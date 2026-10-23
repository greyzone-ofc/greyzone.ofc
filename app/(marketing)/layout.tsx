import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { SvgSprite } from '@/components/layout/SvgSprite';
import { SiteEffects } from '@/components/interactions/SiteEffects';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SvgSprite />
      <SiteHeader />
      <MenuOverlay />
      <main id="page">{children}</main>
      <SiteFooter />
      <SiteEffects />
    </>
  );
}
