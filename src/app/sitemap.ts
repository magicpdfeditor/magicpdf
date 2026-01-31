import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://magicpdf-eight.vercel.app';
  
  const tools = [
    'jpg-to-pdf',
    'merge',
    'split',
    'compress',
    'convert',
    'extract',
    'watermark',
    'word-to-pdf',
    'powerpoint-to-pdf',
    'excel-to-pdf',
    'pdf-to-jpg',
    'rotate-pdf',
    'html-to-pdf',
    'edit-pdf',
    'sign-pdf',
    'unlock-pdf',
    'protect-pdf',
    'organize-pdf',
    'page-numbers',
    'redact-pdf',
    'crop-pdf',
    'pdf-to-pdfa',
    'repair-pdf',
    'scan-pdf',
    'ocr-pdf',
    'compare-pdf',
  ];

  const infoPages = ['about', 'contact', 'privacy-policy', 'terms'];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...infoPages.map((page) => ({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
