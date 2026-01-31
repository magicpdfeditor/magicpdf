import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();

    // For each file, we'll create a simple PDF with the filename
    // In a production app, you'd use libraries like Sharp for image conversion
    // or LibreOffice for document conversion
    for (const file of files) {
      const page = pdfDoc.addPage([595, 842]); // A4 size
      const { height } = page.getSize();
      
      // Add filename as content
      page.drawText(`File: ${file.name}`, {
        x: 50,
        y: height - 100,
        size: 14,
      });

      page.drawText(`Size: ${(file.size / 1024).toFixed(2)} KB`, {
        x: 50,
        y: height - 150,
        size: 12,
      });

      page.drawText(`Type: ${file.type}`, {
        x: 50,
        y: height - 200,
        size: 12,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error) {
    console.error('Error converting files:', error);
    return NextResponse.json(
      { error: 'Failed to convert files' },
      { status: 500 }
    );
  }
}
