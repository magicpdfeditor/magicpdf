# PDF Magic - Free PDF Tools

A modern, feature-rich PDF manipulation website similar to "I Love PDF". Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Merge PDFs** - Combine multiple PDF files into one
- **Split PDFs** - Extract specific pages from a PDF
- **Compress PDFs** - Reduce file size while maintaining quality
- **Convert to PDF** - Convert images and documents (Coming Soon)
- **Extract Text** - Extract text from PDF files (Coming Soon)
- **Add Watermark** - Add watermarks to PDFs (Coming Soon)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **PDF Processing**: pdf-lib, pdfjs-dist
- **Backend**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── merge/
│   │   └── page.tsx        # Merge PDF page
│   ├── split/
│   │   └── page.tsx        # Split PDF page
│   ├── compress/
│   │   └── page.tsx        # Compress PDF page
│   ├── convert/
│   │   └── page.tsx        # Convert page (coming soon)
│   ├── extract/
│   │   └── page.tsx        # Extract text page (coming soon)
│   ├── watermark/
│   │   └── page.tsx        # Watermark page (coming soon)
│   └── api/
│       ├── merge/route.ts  # Merge API endpoint
│       ├── split/route.ts  # Split API endpoint
│       └── compress/route.ts # Compress API endpoint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Implemented

### Merge PDF
- Upload multiple PDF files
- Combine them into a single PDF
- Download the merged result

### Split PDF
- Upload a PDF file
- Extract specific pages (supports ranges like 1-5 or individual pages 1,3,5)
- Download the extracted pages

### Compress PDF
- Upload a PDF file
- Select compression level (Low, Medium, High)
- Download compressed PDF

## Future Enhancements

1. **Image Conversion**: Convert JPG, PNG to PDF
2. **Text Extraction**: OCR-based text extraction from PDFs
3. **Watermarking**: Add text and image watermarks
4. **Batch Processing**: Process multiple files simultaneously
5. **Cloud Storage**: Save and manage files
6. **User Accounts**: Track processing history

## Security

- Files are processed server-side
- No files are stored permanently
- All operations are secure and private

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.
