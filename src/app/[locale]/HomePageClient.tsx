"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  Compass,
  ExternalLink,
  Gamepad2,
  RefreshCcw,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lastoriginr.wiki";
  const officialSiteUrl = "https://vfun.valofe.com/library?service_code=lastorigin-gl";
  const discordUrl = "https://discord.gg/tgmbFm3JCA";
  const xUrl = "https://x.com/LastOriginRplus";
  const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.valofe.laotw";
  const appStoreUrl = "https://apps.apple.com/us/app/last-origin-r/id6739530701";
  const videoId = "iN3FBZ9izgY";
  const videoWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const heroImageUrl = new URL("/images/hero.webp", siteUrl).toString();
  const mobileBannerAd = getPreferredMobileBannerSelection();
  const moduleHeadingClass = "text-4xl md:text-5xl font-bold mb-4";
  const moduleHeadingClassCodes = "text-3xl md:text-5xl font-bold mb-3 md:mb-4";
  const moduleLinkClass = "inline-flex items-center gap-2 hover:text-[hsl(var(--nav-theme-light))] transition-colors";

  const sectionIds = [
    "codes",
    "beginner-guide",
    "tier-list",
    "reroll-guide",
    "team-builds",
    "combat-formation-guide",
    "characters-units",
    "events-update-log",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Last Origin R Wiki",
        description:
          "Last Origin R Wiki with codes, beginner routes, tier priorities, reroll plans, team builds, combat guides, and update tracking.",
        image: {
          "@type": "ImageObject",
          url: heroImageUrl,
          width: 480,
          height: 360,
          caption: "Last Origin R gameplay preview",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Last Origin R Wiki",
        alternateName: "Last Origin R",
        url: siteUrl,
        description:
          "Unofficial Last Origin R community wiki for tactical guides, squad planning, and live update tracking.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: heroImageUrl,
          width: 480,
          height: 360,
          caption: "Last Origin R Wiki hero image",
        },
        sameAs: [officialSiteUrl, discordUrl, xUrl, googlePlayUrl, appStoreUrl],
      },
      {
        "@type": "VideoGame",
        name: "Last Origin R",
        gamePlatform: ["PC", "Android", "iOS"],
        applicationCategory: "Game",
        genre: ["Strategy RPG", "Turn-Based Tactics", "Post-Apocalyptic"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: officialSiteUrl,
        },
      },
      {
        "@type": "VideoObject",
        name: "Last Origin R Global Launch Gameplay",
        description:
          "Gameplay preview for Last Origin R featuring squad combat on the 9-grid battlefield.",
        uploadDate: "2026-05-21",
        thumbnailUrl: heroImageUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        url: videoWatchUrl,
      },
    ],
  };

  const renderModuleHeading = (moduleKey: string, title: string, className: string) => {
    const moduleLink = moduleLinkMap[moduleKey];
    if (!moduleLink?.url) {
      return <h2 className={className}>{title}</h2>;
    }

    return (
      <h2 className={className}>
        <Link href={`/${locale}${moduleLink.url}`} className={moduleLinkClass}>
          <span>{title}</span>
          <ExternalLink className="w-5 h-5" />
        </Link>
      </h2>
    );
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href={officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId={videoId} title="Last Origin R Global Launch Gameplay" />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <a
              href="#codes"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[0]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "0ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[0].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>

            <a
              href="#beginner-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[1]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "50ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[1].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>

            <a
              href="#tier-list"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[2]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "100ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[2].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>

            <a
              href="#reroll-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[3]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "150ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[3].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>

            <a
              href="#team-builds"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[4]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "200ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[4].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>

            <a
              href="#combat-formation-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[5]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "250ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[5].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>

            <a
              href="#characters-units"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[6]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "300ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[6].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>

            <a
              href="#events-update-log"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(sectionIds[7]);
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: "350ms" }}
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[7].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      {/* Module 1: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRCodes", t.modules.lastOriginRCodes.title, moduleHeadingClassCodes)}
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.lastOriginRCodes.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lastOriginRCodes.items.map((item: any, index: number) => (
              <article key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-bold text-base md:text-lg">{item.label}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1">{item.code}</p>
                <p className="text-sm text-muted-foreground mb-2">{item.reward}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} className="hidden md:flex" />

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRBeginnerGuide", t.modules.lastOriginRBeginnerGuide.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginRBeginnerGuide.intro}</p>
          </div>
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.lastOriginRBeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{step.priority}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Tier List */}
      <section id="tier-list" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRTierList", t.modules.lastOriginRTierList.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginRTierList.intro}</p>
          </div>
          <div className="scroll-reveal space-y-4">
            {t.modules.lastOriginRTierList.tiers.map((tier: any, index: number) => (
              <div key={index} className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-bold text-lg">{tier.tier} - {tier.label}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tier.entries.map((entry: any, ei: number) => (
                    <article key={ei} className="p-4 bg-white/5 border border-border rounded-lg">
                      <p className="font-semibold text-sm mb-1">{entry.name}</p>
                      <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">{entry.role}</p>
                      <p className="text-xs text-muted-foreground">{entry.reason}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Reroll Guide */}
      <section id="reroll-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRRerollGuide", t.modules.lastOriginRRerollGuide.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginRRerollGuide.intro}</p>
          </div>
          <div className="scroll-reveal space-y-4">
            {t.modules.lastOriginRRerollGuide.steps.map((step: any, index: number) => (
              <div key={index} className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-start gap-3">
                  <RefreshCcw className="w-5 h-5 mt-1 text-[hsl(var(--nav-theme-light))]" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.step}. {step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{step.details}</p>
                    <p className="text-xs border-l-2 border-[hsl(var(--nav-theme)/0.4)] pl-3 text-muted-foreground">{step.keepRule}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      {/* Module 5: Team Builds */}
      <section id="team-builds" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRTeamBuilds", t.modules.lastOriginRTeamBuilds.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginRTeamBuilds.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lastOriginRTeamBuilds.items.map((item: any, index: number) => (
              <article key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{item.tag}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <ul className="space-y-2">
                  {item.bullets.map((bullet: string, bi: number) => (
                    <li key={bi} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 text-[hsl(var(--nav-theme-light))]" />
                      <span className="text-xs text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Combat and Formation Guide */}
      <section id="combat-formation-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRCombatFormationGuide", t.modules.lastOriginRCombatFormationGuide.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginRCombatFormationGuide.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.lastOriginRCombatFormationGuide.steps.map((step: any, index: number) => (
              <article key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Swords className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">Step {step.step}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <p className="text-xs border-l-2 border-[hsl(var(--nav-theme)/0.4)] pl-3 text-muted-foreground">{step.tip}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Characters and Units */}
      <section id="characters-units" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginRCharactersAndUnits", t.modules.lastOriginRCharactersAndUnits.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginRCharactersAndUnits.intro}</p>
          </div>

          <div className="scroll-reveal overflow-hidden rounded-xl border border-border bg-white/5">
            <div className="hidden md:grid md:grid-cols-3 gap-4 px-5 py-3 border-b border-border text-sm font-semibold">
              <p>{t.modules.lastOriginRCharactersAndUnits.headers.category}</p>
              <p>{t.modules.lastOriginRCharactersAndUnits.headers.confirmedData}</p>
              <p>{t.modules.lastOriginRCharactersAndUnits.headers.playerUse}</p>
            </div>
            <div className="divide-y divide-border">
              {t.modules.lastOriginRCharactersAndUnits.rows.map((row: any, index: number) => (
                <article key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5 py-4">
                  <div className="flex items-start gap-2">
                    <UserRound className="w-4 h-4 mt-1 text-[hsl(var(--nav-theme-light))]" />
                    <p className="text-sm font-semibold">{row.category}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.confirmedData}</p>
                  <p className="text-sm text-muted-foreground">{row.playerUse}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 8: Events and Update Log */}
      <section id="events-update-log" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            {renderModuleHeading("lastOriginREventsAndUpdateLog", t.modules.lastOriginREventsAndUpdateLog.title, moduleHeadingClass)}
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.lastOriginREventsAndUpdateLog.intro}</p>
          </div>

          <div className="scroll-reveal space-y-4">
            {t.modules.lastOriginREventsAndUpdateLog.entries.map((entry: any, index: number) => (
              <article key={index} className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarClock className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{entry.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{entry.update}</h3>
                <p className="text-sm text-muted-foreground mb-2">{entry.details}</p>
                <p className="text-xs border-l-2 border-[hsl(var(--nav-theme)/0.4)] pl-3 text-muted-foreground">{entry.playerImpact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a href={xUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a href={videoWatchUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.steamStore}
                  </a>
                </li>
                <li>
                  <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1">
                    {t.footer.appStore}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link href="/copyright" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border/50 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
            <span>{t.footer.trademarkNote}</span>
            <Gamepad2 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
            <span>{t.footer.platformNote}</span>
            <Compass className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
            <span>{t.footer.updateNote}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
