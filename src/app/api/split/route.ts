import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const pagesStr = formData.get('pages') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Parse page numbers
    const pageNumbers: number[] = [];
    const parts = pagesStr.split(',');
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(p => parseInt(p.trim()));
        for (let i = start; i <= end; i++) {
          pageNumbers.push(i - 1); // 0-indexed
        }
      } else {
        pageNumbers.push(parseInt(part.trim()) - 1); // 0-indexed
      }
    }

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const newPdf = await PDFDocument.create();

    for (const pageNum of pageNumbers) {
      if (pageNum >= 0 && pageNum < pdf.getPageCount()) {
        const [copiedPage] = await newPdf.copyPages(pdf, [pageNum]);
        newPdf.addPage(copiedPage);
      }
    }

    const pdfBytes = await newPdf.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="split.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to split PDF' },
      { status: 500 }
    );
  }
}
