import { getDocument } from 'pdfjs-dist';
import path from 'path';
import fs from 'fs/promises';

export async function extractTextFromPublicPDF(pdfName: string): Promise<string> {
  try {
    const pdfPath = path.join(process.cwd(), 'public', pdfName);
    const pdfBuffer = await fs.readFile(pdfPath);
    
    // Configurer l'environnement worker pour pdf.js
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const pdf = await getDocument({ data: pdfBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((item: any) => item.str).join(' ');
      fullText += text + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Erreur lors de l\'extraction du PDF:', error);
    throw error;
  }
} 