import { useState, useEffect } from 'react'
import { Sun, Moon, Search, BookOpen, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'

interface Section {
  id: string
  title: string
  items: { title: string; content: string; tag?: string }[]
}

const SECTIONS: Section[] = [
  {
    id: 'scm',
    title: 'Licenca SCM - Servico de Comunicacao Multimidia',
    items: [
      {
        title: 'O que e o SCM',
        tag: 'Res. 614/2013',
        content: 'O Servico de Comunicacao Multimidia (SCM) e o servico fixo de telecomunicacoes de interesse coletivo prestado em ambito nacional e internacional, no regime privado, que possibilita a oferta de capacidade de transmissao, realizando a comunicacao de dados e outros sinais entre Pontos Terminais de Rede (PTRs) fixos, por meio de qualquer tecnologia. Provedores de Internet (ISPs) operam com licenca SCM.',
      },
      {
        title: 'Quem precisa de licenca SCM',
        tag: 'Res. 614/2013 Art. 3',
        content: 'Toda empresa que presta servico de acesso a Internet de banda larga ao usuario final de forma profissional e habitual precisa de autorizacao SCM. Isso inclui ISPs residenciais, empresariais e provedores de fibra optica (FTTH). A dispensa se aplica apenas a servicos de uso proprio nao remunerado.',
      },
      {
        title: 'Processo de outorga SCM',
        tag: 'Res. 614/2013',
        content: '1. Cadastro no sistema MOSAICO/ANATEL\n2. Preenchimento do requerimento de autorizacao SCM\n3. Pagamento do FISTEL (Fundo de Fiscalizacao das Telecomunicacoes)\n4. Envio da documentacao societaria (CNPJ, contrato social, RG/CPF dos socios)\n5. Comprometimento com os termos do Regulamento SCM\n6. Prazo de analise: geralmente 30-90 dias uteis\n7. Publicacao no Diario Oficial da Uniao (DOU)\n8. Inscricao no CAGEP (Cadastro Geral de Prestadoras)',
      },
      {
        title: 'Obrigacoes basicas do prestador SCM',
        tag: 'Res. 614/2013 Cap. IV',
        content: '- Prestar servico de forma continua e sem interrupcoes nao justificadas\n- Garantir o sigilo das comunicacoes\n- Atender as metas de qualidade estabelecidas pela ANATEL\n- Enviar informacoes ao SICI periodicamente\n- Manter plano de numeracao e identificacao de PTRs\n- Publicar Contrato de Prestacao de Servico (CPS) aprovado\n- Emitir faturas detalhadas\n- Manter SAC (0800 ou gratuito) disponivel 24x7',
      },
      {
        title: 'Classificacao por porte',
        tag: 'Res. 720/2020',
        content: 'Grupo A: Grandes prestadoras (mais de 50.000 acessos)\nGrupo B: Medias prestadoras (5.001 a 50.000 acessos)\nGrupo C: Pequenas prestadoras (ate 5.000 acessos)\n\nPrestadoras do Grupo C tem obrigacoes simplificadas, especialmente para envio de dados ao SICI e cumprimento de metas de qualidade.',
      },
    ],
  },
  {
    id: 'sici',
    title: 'SICI - Sistema de Informacoes e Controle do ISP',
    items: [
      {
        title: 'O que e o SICI',
        tag: 'Res. 574/2011',
        content: 'O SICI (Sistema de Informacoes e Controle do ISP) e o sistema de coleta de dados da ANATEL para monitoramento da qualidade e quantidade dos servicos de telecomunicacoes. ISPs SCM sao obrigados a enviar dados periodicamente sobre infraestrutura, cobertura e qualidade do servico.',
      },
      {
        title: 'Periodicidade de envio ao SICI',
        tag: 'Res. 614/2013',
        content: 'Mensal: Indicadores de qualidade (taxa de reclamacao, disponibilidade)\nSemestral: Dados de cobertura geografica (municipios atendidos, tecnologias)\nAnual: Dados de infraestrutura, quantidade de acessos ativos por tecnologia, velocidades ofertadas\n\nPrazo de envio: ate o 15o dia util apos o periodo de referencia. Multas por atraso ou omissao: ate R$ 50.000.000.',
      },
      {
        title: 'Principais dados reportados ao SICI',
        tag: 'Res. 614/2013',
        content: '- Quantidade de acessos ativos por tecnologia (fibra, cabo, radio, ADSL)\n- Velocidades de download e upload ofertadas e contratadas\n- Municipios com cobertura de servico\n- Indicadores de qualidade (RTT, taxa de perda de pacotes)\n- Numero de reclamacoes no Anatel Consumidor\n- Dados de infraestrutura (km de fibra, torres, ESs)\n- Receita bruta do servico SCM',
      },
      {
        title: 'Como acessar o SICI',
        tag: 'Portal ANATEL',
        content: 'Acesso via portal.anatel.gov.br com certificado digital e-CNPJ ou e-CPF do responsavel tecnico.\nSistema: Sistema ANATEL de Informacoes Gerenciais (SAIG)\nURL: sistemas.anatel.gov.br/sici\n\nContato suporte: (61) 2312-2001 | sici@anatel.gov.br',
      },
    ],
  },
  {
    id: 'qualidade',
    title: 'Indicadores de Qualidade SCM',
    items: [
      {
        title: 'Taxa de Reclamacoes (TRec)',
        tag: 'Res. 632/2014',
        content: 'Formula: (Reclamacoes no mes / Media de acessos ativos) x 1000\nMeta: nao superior a 15 reclamacoes por mil acessos em grandes prestadoras.\nFonte: Anatel Consumidor (consumidor.gov.br e central 1331)\nReportado: mensalmente no SICI',
      },
      {
        title: 'Disponibilidade do Servico',
        tag: 'Res. 632/2014',
        content: 'Meta: minimo de 98% do tempo em qualquer periodo de 30 dias (Grupos A e B).\nCalculo: tempo total disponivel / tempo total do periodo\nIncluem: falhas que afetam mais de 10% dos usuarios na area\nNao incluem: manutencoes programadas com aviso previo de 72h ao usuario e a ANATEL',
      },
      {
        title: 'RTT - Round Trip Time',
        tag: 'Res. 717/2019',
        content: 'Medicao de latencia na rede de acesso do ISP.\nMeta SCM (fibra/cabo): RTT medio inferior a 50ms para acesso a servidores nacionais\nMeta SCM (radio): RTT medio inferior a 150ms\nMedicao: ferramenta SIMET (CEPTRO.br/NIC.br) ou outro aprovado pela ANATEL\nReportado: mensalmente',
      },
      {
        title: 'Taxa de Ocupacao (Jitter e Perda)',
        tag: 'Res. 717/2019',
        content: 'Jitter: variacao no atraso de entrega de pacotes\nMeta: Jitter inferior a 10ms para fibra/cabo\nTaxa de perda de pacotes: inferior a 0.5% para fibra/cabo\n\nAmbas medidas via SIMET (Sistema de Medicao de Trafego Internet) com probe instalado na rede do assinante ou ponto de presenca do ISP.',
      },
      {
        title: 'Velocidade de Acesso',
        tag: 'Res. 574/2011 + Res. 717/2019',
        content: 'ISPs devem garantir no minimo 80% da velocidade contratada (download e upload) medida em 95% do tempo.\nMedicao no PTR do usuario final.\nPublicidade: velocidade anunciada deve corresponder a velocidade maxima obtivel, nao media.\nVelocidade minima garantida: deve ser informada no contrato (normalmente 10% da maxima).',
      },
    ],
  },
  {
    id: 'resolucoes',
    title: 'Resolucoes e Regulamentos ANATEL',
    items: [
      {
        title: 'Resolucao 614/2013 - Regulamento SCM',
        tag: 'Vigente',
        content: 'Regulamento do Servico de Comunicacao Multimidia. Define:\n- Condicoes para autorizacao do servico\n- Obrigacoes das prestadoras\n- Direitos dos usuarios\n- Qualidade do servico\n- Fiscalizacao e sancoes\n\nURL: anatel.gov.br/legislacao/resolucoes/2013/765-resolucao-614',
      },
      {
        title: 'Resolucao 632/2014 - Regulamento Geral de Qualidade',
        tag: 'RGQ',
        content: 'Regulamento Geral de Qualidade dos Servicos de Telecomunicacoes. Define indicadores de qualidade para todos os servicos (SCM, SMP, STFC). Estabelece metas, metodos de medicao, indicadores obrigatorios e penalidades por descumprimento.\n\nPrincipais indicadores para SCM: TRec, Disponibilidade, velocidade, RTT.',
      },
      {
        title: 'Resolucao 717/2019 - Plano Geral de Metas de Qualidade',
        tag: 'PGMQ-SCM',
        content: 'Atualiza as metas de qualidade para o SCM. Foco em broadband de alta velocidade e fibra optica. Inclui metas especificas para:\n- Velocidade efetiva (80% da contratada em 95% do tempo)\n- Latencia por tipo de meio fisico\n- Disponibilidade do servico\n- Experiencia do usuario final',
      },
      {
        title: 'Resolucao 590/2012 - RTCPAV',
        tag: 'Acessibilidade',
        content: 'Regulamento Tecnico para o Controle de Emissoes de Radiocomunicacoes. Para ISPs que usam radio (wireless), define limites de potencia e protecao de frequencias. Portadores de autorizacao de uso de RF devem seguir o PGMU e planos de atribuicao de frequencias.',
      },
      {
        title: 'Lei 13.116/2015 - Lei das Antenas',
        tag: 'Infraestrutura',
        content: 'Normas gerais para implantacao e compartilhamento de infraestrutura de telecomunicacoes. Proibe municipios de criar obstaculos injustificados para instalacao de antenas, torres e cabos. ISPs com radio ou fibra se beneficiam desta lei para instalacao de infraestrutura em areas urbanas e rurais.',
      },
      {
        title: 'Decreto 9.854/2019 - PNBL',
        tag: 'Politica Nacional',
        content: 'Plano Nacional de Banda Larga (PNBL). Define metas de cobertura de Internet em todo o territorio nacional. Prestadoras de pequeno porte em municipios sem cobertura adequada podem receber apoio do Fundo de Universalizacao das Telecomunicacoes (FUST) para expansao da rede.',
      },
    ],
  },
  {
    id: 'fistel',
    title: 'FISTEL e Taxas',
    items: [
      {
        title: 'TFF - Taxa de Fiscalizacao do Funcionamento',
        tag: 'Anual',
        content: 'Paga anualmente por prestadoras autorizadas. Calculada sobre o numero de estacoes de radiocomunicacao e terminais de acesso.\nVencimento: 31 de marco de cada ano\nBase legal: Lei 5.070/1966\nValores: variam conforme tipo de estacao e faixa de frequencia\nIsencao: prestadoras com receita bruta anual inferior a R$ 240.000 (verificar portaria vigente)',
      },
      {
        title: 'TFI - Taxa de Fiscalizacao de Instalacao',
        tag: 'Por estacao',
        content: 'Paga por cada nova estacao de radiocomunicacao licenciada.\nBase: mesmo valor da TFF mas cobrada uma unica vez na instalacao\nAplicavel a: ERBs, repetidoras, links de radio, satelite\nNao aplicavel a: infraestrutura cabeada (fibra, coaxial)',
      },
      {
        title: 'Preco Publico SCM',
        tag: 'Outorga',
        content: 'Valor cobrado pela autorizacao SCM:\n- Empresa nacional: R$ 400,00 (valor fixo, sujeito a atualizacao)\n- Pagamento: boleto GRU via Tesouro Nacional\n- Recolhimento: antes da emissao do ato de outorga\n\nVerificar valores atualizados no portal anatel.gov.br/setorregulado.',
      },
    ],
  },
  {
    id: 'numeracao',
    title: 'Numeracao e Identificacao',
    items: [
      {
        title: 'ASN - Autonomous System Number',
        tag: 'Registro.br',
        content: 'ISPs que operam BGP precisam de um ASN.\nOrgao emissor no Brasil: Registro.br (registro.br)\nProcesso: criar conta no Registro.br > solicitar ASN > justificar necessidade de roteamento independente > aguardar aprovacao (geralmente 5-15 dias uteis)\nCusto: R$ 0 (ASN publico via LACNIC/Registro.br e gratuito)\nASN privados: 64512-65534 (nao anunciaveis na Internet)',
      },
      {
        title: 'Bloco IPv4',
        tag: 'Registro.br',
        content: 'ISPs devem justificar necessidade de espaco IPv4.\nRegistro.br segue politicas do LACNIC para alocacao.\nMinimo alocado: /24 (256 enderecos)\nJustificativa: plano de utilizacao em 24 meses\nCusto: taxa anual baseada no tamanho do bloco\n\nCom esgotamento do IPv4, novas alocacoes sao limitadas. ISPs sao fortemente incentivados a usar CGNAT (RFC 6598: 100.64/10) para assinantes.',
      },
      {
        title: 'IPv6',
        tag: 'Registro.br',
        content: 'Alocacao IPv6 para ISPs:\nMinimo: /32\nCusto: incluido na anuidade do Registro.br\nRecomendado: plano de implantacao com prazo definido\n\nA ANATEL nao obriga tecnicamente o suporte a IPv6, mas a Resolucao 614/2013 cita o IPv6 como aspecto de qualidade. A oferta de IPv6 e considerada na avaliacao de qualidade do servico.',
      },
    ],
  },
  {
    id: 'fiscalizacao',
    title: 'Fiscalizacao e Penalidades',
    items: [
      {
        title: 'Processo Administrativo de Apuracao de Infracoes (PADO)',
        tag: 'Lei 9.472/1997',
        content: 'Quando a ANATEL identifica uma irregularidade, inicia um PADO.\nEtapas:\n1. Auto de infracao lavrado pelo fiscal\n2. Notificacao da empresa (prazo para defesa: geralmente 30 dias)\n3. Analise da defesa\n4. Julgamento pelo Conselho Diretor\n5. Publicacao do acordao\n6. Recursos: CADE, Poder Judiciario\n\nDefesas bem fundamentadas com evidencias tecnicas tem bom historico de exito.',
      },
      {
        title: 'Valor das Multas SCM',
        tag: 'Lei 9.472/1997',
        content: 'Multas por infracoes ao SCM variam de R$ 1.500 a R$ 50.000.000 dependendo da gravidade.\n\nFatores de dosimetria:\n- Porte da empresa\n- Gravidade da infacao (leve, media, grave, gravissima)\n- Vantagem auferida\n- Reincidencia\n- Cooperacao com a fiscalizacao\n\nPagamento: boleto GRU | Parcelamento em ate 24x para micro e pequenas empresas',
      },
      {
        title: 'Suspensao e Cancelamento',
        tag: 'Res. 614/2013',
        content: 'Casos que podem levar a suspensao do servico:\n- Reincidencia em infracoes graves\n- Descumprimento reiterado de metas de qualidade\n- Falta de envio de dados ao SICI\n\nCasos que podem levar ao cancelamento da autorizacao:\n- Cessacao de atividades sem comunicacao previa\n- Infracoes gravissimas ou crimine de telecomunicacoes\n- Falencia sem continuidade do servico',
      },
    ],
  },
  {
    id: 'contato',
    title: 'Contatos e Links Uteis',
    items: [
      {
        title: 'Canais oficiais ANATEL',
        tag: 'Suporte',
        content: 'Central do Assinante: 1331 (gratuito)\nPortal: anatel.gov.br\nSistemas do setor regulado: sistemas.anatel.gov.br\nSICI: sistemas.anatel.gov.br/sici\nMOSAICO (licenciamento): sistemas.anatel.gov.br/mosaico\nCertidoes e habilitacoes: sistemas.anatel.gov.br/outorga\nEmail institucional: anatel@anatel.gov.br',
      },
      {
        title: 'Registro.br e recursos de numeracao',
        tag: 'Registro.br / LACNIC',
        content: 'Registro.br: registro.br\nASN/IP: registro.br/dominio/as/\nLACNIC (regional): lacnic.net\nPortal Whois: registro.br/cgi-bin/whois/\nSPIX (IX.br): ix.br - pontos de troca de trafego no Brasil\n\nPTTs (Pontos de Troca de Trafego) principais: SP (Sao Paulo), RJ (Rio de Janeiro), BH (Belo Horizonte), BSB (Brasilia)',
      },
      {
        title: 'Associacoes e entidades de suporte ao ISP',
        tag: 'Entidades',
        content: 'ABRINT: Associacao Brasileira de Provedores de Internet e Telecomunicacoes (abrint.com.br)\nABISP: Associacao Brasileira dos Provedores de Acesso, Servicos e Informacoes da Rede Internet (abisp.org.br)\nInterNIC.br: NIC.br (nic.br)\nCERT.br: Resposta a incidentes de seguranca (cert.br)\nCEPTRO.br: SIMET e pesquisa de qualidade de Internet (cgi.br)',
      },
    ],
  },
]

export default function ANATELReference() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['scm', 'sici']))

  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  const toggle = (id: string) => setExpanded(ex => { const n = new Set(ex); n.has(id) ? n.delete(id) : n.add(id); return n })

  const filteredSections = SECTIONS.map(section => ({
    ...section,
    items: search
      ? section.items.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.content.toLowerCase().includes(search.toLowerCase()) ||
          (item.tag ?? '').toLowerCase().includes(search.toLowerCase())
        )
      : section.items,
  })).filter(s => s.items.length > 0)

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <span className="font-semibold">Referencia ANATEL</span>
              <span className="ml-2 text-xs text-zinc-400">para ISPs brasileiros</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark(d => !d)} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/gmowses/anatel-reference" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Referencia ANATEL para ISPs</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Guia completo sobre licenca SCM, obrigacoes SICI, indicadores de qualidade, resolucoes e processos regulatorios para provedores de Internet no Brasil.</p>
          </div>

          {/* Aviso */}
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 flex gap-3">
            <span className="text-amber-500 text-lg">!</span>
            <div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Aviso Legal</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Este material e de carater informativo e educacional. Para decisoes regulatorias, consulte sempre a legislacao vigente no portal da ANATEL (anatel.gov.br) e, se necessario, um advogado especializado em telecomunicacoes.</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por assunto, resolucao, indicador..."
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {filteredSections.map(section => (
              <div key={section.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <button
                  onClick={() => toggle(section.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-semibold">{section.title}</span>
                    <span className="text-xs text-zinc-400">{section.items.length} itens</span>
                  </div>
                  {expanded.has(section.id) ? <ChevronDown size={16} className="text-zinc-400" /> : <ChevronRight size={16} className="text-zinc-400" />}
                </button>

                {expanded.has(section.id) && (
                  <div className="border-t border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
                    {section.items.map((item, i) => (
                      <div key={i} className="px-6 py-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-sm">{item.title}</h3>
                          {item.tag && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">{item.tag}</span>
                          )}
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{item.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-3">
            <h2 className="font-semibold">Links Rapidos</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { label: 'Portal ANATEL', url: 'https://www.anatel.gov.br' },
                { label: 'Sistemas ANATEL (SICI, MOSAICO)', url: 'https://sistemas.anatel.gov.br' },
                { label: 'Registro.br (ASN e IPs)', url: 'https://registro.br' },
                { label: 'ANATEL Consumidor', url: 'https://www.anatel.gov.br/consumidor' },
                { label: 'ABRINT', url: 'https://abrint.com.br' },
                { label: 'SIMET - Medicao de Qualidade', url: 'https://simet.nic.br' },
                { label: 'IX.br - Pontos de Troca', url: 'https://ix.br' },
                { label: 'CERT.br - Seguranca', url: 'https://cert.br' },
              ].map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors text-sm"
                >
                  <ExternalLink size={12} className="text-zinc-400" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <span>Criado por <a href="https://github.com/gmowses" className="text-zinc-600 dark:text-zinc-300 hover:text-green-500 transition-colors">Gabriel Mowses</a></span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  )
}
