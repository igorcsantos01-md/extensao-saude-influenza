export interface CertificateAxis {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
}

export interface CertificateRecord {
  number: string;
  book: string;
  page: string;
  code: string;
  controlKey: string;
  sha256: string;
  holderName: string;
  holderRole: string;
  holderCpf: string;
  holderInstitution: string;
  title: string;
  modality: string;
  editalItem: string;
  period: string;
  issueDate: string;
  totalHours: string;
  totalHoursNumeric: number;
  frontSummaryParagraph: string;
  axes: CertificateAxis[];
}

export const CERTIFICATE_08: CertificateRecord = {
  number: '08',
  book: '01/2025',
  page: '54',
  code: 'EMS-VAC-2025-0814',
  controlKey: '0814-9263-5510-8F4B',
  sha256: '8b4e91c2a7f03d65e1948b2c7d41e90f3a6c82b5d1e7094a2c8f6b3d5e100814',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderRole: 'Médico',
  holderCpf: '702.794.941-57',
  holderInstitution: 'Centro Universitário de Anápolis (UNIFAN)',
  title:
    'Campanha Educativa de Incentivo à Imunização de Grupos Prioritários: Entrega de Folhetos Comunitários sobre Influenza e Atualização da Caderneta',
  modality: 'Campanha Educativa, Conscientização de Vacinação e Atividade Comunitária',
  editalItem:
    'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
  period: '08 a 10 de maio de 2025',
  issueDate: '16 de maio de 2025',
  totalHours: '10 (dez) horas',
  totalHoursNumeric: 10,
  frontSummaryParagraph:
    'No âmbito desta ação extensionista, o profissional atuou na elaboração técnico-científica e distribuição comunitária gratuita de folhetos explicativos sobre os benefícios da vacinação anual contra Influenza em idosos, gestantes, crianças e portadores de comorbidades, orientação estruturada para leitura e atualização da caderneta vacinal, comunicação científica para combate à desinformação (fake news) sobre imunobiológicos e divulgação dos canais oficiais de busca de salas de vacina do SUS e portal Meu SUS Digital.',
  axes: [
    {
      id: 'Eixo I',
      title: 'Eixo I — Curadoria Científica e Produção Editorial Preventiva',
      subtitle: 'Editoração Científica em Imunizações e Saúde Coletiva',
      description:
        'Revisão das notas técnicas do Programa Nacional de Imunizações (PNI/MS) e elaboração didática do Folheto Comunitário Ilustrado "Vacina contra a Gripe (Influenza): Proteção Anual para Grupos Prioritários e Atualização da Caderneta".',
      hours: '03h 00min',
    },
    {
      id: 'Eixo II',
      title: 'Eixo II — Triagem Educativa e Orientação de Atualização da Caderneta',
      subtitle: 'Letramento Vacinal e Mapeamento de Grupos Prioritários',
      description:
        'Aplicação de checklist educativo interativo aberto à comunidade para identificação de elegibilidade nos grupos prioritários (idosos 60+, gestantes, puérperas, crianças e doentes crônicos) e conferência de doses pendentes.',
      hours: '02h 30min',
    },
    {
      id: 'Eixo III',
      title: 'Eixo III — Comunicação Científica e Combate a Fake News em Imunização',
      subtitle: 'Infodemiologia e Desmistificação Baseada em Evidências',
      description:
        'Desmistificação ativa de boatos sobre composição de vírus inativados (fragmentados), segurança na gestação e falsas alegações de que a vacina provoca gripe, fundamentada em diretrizes da SBIm, OMS e Ministério da Saúde.',
      hours: '02h 30min',
    },
    {
      id: 'Eixo IV',
      title: 'Eixo IV — Ação Comunitária e Divulgação dos Canais Oficiais do SUS',
      subtitle: 'Cidadania em Saúde e Acesso às Salas de Vacinação',
      description:
        'Distribuição comunitária gratuita dos folhetos impressos e digitais e orientação prática sobre localização de Unidades Básicas de Saúde (UBS), documentos exigidos e emissão da Carteira Nacional de Vacinação no Meu SUS Digital.',
      hours: '02h 00min',
    },
  ],
};

export interface PriorityGroupInfo {
  id: string;
  label: string;
  categoryTag: string;
  targetCoverage: string;
  clinicalRationale: string;
  vaccineScheme: string;
  requiredDocs: string[];
  bookletCheckpoints: string[];
  susAlert: string;
}

