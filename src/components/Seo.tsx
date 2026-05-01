import { useEffect } from "react";
import en from "../locales/en.json";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
};

function upsertMeta(name: string, content: string, useProperty = false): void {
  const selector = useProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    if (useProperty) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export default function Seo({ title, description, path, keywords }: SeoProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = new URL(path, origin).toString();
    const finalKeywords = keywords ?? en.seo.defaultKeywords;

    document.title = "Gung Ho";
    upsertCanonical(canonicalUrl);
    upsertMeta("description", description);
    upsertMeta("keywords", finalKeywords);
    upsertMeta("robots", "index, follow, max-image-preview:large");

    upsertMeta("og:type", "website", true);
    upsertMeta("og:site_name", en.seo.siteName, true);
    upsertMeta("og:title", title, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:url", canonicalUrl, true);

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
  }, [title, description, path, keywords]);

  return null;
}
