import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { getNavPreviewData } from '@/lib/nav-preview'
import type { Language } from '@/lib/content'
import { getWikiLinks } from '@/lib/wiki-links'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import ClientBody from '../ClientBody'
import Analytics from '@/components/Analytics'
import { SocialBarAd } from '@/components/ads'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// 生成静态参数
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lastoriginr.wiki";
  const heroImageUrl = new URL("/images/hero.webp", siteUrl).toString();
  const title = "Last Origin R Wiki - Codes, Tier List & Builds";
  const description =
    "Last Origin R Wiki with codes, tier lists, reroll tips, squad builds, bioroid guides, and download links for PC, Android, and iOS.";

  return {
    title,
    description,
    keywords: [
      "Last Origin R",
      "Last Origin R Wiki",
      "codes",
      "tier list",
      "reroll",
      "builds",
      "bioroids",
      "PC",
      "Android",
      "iOS",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: locale === "en" ? siteUrl : `${siteUrl}/${locale}`,
      siteName: "Last Origin R Wiki",
      title,
      description,
      images: [
        {
          url: heroImageUrl,
          width: 1920,
          height: 1080,
          alt: "Last Origin R gameplay preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [heroImageUrl],
      creator: "@LastOriginRplus",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    other: {
      "google-adsense-account": "ca-pub-7733402184034568",
    },
    alternates: buildLanguageAlternates("/", locale as Locale, siteUrl),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale)

  // 验证 locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // 获取翻译消息（不需要 setRequestLocale！）
  const messages = await getMessages();
  const navPreviewData = await getNavPreviewData(locale as Language);
  const wikiLinks = getWikiLinks();

	return (
		<>
			<Script
				crossOrigin="anonymous"
				src="https://unpkg.com/same-runtime@0.0.1/dist/index.global.js"
				strategy="beforeInteractive"
			/>
			<Script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7733402184034568"
				crossOrigin="anonymous"
				strategy="lazyOnload"
			/>
			<div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Analytics />
				<NextIntlClientProvider messages={messages}>
					<ClientBody navPreviewData={navPreviewData} wikiLinks={wikiLinks}>{children}</ClientBody>
				</NextIntlClientProvider>
				{/* 社交栏广告 */}
				<SocialBarAd adKey={process.env.NEXT_PUBLIC_AD_SOCIAL_BAR || ''} />
			</div>
		</>
	)
}