export const PRIORITY_GROUPS: PriorityGroupInfo[] = [
  {
    id: 'idosos',
    label: 'Idosos (60 anos ou mais)',
    categoryTag: 'Prioridade Absoluta PNI · Meta 90%',
    targetCoverage: '90% da população ≥ 60 anos',
    clinicalRationale:
      'A imunossenescência reduz a resposta imune celular e humoral, elevando em até 8x o risco de hospitalização por Síndrome Respiratória Aguda Grave (SRAG) e pneumonia bacteriana secundária pós-Influenza.',
    vaccineScheme:
      'Dose única anual (0,5 mL intramuscular) com cepas atualizadas pela OMS para o Hemisfério Sul (Influenza A H1N1, A H3N2 e linhagem B).',
    requiredDocs: [
      'Documento oficial com foto e CPF ou Cartão Nacional de Saúde (CNS)',
      'Caderneta de Vacinação do Idoso (física ou no app Meu SUS Digital)',
    ],
    bookletCheckpoints: [
      'Verificar registro do lote e data da campanha anual de Influenza',
      'Checar atualização simultânea de Pneumocócica e reforço de dT (Dupla Adulto a cada 10 anos)',
      'Confirmar status vacinal para COVID-19 bivalente/monovalente atualizada',
    ],
    susAlert:
      'Pode ser administrada no mesmo dia (coadministração) com outras vacinas do Calendário Nacional do Idoso.',
  },
  {
    id: 'gestantes',
    label: 'Gestantes e Puérperas (até 45 dias pós-parto)',
    categoryTag: 'Proteção Materno-Fetal · Transferência IgG',
    targetCoverage: '90% das gestantes em qualquer idade gestacional',
    clinicalRationale:
      'Alterações cardiopulmonares e imunológicas da gestação aumentam o risco de evolução grave. Além de proteger a mãe, ocorre transferência transplacentária de anticorpos IgG que protegem o recém-nascido nos primeiros 6 meses de vida (quando ainda não pode receber a vacina).',
    vaccineScheme:
      'Dose única anual em qualquer trimestre gestacional ou no puerpério (até 45 dias após o parto). Vacina 100% inativada (vírus fragmentados), segura na gestação e amamentação.',
    requiredDocs: [
      'Caderneta da Gestante ou Cartão de Pré-Natal (ou certidão de nascimento do bebê para puérperas)',
      'CPF ou Cartão SUS (CNS)',
    ],
    bookletCheckpoints: [
      'Conferir registro da dose anual de Influenza na Caderneta da Gestante',
      'Auditar janela da vacina dTpa (Tríplice Bacteriana Acelular) a partir da 20ª semana a cada gestação',
      'Verificar esquema completo de Hepatite B (3 doses)',
    ],
    susAlert:
      'Não exige pedido médico na sala de vacina da UBS; basta apresentar o Cartão de Pré-Natal ou exame comprobatório.',
  },
  {
    id: 'criancas',
    label: 'Crianças (6 meses a menores de 6 anos)',
    categoryTag: 'Faixa Pediátrica · Primovacinação em 2 Doses',
    targetCoverage: '90% das crianças de 6m a 5a 11m 29d',
    clinicalRationale:
      'Crianças menores de 5 anos apresentam vias aéreas de menor calibre e imaturidade imunológica, liderando taxas de internação pediátrica por bronquiolite, laringotraqueobronquite, otite média aguda e pneumonia viral no outono/inverno.',
    vaccineScheme:
      'Primovacinação (1ª vez na vida): 2 doses com intervalo de 30 dias entre elas. Crianças que já receberam pelo menos 1 ou 2 doses em anos anteriores: dose única anual.',
    requiredDocs: [
      'Caderneta da Criança (imprescindível para avaliação global do calendário)',
      'Certidão de Nascimento, CPF da criança ou Cartão SUS',
    ],
    bookletCheckpoints: [
      'Identificar se é a primeira vacinação contra gripe na vida (agendar retorno de 30 dias para 2ª dose)',
      'Revisar Pentavalente, VIP (Poliomielite), Pneumocócica 10-valente e Meningocócica C',
      'Checar Tríplice Viral (Sarampo, Caxumba e Rubéola) aos 12 e 15 meses',
    ],
    susAlert:
      'Atenção especial na orientação aos pais sobre o retorno em 30 dias na primovacinação para garantir eficácia sorológica.',
  },
  {
    id: 'comorbidades',
    label: 'Portadores de Doenças Crônicas e Imunossuprimidos',
    categoryTag: 'Alto Risco Clínico · Descompensação de Base',
    targetCoverage: '100% dos pacientes cadastrados em programas de crônicos',
    clinicalRationale:
      'A infecção pelo vírus Influenza desencadeia resposta inflamatória sistêmica capaz de descompensar diabetes mellitus, insuficiência cardíaca, asma, DPOC, doença renal crônica e quadros de imunossupressão oncológica ou reumatológica.',
    vaccineScheme:
      'Dose única anual no SUS e nos Centros de Referência para Imunobiológicos Especiais (CRIE). Por ser vacina inativada, é segura para pacientes imunossuprimidos.',
    requiredDocs: [
      'Comprovante da condição clínica (receita médica, laudo, relatório ou cadastro no Hiperdia/UBS)',
      'Documento com foto, CPF e Caderneta de Vacinação',
    ],
    bookletCheckpoints: [
      'Registrar a indicação clínica especial no sistema SI-PNI / Rede Nacional de Dados em Saúde (RNDS)',
      'Orientar pacientes diabéticos e cardiopatas sobre sinais de alarme respiratórios',
      'Avaliar encaminhamento ao CRIE para esquemas especiais (Pneumo 13/23, Haemophilus influenzae b)',
    ],
    susAlert:
      'Receitas de uso contínuo (ex: insulina, anti-hipertensivos, broncodilatadores) servem como comprovante direto na UBS.',
  },
  {
    id: 'trabalhadores',
    label: 'Trabalhadores da Saúde e Professores',
    categoryTag: 'Barreira Epidemiológica e Serviços Essenciais',
    targetCoverage: '90% dos profissionais em atividade',
    clinicalRationale:
      'Reduz a transmissão nosocomial para pacientes vulneráveis em hospitais/ambulatórios e diminui a circulação viral em ambientes escolares fechados, preservando a continuidade dos serviços de saúde e educação.',
    vaccineScheme:
      'Dose única anual antes do pico sazonal de circulação viral de outono/inverno.',
    requiredDocs: [
      'Carteira do conselho profissional (CRM, COREN, etc.), contracheque ou declaração de vínculo funcional',
      'CPF e Caderneta de Vacinação do Adulto',
    ],
    bookletCheckpoints: [
      'Conferir esquema completo de Hepatite B (3 doses) e sorologia Anti-HBs para profissionais da saúde',
      'Verificar atualização de Tríplice Viral, Varicela e dT/dTpa',
      'Emitir comprovante vacinal digital pelo aplicativo Meu SUS Digital',
    ],
    susAlert:
      'Inclui estudantes da área da saúde em estágio hospitalar/ambulatorial e profissionais de apoio das unidades.',
  },
];

