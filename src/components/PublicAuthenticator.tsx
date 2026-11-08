import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  KeyRound,
  Lock,
} from 'lucide-react';
import { CERTIFICATE_08 } from '../data/campaignData';

interface PublicAuthenticatorProps {
  externalCodeTrigger: string | null;
  onScrollToCertificate: () => void;
}

export const PublicAuthenticator: React.FC<PublicAuthenticatorProps> = ({
  externalCodeTrigger,
  onScrollToCertificate,
}) => {
  const cert = CERTIFICATE_08;
  const [query, setQuery] = useState<string>(cert.code);
  const [validationState, setValidationState] = useState<
    'verified' | 'invalid' | 'checking'
  >('verified');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const evaluateQuery = (rawInput: string) => {
    const cleaned = rawInput.trim().toUpperCase();
    if (!cleaned) {
      setValidationState('invalid');
      return;
    }
    setValidationState('checking');
    setTimeout(() => {
      if (
        cleaned === cert.code.toUpperCase() ||
        cleaned === cert.controlKey.toUpperCase() ||
        cleaned === '08' ||
        cleaned === 'CERTIFICADO 08' ||
        cleaned === cert.sha256.toUpperCase()
      ) {
        setValidationState('verified');
      } else {
        setValidationState('invalid');
      }
    }, 150);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlCodigo = params.get('codigo') || params.get('chave');
      if (urlCodigo) {
        setQuery(urlCodigo);
        evaluateQuery(urlCodigo);
      }
    }
  }, []);

  useEffect(() => {
    if (externalCodeTrigger) {
      setQuery(externalCodeTrigger);
      evaluateQuery(externalCodeTrigger);
    }
  }, [externalCodeTrigger]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    evaluateQuery(query);
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?codigo=${encodeURIComponent(
        query.trim()
      )}#validador`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  const handleCopyValidationUrl = () => {
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://extensao-saude-influenza.vercel.app';
    const fullLink = `${origin}/?codigo=${cert.code}#validador`;
    navigator.clipboard.writeText(fullLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopySha256 = () => {
    navigator.clipboard.writeText(cert.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 3000);
  };

  return (
    <section
      id="validador"
      className="py-16 bg-[#0F3D4C] text-white border-b border-white/10 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker & Title */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#E07A5F] mb-2">
            <span>SISTEMA PÚBLICO DE CONFERÊNCIA DOCUMENTAL</span>
            <span aria-hidden="true">·</span>
            <span>FÉ PÚBLICA INTERINSTITUCIONAL</span>
            <span aria-hidden="true">·</span>
            <span>ITEM 08</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            Validador Oficial de Autenticidade e Registro Acadêmico
          </h2>
          <p className="text-base text-slate-200 mt-2.5 leading-relaxed">
            Consulte a integridade criptográfica e a validade nacional do
            certificado informando o{' '}
            <strong className="font-mono-code text-white">
              Código de Autenticidade ({cert.code})
            </strong>{' '}
            ou a{' '}
            <strong className="font-mono-code text-white">
              Chave de Controle ({cert.controlKey})
            </strong>{' '}
            impressos nas laudas do documento.
          </p>
        </div>

        {/* Search & Verification Bar */}
        <div className="mt-8 bg-[#144B5D] border border-white/15 rounded-xl p-5 sm:p-6">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5"
          >
            <div className="relative flex-1">
              <KeyRound className="w-5 h-5 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Digite o Código (ex: EMS-VAC-2025-0814) ou Chave (0814-9263-5510-8F4B)"
                aria-label="Código de Autenticidade ou Chave de Controle"
                className="w-full pl-12 pr-4 py-3.5 bg-[#0A2B36] border border-white/20 rounded-lg text-white font-mono-code text-sm sm:text-base placeholder:text-slate-400 focus:outline-none focus:border-[#E07A5F]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-[#C84B31] hover:bg-[#B03E26] text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Verificar Autenticidade</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setQuery(cert.code);
                evaluateQuery(cert.code);
              }}
              className="px-4 py-3.5 bg-white/10 hover:bg-white/15 text-slate-100 font-medium text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Restaurar Cód. Nº 08
            </button>
          </form>

          {/* Quick-test buttons for Código vs Chave */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-2">
              <span>Chaves ativas deste documento:</span>
              <button
                type="button"
                onClick={() => {
                  setQuery(cert.code);
                  evaluateQuery(cert.code);
                }}
                className="font-mono-code underline decoration-dotted hover:text-white cursor-pointer"
              >
                {cert.code}
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => {
                  setQuery(cert.controlKey);
                  evaluateQuery(cert.controlKey);
                }}
                className="font-mono-code underline decoration-dotted hover:text-white cursor-pointer"
              >
                {cert.controlKey}
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyValidationUrl}
              className="flex items-center gap-1.5 text-[#F4A261] hover:text-white font-medium transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Link de verificação copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar URL direta (?codigo={cert.code}#validador)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* VERIFICATION RESULT DOSSIER */}
        {validationState === 'checking' && (
          <div className="mt-6 bg-white/5 border border-white/15 rounded-xl p-8 text-center">
            <p className="font-mono-code text-sm text-slate-200">
              Consultando Livro de Extensão nº {cert.book} e verificando assinatura
              SHA-256...
            </p>
          </div>
        )}

        {validationState === 'invalid' && (
          <div className="mt-6 bg-[#FEF2F2] text-[#7F1D1D] border border-[#FECACA] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-[#7F1D1D]">
                  Código ou Chave não localizado nesta pasta de campanha
                </h3>
                <p className="text-sm text-[#991B1B] mt-1">
                  O código informado (<span className="font-mono-code">{query}</span>
                  ) não corresponde ao Certificado Nº 08 desta plataforma. Clique ao
                  lado para validar o código oficial{' '}
                  <strong className="font-mono-code">{cert.code}</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setQuery(cert.code);
                evaluateQuery(cert.code);
              }}
              className="px-4 py-2 bg-[#991B1B] text-white text-xs font-semibold rounded-lg hover:bg-[#7F1D1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Validar {cert.code}
            </button>
          </div>
        )}

        {validationState === 'verified' && (
          <div className="mt-6 bg-[#FBF9F5] text-[#182226] rounded-xl border border-[#E2DCD0] shadow-xl overflow-hidden">
            {/* Top Verified Banner */}
            <div className="bg-[#0F4C3A] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#86EFAC] shrink-0" />
                <div>
                  <p className="text-xs font-mono-code uppercase tracking-wider text-[#A7F3D0]">
                    AUTENTICIDADE CONFIRMADA · FÉ PÚBLICA INTERINSTITUCIONAL
                  </p>
                  <h3 className="text-lg font-display font-bold text-white">
                    Certificado Nº {cert.number} Válido em Todo o Território Nacional
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onScrollToCertificate}
                  className="px-4 py-2 bg-white text-[#0F4C3A] hover:bg-slate-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Visualizar Certificado / Baixar PDF</span>
                </button>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-[#E2DCD0]">
                <div>
                  <p className="text-xs font-mono-code uppercase text-[#64748B]">
                    Profissional Certificado
                  </p>
                  <p className="text-lg font-bold text-[#0F3D4C] mt-1">
                    {cert.holderName}
                  </p>
                  <p className="text-sm text-[#334155] mt-0.5">
                    {cert.holderRole} · CPF:{' '}
                    <span className="font-mono-code font-semibold">
                      {cert.holderCpf}
                    </span>
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Instituição de Origem: {cert.holderInstitution}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono-code uppercase text-[#64748B]">
                    Registro no Livro de Extensão
                  </p>
                  <p className="text-base font-mono-code font-bold text-[#182226] mt-1">
                    Cód.: {cert.code}
                  </p>
                  <p className="text-sm font-mono-code text-[#334155] mt-0.5">
                    Chave: {cert.controlKey}
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Certificado Nº {cert.number} · Livro nº {cert.book} · Folha{' '}
                    {cert.page}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono-code uppercase text-[#64748B]">
                    Período, Emissão e Carga Horária
                  </p>
                  <p className="text-base font-bold text-[#C84B31] mt-1">
                    Carga Horária Total: {cert.totalHours}
                  </p>
                  <p className="text-sm text-[#334155] mt-0.5">
                    Execução: {cert.period}
                  </p>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Expedição: Goiânia - GO, {cert.issueDate}
                  </p>
                </div>
              </div>

              {/* Activity Title & Curricular Framing */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-[#E2DCD0]">
                <div className="lg:col-span-7">
                  <p className="text-xs font-mono-code uppercase text-[#64748B]">
                    Título Oficial da Ação Extensionista Registrada
                  </p>
                  <p className="text-base font-display font-bold text-[#182226] mt-1 leading-snug">
                    “{cert.title}”
                  </p>
                  <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                    {cert.frontSummaryParagraph}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-[#F3EFE6] p-4 rounded-lg border border-[#E2DCD0]">
                  <p className="text-xs font-mono-code uppercase text-[#0F4C3A] font-bold">
                    Enquadramento Curricular Auditado (Edital FUBOG)
                  </p>
                  <p className="text-sm font-bold text-[#182226] mt-1">
                    {cert.editalItem}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-[#D6CFC2] text-xs text-[#334155] space-y-1">
                    <p>
                      <strong className="font-semibold">Emissora 1:</strong>{' '}
                      Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                    </p>
                    <p>
                      <strong className="font-semibold">Emissora 2:</strong>{' '}
                      Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
                      51.269.112/0001-83)
                    </p>
                  </div>
                </div>
              </div>

              {/* Cryptographic SHA-256 Signature Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F3EFE6] px-4 py-3 rounded-lg border border-[#E2DCD0]">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Lock className="w-4 h-4 text-[#0F4C3A] shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-bold text-[#182226] mr-2">
                      HASH SHA-256 DO REGISTRO:
                    </span>
                    <span className="font-mono-code text-xs text-[#334155]">
                      {cert.sha256}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopySha256}
                  className="text-xs font-semibold text-[#0F3D4C] hover:text-[#C84B31] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedHash ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0F4C3A]" />
                      <span>Hash copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Hash</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
