import { NextRequest, NextResponse } from 'next/server';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file1 = formData.get('file1') as File;
    const file2 = formData.get('file2') as File;

    if (!file1 || !file2) {
      return NextResponse.json({ error: 'Two files required' }, { status: 400 });
    }

    const bytes1 = await file1.arrayBuffer();
    const bytes2 = await file2.arrayBuffer();

    const pdf1 = await pdfjsLib.getDocument({ data: bytes1 }).promise;
    const pdf2 = await pdfjsLib.getDocument({ data: bytes2 }).promise;

    let result = 'Comparison Result:\n\n';

    if (pdf1.numPages !== pdf2.numPages) {
      result += `Different number of pages: ${pdf1.numPages} vs ${pdf2.numPages}\n`;
    } else {
      result += `Same number of pages: ${pdf1.numPages}\n`;
    }

    result += '\nFiles have been compared. For detailed diff, use specialized PDF comparison tools.';

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to compare' }, { status: 500 });
  }
}
