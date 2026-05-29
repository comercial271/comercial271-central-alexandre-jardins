import { useState } from 'react'
import { Clapperboard, Camera, BookOpen, Flame, TrendingUp, CheckCircle, Circle, AlertCircle } from 'lucide-react'

const IG_IDEAS_KEY = 'alexandre_ig_ideas_v1'

// ─── Data ─────────────────────────────────────────────────────────────────────

const pilares = [
  {
    id: 'transicao',
    nome: 'Transição',
    Icon: Clapperboard,
    bg: 'bg-forest-700',
    freq: '1-2x/semana',
    desc: 'A jornada de deixar a estabilidade pelo sonho. Conteúdo honesto sobre o processo de sair do CLT para empreender na jardinagem.',
    gancho: '"Tenho um emprego público. E tô largando tudo pela jardinagem. Deixa eu te contar por quê:"',
    formato: 'Reel (câmera na cara)',
  },
  {
    id: 'perrengue',
    nome: 'Perrengues',
    Icon: Flame,
    bg: 'bg-red-700',
    freq: '1x/semana',
    desc: 'Os erros reais, os perrengues e o que ninguém mostra quando começa. Vulnerabilidade gera confiança.',
    gancho: '"Fiz um orçamento de R$6.929 pra um condomínio. Lucro no campo \'lucro\': zero. Isso é o que acontece quando você tem medo de cobrar."',
    formato: 'Reel ou Stories',
  },
  {
    id: 'conquista',
    nome: 'Conquistas',
    Icon: TrendingUp,
    bg: 'bg-green-700',
    freq: '1x/semana',
    desc: 'Cada vitória merece ser celebrada — pequena ou grande. Marcos da transição que mostram progresso real.',
    gancho: '"Hoje o condomínio Belvedere voltou pra discutir meu orçamento. Primeira conquista real: eles vieram atrás de mim."',
    formato: 'Reel ou Stories',
  },
  {
    id: 'bastidores',
    nome: 'Bastidores',
    Icon: Camera,
    bg: 'bg-teal-600',
    freq: '2-3x/semana (Stories)',
    desc: 'Como é a rotina de quem faz os dois: CLT de segunda a sexta + empresa nos fins de semana. Humaniza e cria conexão.',
    gancho: '"6h30 acordei. Fui pro jardim. Às 18h voltei pro trabalho normal. Essa é minha semana:"',
    formato: 'Stories + Reels curtos',
  },
  {
    id: 'aprendizado',
    nome: 'Aprendizado',
    Icon: BookOpen,
    bg: 'bg-purple-700',
    freq: '1x/semana',
    desc: 'O que cada semana ensina nessa transição. Lições que servem pra qualquer um que pensa em empreender.',
    gancho: '"3 coisas que ninguém te fala quando você decide sair do CLT pra empreender:"',
    formato: 'Carrossel ou Reel',
  },
]

