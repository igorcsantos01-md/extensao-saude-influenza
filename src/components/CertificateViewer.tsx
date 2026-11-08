import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  FileCheck2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldCheck,
  Printer,
  CheckCircle2,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { CERTIFICATE_08, CertificateRecord } from '../data/campaignData';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
  SignatureBarbara,
  SignatureJames,
  OfficialGoldenSeal,
} from './CertificateAssets';
import {
  exportCertificateToPdf,
  generateVerificationQrDataUrl,
} from '../utils/pdfGenerator';

interface CertificateViewerProps {
  onTriggerValidation: (code: string) => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  onTriggerValidation,
}) => {
  const cert: CertificateRecord = CERTIFICATE_08;
  const [activeTab, setActiveTab] = useState<'both' | 'front' | 'back'>('both');
  const [scale, setScale] = useState<number>(0.88);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const page1CaptureRef = useRef<HTMLDivElement>(null);
  const page2CaptureRef = useRef<HTMLDivElement>(null);

  const originUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://extensao-saude-influenza.vercel.app';
  const verificationFullUrl = `${originUrl}/?codigo=${cert.code}#validador`;

  useEffect(() => {
    generateVerificationQrDataUrl(verificationFullUrl).then((dataUrl) => {
      setQrDataUrl(dataUrl);
    });
  }, [verificationFullUrl]);

  useEffect(() => {
    const updateResponsiveScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth - 48;
      if (availableWidth < 1122) {
        const computed = Math.max(0.32, Math.min(0.95, availableWidth / 1122));
        setScale(Number(computed.toFixed(2)));
      } else {
        setScale(0.92);
      }
    };
    updateResponsiveScale();
    window.addEventListener('resize', updateResponsiveScale);
    return () => window.removeEventListener('resize', updateResponsiveScale);
  }, []);

  const handleCertLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow Ctrl+Click / Cmd+Click / Middle-click to open in new tab naturally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const nextUrl = `${window.location.pathname}?codigo=${encodeURIComponent(
        cert.code
      )}#validador`;
      window.history.replaceState({}, '', nextUrl);
    }
    onTriggerValidation(cert.code);
  };

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportSuccess(false);
    try {
      await exportCertificateToPdf(
        page1CaptureRef.current,
        page2CaptureRef.current,
        cert,
        verificationFullUrl
      );
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4500);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderPage1Front = (refProp?: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={refProp}
      style={{
        width: '1122px',
        height: '794px',
        backgroundColor: '#FAF9F6',
        color: '#182226',
        padding: '22px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
      className="select-text shadow-2xl"
    >
      {/* Outer Border: Institutional Green (#0F4C3A) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '3.5px solid #0F4C3A',
          padding: '6px',
          boxSizing: 'border-box',
        }}
      >
        {/* Inner Border: Institutional Navy (#1B365D) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.8px solid #1B365D',
            padding: '24px 34px 18px 34px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAF9F6',
          }}
        >
          {/* TOP HEADER: 3 INSTITUTIONAL ZONES */}
          <div>
            <div className="grid grid-cols-12 items-center gap-2 pb-4 border-b border-[#0F4C3A]/35">
              {/* Left: Editora Mente e Saúde */}
              <div className="col-span-4 flex items-center gap-3">
                <LogoEditoraMenteSaude className="w-[66px] h-[66px] shrink-0" />
                <div className="leading-tight">
                  <p className="font-cert-sans text-[13px] font-bold tracking-tight text-[#0F4C3A]">
                    EDITORA MENTE E SAÚDE
                  </p>
                  <p className="font-mono-code text-[10.5px] font-semibold text-[#1E293B] mt-0.5">
                    CNPJ: 51.372.335/0001-71
                  </p>
                  <p className="font-cert-sans text-[10.5px] font-medium text-[#15803D] mt-0.5">
                    Conselho Editorial e Extensão Científica
                  </p>
                </div>
              </div>

              {/* Center: Interinstitutional Program */}
              <div className="col-span-4 text-center px-1">
                <p className="font-cert-sans text-[11px] font-bold tracking-wide text-[#0F4C3A] leading-snug uppercase">
                  PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                  E EDUCAÇÃO EM SAÚDE
                </p>
                <p className="font-mono-code text-[10px] font-semibold text-[#1E293B] mt-1.5">
                  Certificado Nº {cert.number} · Livro de Extensão nº {cert.book}{' '}
                  · Cód. {cert.code}
                </p>
              </div>

              {/* Right: Centro Profissionalizante Maria Dalva de Araújo */}
              <div className="col-span-4 flex items-center justify-end gap-3 text-right">
                <div className="leading-tight">
                  <p className="font-cert-sans text-[12.5px] font-bold tracking-tight text-[#1B365D]">
                    CENTRO PROFISSIONALIZANTE
                  </p>
                  <p className="font-cert-sans text-[12.5px] font-bold tracking-tight text-[#1B365D]">
                    MARIA DALVA DE ARAÚJO
                  </p>
                  <p className="font-mono-code text-[10.5px] font-semibold text-[#1E293B] mt-0.5">
                    CNPJ: 51.269.112/0001-83
                  </p>
                </div>
                <LogoCentroMariaDalva className="w-[66px] h-[66px] shrink-0" />
              </div>
            </div>

            {/* MAIN CERTIFICATE TITLE */}
            <div className="text-center mt-5 mb-3">
              <h1
                className="font-cert-serif text-[30px] font-bold tracking-[0.04em] text-[#0F4C3A]"
                style={{ fontVariant: 'small-caps' }}
              >
                CERTIFICADO DE ATIVIDADE DE EXTENSÃO
              </h1>
              <p className="font-cert-sans text-[13.5px] text-[#1E293B] leading-relaxed max-w-[920px] mx-auto mt-2.5">
                A <strong className="font-semibold">Editora Mente e Saúde</strong>{' '}
                (CNPJ: 51.372.335/0001-71), em parceria institucional com o{' '}
                <strong className="font-semibold">
                  Centro Profissionalizante Maria Dalva de Araújo
                </strong>{' '}
                (CNPJ: 51.269.112/0001-83), certifica para os devidos fins de
                comprovação curricular e acadêmica que
              </p>
            </div>

            {/* CANDIDATE HIGHLIGHT BOX */}
            <div
              style={{
                backgroundColor: '#F2F6F4',
                border: '1.2px solid #B7CEC3',
                padding: '13px 24px',
                margin: '12px auto 16px auto',
                maxWidth: '940px',
              }}
              className="text-center"
            >
              <h2 className="font-cert-serif text-[27px] font-bold tracking-[0.03em] text-[#1B365D]">
                {cert.holderName}
              </h2>
              <p className="font-cert-sans text-[13.5px] font-bold text-[#182226] mt-1">
                {cert.holderRole} &nbsp;|&nbsp; CPF: {cert.holderCpf} &nbsp;|&nbsp;{' '}
                {cert.holderInstitution}
              </p>
            </div>

            {/* BODY PARAGRAPHS WITH STRATEGIC EDITAL ITEM 08 BOLDING */}
            <div className="max-w-[940px] mx-auto space-y-3.5 text-justify font-cert-sans text-[13.4px] leading-[1.58] text-[#182226]">
              <p>
                participou de forma efetiva da{' '}
                <strong className="font-bold text-[#0F291E]">
                  Atividade de Extensão
                </strong>{' '}
                intitulada{' '}
                <strong className="font-bold text-[#0F291E]">
                  “{cert.title}”
                </strong>
                , desenvolvida na modalidade de{' '}
                <strong className="font-bold text-[#0F291E]">
                  {cert.modality}
                </strong>
                , realizada no período de{' '}
                <strong className="font-bold text-[#0F291E]">
                  {cert.period}
                </strong>
                , contabilizando carga horária total de{' '}
                <strong className="font-bold text-[#0F291E]">
                  {cert.totalHours}
                </strong>
                .
              </p>
              <p>
                No âmbito desta ação extensionista, o profissional atuou na
                elaboração técnico-científica e{' '}
                <strong className="font-bold text-[#0F291E]">
                  distribuição comunitária gratuita de folhetos explicativos
                </strong>{' '}
                sobre os benefícios da vacinação anual contra Influenza em idosos,
                gestantes, crianças e portadores de comorbidades, orientação
                estruturada para leitura e atualização da caderneta vacinal,{' '}
                <strong className="font-bold text-[#0F291E]">
                  comunicação científica para combate à desinformação (fake news)
                </strong>{' '}
                sobre imunobiológicos e{' '}
                <strong className="font-bold text-[#0F291E]">
                  divulgação dos canais oficiais de busca de salas de vacina do
                  SUS e portal Meu SUS Digital
                </strong>
                .
              </p>
            </div>

            {/* LOCATION AND ISSUE DATE */}
            <div className="text-center mt-5">
              <p className="font-cert-serif italic text-[17px] text-[#182226]">
                Goiânia - GO, {cert.issueDate}.
              </p>
            </div>
          </div>

          {/* BOTTOM SIGNATURES, SEAL, CLICKABLE QR CODE & VERIFICATION FOOTER */}
          <div>
            <div className="grid grid-cols-12 items-end gap-3 pt-2">
              {/* Left Signature: Bárbara Lima dos Santos */}
              <div className="col-span-4 text-center flex flex-col items-center">
                <SignatureBarbara className="h-[52px] w-auto -mb-1" />
                <div className="w-[90%] border-t border-[#1E293B] pt-1.5">
                  <p className="font-cert-sans text-[11.5px] font-bold text-[#182226] tracking-wide">
                    BÁRBARA LIMA DOS SANTOS
                  </p>
                  <p className="font-cert-sans text-[10px] text-[#334155] mt-0.5">
                    Editora-Chefe e Coordenadora de Extensão Editorial
                  </p>
                  <p className="font-mono-code text-[9px] font-medium text-[#334155] mt-0.5">
                    Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                  </p>
                </div>
              </div>

              {/* Center: Golden Seal + Clickable QR Code + Clickable Manual Verification Box */}
              <div className="col-span-4 flex items-center justify-center gap-2.5">
                <OfficialGoldenSeal
                  code={cert.code}
                  className="w-[88px] h-[88px] shrink-0"
                />

                {/* CLICKABLE QR CODE (LAUDA 1) */}
                <a
                  href={verificationFullUrl}
                  onClick={handleCertLinkClick}
                  data-pdf-link="true"
                  data-pdf-url={verificationFullUrl}
                  title={`Clique para verificar a autenticidade do Certificado ${cert.code}`}
                  aria-label={`QR Code clicável para autenticação online do certificado ${cert.code}`}
                  className="p-1 bg-white border border-[#94A3B8] shrink-0 block cursor-pointer hover:ring-2 hover:ring-[#0F4C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] transition-shadow"
                >
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR Code de Autenticidade - ${cert.code}`}
                      className="w-[80px] h-[80px] block"
                    />
                  ) : (
                    <div className="w-[80px] h-[80px] bg-slate-100" />
                  )}
                </a>

                {/* CLICKABLE MANUAL VERIFICATION BOX (LAUDA 1) */}
                <a
                  href={verificationFullUrl}
                  onClick={handleCertLinkClick}
                  data-pdf-link="true"
                  data-pdf-url={verificationFullUrl}
                  title={`Clique para abrir o Validador Oficial com o código ${cert.code}`}
                  aria-label={`Autenticação pública manual - código ${cert.code} - clique para validar`}
                  style={{
                    border: '1px solid #94A3B8',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 8px',
                  }}
                  className="text-left leading-tight min-w-[162px] block cursor-pointer hover:ring-2 hover:ring-[#0F4C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] transition-shadow group"
                >
                  <p className="font-cert-sans text-[8.5px] font-bold text-[#182226] uppercase tracking-tight">
                    AUTENTICAÇÃO PÚBLICA MANUAL
                  </p>
                  <p className="font-mono-code text-[8px] font-semibold text-[#0F4C3A] mt-1">
                    Cód.: {cert.code}
                  </p>
                  <p className="font-mono-code text-[8px] font-semibold text-[#1E293B] mt-0.5">
                    Chave: {cert.controlKey}
                  </p>
                  <p className="font-cert-sans text-[7.5px] font-semibold text-[#475569] mt-1">
                    Endereço p/ Verificação Online:
                  </p>
                  <p className="font-mono-code text-[7px] text-[#0F4C3A] underline decoration-[#0F4C3A]/60 group-hover:text-[#C84B31] break-all mt-0.5">
                    {originUrl}
                  </p>
                </a>
              </div>

              {/* Right Signature: James Araújo de Santana */}
              <div className="col-span-4 text-center flex flex-col items-center">
                <SignatureJames className="h-[52px] w-auto -mb-1" />
                <div className="w-[90%] border-t border-[#1E293B] pt-1.5">
                  <p className="font-cert-sans text-[11.5px] font-bold text-[#182226] tracking-wide">
                    JAMES ARAÚJO DE SANTANA
                  </p>
                  <p className="font-cert-sans text-[10px] text-[#334155] mt-0.5">
                    Coordenador de Extensão e Projetos Educativos
                  </p>
                  <p className="font-mono-code text-[8.8px] font-medium text-[#334155] mt-0.5">
                    Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
                    51.269.112/0001-83)
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Clickable Verification Line */}
            <div className="text-center mt-3 pt-1.5 border-t border-[#0F4C3A]/20">
              <a
                href={verificationFullUrl}
                onClick={handleCertLinkClick}
                data-pdf-link="true"
                data-pdf-url={verificationFullUrl}
                title="Clique para validar este certificado agora"
                className="font-mono-code text-[9.5px] font-semibold text-[#0F4C3A] hover:text-[#C84B31] underline decoration-[#0F4C3A]/50 cursor-pointer inline-block"
              >
                Verifique via QR Code ou acesse {verificationFullUrl} informando
                o Código {cert.code} ou Chave {cert.controlKey}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage2Back = (refProp?: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={refProp}
      style={{
        width: '1122px',
        height: '794px',
        backgroundColor: '#FAF9F6',
        color: '#182226',
        padding: '22px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
      className="select-text shadow-2xl"
    >
      {/* Outer Border: Institutional Green (#0F4C3A) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '3.5px solid #0F4C3A',
          padding: '6px',
          boxSizing: 'border-box',
        }}
      >
        {/* Inner Border: Institutional Navy (#1B365D) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.8px solid #1B365D',
            padding: '20px 30px 16px 30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAF9F6',
          }}
        >
          {/* TOP HEADER */}
          <div>
            <div className="flex items-center gap-4 pb-3 border-b border-[#0F4C3A]/35">
              <div className="flex items-center gap-2 shrink-0">
                <LogoEditoraMenteSaude className="w-[46px] h-[46px]" />
                <LogoCentroMariaDalva className="w-[46px] h-[46px]" />
              </div>
              <div>
                <h2 className="font-cert-serif text-[19px] font-bold tracking-wide text-[#0F4C3A] uppercase">
                  MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
                </h2>
                <p className="font-cert-sans text-[12px] font-medium text-[#334155] mt-0.5">
                  Verso Oficial do Certificado Nº {cert.number} · Fé Pública
                  Interinstitucional e Validação Curricular
                </p>
              </div>
            </div>

            {/* SECTIONS 1 & 2: 2-COLUMN GRID */}
            <div className="grid grid-cols-12 gap-3.5 mt-3">
              {/* Box 1 */}
              <div
                style={{
                  backgroundColor: '#F5F8F6',
                  border: '1px solid #C2D4CA',
                  padding: '10px 14px',
                }}
                className="col-span-7"
              >
                <p className="font-cert-sans text-[11px] font-bold text-[#0F4C3A] uppercase tracking-wide mb-1.5">
                  1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                </p>
                <div className="grid grid-cols-1 gap-0.5 font-cert-sans text-[11.5px] text-[#182226]">
                  <p>
                    <span className="text-[#475569]">Titular Certificado:</span>{' '}
                    <strong className="font-bold">{cert.holderName}</strong>
                  </p>
                  <p>
                    <span className="text-[#475569]">CPF Registrado:</span>{' '}
                    <strong className="font-mono-code font-semibold">
                      {cert.holderCpf}
                    </strong>
                  </p>
                  <p>
                    <span className="text-[#475569]">
                      Qualificação Profissional:
                    </span>{' '}
                    <strong className="font-semibold">{cert.holderRole}</strong>
                  </p>
                  <p>
                    <span className="text-[#475569]">Instituição de Origem:</span>{' '}
                    <strong className="font-semibold">
                      {cert.holderInstitution}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div
                style={{
                  backgroundColor: '#F5F8F6',
                  border: '1px solid #C2D4CA',
                  padding: '10px 14px',
                }}
                className="col-span-5 flex flex-col justify-between"
              >
                <div>
                  <p className="font-cert-sans text-[11px] font-bold text-[#1B365D] uppercase tracking-wide mb-1.5">
                    2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                  </p>
                  <p className="font-cert-sans text-[12px] font-bold text-[#182226] leading-snug">
                    {cert.editalItem}
                  </p>
                </div>
                <p className="font-mono-code text-[11px] font-bold text-[#0F4C3A] pt-2 border-t border-[#C2D4CA]/60 mt-2">
                  Período: {cert.period} &nbsp;|&nbsp; Total:{' '}
                  {cert.totalHoursNumeric}h
                </p>
              </div>
            </div>

            {/* SECTION 3: METHODOLOGICAL MATRIX TABLE */}
            <div
              style={{
                border: '1px solid #C2D4CA',
                backgroundColor: '#FFFFFF',
                marginTop: '12px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#EBF2EE',
                  borderBottom: '1px solid #C2D4CA',
                  padding: '7px 14px',
                }}
              >
                <p className="font-cert-sans text-[11px] font-bold text-[#0F4C3A] uppercase tracking-wide">
                  3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (
                  {cert.totalHoursNumeric} HORAS)
                </p>
              </div>

              <div className="divide-y divide-[#E2E8F0]">
                {cert.axes.map((axis) => (
                  <div
                    key={axis.id}
                    className="grid grid-cols-12 items-center px-3.5 py-2.5 gap-3"
                  >
                    <div className="col-span-4 pr-2">
                      <p className="font-cert-sans text-[11px] font-bold text-[#182226] leading-snug">
                        {axis.title}
                      </p>
                      <p className="font-cert-sans text-[9.8px] text-[#64748B] mt-0.5">
                        {axis.subtitle}
                      </p>
                    </div>
                    <div className="col-span-7">
                      <p className="font-cert-sans text-[11px] text-[#1E293B] leading-snug">
                        {axis.description}
                      </p>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="font-mono-code text-[11px] font-bold text-[#0F4C3A]">
                        {axis.hours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: PUBLIC FAITH REGISTRY & CLICKABLE LINKS / QR CODE */}
            <div
              style={{
                backgroundColor: '#FDFBF4',
                border: '1.4px solid #D9A74A',
                padding: '10px 14px',
                marginTop: '12px',
              }}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <p className="font-cert-sans text-[10.8px] font-bold text-[#92400E] uppercase tracking-wide">
                  4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE
                  VERIFICAÇÃO DE AUTENTICIDADE
                </p>
                <p className="font-cert-sans text-[10.8px] text-[#182226]">
                  Certificado registrado sob o{' '}
                  <strong className="font-bold">
                    nº {cert.number} no Livro de Extensão nº {cert.book}, Folha{' '}
                    {cert.page}
                  </strong>
                  , expedido pela{' '}
                  <strong className="font-semibold">
                    Editora Mente e Saúde
                  </strong>{' '}
                  (CNPJ: 51.372.335/0001-71) e{' '}
                  <strong className="font-semibold">
                    Centro Profissionalizante Maria Dalva de Araújo
                  </strong>{' '}
                  (CNPJ: 51.269.112/0001-83).
                </p>
                <p className="font-mono-code text-[10.2px] font-bold text-[#182226] pt-0.5">
                  CÓDIGO DE AUTENTICIDADE:{' '}
                  <a
                    href={verificationFullUrl}
                    onClick={handleCertLinkClick}
                    data-pdf-link="true"
                    data-pdf-url={verificationFullUrl}
                    title="Clique para autenticar pelo Código"
                    className="text-[#0F4C3A] hover:text-[#C84B31] underline decoration-[#0F4C3A]/50 cursor-pointer"
                  >
                    {cert.code}
                  </a>{' '}
                  &nbsp;&nbsp;|&nbsp;&nbsp; CHAVE DE CONTROLE / DÍGITO:{' '}
                  <a
                    href={verificationFullUrl}
                    onClick={handleCertLinkClick}
                    data-pdf-link="true"
                    data-pdf-url={verificationFullUrl}
                    title="Clique para autenticar pela Chave de Controle"
                    className="text-[#1B365D] hover:text-[#C84B31] underline decoration-[#1B365D]/50 cursor-pointer"
                  >
                    {cert.controlKey}
                  </a>
                </p>
                <p className="font-mono-code text-[9.6px] font-semibold text-[#1E293B]">
                  ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):{' '}
                  <a
                    href={verificationFullUrl}
                    onClick={handleCertLinkClick}
                    data-pdf-link="true"
                    data-pdf-url={verificationFullUrl}
                    title="Clique para abrir o Validador Oficial"
                    className="text-[#0F4C3A] hover:text-[#C84B31] underline decoration-[#0F4C3A]/60 cursor-pointer"
                  >
                    {verificationFullUrl}
                  </a>
                </p>
                <p className="font-mono-code text-[9.4px] text-[#334155]">
                  <strong className="font-bold text-[#182226]">
                    HASH SHA-256:
                  </strong>{' '}
                  {cert.sha256}
                </p>
              </div>

              {/* CLICKABLE QR CODE (LAUDA 2) */}
              <a
                href={verificationFullUrl}
                onClick={handleCertLinkClick}
                data-pdf-link="true"
                data-pdf-url={verificationFullUrl}
                title={`Clique para verificar a autenticidade do Certificado ${cert.code}`}
                aria-label={`QR Code clicável do Verso Oficial para validação do certificado ${cert.code}`}
                className="p-1.5 bg-white border border-[#CBD5E1] shrink-0 block cursor-pointer hover:ring-2 hover:ring-[#0F4C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] transition-shadow"
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`QR Code Verso Oficial - ${cert.code}`}
                    className="w-[82px] h-[82px] block"
                  />
                ) : (
                  <div className="w-[82px] h-[82px] bg-slate-100" />
                )}
              </a>
            </div>
          </div>

          {/* BOTTOM SIGNATURES ROW */}
          <div className="grid grid-cols-12 items-end gap-3 pt-1">
            <div className="col-span-4 text-center flex flex-col items-center">
              <SignatureBarbara className="h-[44px] w-auto -mb-1" />
              <div className="w-[88%] border-t border-[#1E293B] pt-1">
                <p className="font-cert-sans text-[11px] font-bold text-[#182226]">
                  BÁRBARA LIMA DOS SANTOS
                </p>
                <p className="font-mono-code text-[8.8px] text-[#334155]">
                  Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                </p>
              </div>
            </div>

            <div className="col-span-4 text-center pb-0.5">
              <p className="font-cert-serif italic text-[14.5px] text-[#182226]">
                Goiânia - GO, {cert.issueDate}.
              </p>
              <p className="font-cert-sans text-[9.5px] font-medium text-[#334155] mt-0.5">
                Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o
                Território Nacional
              </p>
              <a
                href={verificationFullUrl}
                onClick={handleCertLinkClick}
                data-pdf-link="true"
                data-pdf-url={verificationFullUrl}
                title="Clique para autenticar o registro"
                className="font-mono-code text-[8.8px] text-[#0F4C3A] hover:text-[#C84B31] underline decoration-[#0F4C3A]/40 mt-0.5 inline-block cursor-pointer"
              >
                Registro: {cert.code} · Chave: {cert.controlKey}
              </a>
            </div>

            <div className="col-span-4 text-center flex flex-col items-center">
              <SignatureJames className="h-[44px] w-auto -mb-1" />
              <div className="w-[88%] border-t border-[#1E293B] pt-1">
                <p className="font-cert-sans text-[11px] font-bold text-[#182226]">
                  JAMES ARAÚJO DE SANTANA
                </p>
                <p className="font-mono-code text-[8.8px] text-[#334155]">
                  Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="certificado"
      className="py-16 bg-[#F3EFE6] border-y border-[#E2DCD0]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#C84B31] mb-2">
              <span>DOCUMENTO OFICIAL DE FÉ PÚBLICA</span>
              <span aria-hidden="true">·</span>
              <span>CERTIFICADO Nº 08 (FRENTE E VERSO)</span>
              <span aria-hidden="true">·</span>
              <span>QR CODE E LINKS CLICÁVEIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F3D4C] tracking-tight">
              Visualizador Oficial em Estilo PDF & Download A4 Paisagem
            </h2>
            <p className="text-base text-[#334155] mt-2 max-w-3xl">
              Clique diretamente sobre qualquer{' '}
              <strong className="font-semibold text-[#0F4C3A]">
                QR Code ou link de verificação
              </strong>{' '}
              dentro do certificado abaixo (ou no arquivo PDF baixado) para
              acionar automaticamente o autenticador oficial.
            </p>
          </div>

          {/* Primary PDF Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={verificationFullUrl}
              onClick={handleCertLinkClick}
              className="px-4 py-2.5 text-sm font-semibold text-[#0F3D4C] bg-white border border-[#0F3D4C]/25 rounded-lg hover:bg-[#0F3D4C]/5 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
              <span>Autenticar Código Agora</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
            </a>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 text-sm font-semibold text-[#182226] bg-white border border-[#CBD5E1] rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#475569]" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-60 rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {isExporting
                  ? 'Gerando PDF c/ Links Clicáveis...'
                  : 'Baixar Certificado em PDF (Frente e Verso)'}
              </span>
            </button>
          </div>
        </div>

        {/* Export Feedback Banner */}
        {exportSuccess && (
          <div className="mb-6 p-4 bg-[#E6F4EA] border border-[#0F4C3A]/30 rounded-lg flex items-center justify-between text-[#0F4C3A]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">
                Download concluído com sucesso:{' '}
                <strong className="font-mono-code">
                  Certificado_Extensao_08_EMS-VAC-2025-0814_Lucas_Goncalves_Silveira.pdf
                </strong>{' '}
                (com QR Codes e links clicáveis ativos no PDF).
              </span>
            </div>
          </div>
        )}

        {/* PDF-STYLE READER CONTROL BAR */}
        <div className="bg-[#182226] text-white rounded-t-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          {/* Document Filename & Page Count */}
          <div className="flex items-center gap-3">
            <FileCheck2 className="w-5 h-5 text-[#E07A5F] shrink-0" />
            <span className="font-mono-code text-xs sm:text-sm text-slate-200 truncate max-w-[260px] sm:max-w-md">
              Certificado_Extensao_08_EMS-VAC-2025-0814_Lucas_Goncalves_Silveira.pdf
            </span>
            <span className="text-xs font-mono-code text-slate-400 hidden md:inline">
              · QR Code e Links Clicáveis Ativos
            </span>
          </div>

          {/* Page Filter Tabs */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-[#C84B31] text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Ambas as Laudas (1 e 2)
            </button>
            <button
              onClick={() => setActiveTab('front')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'front'
                  ? 'bg-[#C84B31] text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Página 1 (Frente)
            </button>
            <button
              onClick={() => setActiveTab('back')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'back'
                  ? 'bg-[#C84B31] text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Página 2 (Verso / Memorial)
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setScale((s) => Math.max(0.4, Number((s - 0.1).toFixed(2))))
              }
              title="Diminuir Zoom"
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono-code text-xs px-2 min-w-[52px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() =>
                setScale((s) => Math.min(1.15, Number((s + 0.1).toFixed(2))))
              }
              title="Aumentar Zoom"
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale(0.88)}
              title="Restaurar Zoom Padrão"
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 transition-colors ml-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF READER VIEWPORT */}
        <div
          ref={containerRef}
          className="bg-[#2B3035] rounded-b-xl p-4 sm:p-8 overflow-x-auto flex flex-col items-center gap-10 border border-t-0 border-[#182226]"
        >
          {/* Page 1 Wrapper */}
          {(activeTab === 'both' || activeTab === 'front') && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300 mb-3">
                <Layers className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>
                  PÁGINA 1 DE 2 — FRENTE DO CERTIFICADO Nº 08 (CLIQUE NO QR CODE OU LINK PARA VALIDAR)
                </span>
              </div>
              <div
                style={{
                  width: `${Math.round(1122 * scale)}px`,
                  height: `${Math.round(794 * scale)}px`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: '1122px',
                    height: '794px',
                  }}
                >
                  {renderPage1Front()}
                </div>
              </div>
            </div>
          )}

          {/* Page 2 Wrapper */}
          {(activeTab === 'both' || activeTab === 'back') && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300 mb-3">
                <Layers className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>
                  PÁGINA 2 DE 2 — VERSO OFICIAL (CLIQUE NO QR CODE OU ENDEREÇO WEB PARA VALIDAR)
                </span>
              </div>
              <div
                style={{
                  width: `${Math.round(1122 * scale)}px`,
                  height: `${Math.round(794 * scale)}px`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: '1122px',
                    height: '794px',
                  }}
                >
                  {renderPage2Back()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Unscaled 1:1 Capture Container for High-Precision PDF Export & Print */}
        <div
          id="certificate-print-area"
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: '-9999px',
            top: '0',
            width: '1122px',
            pointerEvents: 'none',
            zIndex: -10,
          }}
        >
          {renderPage1Front(page1CaptureRef)}
          {renderPage2Back(page2CaptureRef)}
        </div>
      </div>
    </section>
  );
};
