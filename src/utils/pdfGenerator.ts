import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import { CertificateRecord } from '../data/campaignData';

export async function generateVerificationQrDataUrl(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      width: 360,
      margin: 1,
      color: {
        dark: '#111827',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
  } catch (err) {
    console.error('QR generation error:', err);
    return '';
  }
}

function addClickablePdfLinksFromDom(
  pdf: jsPDF,
  pageElement: HTMLElement,
  verificationUrl: string
) {
  const pageRect = pageElement.getBoundingClientRect();
  const pageWidthPx = pageRect.width || 1122;
  const pageHeightPx = pageRect.height || 794;

  const linkNodes = pageElement.querySelectorAll<HTMLElement>('[data-pdf-link="true"]');

  if (linkNodes.length === 0) {
    return false;
  }

  linkNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const relX = rect.left - pageRect.left;
    const relY = rect.top - pageRect.top;
    const relW = rect.width;
    const relH = rect.height;

    if (relW > 0 && relH > 0) {
      const xMm = Math.max(0, (relX / pageWidthPx) * 297);
      const yMm = Math.max(0, (relY / pageHeightPx) * 210);
      const wMm = Math.min(297 - xMm, (relW / pageWidthPx) * 297);
      const hMm = Math.min(210 - yMm, (relH / pageHeightPx) * 210);

      const targetUrl = node.getAttribute('data-pdf-url') || verificationUrl;
      pdf.link(xMm, yMm, wMm, hMm, { url: targetUrl });
    }
  });

  return true;
}

function addDefaultPage1PdfLinks(pdf: jsPDF, verificationUrl: string) {
  // Center QR code + Manual Authentication Box hotspot on Page 1
  pdf.link(112, 144, 88, 30, { url: verificationUrl });
  // Bottom verification URL line hotspot on Page 1
  pdf.link(24, 184, 249, 11, { url: verificationUrl });
}

function addDefaultPage2PdfLinks(pdf: jsPDF, verificationUrl: string) {
  // Section 4 Manual verification URL line hotspot on Page 2
  pdf.link(16, 146, 228, 14, { url: verificationUrl });
  // Section 4 QR code hotspot on Page 2
  pdf.link(245, 130, 34, 34, { url: verificationUrl });
  // Bottom footer registry hotspot on Page 2
  pdf.link(95, 182, 107, 12, { url: verificationUrl });
}

