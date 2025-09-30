import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#2563eb" />
  <text x="32" y="40" font-size="28" text-anchor="middle" fill="white" font-family="Arial, Helvetica, sans-serif">C</text>
</svg>`;

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=86400'
        }
    });
};
