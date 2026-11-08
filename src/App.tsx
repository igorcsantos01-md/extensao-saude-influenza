/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  FileText,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  ArrowDownRight,
} from 'lucide-react';
import { CERTIFICATE_08 } from './data/campaignData';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
} from './components/CertificateAssets';
import { CertificateViewer } from './components/CertificateViewer';
import { PublicAuthenticator } from './components/PublicAuthenticator';
import { InteractiveCampaignModules } from './components/InteractiveCampaignModules';

export default function App() {
  const cert = CERTIFICATE_08;
  const [externalCodeTrigger, setExternalCodeTrigger] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlCodigo = params.get('codigo') || params.get('chave');
      const hash = window.location.hash;

      if (urlCodigo) {
        setExternalCodeTrigger(urlCodigo);
      }

      if (hash === '#validador' || urlCodigo) {
        setTimeout(() => {
          const el = document.getElementById('validador');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 250);
      }
    }
  }, []);

  const handleTriggerValidation = (code: string) => {
    setExternalCodeTrigger(code);
    const el = document.getElementById('validador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#182226]">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E2DCD0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#topo"
            className="font-display text-lg font-bold tracking-tight text-[#0F3D4C] whitespace-nowrap shrink-0"
          >
            Extensão em Saúde · Imunização Influenza
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#334155]">
            <a
              href="#certificado"
              className="hover:text-[#C84B31] transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 08
            </a>
            <a
              href="#validador"
              className="hover:text-[#C84B31] transition-colors whitespace-nowrap shrink-0"
            >
              Validador Oficial
            </a>
            <a
              href="#campanha"
              className="hover:text-[#C84B31] transition-colors whitespace-nowrap shrink-0"
            >
              Sobre a Campanha
            </a>
            <a
              href="#simulador-grupos"
              className="hover:text-[#C84B31] transition-colors whitespace-nowrap shrink-0"
            >
              Grupos Prioritários
            </a>
            <a
              href="#folhetos-e-mitos"
              className="hover:text-[#C84B31] transition-colors whitespace-nowrap shrink-0"
            >
              Folhetos e Mitos
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleTriggerValidation(cert.code)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C84B31] hover:bg-[#B03E26] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Verificar Cód. {cert.code}
            </button>
          </div>
        </div>
      </header>

      {/* INSTITUTIONAL OPERATIONAL UTILITY RIBBON */}
      <div className="bg-[#0F3D4C] text-slate-200 border-b border-white/10 text-xs py-2.5 px-4">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 font-mono-code">
            <span className="text-[#E07A5F] font-semibold">
              REGISTRO PÚBLICO ATIVO
            </span>
            <span aria-hidden="true">·</span>
            <span>Certificado Nº {cert.number}</span>
            <span aria-hidden="true">·</span>
            <span>Livro nº {cert.book} (Folha {cert.page})</span>
            <span aria-hidden="true">·</span>
            <span>Cód. {cert.code}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-300">
            <span>Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)</span>
            <span aria-hidden="true">·</span>
            <span>
              Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
              51.269.112/0001-83)
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main id="topo" className="flex-1">
        {/* HERO SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 border-b border-[#E2DCD0]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left 7 Cols: Editorial Lead */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#C84B31]">
                    <span>PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO</span>
                    <span aria-hidden="true">·</span>
                    <span>ITEM 08 DO EDITAL</span>
                    <span aria-hidden="true">·</span>
                    <span>MAIO / 2025</span>
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#0F3D4C] leading-[1.15] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Campanha Educativa de Incentivo à Imunização de Grupos
                    Prioritários: Entrega de Folhetos Comunitários sobre
                    Influenza e Atualização da Caderneta
                  </h1>

                  <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
                    Plataforma oficial de documentação pedagógica, transparência
                    extensionista e validação de fé pública referente à ação
                    comunitária e editorial conduzida pelo médico{' '}
                    <strong className="font-semibold text-[#182226]">
                      Dr. Lucas Gonçalves Silveira (CPF: {cert.holderCpf} ·{' '}
                      {cert.holderInstitution})
                    </strong>
                    .
                  </p>
                </div>

                {/* Primary Hero Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => handleScrollToSection('certificado')}
                    className="px-6 py-3.5 bg-[#C84B31] hover:bg-[#B03E26] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Visualizar Certificado Nº 08 (PDF Frente e Verso)</span>
                  </button>

                  <button
                    onClick={() => handleTriggerValidation(cert.code)}
                    className="px-5 py-3.5 bg-[#0F3D4C] hover:bg-[#144B5D] text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
                    <span>Autenticar Registro (#validador)</span>
                  </button>

                  <button
                    onClick={() => handleScrollToSection('folhetos-e-mitos')}
                    className="px-4 py-3.5 bg-white hover:bg-[#F3EFE6] text-[#182226] border border-[#D8D0C2] font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#C84B31]" />
                    <span>Explorar Folheto Comunitário</span>
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Official Institutional Dossier Summary Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2DCD0] p-6 sm:p-7 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2DCD0]">
                    <div className="flex items-center gap-3">
                      <LogoEditoraMenteSaude className="w-12 h-12 shrink-0" />
                      <LogoCentroMariaDalva className="w-12 h-12 shrink-0" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono-code uppercase text-[#0F4C3A] font-bold block">
                        FÉ PÚBLICA VERIFICADA
                      </span>
                      <span className="font-mono-code text-xs font-bold text-[#182226]">
                        {cert.code}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div>
                      <p className="text-xs font-mono-code uppercase text-[#64748B]">
                        Profissional Extensionista Certificado
                      </p>
                      <p className="text-lg font-display font-bold text-[#0F3D4C]">
                        {cert.holderName}
                      </p>
                      <p className="text-xs text-[#334155] font-medium">
                        {cert.holderRole} · CPF: {cert.holderCpf} ·{' '}
                        {cert.holderInstitution}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-[#FBF9F5] p-3 rounded-lg border border-[#E2DCD0]">
                        <p className="text-[11px] font-mono-code text-[#64748B] uppercase">
                          Período de Execução
                        </p>
                        <p className="text-xs font-bold text-[#182226] mt-0.5">
                          {cert.period}
                        </p>
                      </div>
                      <div className="bg-[#FBF9F5] p-3 rounded-lg border border-[#E2DCD0]">
                        <p className="text-[11px] font-mono-code text-[#64748B] uppercase">
                          Carga Horária Total
                        </p>
                        <p className="text-xs font-bold text-[#C84B31] mt-0.5 tabular-nums">
                          {cert.totalHours} (4 Eixos)
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#FBF9F5] p-3.5 rounded-lg border border-[#E2DCD0]">
                      <p className="text-[11px] font-mono-code text-[#0F4C3A] font-bold uppercase">
                        Enquadramento Curricular Direto
                      </p>
                      <p className="text-xs font-semibold text-[#182226] mt-1 leading-snug">
                        {cert.editalItem}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E2DCD0] flex items-center justify-between text-xs">
                  <span className="font-mono-code text-[#475569]">
                    Chave: {cert.controlKey}
                  </span>
                  <button
                    onClick={() => handleScrollToSection('certificado')}
                    className="font-semibold text-[#C84B31] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver laudas completas</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMBEDDED PDF-STYLE CERTIFICATE VIEWER (FRENTE E VERSO) + HD PDF DOWNLOAD */}
        <CertificateViewer onTriggerValidation={handleTriggerValidation} />

        {/* PUBLIC AUTHENTICATOR (#validador) */}
        <PublicAuthenticator
          externalCodeTrigger={externalCodeTrigger}
          onScrollToCertificate={() => handleScrollToSection('certificado')}
        />

        {/* INTERACTIVE EDUCATIONAL CAMPAIGN MODULES */}
        <InteractiveCampaignModules />
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-[#182226] text-slate-300 border-t border-white/10 py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <LogoEditoraMenteSaude className="w-11 h-11" />
                <LogoCentroMariaDalva className="w-11 h-11" />
                <div>
                  <p className="font-display font-bold text-white text-base">
                    Programa Interinstitucional de Extensão em Saúde
                  </p>
                  <p className="text-xs text-slate-400">
                    Comunicação Científica, Produção Editorial e Educação
                    Comunitária
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Plataforma oficial de registro acadêmico, disponibilização de
                materiais educativos abertos à comunidade e verificação pública
                de certificados expedidos em parceria interinstitucional.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <p className="font-mono-code uppercase text-white font-bold tracking-wider">
                Instituições Emissoras e Fé Pública
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Editora Mente e Saúde</strong> ·
                CNPJ: 51.372.335/0001-71
              </p>
              <p className="text-slate-400">
                Coordenação Editorial: Bárbara Lima dos Santos
              </p>
              <p className="text-slate-300 pt-1">
                <strong className="text-white">
                  Centro Profissionalizante Maria Dalva de Araújo
                </strong>{' '}
                · CNPJ: 51.269.112/0001-83
              </p>
              <p className="text-slate-400">
                Coordenação de Extensão: James Araújo de Santana
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <p className="font-mono-code uppercase text-white font-bold tracking-wider">
                Dados de Registro (Certificado Nº 08)
              </p>
              <p className="font-mono-code text-slate-300">
                Cód.: {cert.code}
              </p>
              <p className="font-mono-code text-slate-300">
                Chave: {cert.controlKey}
              </p>
              <p className="text-slate-400">
                Livro de Extensão nº {cert.book} · Folha {cert.page}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[#86EFAC]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Válido em todo o Território Nacional</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © 2025 Editora Mente e Saúde & Centro Profissionalizante Maria
              Dalva de Araújo. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#certificado"
                className="hover:text-white transition-colors"
              >
                Leitor PDF (Frente e Verso)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#validador"
                className="hover:text-white transition-colors"
              >
                Validador Oficial (#validador)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#campanha"
                className="hover:text-white transition-colors"
              >
                Memorial Metodológico
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
