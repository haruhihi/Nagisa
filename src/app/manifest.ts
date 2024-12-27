import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meow',
    short_name: 'Meow',
    description: 'Meow meow meow',
    start_url: '/',
    display: 'standalone',
    "icons": [
      {
        "src": "/web-app-manifest-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
    "theme_color": "#ffffff",
    "background_color": "#003345",
  }
}