const ideias = [
  // Transição
  { id: '01', pilar: 'transicao',   formato: 'Reel',      hook: 'Tenho um emprego público. E tô largando tudo pela jardinagem. Deixa eu te contar por quê:', visual: 'Alexandre olhando direto pra câmera, tom tranquilo e direto — conta sobre o peso da estabilidade vs o que realmente quer' },
  { id: '02', pilar: 'transicao',   formato: 'Reel',      hook: 'Todo mundo acha que sou louco. Emprego público, estabilidade pra vida toda. Mas me deixa te mostrar o que é liberdade de verdade:', visual: 'Câmera na cara, emoção real — contraste entre segurança financeira e propósito; cena no jardim no fim' },
  { id: '03', pilar: 'transicao',   formato: 'Carrossel', hook: 'Meus fins de semana enquanto o resto descansa: construindo minha saída do CLT', visual: 'Fotos de sábado/domingo trabalhando nos jardins — tools, clientes, progressão; último slide com meta do breakeven' },
  { id: '04', pilar: 'transicao',   formato: 'Reel',      hook: 'Calculei o número exato que preciso ganhar pra poder largar o emprego. É R$10.500/mês. E vou te mostrar como chegar lá:', visual: 'Alexandre mostra a conta no papel/celular — breakeven CLT, projeção, cronograma real de 90 dias' },

  // Perrengues
  { id: '05', pilar: 'perrengue',   formato: 'Reel',      hook: 'Fiz um orçamento de R$6.929 pra um condomínio. Lucro no campo "lucro": zero. Isso é o que acontece quando você tem medo de cobrar:', visual: 'Alexandre mostrando o PDF do orçamento Belvedere — campo lucro zerado — reflexão honesta sobre o bloqueio de precificação' },
  { id: '06', pilar: 'perrengue',   formato: 'Stories',   hook: 'Cheguei num jardim hoje e o cliente mudou tudo do que combinamos. Respira. Profissional não entra em pânico. Mas dói.', visual: '3-4 slides: situação real no dia — o que aconteceu, como lidou, o que aprendeu' },
  { id: '07', pilar: 'perrengue',   formato: 'Reel',      hook: 'Meu primeiro cliente me pagou R$150 por dia. Hoje cobro R$800. O que mudou? Não foi o jardim.', visual: 'Alexandre direto, fala sobre a evolução da autoconfiança na precificação — o que virou a chave' },
  { id: '08', pilar: 'perrengue',   formato: 'Carrossel', hook: '5 erros que cometi nos primeiros meses que me custaram dinheiro de verdade — e o que aprendi com cada um', visual: 'Lista honesta: erro + lição por slide — tom vulnerável mas construtivo; último slide convida a seguir pra ver a virada' },

  // Conquistas
  { id: '09', pilar: 'conquista',   formato: 'Reel',      hook: 'Hoje o condomínio Belvedere voltou pra discutir meu orçamento. Primeira conquista real: eles vieram atrás de mim.', visual: 'Alexandre conta a ligação ou mensagem — o que isso significa na jornada; emoção genuína sem exagero' },
  { id: '10', pilar: 'conquista',   formato: 'Stories',   hook: 'Acabei de formalizar meu MEI. Alexandre Jardins existe oficialmente. Um passo pequeno. Uma sensação enorme.', visual: '3 slides: captura do CNPJ emitido + texto sobre o que significou + próximo passo imediato' },
  { id: '11', pilar: 'conquista',   formato: 'Reel',      hook: 'Fechei meu primeiro contrato formal com margem de lucro real. Isso aqui é pra quem acha que não tem saída do CLT.', visual: 'Alexandre segurando (ou mostrando no celular) o contrato assinado — tom motivador, real, não performático' },
  { id: '12', pilar: 'conquista',   formato: 'Carrossel', hook: 'De jardineiro de fim de semana a empresa com contrato: os marcos que me trouxeram até aqui', visual: 'Cronograma visual mês a mês: quando começou, primeiro cliente, primeiro contrato, MEI, Belvedere — progressão real' },

  // Bastidores
  { id: '13', pilar: 'bastidores',  formato: 'Stories',   hook: 'Como é a minha semana real: metalúrgico/servidor de segunda a sexta + jardineiro nas folgas. Vem ver:', visual: '5-6 slides mostrando a semana — trabalho CLT, saída, ida pro jardim, equip, resultado, descanso' },
  { id: '14', pilar: 'bastidores',  formato: 'Reel',      hook: '6h30 da manhã. Equipamentos carregados. Mais um dia construindo minha saída. POV:', visual: 'Câmera no carro, equipamentos, chegada no cliente — dia de trabalho real sem roteiro' },
  { id: '15', pilar: 'bastidores',  formato: 'Stories',   hook: 'Acabei de comprar meu uniforme. Mais um tijolo da Alexandre Jardins. A empresa vai ganhando forma.', visual: '3 slides: foto do uniforme com a logo, quanto custou, o que significa psicologicamente ter uma identidade visual' },
  { id: '16', pilar: 'bastidores',  formato: 'Reel',      hook: 'O que fica na cabeça de quem trabalha pra si mesmo no fim de semana e volta pro trabalho na segunda:', visual: 'Alexandre em voz over ou direto — reflexão honesta sobre a tensão entre os dois mundos' },

  // Aprendizado
  { id: '17', pilar: 'aprendizado', formato: 'Carrossel', hook: '3 coisas que ninguém te fala quando você decide sair do CLT pra empreender', visual: 'Um aprendizado por slide com exemplo real da experiência do Alexandre — tom de quem já viveu, não de coach' },
  { id: '18', pilar: 'aprendizado', formato: 'Reel',      hook: 'Por que eu não saí do CLT antes? A resposta honesta pode te ajudar também:', visual: 'Alexandre direto — fala sobre o medo disfarçado de prudência; o que mudou a cabeça dele' },
  { id: '19', pilar: 'aprendizado', formato: 'Carrossel', hook: 'Como calculei exatamente quanto preciso ganhar pra largar o emprego público (você pode fazer o mesmo)', visual: 'Mostra o cálculo real: custos pessoais + margem + impostos = breakeven; planilha simples que qualquer um entende' },
  { id: '20', pilar: 'aprendizado', formato: 'Reel',      hook: 'Daqui 90 dias, tomo a decisão mais importante da minha vida. Esse perfil vai ser o diário dessa jornada.', visual: 'Post de kick-off — Alexandre anuncia a série, convida a acompanhar, mostra onde está agora e onde quer chegar' },
]