export async function exportCertificateToPdf(
  page1Element: HTMLElement | null,
  page2Element: HTMLElement | null,
  cert: CertificateRecord,
  verificationUrl: string
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const fileName = `Certificado_Extensao_${cert.number}_${cert.code}_Lucas_Goncalves_Silveira.pdf`;

  if (page1Element && page2Element) {
    try {
      const options = {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#FAF9F6',
        width: 1122,
        height: 794,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '1122px',
          height: '794px',
        },
        cacheBust: true,
      };

      const [imgDataPage1, imgDataPage2] = await Promise.all([
        toPng(page1Element, options),
        toPng(page2Element, options),
      ]);

      if (
        imgDataPage1 &&
        imgDataPage1.length > 1000 &&
        imgDataPage2 &&
        imgDataPage2.length > 1000
      ) {
        // Page 1 image + native clickable PDF links
        pdf.addImage(imgDataPage1, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
        const addedP1 = addClickablePdfLinksFromDom(
          pdf,
          page1Element,
          verificationUrl
        );
        if (!addedP1) {
          addDefaultPage1PdfLinks(pdf, verificationUrl);
        } else {
          // Ensure generous fallback hotspots cover the QR code and footer URLs
          addDefaultPage1PdfLinks(pdf, verificationUrl);
        }

        // Page 2 image + native clickable PDF links
        pdf.addPage('a4', 'landscape');
        pdf.addImage(imgDataPage2, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
        const addedP2 = addClickablePdfLinksFromDom(
          pdf,
          page2Element,
          verificationUrl
        );
        if (!addedP2) {
          addDefaultPage2PdfLinks(pdf, verificationUrl);
        } else {
          addDefaultPage2PdfLinks(pdf, verificationUrl);
        }

        pdf.save(fileName);
        return;
      }
    } catch (domCaptureError) {
      console.warn('DOM capture fallback triggered:', domCaptureError);
    }
  }

  // Fallback high-precision programmatic vector/canvas PDF generation
  const qrDataUrl = await generateVerificationQrDataUrl(verificationUrl);
  drawVectorPdfFallback(pdf, cert, verificationUrl, qrDataUrl);
  pdf.save(fileName);
}

function drawVectorPdfFallback(
  pdf: jsPDF,
  cert: CertificateRecord,
  verificationUrl: string,
  qrDataUrl: string
) {
  const baseUrlClean = verificationUrl.split('?')[0];

  // PAGE 1 - FRENTE
  pdf.setFillColor(250, 249, 246); // #FAF9F6
  pdf.rect(0, 0, 297, 210, 'F');

  // Outer border #0F4C3A
  pdf.setDrawColor(15, 76, 58);
  pdf.setLineWidth(1.2);
  pdf.rect(6, 6, 285, 198);

  // Inner border #1B365D
  pdf.setDrawColor(27, 54, 93);
  pdf.setLineWidth(0.5);
  pdf.rect(8.5, 8.5, 280, 193);

  // Header Left
  pdf.setTextColor(15, 76, 58);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.text('EDITORA MENTE E SAÚDE', 34, 18);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(30, 41, 59);
  pdf.text('CNPJ: 51.372.335/0001-71', 34, 22.5);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(21, 128, 61);
  pdf.text('Conselho Editorial e Extensão Científica', 34, 26.8);

  // Header Center
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.8);
  pdf.setTextColor(15, 76, 58);
  pdf.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    148.5,
    17.5,
    { align: 'center' }
  );
  pdf.text('E EDUCAÇÃO EM SAÚDE', 148.5, 22, { align: 'center' });
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(30, 41, 59);
  pdf.text(
    `Certificado Nº ${cert.number} · Livro de Extensão nº ${cert.book} · Cód. ${cert.code}`,
    148.5,
    26.8,
    { align: 'center' }
  );

  // Header Right
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.8);
  pdf.setTextColor(27, 54, 93);
  pdf.text('CENTRO PROFISSIONALIZANTE', 260, 18, { align: 'right' });
  pdf.text('MARIA DALVA DE ARAÚJO', 260, 22.2, { align: 'right' });
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(30, 41, 59);
  pdf.text('CNPJ: 51.269.112/0001-83', 260, 26.8, { align: 'right' });

  // Divider
  pdf.setDrawColor(15, 76, 58);
  pdf.setLineWidth(0.4);
  pdf.line(15, 32, 282, 32);

  // Title
  pdf.setFont('times', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(15, 76, 58);
  pdf.text('CERTIFICADO DE ATIVIDADE DE EXTENSÃO', 148.5, 45, {
    align: 'center',
  });

  // Intro text
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(24, 34, 38);
  pdf.text(
    'A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:',
    148.5,
    55,
    { align: 'center' }
  );
  pdf.text(
    '51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que',
    148.5,
    60,
    { align: 'center' }
  );

  // Candidate Box
  pdf.setFillColor(242, 246, 244);
  pdf.setDrawColor(180, 200, 190);
  pdf.setLineWidth(0.35);
  pdf.rect(24, 65, 249, 23, 'FD');

  pdf.setFont('times', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(27, 54, 93);
  pdf.text(cert.holderName, 148.5, 75.5, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(24, 34, 38);
  pdf.text(
    `${cert.holderRole} | CPF: ${cert.holderCpf} | ${cert.holderInstitution}`,
    148.5,
    83.5,
    { align: 'center' }
  );

  // Main paragraphs
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.8);
  const p1 = `participou de forma efetiva da Atividade de Extensão intitulada "${cert.title}", desenvolvida na modalidade de ${cert.modality}, realizada no período de ${cert.period}, contabilizando carga horária total de ${cert.totalHours}.`;
  const splitP1 = pdf.splitTextToSize(p1, 248);
  pdf.text(splitP1, 24.5, 97);

  const splitP2 = pdf.splitTextToSize(cert.frontSummaryParagraph, 248);
  pdf.text(splitP2, 24.5, 113);

  // Date
  pdf.setFont('times', 'italic');
  pdf.setFontSize(12);
  pdf.text(`Goiânia - GO, ${cert.issueDate}.`, 148.5, 136, { align: 'center' });

  // Signatures & QR Code area
  pdf.setDrawColor(30, 41, 59);
  pdf.setLineWidth(0.35);
  pdf.line(20, 168, 95, 168);
  pdf.line(202, 168, 277, 168);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.text('BÁRBARA LIMA DOS SANTOS', 57.5, 173, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.2);
  pdf.text('Editora-Chefe e Coordenadora de Extensão Editorial', 57.5, 177, {
    align: 'center',
  });
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.5);
  pdf.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 57.5, 181, {
    align: 'center',
  });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.text('JAMES ARAÚJO DE SANTANA', 239.5, 173, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.2);
  pdf.text('Coordenador de Extensão e Projetos Educativos', 239.5, 177, {
    align: 'center',
  });
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.5);
  pdf.text(
    'Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)',
    239.5,
    181,
    {
      align: 'center',
    }
  );

  if (qrDataUrl) {
    pdf.addImage(qrDataUrl, 'PNG', 124, 151, 25, 25);
  }

  pdf.setDrawColor(148, 163, 184);
  pdf.rect(151, 151, 46, 25);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6.2);
  pdf.text('AUTENTICAÇÃO PÚBLICA MANUAL', 153, 155.5);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6);
  pdf.text(`Cód.: ${cert.code}`, 153, 160);
  pdf.text(`Chave: ${cert.controlKey}`, 153, 164);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Endereço p/ Verificação Online:', 153, 168.5);
  pdf.setFont('courier', 'normal');
  pdf.setFontSize(5.2);
  pdf.text(baseUrlClean, 153, 172.5);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.8);
  pdf.setTextColor(15, 76, 58);
  pdf.text(
    `Verifique via QR Code ou acesse ${verificationUrl} informando o Código ${cert.code} ou Chave ${cert.controlKey}`,
    148.5,
    191,
    { align: 'center' }
  );

  addDefaultPage1PdfLinks(pdf, verificationUrl);

  // PAGE 2 - VERSO
  pdf.addPage('a4', 'landscape');
  pdf.setFillColor(250, 249, 246);
  pdf.rect(0, 0, 297, 210, 'F');

  pdf.setDrawColor(15, 76, 58);
  pdf.setLineWidth(1.2);
  pdf.rect(6, 6, 285, 198);

  pdf.setDrawColor(27, 54, 93);
  pdf.setLineWidth(0.5);
  pdf.rect(8.5, 8.5, 280, 193);

  pdf.setFont('times', 'bold');
  pdf.setFontSize(13.5);
  pdf.setTextColor(15, 76, 58);
  pdf.text(
    'MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO',
    44,
    18
  );
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(30, 41, 59);
  pdf.text(
    `Verso Oficial do Certificado Nº ${cert.number} · Fé Pública Interinstitucional e Validação Curricular`,
    44,
    23.5
  );

  pdf.line(15, 28, 282, 28);

  // Boxes 1 & 2
  pdf.setDrawColor(180, 200, 190);
  pdf.setFillColor(246, 248, 247);
  pdf.rect(15, 31, 154, 29, 'FD');
  pdf.rect(173, 31, 109, 29, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(15, 76, 58);
  pdf.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA', 18, 36.5);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(24, 34, 38);
  pdf.text(`Titular Certificado: ${cert.holderName}`, 18, 42);
  pdf.text(`CPF Registrado: ${cert.holderCpf}`, 18, 47);
  pdf.text(`Qualificação Profissional: ${cert.holderRole}`, 18, 52);
  pdf.text(`Instituição de Origem: ${cert.holderInstitution}`, 18, 57);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(27, 54, 93);
  pdf.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 176, 36.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(24, 34, 38);
  const splitEdital = pdf.splitTextToSize(cert.editalItem, 102);
  pdf.text(splitEdital, 176, 42.5);
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.text(
    `Período: ${cert.period} | Total: ${cert.totalHoursNumeric}h`,
    176,
    57
  );

  // Section 3 - Matrix
  pdf.setDrawColor(180, 200, 190);
  pdf.rect(15, 64, 267, 64);
  pdf.setFillColor(238, 244, 241);
  pdf.rect(15, 64, 267, 7, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(15, 76, 58);
  pdf.text(
    `3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (${cert.totalHoursNumeric} HORAS)`,
    18,
    69
  );

  let yPos = 76;
  cert.axes.forEach((axis) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(24, 34, 38);
    pdf.text(axis.title, 18, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(axis.subtitle, 18, yPos + 4);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.2);
    pdf.setTextColor(24, 34, 38);
    const descLines = pdf.splitTextToSize(axis.description, 152);
    pdf.text(descLines, 98, yPos + 1);

    pdf.setFont('courier', 'bold');
    pdf.setFontSize(7.8);
    pdf.text(axis.hours, 278, yPos + 2.5, { align: 'right' });

    yPos += 14;
  });

  // Section 4 - Public Faith Registry
  pdf.setDrawColor(217, 167, 74);
  pdf.setFillColor(253, 250, 242);
  pdf.rect(15, 132, 267, 33, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(146, 64, 14);
  pdf.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    18,
    137.5
  );
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.3);
  pdf.setTextColor(24, 34, 38);
  pdf.text(
    `Certificado registrado sob o nº ${cert.number} no Livro de Extensão nº ${cert.book}, Folha ${cert.page}, expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83).`,
    18,
    143
  );
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.2);
  pdf.text(
    `CÓDIGO DE AUTENTICIDADE: ${cert.code}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.controlKey}`,
    18,
    149
  );
  pdf.text(
    `ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${verificationUrl}`,
    18,
    154.5
  );
  pdf.text(`HASH SHA-256: ${cert.sha256}`, 18, 160);

  if (qrDataUrl) {
    pdf.addImage(qrDataUrl, 'PNG', 252, 134.5, 27, 27);
  }

  addDefaultPage2PdfLinks(pdf, verificationUrl);
}
