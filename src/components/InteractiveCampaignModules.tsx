import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import {
  CERTIFICATE_08,
  COMMUNITY_PAMPHLET_PAGES,
  MYTHS_AND_FACTS,
  PRIORITY_GROUPS,
} from '../data/campaignData';

export const InteractiveCampaignModules: React.FC = () => {
  // 1. State for Priority Groups Simulator
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    PRIORITY_GROUPS[0].id
  );
  const [checkedBookletItems, setCheckedBookletItems] = useState<
    Record<string, boolean>
  >({});

  // 2. State for Vaccine Calendar Calculator
  const [calcAgeGroup, setCalcAgeGroup] = useState<
    'child_under6' | 'child_6to8' | 'adult' | 'senior'
  >('senior');
  const [calcCondition, setCalcCondition] = useState<
    'none' | 'pregnant' | 'postpartum' | 'chronic' | 'health_edu'
  >('none');
  const [calcFirstTime, setCalcFirstTime] = useState<'no' | 'yes'>('no');

  // 3. State for Community Pamphlet Viewer
  const [pamphletPageIdx, setPamphletPageIdx] = useState<number>(0);

  // 4. State for Myths Filter
  const [mythFilter, setMythFilter] = useState<string>('Todos');

  const activeGroup =
    PRIORITY_GROUPS.find((g) => g.id === selectedGroupId) || PRIORITY_GROUPS[0];

  const toggleBookletCheck = (key: string) => {
    setCheckedBookletItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Compute Personalized Vaccine Recommendation
  const getCalculatorResult = () => {
    const isPriorityByAge =
      calcAgeGroup === 'child_under6' || calcAgeGroup === 'senior';
    const isPriorityByCondition = calcCondition !== 'none';
    const isEligibleSus = isPriorityByAge || isPriorityByCondition;

    const needsTwoDoses =
      (calcAgeGroup === 'child_under6' || calcAgeGroup === 'child_6to8') &&
      calcFirstTime === 'yes';

    let doseSchemeText =
      'Dose única anual (0,5 mL intramuscular) com a composição de cepas 2025 do Hemisfério Sul.';
    if (needsTwoDoses) {
      doseSchemeText =
        'Primovacinação Pediátrica: 2 doses no primeiro ano em que recebe a vacina, com intervalo exato de 30 dias entre a 1ª e a 2ª dose.';
    }

    let bookletUpdates: string[] = [];
    if (calcAgeGroup === 'senior') {
      bookletUpdates = [
        'Registrar lote de Influenza Trivalente 2025 na Caderneta da Pessoa Idosa',
        'Conferir reforço da Dupla Adulto (dT) a cada 10 anos e esquema de Hepatite B',
        'Avaliar indicação de Pneumocócica 23-valente (disponível no SUS para acamados/institucionalizados)',
      ];
    } else if (calcCondition === 'pregnant' || calcCondition === 'postpartum') {
      bookletUpdates = [
        'Anotar dose de Influenza na Caderneta da Gestante (segura em qualquer trimestre)',
        'Checar aplicação obrigatória da dTpa (a partir da 20ª semana gestacional)',
        'Verificar esquema de 3 doses contra Hepatite B',
      ];
    } else if (
      calcAgeGroup === 'child_under6' ||
      calcAgeGroup === 'child_6to8'
    ) {
      bookletUpdates = [
        needsTwoDoses
          ? 'Agendar a lápis na Caderneta da Criança o retorno de 30 dias para a 2ª dose da gripe'
          : 'Registrar a dose única anual de Influenza na Caderneta da Criança',
        'Auditar vacinas pediátricas concomitantes: Pentavalente, VIP (Poliomielite), Pneumo-10 e Tríplice Viral',
        'Orientar pais sobre febre baixa local nas primeiras 24h sem uso preventivo de antitérmicos',
      ];
    } else {
      bookletUpdates = [
        'Verificar registro no aplicativo oficial Meu SUS Digital (conectado à RNDS)',
        'Checar atualização de Tríplice Viral (2 doses até 29 anos; 1 dose de 30 a 59 anos) e Febre Amarela',
        'Apresentar receita médica simples ou documento funcional na UBS caso integre grupo prioritário',
      ];
    }

    return {
      isEligibleSus,
      needsTwoDoses,
      doseSchemeText,
      bookletUpdates,
    };
  };

  const calcResult = getCalculatorResult();
  const activePamphlet = COMMUNITY_PAMPHLET_PAGES[pamphletPageIdx];
  const filteredMyths =
    mythFilter === 'Todos'
      ? MYTHS_AND_FACTS
      : MYTHS_AND_FACTS.filter((m) => m.category === mythFilter);

  return (
    <div className="space-y-24 py-16">
      {/* MODULE 1: EXPLANATION OF THE CAMPAIGN & METHODOLOGICAL MATRIX */}
      <section id="campanha" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#C84B31]">
              <span>AÇÃO EXTENSIONISTA Nº 08</span>
              <span aria-hidden="true">·</span>
              <span>MAIO DE 2025</span>
              <span aria-hidden="true">·</span>
              <span>SAÚDE COLETIVA E IMUNIZAÇÃO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F3D4C] leading-tight">
              Fundamentação Epidemiológica e Metodologia da Campanha de Incentivo à Imunização contra Influenza
            </h2>

            <p className="text-base text-[#182226] leading-relaxed">
              A gripe sazonal causada pelo vírus <strong className="font-semibold">Influenza (tipos A e B)</strong> representa um dos principais desafios de saúde pública no Brasil durante os meses de outono e inverno. Apesar da disponibilidade gratuita do imunizante nas Unidades Básicas de Saúde (UBS), a queda nas taxas de cobertura vacinal entre idosos, gestantes e crianças nos últimos anos relaciona-se diretamente à circulação de desinformação nas mídias digitais e ao desconhecimento sobre a leitura da própria caderneta vacinal.
            </p>

            <p className="text-base text-[#334155] leading-relaxed">
              Desenvolvida em parceria interinstitucional entre a <strong className="font-semibold text-[#182226]">Editora Mente e Saúde</strong> e o <strong className="font-semibold text-[#182226]">Centro Profissionalizante Maria Dalva de Araújo</strong>, esta ação extensionista de <strong className="font-semibold text-[#C84B31]">10 (dez) horas</strong> estruturou uma intervenção educativa e editorial voltada à entrega comunitária de folhetos ilustrados de fácil compreensão, orientação ativa sobre atualização da caderneta e divulgação dos canais oficiais do Programa Nacional de Imunizações (PNI/SUS).
            </p>

            {/* Quantitative Impact Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E2DCD0]">
              <div className="bg-white p-4 rounded-lg border border-[#E2DCD0]">
                <p className="font-mono-code text-2xl font-bold text-[#0F3D4C] tabular-nums">
                  10h 00m
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  Carga horária auditada em 4 eixos práticos (Maio/2025)
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#E2DCD0]">
                <p className="font-mono-code text-2xl font-bold text-[#C84B31] tabular-nums">
                  3 Cepas
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  A/H1N1, A/H3N2 e Linhagem B (OMS Hemisfério Sul 2025)
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#E2DCD0]">
                <p className="font-mono-code text-2xl font-bold text-[#0F4C3A] tabular-nums">
                  90% Meta
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  Preconizada pelo PNI/MS para grupos prioritários
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-[#E2DCD0]">
                <p className="font-mono-code text-2xl font-bold text-[#0F3D4C] tabular-nums">
                  Item 08
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  Enquadramento integral em Campanhas de Vacinação
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Methodological Axes Breakdown Card */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E2DCD0] p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2DCD0]">
              <div>
                <p className="text-xs font-mono-code uppercase tracking-wider text-[#C84B31]">
                  MEMORIAL METODOLÓGICO AUDITÁVEL
                </p>
                <h3 className="text-xl font-display font-bold text-[#0F3D4C] mt-0.5">
                  Matriz de Execução Prática (10 Horas)
                </h3>
              </div>
              <FileSpreadsheet className="w-6 h-6 text-[#0F3D4C]" />
            </div>

            <div className="divide-y divide-[#E2DCD0] mt-2">
              {CERTIFICATE_08.axes.map((axis, idx) => (
                <div key={axis.id} className="py-4 first:pt-3 last:pb-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-mono-code font-bold text-[#0F3D4C]">
                      0{idx + 1}. {axis.title.split('—')[0].trim()}
                    </span>
                    <span className="font-mono-code text-xs font-bold text-[#C84B31] tabular-nums shrink-0">
                      {axis.hours}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#182226] mt-1">
                    {axis.title.split('—')[1]?.trim()}
                  </p>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    {axis.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2DCD0] flex items-center justify-between text-xs font-mono-code text-[#0F4C3A]">
              <span>CONFORMIDADE CNAE EDITORIAL E EDUCATIVO</span>
              <span>TOTAL: 10H 00MIN</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 2: INTERACTIVE PRIORITY GROUPS & VACCINATION BOOKLET SIMULATOR */}
      <section id="simulador-grupos" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="bg-white rounded-2xl border border-[#E2DCD0] p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#C84B31] mb-2">
              <span>INSTRUMENTO EDUCATIVO DIGITAL</span>
              <span aria-hidden="true">·</span>
              <span>EIXO II DA EXTENSÃO</span>
              <span aria-hidden="true">·</span>
              <span>TRIAGEM COMUNITÁRIA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0F3D4C]">
              Simulador Interativo de Grupos Prioritários e Checklist da Caderneta Vacinal
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2">
              Selecione um grupo prioritário abaixo para visualizar a justificativa clínica de imunização, os documentos exigidos nas salas de vacina do SUS e o checklist prático de atualização da caderneta utilizado na orientação comunitária.
            </p>
          </div>

          {/* Interactive Group Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E2DCD0]">
            {PRIORITY_GROUPS.map((group) => {
              const isSelected = group.id === selectedGroupId;
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0F3D4C] text-white'
                      : 'bg-[#FBF9F5] text-[#334155] border border-[#E2DCD0] hover:border-[#0F3D4C]/40'
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>

          {/* Active Priority Group Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-mono-code text-[#C84B31] uppercase tracking-wider">
                  {activeGroup.categoryTag} · META: {activeGroup.targetCoverage}
                </div>
                <h3 className="text-2xl font-display font-bold text-[#182226] mt-1">
                  {activeGroup.label}
                </h3>
                <p className="text-sm sm:text-base text-[#334155] mt-3 leading-relaxed">
                  {activeGroup.clinicalRationale}
                </p>
              </div>

              <div className="bg-[#FBF9F5] p-5 rounded-xl border border-[#E2DCD0] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0F3D4C]">
                  <Stethoscope className="w-4 h-4 text-[#C84B31]" />
                  <span>Esquema Posológico Oficial no PNI/SUS</span>
                </div>
                <p className="text-sm text-[#182226] leading-relaxed">
                  {activeGroup.vaccineScheme}
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-[#182226] uppercase tracking-wide font-mono-code">
                  Documentos necessários na Sala de Vacina (UBS):
                </h4>
                <ul className="space-y-2">
                  {activeGroup.requiredDocs.map((doc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#334155]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Interactive Booklet Inspection Checklist */}
            <div className="lg:col-span-5 bg-[#FBF9F5] rounded-xl border border-[#E2DCD0] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2DCD0]">
                  <div>
                    <p className="text-xs font-mono-code uppercase text-[#0F4C3A] font-bold">
                      AUDITORIA PRÁTICA DA CADERNETA
                    </p>
                    <h4 className="text-lg font-display font-bold text-[#0F3D4C] mt-0.5">
                      O Que Conferir na Caderneta Física / Digital
                    </h4>
                  </div>
                  <Users className="w-5 h-5 text-[#0F3D4C]" />
                </div>

                <p className="text-xs text-[#475569] mt-3 mb-4">
                  Marque os itens abaixo para simular a conferência educativa realizada com o paciente ou familiar durante a campanha:
                </p>

                <div className="space-y-3">
                  {activeGroup.bookletCheckpoints.map((checkpoint, idx) => {
                    const itemKey = `${activeGroup.id}-${idx}`;
                    const isChecked = !!checkedBookletItems[itemKey];
                    return (
                      <label
                        key={itemKey}
                        onClick={() => toggleBookletCheck(itemKey)}
                        className={`flex items-start gap-3 p-3.5 rounded-lg border transition-colors cursor-pointer select-none ${
                          isChecked
                            ? 'bg-[#E6F4EA] border-[#0F4C3A]/40 text-[#0F291E]'
                            : 'bg-white border-[#E2DCD0] text-[#182226] hover:border-[#0F3D4C]/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 h-4 w-4 accent-[#0F4C3A] rounded cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm leading-snug font-medium">
                          {checkpoint}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2DCD0]">
                <p className="text-xs text-[#0F3D4C] leading-relaxed">
                  <strong className="font-bold">Orientação Técnica SUS:</strong>{' '}
                  {activeGroup.susAlert}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 3: CALCULADORA DE CALENDÁRIO VACINAL POR FAIXA ETÁRIA E CONDIÇÃO CLÍNICA */}
      <section id="calculadora" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="bg-[#0F3D4C] text-white rounded-2xl p-6 sm:p-10 border border-[#0F3D4C]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#E07A5F]">
                <Calculator className="w-4 h-4" />
                <span>CALCULADORA DE ORIENTAÇÃO VACINAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Calculadora de Esquema Vacinal e Atualização da Caderneta por Perfil Clínico
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Simule o perfil etário, a condição clínica e o histórico vacinal para obter a conduta recomendada pelo Programa Nacional de Imunizações (PNI), incluindo a regra de primovacinação pediátrica em duas doses.
              </p>

              {/* Form Controls */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-mono-code uppercase text-slate-300 mb-1.5">
                    1. Faixa Etária do Cidadão
                  </label>
                  <select
                    value={calcAgeGroup}
                    onChange={(e) =>
                      setCalcAgeGroup(
                        e.target.value as
                          | 'child_under6'
                          | 'child_6to8'
                          | 'adult'
                          | 'senior'
                      )
                    }
                    className="w-full bg-[#0A2B36] border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E07A5F]"
                  >
                    <option value="senior">Idoso (60 anos ou mais)</option>
                    <option value="child_under6">
                      Criança de 6 meses a menor de 6 anos
                    </option>
                    <option value="child_6to8">Criança de 6 a 8 anos</option>
                    <option value="adult">
                      Adolescente ou Adulto (9 a 59 anos)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase text-slate-300 mb-1.5">
                    2. Condição Clínica ou Vínculo Funcional
                  </label>
                  <select
                    value={calcCondition}
                    onChange={(e) =>
                      setCalcCondition(
                        e.target.value as
                          | 'none'
                          | 'pregnant'
                          | 'postpartum'
                          | 'chronic'
                          | 'health_edu'
                      )
                    }
                    className="w-full bg-[#0A2B36] border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E07A5F]"
                  >
                    <option value="none">
                      Sem comorbidades crônicas declaradas
                    </option>
                    <option value="chronic">
                      Portador de Doença Crônica (Diabetes, Asma, Cardiopatia, Imunossupressão)
                    </option>
                    <option value="pregnant">
                      Gestante (1º, 2º ou 3º trimestre)
                    </option>
                    <option value="postpartum">
                      Puérpera (até 45 dias após o parto)
                    </option>
                    <option value="health_edu">
                      Trabalhador da Saúde ou Professor em exercício
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase text-slate-300 mb-1.5">
                    3. Histórico Prévio de Vacinação contra Influenza
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setCalcFirstTime('no')}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        calcFirstTime === 'no'
                          ? 'bg-[#C84B31] border-[#C84B31] text-white'
                          : 'bg-[#0A2B36] border-white/20 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      Já vacinou em anos anteriores
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcFirstTime('yes')}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        calcFirstTime === 'yes'
                          ? 'bg-[#C84B31] border-[#C84B31] text-white'
                          : 'bg-[#0A2B36] border-white/20 text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      1ª vez na vida (Primovacinação)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator Output Card */}
            <div className="lg:col-span-7 bg-[#FBF9F5] text-[#182226] rounded-xl p-6 sm:p-8 border border-[#E2DCD0]">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2DCD0]">
                <div>
                  <p className="text-xs font-mono-code uppercase text-[#64748B]">
                    RESULTADO DA AVALIAÇÃO EDUCATIVA
                  </p>
                  <h3 className="text-xl font-display font-bold text-[#0F3D4C] mt-0.5">
                    {calcResult.isEligibleSus
                      ? 'Elegível para Imunização Gratuita Prioritária no SUS'
                      : 'Elegível nas Etapas de Ampliação / Rede Pública e Privada'}
                  </h3>
                </div>
                <span className="font-mono-code text-xs font-bold text-[#0F4C3A]">
                  {calcResult.needsTwoDoses
                    ? 'ESQUEMA: 2 DOSES (INTERVALO 30 DIAS)'
                    : 'ESQUEMA: DOSE ÚNICA ANUAL'}
                </span>
              </div>

              <div className="mt-5 space-y-5">
                <div className="bg-white p-4 rounded-lg border border-[#E2DCD0]">
                  <p className="text-xs font-mono-code uppercase text-[#C84B31] font-bold">
                    Conduta Recomendada (Campanha Influenza 2025)
                  </p>
                  <p className="text-sm font-medium text-[#182226] mt-1 leading-relaxed">
                    {calcResult.doseSchemeText}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono-code uppercase text-[#0F3D4C] font-bold mb-2.5">
                    Recomendações de Atualização Simultânea da Caderneta:
                  </p>
                  <ul className="space-y-2">
                    {calcResult.bookletUpdates.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm text-[#334155]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E2DCD0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569]">
                  <span>
                    Fonte: Nota Técnica PNI / Ministério da Saúde & Calendário SBIm 2025
                  </span>
                  <span className="font-mono-code font-semibold text-[#0F3D4C]">
                    Cód. Ação: EMS-VAC-2025-0814
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 4: INTERACTIVE COMMUNITY PAMPHLET VIEWER & MYTHS VS TRUTHS */}
      <section id="folhetos-e-mitos" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 6 cols: Interactive Community Pamphlet Reader */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl border border-[#E2DCD0] p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E2DCD0]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#C84B31] uppercase">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>ACERVO EDITORIAL · EIXO I E IV</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#0F3D4C] mt-1">
                    Folheto Comunitário Distribuído na Ação
                  </h3>
                </div>
                <span className="font-mono-code text-xs font-bold text-[#0F3D4C] tabular-nums">
                  Lâmina 0{activePamphlet.pageNumber} / 0{COMMUNITY_PAMPHLET_PAGES.length}
                </span>
              </div>

              {/* Pamphlet Page Canvas */}
              <div className="mt-6 bg-[#FBF9F5] rounded-xl border border-[#D8D0C2] p-6 space-y-4">
                <p className="text-[11px] font-mono-code font-semibold text-[#0F4C3A] uppercase tracking-wider">
                  {activePamphlet.kicker}
                </p>
                <h4 className="text-xl font-display font-bold text-[#182226] leading-snug">
                  {activePamphlet.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {activePamphlet.subtitle}
                </p>

                <div className="space-y-3 pt-2">
                  {activePamphlet.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="bg-white p-3.5 rounded-lg border border-[#E2DCD0]"
                    >
                      <p className="text-xs font-bold text-[#0F3D4C]">
                        {hl.label}
                      </p>
                      <p className="text-xs text-[#334155] mt-1 leading-relaxed">
                        {hl.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E2DCD0] text-[11px] font-mono-code text-[#64748B]">
                  {activePamphlet.footerNote}
                </div>
              </div>
            </div>

            {/* Pamphlet Pagination Controls */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E2DCD0]">
              <button
                type="button"
                onClick={() =>
                  setPamphletPageIdx((p) =>
                    p === 0 ? COMMUNITY_PAMPHLET_PAGES.length - 1 : p - 1
                  )
                }
                className="px-3.5 py-2 text-xs font-semibold text-[#0F3D4C] bg-[#FBF9F5] border border-[#E2DCD0] rounded-lg hover:bg-[#F3EFE6] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Lâmina Anterior</span>
              </button>

              <div className="flex items-center gap-1.5">
                {COMMUNITY_PAMPHLET_PAGES.map((pg, idx) => (
                  <button
                    key={pg.pageNumber}
                    type="button"
                    onClick={() => setPamphletPageIdx(idx)}
                    aria-label={`Ir para lâmina ${pg.pageNumber}`}
                    className={`w-7 h-7 rounded-md font-mono-code text-xs font-bold transition-colors cursor-pointer ${
                      pamphletPageIdx === idx
                        ? 'bg-[#C84B31] text-white'
                        : 'bg-[#FBF9F5] text-[#475569] border border-[#E2DCD0] hover:border-[#0F3D4C]'
                    }`}
                  >
                    {pg.pageNumber}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setPamphletPageIdx(
                    (p) => (p + 1) % COMMUNITY_PAMPHLET_PAGES.length
                  )
                }
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0F3D4C] rounded-lg hover:bg-[#144B5D] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Próxima Lâmina</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 6 cols: Scientific Myth-Busting (Fake News Combat) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2DCD0] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-[#E2DCD0]">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#C84B31] uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>COMUNICAÇÃO CIENTÍFICA · EIXO III DA EXTENSÃO</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-[#0F3D4C] mt-1">
                  Combate à Desinformação (Fake News) sobre a Vacina da Gripe
                </h3>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {[
                  'Todos',
                  'Composição Viral',
                  'Segurança Clínica',
                  'Eficácia Sazonal',
                  'Coadministração',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMythFilter(cat)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      mythFilter === cat
                        ? 'bg-[#C84B31] text-white'
                        : 'bg-[#FBF9F5] text-[#475569] border border-[#E2DCD0] hover:text-[#182226]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Myths Cards */}
              <div className="space-y-4 mt-5">
                {filteredMyths.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FBF9F5] rounded-xl border border-[#E2DCD0] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono-code text-[#64748B]">
                      <span>TÓPICO: {item.category.toUpperCase()}</span>
                      <span className="text-[#C84B31] font-bold">
                        DESMISTIFICAÇÃO BASEADA EM EVIDÊNCIAS
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
                      <p className="text-sm font-bold text-[#182226] italic">
                        Boato comum: {item.myth}
                      </p>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <Sparkles className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm font-semibold text-[#0F4C3A]">
                        {item.truth}
                      </p>
                    </div>

                    <p className="text-xs text-[#334155] leading-relaxed pl-6">
                      {item.scientificBasis}
                    </p>

                    <p className="text-[11px] font-mono-code text-[#64748B] pl-6 pt-1">
                      Referência: {item.referenceSource}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
