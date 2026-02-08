import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const title = url.searchParams.get("title") || "KARTAVYA NGO Incubator";
    const description =
      url.searchParams.get("description") ||
      "Building tomorrow's social change leaders";

    const svg = generateOGImage(title, description);

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

function generateOGImage(title: string, description: string): string {
  const width = 1200;
  const height = 630;

  const titleLines = wrapText(title, 50);
  const descriptionLines = wrapText(description, 55);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#grad)"/>

  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
  <circle cx="${width - 100}" cy="${height - 100}" r="120" fill="rgba(255,255,255,0.08)"/>

  <!-- White overlay -->
  <rect x="60" y="80" width="${width - 120}" height="${height - 160}" fill="white" rx="20" opacity="0.95"/>

  <!-- Logo/Brand mark -->
  <rect x="80" y="100" width="40" height="40" fill="#10b981" rx="8"/>
  <text x="100" y="128" font-size="24" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial, sans-serif">K</text>

  <!-- Title -->
  ${titleLines.map((line, idx) => {
    const y = 180 + idx * 60;
    return `<text x="120" y="${y}" font-size="56" font-weight="bold" fill="#1f2937" font-family="Arial, sans-serif">${escapeXml(line)}</text>`;
  }).join("\n  ")}

  <!-- Description -->
  ${descriptionLines.map((line, idx) => {
    const y = 380 + idx * 45;
    return `<text x="120" y="${y}" font-size="36" fill="#6b7280" font-family="Arial, sans-serif">${escapeXml(line)}</text>`;
  }).join("\n  ")}

  <!-- Footer accent line -->
  <rect x="80" y="${height - 60}" width="100" height="4" fill="#10b981" rx="2"/>
  <text x="200" y="${height - 40}" font-size="24" fill="#6b7280" font-family="Arial, sans-serif" font-weight="500">kartavya.org</text>
</svg>`;
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 2);
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
