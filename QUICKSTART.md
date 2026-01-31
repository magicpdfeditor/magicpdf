# Quick Start Guide - PDF Magic

## ⚠️ Before Running

You need to have **Node.js** installed on your computer. 

### Install Node.js

1. Visit https://nodejs.org/
2. Download the LTS version (currently v20)
3. Run the installer and follow the steps
4. After installation, **restart your terminal/VS Code**

**Verify Installation:**
```bash
node --version
npm --version
```

## 🚀 Running the Website

Once Node.js is installed, follow these steps in the terminal:

### 1. Install Dependencies
```bash
npm install
```

This will download all required packages (Next.js, React, Tailwind CSS, pdf-lib, etc.)

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
- Navigate to: **http://localhost:3000**
- You should see the PDF Magic homepage

## 📁 Project Files

- `src/app/page.tsx` - Home page with 6 PDF tools
- `src/app/merge/page.tsx` - Merge PDF tool
- `src/app/split/page.tsx` - Split PDF tool  
- `src/app/compress/page.tsx` - Compress PDF tool
- `src/app/api/merge/route.ts` - Backend merge API
- `src/app/api/split/route.ts` - Backend split API

## 🔧 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Check code quality

## ⚡ Features Ready to Use

✅ **Merge PDF** - Combine multiple PDFs  
✅ **Split PDF** - Extract pages from PDF  
✅ **Compress PDF** - Reduce file size  
🔜 **Convert to PDF** - Coming soon  
🔜 **Extract Text** - Coming soon  
🔜 **Add Watermark** - Coming soon

## 🎨 Customization

The website uses Tailwind CSS for styling. You can customize colors and appearance in `tailwind.config.js`.

## 🐛 Troubleshooting

**"npm is not recognized"**
- You haven't installed Node.js yet, or you need to restart your terminal

**"Module not found"**
- Run `npm install` to download all dependencies

**Port 3000 already in use**
- Change the port: `npm run dev -- -p 3001`

## 📞 Support

For issues with:
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- PDF handling: https://pdfkit.org

---

**Once Node.js is installed, you can run the website immediately!**
