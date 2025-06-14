export default {
  async fetch(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
      return new Response("Missing ?url parameter", { status: 400 });
    }

    try {
      const html = await fetchHtml(targetUrl);
      const ogp = extractOgp(html);
      const shortcode = buildShortcode({ url: targetUrl, ...ogp });

      return new Response(shortcode, {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    } catch (err) {
      return new Response("Failed to extract OGP", { status: 500 });
    }
  },
};

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; OGPFetcher/1.0)" },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.text();
}

function extractOgp(html: string): {
  ogTitle: string;
  ogDesc: string;
  ogImage: string;
} {
  const getMeta = (prop: string): string => {
    const pattern = new RegExp(
      `<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`,
      "i"
    );
    const match = html.match(pattern);
    return match?.[1]?.trim() || "";
  };

  let ogTitle = getMeta("og:title");
  if (!ogTitle) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    ogTitle = titleMatch?.[1]?.trim() || "";
  }

  const ogDesc = getMeta("og:description");
  const ogImage = getMeta("og:image");

  return { ogTitle, ogDesc, ogImage };
}

function buildShortcode({
  url,
  ogTitle,
  ogDesc,
  ogImage,
}: {
  url: string;
  ogTitle: string;
  ogDesc: string;
  ogImage: string;
}): string {
  return `{{< linkCard
    url="${url}"
    title="${ogTitle}"
    description="${ogDesc}"
    image="${ogImage}"
>}}`;
}