const pilarBadge: Record<string, string> = {
  transicao:   'bg-forest-100 text-forest-800 border-forest-200',
  perrengue:   'bg-red-100 text-red-800 border-red-200',
  conquista:   'bg-green-100 text-green-800 border-green-200',
  bastidores:  'bg-teal-100 text-teal-800 border-teal-200',
  aprendizado: 'bg-purple-100 text-purple-800 border-purple-200',
}
const pilarLabel: Record<string, string> = {
  transicao:   'Transição',
  perrengue:   'Perrengue',
  conquista:   'Conquista',
  bastidores:  'Bastidores',
  aprendizado: 'Aprendizado',
}

function loadUsed(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(IG_IDEAS_KEY) || '[]')) } catch { return new Set() }
}
function saveUsed(s: Set<string>) {
  try { localStorage.setItem(IG_IDEAS_KEY, JSON.stringify([...s])) } catch {}
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function InstagramAlexandre() {
  const [used, setUsed] = useState<Set<string>>(loadUsed)
  const [activePilar, setActivePilar] = useState<string | null>(null)
  const [openPilar, setOpenPilar] = useState<string | null>(null)

  const toggleUsed = (id: string) => {
    const next = new Set(used)
    if (next.has(id)) next.delete(id); else next.add(id)
    setUsed(next)
    saveUsed(next)
  }

  const filtered = activePilar ? ideias.filter(i => i.pilar === activePilar) : ideias
  const usedCount = used.size

  return (
    <section id="instagram" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Conteúdo autêntico</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Instagram — A Transição</h2>
          <p className="text-gray-500 mt-2">Vem acompanhar comigo a minha transição de servidor público pra jardinagem. Vida real, perrengues e conquistas.</p>
        </div>

        {/* Por que sua história é o marketing */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">Tua história é teu marketing</p>
            <p className="text-amber-800 text-sm mt-1">
              Você tem uma história que poucas pessoas têm: emprego público estável, escolhendo abrir mão da segurança por um sonho. Isso é <strong>raro</strong>, <strong>autêntico</strong> e <strong>conecta</strong>. Quem segue sua jornada vira cliente — porque já confia antes de contratar.
            </p>
          </div>
        </div>

        {/* Narrativa central */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-10 text-white">
          <div className="flex items-center gap-2 mb-5">
            <Clapperboard size={18} className="text-gold-500" />
            <p className="font-bold text-lg">A narrativa que vai te diferenciar de todos</p>
          </div>
          <p className="text-white/70 text-sm mb-6 max-w-2xl leading-relaxed">
            Não existe nenhum jardineiro em Itatiba contando essa história. Você não é "mais um prestador de serviço" — você é <strong className="text-white">o cara que escolheu o jardim</strong> quando tinha tudo pra ficar quieto. Isso interessa. Isso engaja. Isso vende.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n: '01', titulo: 'Mostre a escolha', desc: 'Estabilidade vs propósito. A tensão real de quem está no meio do caminho é o conteúdo mais humano que existe.' },
              { n: '02', titulo: 'Mostre os perrengues', desc: 'Erro no orçamento. Cliente difícil. Dia difícil. Vulnerabilidade real gera confiança — e seguidores fiéis.' },
              { n: '03', titulo: 'Mostre as conquistas', desc: 'MEI aberto. Primeiro contrato formal. Belvedere voltando. Cada marco publicado é prova social ao vivo.' },
            ].map(r => (
              <div key={r.n} className="bg-forest-700/50 rounded-xl p-4">
                <p className="text-gold-500 font-bold text-2xl mb-1 leading-none">{r.n}</p>
                <p className="text-white font-bold text-sm mb-1.5">{r.titulo}</p>
                <p className="text-white/60 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pilares */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Os 5 Pilares de Conteúdo</h3>
        <p className="text-gray-500 text-sm mb-5">Clique em um pilar para filtrar as ideias abaixo. Alterne entre todos para manter o perfil equilibrado.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {pilares.map(p => {
            const isActive = activePilar === p.id
            const isOpen = openPilar === p.id
            return (
              <div key={p.id} className={`rounded-2xl border-2 bg-white transition-all overflow-hidden ${isActive ? 'border-forest-500 shadow-md' : 'border-transparent hover:border-forest-100'}`}>
                <button
                  onClick={() => setActivePilar(prev => prev === p.id ? null : p.id)}
                  className="w-full text-left p-4"
                >
                  <div className={`w-9 h-9 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
                    <p.Icon size={16} className="text-white" />
                  </div>
                  <p className="font-bold text-forest-900 text-sm mb-0.5">{p.nome}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{p.freq}</span>
                </button>
                <button
                  onClick={() => setOpenPilar(prev => prev === p.id ? null : p.id)}
                  className="w-full text-left px-4 pb-3"
                >
                  <p className={`text-xs text-forest-600 font-semibold hover:text-forest-800 transition-colors ${isOpen ? 'text-forest-800' : ''}`}>
                    {isOpen ? '▲ ver menos' : '▼ ver detalhes'}
                  </p>
                  {isOpen && (
                    <div className="mt-2 space-y-1.5">
                      <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                      <p className="text-xs text-forest-700 italic">Gancho: {p.gancho}</p>
                      <span className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full font-medium">{p.formato}</span>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Calendário semanal */}
        <div className="bg-[#F4F6F0] rounded-2xl p-6 mb-10">
          <h3 className="font-bold text-forest-900 mb-1">Calendário Semanal Padrão</h3>
          <p className="text-gray-500 text-sm mb-5">Mínimo realista: 4 posts + Stories diários</p>
          <div className="grid grid-cols-7 gap-1.5">
            {[
              { dia: 'SEG', acao: 'Transição',          formato: 'Reel',      bg: 'bg-forest-100 text-forest-800' },
              { dia: 'TER', acao: 'Bastidores',         formato: 'Stories',   bg: 'bg-teal-100 text-teal-800' },
              { dia: 'QUA', acao: 'Aprendizado',        formato: 'Carrossel', bg: 'bg-purple-100 text-purple-800' },
              { dia: 'QUI', acao: 'Bastidores',         formato: 'Stories',   bg: 'bg-teal-100 text-teal-800' },
              { dia: 'SEX', acao: 'Perrengue ou Conquista', formato: 'Reel', bg: 'bg-red-100 text-red-800' },
              { dia: 'SAB', acao: 'Bastidores do fim de semana', formato: 'Stories', bg: 'bg-gray-100 text-gray-600' },
              { dia: 'DOM', acao: 'Off ou Repost',      formato: '—',         bg: 'bg-gray-50 text-gray-400' },
            ].map(item => (
              <div key={item.dia} className={`rounded-xl p-2.5 ${item.bg}`}>
                <p className="font-bold text-xs uppercase tracking-wider mb-2">{item.dia}</p>
                <p className="text-xs font-semibold leading-snug mb-1.5">{item.acao}</p>
                <span className="text-xs opacity-60 bg-black/10 px-1.5 py-0.5 rounded-full block w-fit">{item.formato}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banco de Ideias */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-forest-900 text-lg">Banco de Conteúdo — 20 Ideias Prontas</h3>
            <p className="text-gray-500 text-sm mt-0.5">Marque como "publicado" quando executar. {usedCount} / 20 publicados.</p>
          </div>
          {activePilar && (
            <button
              onClick={() => setActivePilar(null)}
              className="text-xs text-forest-700 border border-forest-300 px-3 py-1.5 rounded-lg hover:bg-forest-50 transition-colors"
            >
              Mostrar todos ✕
            </button>
          )}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-forest-600 to-gold-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(usedCount / 20) * 100}%` }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {filtered.map(ideia => {
            const isUsed = used.has(ideia.id)
            return (
              <div
                key={ideia.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${isUsed ? 'opacity-50 border-gray-100' : 'border-gray-100 hover:border-forest-200 hover:shadow'}`}
              >
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleUsed(ideia.id)} className="shrink-0 mt-0.5">
                    {isUsed
                      ? <CheckCircle size={22} className="text-green-500" />
                      : <Circle size={22} className="text-gray-200 hover:text-forest-400 transition-colors" />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${pilarBadge[ideia.pilar]}`}>{pilarLabel[ideia.pilar]}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{ideia.formato}</span>
                    </div>
                    <p className={`text-sm font-semibold leading-snug mb-2 ${isUsed ? 'line-through text-gray-400' : 'text-forest-900'}`}>
                      {ideia.hook}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{ideia.visual}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA final */}
        <div className="bg-forest-800 rounded-2xl p-6 text-white text-center">
          <TrendingUp size={28} className="text-gold-500 mx-auto mb-3" />
          <p className="font-bold text-lg mb-2">Comece pelo post 20 — o kick-off da série</p>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Anuncia publicamente que você vai documentar a transição. Isso cria compromisso e gera curiosidade imediata.{' '}
            <span className="text-gold-500 font-semibold">Quem declara, executa.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
