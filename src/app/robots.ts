import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/profile/', '/journal/'],
        },
        sitemap: 'https://tfm-calma-app.vercel.app/sitemap.xml',
    }
}
