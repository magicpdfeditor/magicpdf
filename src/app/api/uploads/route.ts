import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
    const files = await fs.readdir(uploadsDir);
    return NextResponse.json({ files });
  } catch (err) {
    return NextResponse.json({ files: [], error: 'No uploads directory or no files yet' });
  }
}
