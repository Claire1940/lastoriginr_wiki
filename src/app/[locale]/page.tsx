import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lastoriginr.wiki'
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const title = 'Last Origin R Wiki - Codes, Tier List & Builds'
  const description =
    'Last Origin R Wiki with codes, tier lists, reroll tips, squad builds, bioroid guides, and download links for PC, Android, and iOS.'

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'Last Origin R Wiki',
      title,
      description,
      url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
      images: [
        {
          url: heroImageUrl,
          width: 1920,
          height: 1080,
          alt: 'Last Origin R gameplay preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImageUrl],
    },
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  return <HomePageClient latestArticles={latestArticles} moduleLinkMap={moduleLinkMap} locale={locale} />
}