export interface MythFactItem {
  id: string;
  category: 'Composição Viral' | 'Segurança Clínica' | 'Eficácia Sazonal' | 'Coadministração';
  myth: string;
  truth: string;
  scientificBasis: string;
  referenceSource: string;
}

export const MYTHS_AND_FACTS: MythFactItem[] = [
  {
    id: 'mito-1',
    category: 'Composição Viral',
    myth: '"Tomei a vacina da gripe no posto e fiquei gripado por causa dela dois dias depois."',
    truth:
      'FALSO. A vacina contra Influenza distribuída pelo SUS é composta por vírus 100% inativados (mortos e fragmentados). É biologicamente impossível que o imunizante cause infecção gripal.',
    scientificBasis:
      'O que pode ocorrer é: (1) reação inflamatória leve esperada (dor local, febrícula ou mialgia leve por 24–48h, sinal de ativação do sistema imune); (2) a pessoa já estar incubando um resfriado comum (Rinovírus, Parainfluenza) antes da aplicação; ou (3) exposição ao vírus antes dos 14 dias necessários para a soroconversão.',
    referenceSource: 'Ministério da Saúde (PNI) & Sociedade Brasileira de Imunizações (SBIm)',
  },
  {
    id: 'mito-2',
    category: 'Eficácia Sazonal',
    myth: '"Já tomei a vacina da gripe no ano passado, então não preciso tomar novamente este ano."',
    truth:
      'FALSO. A atualização da dose é obrigatoriamente anual devido à alta taxa de mutação antigênica do vírus Influenza (drift antigênico) e à queda natural dos títulos de anticorpos após 6 a 12 meses.',
    scientificBasis:
      'Todos os anos, a Organização Mundial da Saúde (OMS) monitora as cepas circulantes e define uma nova composição específica para o Hemisfério Sul (contendo cepas atualizadas de Influenza A/H1N1, Influenza A/H3N2 e Influenza B).',
    referenceSource: 'Organização Mundial da Saúde (OMS) / Global Influenza Surveillance and Response System',
  },
  {
    id: 'mito-3',
    category: 'Segurança Clínica',
    myth: '"Gestantes não devem tomar a vacina da gripe no primeiro trimestre porque faz mal ao bebê."',
    truth:
      'FALSO. A vacina contra Influenza é segura e formalmente recomendada em qualquer idade gestacional (1º, 2º ou 3º trimestre), protegendo a mãe e o recém-nascido.',
    scientificBasis:
      'Estudos clínicos demonstram redução de até 50% nas infecções respiratórias agudas em gestantes vacinadas e redução significativa de hospitalizações por Influenza nos bebês durante os primeiros 6 meses de vida graças à transferência placentária de anticorpos IgG.',
    referenceSource: 'FEBRASGO, SBIm e Manual de Normas e Procedimentos para Vacinação (MS)',
  },
  {
    id: 'mito-4',
    category: 'Coadministração',
    myth: '"Quem tem alergia leve a ovo ou tomou outra vacina recente não pode receber a vacina da gripe."',
    truth:
      'FALSO. Pessoas com alergia a ovo (inclusive urticária) podem receber a vacina normalmente nas salas de vacina do SUS, e ela pode ser aplicada no mesmo dia que outras vacinas do calendário.',
    scientificBasis:
      'A quantidade residual de ovalbumina nas vacinas atuais é extremamente baixa (< 1 micrograma/dose). Apenas indivíduos com histórico de anafilaxia grave comprovada após dose anterior exigem observação em ambiente assistido. Não há necessidade de intervalo entre a vacina da gripe e as demais vacinas do PNI.',
    referenceSource: 'Nota Técnica PNI/Ministério da Saúde & Associação Brasileira de Alergia e Imunologia (ASBAI)',
  },
];

