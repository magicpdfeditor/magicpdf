import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    console.log(`[jpg-to-pdf] Received ${files.length} file(s)`);

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();

    for (const imageFile of files) {
      try {
        console.log(`[jpg-to-pdf] Processing file: ${imageFile.name} type=${imageFile.type}`);
        const imageBytes = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(imageBytes);
        
        let image;
        const fileName = imageFile.name.toLowerCase();
        
        // Try to embed based on file type
        if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || imageFile.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(uint8Array);
        } else if (fileName.endsWith('.png') || imageFile.type === 'image/png') {
          image = await pdfDoc.embedPng(uint8Array);
        } else {
          // Try JPEG by default, fallback to PNG
          try {
            image = await pdfDoc.embedJpg(uint8Array);
          } catch {
            image = await pdfDoc.embedPng(uint8Array);
          }
        }

        // Optionally save the original upload to public/uploads when running locally
        try {
          if (process.env.NODE_ENV !== 'production') {
            const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
            await fs.mkdir(uploadsDir, { recursive: true });
            const safeName = `${Date.now()}-${imageFile.name.replace(/[^a-z0-9_.-]/gi, '_')}`;
            const outPath = path.join(uploadsDir, safeName);
            await fs.writeFile(outPath, Buffer.from(uint8Array));
            console.log(`[jpg-to-pdf] Saved upload to ${outPath}`);
          }
        } catch (saveErr) {
          console.error('Failed to save uploaded image for debugging:', saveErr);
        }

        // Add a new page with the image
        const { width, height } = image.scaleToFit(550, 750);
        const page = pdfDoc.addPage([595, 842]); // A4 size
        
        // Draw image centered on page
        const x = (595 - width) / 2;
        const y = (842 - height) / 2;
        
        page.drawImage(image, {
          x,
          y,
          width,
          height,
        });
      } catch (fileError) {
        console.error(`Error processing ${imageFile.name}:`, fileError);
        throw fileError; // Throw to let caller know about the issue
      }
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="images.pdf"',
      },
    });
  } catch (error) {
    console.error('JPG to PDF conversion error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to convert images to PDF'
      },
      { status: 500 }
    );
  }
}
