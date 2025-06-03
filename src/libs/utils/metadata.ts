import type { Metadata } from "next";
import { MetadataKey, MetaTitle } from "./constants";
import { getUrl, URLS } from "./urls";
import { getHeaders } from "./headers";

type OpenGraphArticle = {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  section?: null | string;
  ogUrl?: string
};

type Props = {
  openGraphArticle?: OpenGraphArticle;
  description?: string;
  title?: string;
  imageUrl?: string | null;
  tags?: string[];
  urlData?: string;
  canonicalUrl?: string;
  verificationGoogle?: string;
  verificationYandex?: string;
};

export const getMetadata = async ({
  title,
  description,
  imageUrl,
  urlData,
  openGraphArticle,
  tags,
  canonicalUrl,
}: Props): Promise<Metadata> => {
  const url = urlData ? urlData : getUrl({ path: (await getHeaders()).path })
  const getMetadataTitle = () => (modifiedTitle === title ? modifiedTitle : `${modifiedTitle}`)
  const modifiedTitle = title || MetaTitle;
  const medifiedDescription = description;
  const images = [{
    url: imageUrl ? `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}` : URLS.ogImage,
    alt: getMetadataTitle(),
    type: "image/png",
    width: 1200,
    height: 630
  }];


  const openGraphData: OpenGraphArticle = {
    ...openGraphArticle,
    publishedTime: openGraphArticle?.publishedTime || new Date().toISOString(),
    modifiedTime: openGraphArticle?.publishedTime || new Date().toISOString(),
  };

  return {
    generator: modifiedTitle,
    applicationName: modifiedTitle,
    creator: modifiedTitle,
    publisher: modifiedTitle,
    category: "shopping.construction_materials",
    referrer: "origin-when-cross-origin",
    authors: [{ name: modifiedTitle, url }],
    metadataBase: new URL(url),
    title: {
      default: modifiedTitle,
      template: `%s`
    },
    // keywords: keywords?.length ? keywords : MetadataKey,
    keywords: tags?.length ? tags : MetadataKey,
    description: medifiedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: {
        default: modifiedTitle,
        template: `%s`
      },
      description: medifiedDescription,
      url: url,
      siteName: modifiedTitle,
      locale: 'en_EN',
      type: "website",
      images,
      phoneNumbers: '+7 (000) 000-00-00',
      ...openGraphData
    },
    twitter: {
      card: "summary_large_image",
      title: { default: modifiedTitle, template: `%s` },
      description: medifiedDescription,
      images,
      creator: url
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    appleWebApp: { capable: true, title, statusBarStyle: "default" },
  };
};