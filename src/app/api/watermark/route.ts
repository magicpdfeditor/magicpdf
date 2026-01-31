import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const watermarkType = formData.get('watermarkType') as string;
    const opacity = parseInt(formData.get('opacity') as string);

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();

    if (watermarkType === 'text') {
      const watermarkText = formData.get('watermarkText') as string;

      // Add text watermark to all pages
      for (const page of pages) {
        const { width, height } = page.getSize();
        const opacityValue = opacity / 100;

        page.drawText(watermarkText, {
          x: width / 2 - (watermarkText.length * 3),
          y: height / 2,
          size: 60,
          color: rgb(0.8, 0.8, 0.8),
          opacity: opacityValue,
          rotate: 0.7854 as any,
        });
      }
    } else if (watermarkType === 'image') {
      const watermarkImageFile = formData.get('watermarkImage') as File;

      if (!watermarkImageFile) {
        return NextResponse.json(
          { error: 'No watermark image provided' },
          { status: 400 }
        );
      }

      const imageBytes = await watermarkImageFile.arrayBuffer();
      const imageType = watermarkImageFile.type.toLowerCase();

      let embeddedImage;
      if (imageType.includes('png')) {
        embeddedImage = await pdfDoc.embedPng(imageBytes);
      } else if (imageType.includes('jpeg') || imageType.includes('jpg')) {
        embeddedImage = await pdfDoc.embedJpg(imageBytes);
      } else {
        return NextResponse.json(
          { error: 'Unsupported image format. Use PNG or JPG.' },
          { status: 400 }
        );
      }

      const opacityValue = opacity / 100;

      // Add image watermark to all pages
      for (const page of pages) {
        const { width, height } = page.getSize();
        const imgWidth = width * 0.3;
        const imgHeight = (embeddedImage.height / embeddedImage.width) * imgWidth;

        page.drawImage(embeddedImage, {
          x: width / 2 - imgWidth / 2,
          y: height / 2 - imgHeight / 2,
          width: imgWidth,
          height: imgHeight,
          opacity: opacityValue,
        });
      }
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="watermarked.pdf"',
      },
    });
  } catch (error) {
    console.error('Error adding watermark:', error);
    return NextResponse.json(
      { error: 'Failed to add watermark' },
      { status: 500 }
    );
  }
}