export interface PamphletPage {
  pageNumber: number;
  kicker: string;
  title: string;
  subtitle: string;
  highlights: { label: string; detail: string }[];
  footerNote: string;
}

export const COMMUNITY_PAMPHLET_PAGES: PamphletPage[] = [
  {
    pageNumber: 1,
    kicker: 'FOLHETO COMUNITÁRIO OFICIAL · PÁGINA 01/04 · CAPA EDUCATIVA',
    title: 'Gripe Não é Resfriado: Por Que a Vacinação Anual Salva Vidas?',
    subtitle:
      'Guia comunitário de distribuição gratuita elaborado na Ação Extensionista Nº 08 (Maio/2025) para orientação de pacientes, familiares e grupos prioritários.',
    highlights: [
      {
        label: 'Diferença Clínica Fundamental',
        detail:
          'Enquanto o resfriado comum causa apenas coriza leve e espirros, a Influenza inicia de forma súbita com febre alta (> 38°C), mialgia intensa, cefaleia, prostração e risco de evoluir para Síndrome Respiratória Aguda Grave (SRAG) e pneumonia.',
      },
      {
        label: 'Por que atualizar todo ano?',
        detail:
          'O vírus da gripe sofre mutações constantes. A vacina de 2025 traz a nova composição determinada pela OMS para proteger contra os subtipos Influenza A (H1N1), Influenza A (H3N2) e Influenza B em circulação no Brasil.',
      },
      {
        label: 'Janela de Imunidade',
        detail:
          'O organismo leva cerca de 2 semanas após a aplicação para atingir o pico de anticorpos protetores. Vacinar-se antes dos meses mais frios e secos evita internações no pico sazonal.',
      },
    ],
    footerNote:
      'Material de Educação em Saúde · Editora Mente e Saúde & Centro Profissionalizante Maria Dalva de Araújo',
  },
  {
    pageNumber: 2,
    kicker: 'FOLHETO COMUNITÁRIO OFICIAL · PÁGINA 02/04 · QUEM DEVE VACINAR NO SUS',
    title: 'Grupos Prioritários do PNI: Confira se Você Faz Parte',
    subtitle:
      'O Ministério da Saúde disponibiliza gratuitamente a vacina nas Unidades Básicas de Saúde (UBS) para os públicos com maior risco de complicações e óbito:',
    highlights: [
      {
        label: 'Idosos (60+) e Crianças (6 meses a < 6 anos)',
        detail:
          'Públicos mais vulneráveis a complicações pulmonares. Atenção pais: crianças que vão tomar a vacina da gripe pela 1ª vez na vida precisam de 2 doses com intervalo de 30 dias!',
      },
      {
        label: 'Gestantes e Puérperas (até 45 dias pós-parto)',
        detail:
          'Indicada em qualquer mês da gravidez. Além de proteger a gestante contra formas graves, os anticorpos passam para o bebê pela placenta e pelo leite materno.',
      },
      {
        label: 'Portadores de Doenças Crônicas',
        detail:
          'Hipertensos graves, diabéticos, asmáticos, portadores de DPOC, cardiopatas, renais crônicos, imunossuprimidos e pacientes em tratamento oncológico. Leve sua receita médica simples à UBS.',
      },
    ],
    footerNote:
      'Também contemplados: Trabalhadores da Saúde, Professores, Indígenas, Quilombolas e Pessoas com Deficiência Permanente.',
  },
  {
    pageNumber: 3,
    kicker: 'FOLHETO COMUNITÁRIO OFICIAL · PÁGINA 03/04 · PASSO A PASSO DA CADERNETA',
    title: 'Como Ler e Atualizar Sua Caderneta de Vacinação',
    subtitle:
      'Aprenda a conferir os registros da sua caderneta física e como acessar sua Carteira Nacional de Vacinação Digital pelo celular:',
    highlights: [
      {
        label: '1. O que conferir no carimbo da sala de vacina',
        detail:
          'Certifique-se de que o profissional anotou a data da aplicação, o fabricante/lote do imunizante ("Influenza Trivalente"), a unidade de saúde (CNES) e a rubrica do vacinador.',
      },
      {
        label: '2. Aproveite a ida ao posto para atualizar outras vacinas',
        detail:
          'Adultos e idosos devem checar Hepatite B (3 doses), Dupla Adulto dT (reforço a cada 10 anos) e Febre Amarela. A vacina da gripe pode ser tomada no mesmo dia que outras vacinas!',
      },
      {
        label: '3. Acesso pelo aplicativo oficial Meu SUS Digital',
        detail:
          'Baixe gratuitamente o app "Meu SUS Digital" (antigo Conecte SUS), entre com sua conta Gov.br e clique em "Vacinas" para visualizar e exportar sua Carteira Nacional de Vacinação em PDF.',
      },
    ],
    footerNote:
      'Perdeu o cartão de papel? Compareça à UBS de referência com seu CPF ou Cartão SUS para resgate no sistema SI-PNI.',
  },
  {
    pageNumber: 4,
    kicker: 'FOLHETO COMUNITÁRIO OFICIAL · PÁGINA 04/04 · COMBATE À DESINFORMAÇÃO',
    title: 'Verdade Científica vs. Fake News e Sinais de Alerta',
    subtitle:
      'Informação verificada pelas sociedades médicas para proteger sua família contra boatos nas redes sociais:',
    highlights: [
      {
        label: 'A vacina é de vírus inativado (não causa gripe)',
        detail:
          'O imunizante contém apenas fragmentos inativados do vírus. Dor leve no braço ou febrícula baixa no dia seguinte são sinais normais de que sua defesa está sendo treinada.',
      },
      {
        label: 'Medidas complementares de prevenção respiratória',
        detail:
          'Higienize as mãos com frequência, mantenha ambientes ventilados, pratique a etiqueta da tosse e evite contato próximo com recém-nascidos e idosos caso apresente sintomas gripais.',
      },
      {
        label: 'Sinais de Alarme — Quando procurar atendimento médico imediato',
        detail:
          'Falta de ar (dispneia), esforço para respirar, febre alta que não cede após 3 dias, confusão mental em idosos ou prostração intensa em crianças exigem avaliação médica imediata na UPA/UBS.',
      },
    ],
    footerNote:
      'Canais Oficiais: Disque Saúde 136 · Portal gov.br/saude · Aplicativo Meu SUS Digital · Registro EMS-VAC-2025-0814',
  },
];
