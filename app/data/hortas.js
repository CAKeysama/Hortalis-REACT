const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=60",
];

export const HORTAS_MOCK = [
  {
    id: "horta-aurora",
    nome: "Horta Aurora",
    descricaoCurta: "Hortalicas frescas com coleta semanal.",
    descricaoCompleta:
      "Horta colaborativa com foco em verduras de ciclo curto, cuidada por voluntarios e moradores locais. Oferece visitas guiadas e retiradas semanais para familias do bairro.",
    ofertas: ["Cestas semanais", "Visitas guiadas", "Oficinas basicas"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.55052,
    longitude: -46.633308,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-nascente",
    nome: "Horta Nascente",
    descricaoCurta: "Espaco comunitario com cultivo organico.",
    descricaoCompleta:
      "Espaco aberto para quem quer aprender cultivo organico e apoiar a producao local. A horta trabalha com irrigacao controlada e compostagem coletiva.",
    ofertas: ["Voluntariado", "Compostagem", "Feira mensal"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.56321,
    longitude: -46.65439,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-verde-viva",
    nome: "Horta Verde Viva",
    descricaoCurta: "Agendamentos rapidos para voluntarios.",
    descricaoCompleta:
      "Equipe pequena com mutiroes semanais e agenda flexivel. Ideal para quem busca participar de acoes curtas e praticas.",
    ofertas: ["Mutiroes", "Agenda flexivel", "Troca de sementes"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.5367,
    longitude: -46.65598,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-primavera",
    nome: "Horta Primavera",
    descricaoCurta: "Hidroponia com foco em folhas verdes.",
    descricaoCompleta:
      "Projeto voltado para folhas verdes e ervas aromaticas em sistema de hidroponia. Possui visitas agendadas e entrega local.",
    ofertas: ["Hidroponia", "Entrega local", "Ervas frescas"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.56725,
    longitude: -46.62682,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-bem-viver",
    nome: "Horta Bem Viver",
    descricaoCurta: "Atividades educativas e visitas guiadas.",
    descricaoCompleta:
      "Horta com foco em educacao ambiental e atividades para escolas da regiao. Possui espacos de cultivo compartilhado e eventos mensais.",
    ofertas: ["Educacao ambiental", "Visitas guiadas", "Eventos mensais"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.57585,
    longitude: -46.63822,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-recanto",
    nome: "Horta Recanto",
    descricaoCurta: "Coleta compartilhada e feiras locais.",
    descricaoCompleta:
      "Iniciativa de bairro com foco em producao comunitaria e feiras locais. Promove encontros semanais para manutencao coletiva.",
    ofertas: ["Feiras locais", "Coleta compartilhada", "Encontros semanais"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.54512,
    longitude: -46.61765,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-solar",
    nome: "Horta Solar",
    descricaoCurta: "Projetos sustentaveis com energia limpa.",
    descricaoCompleta:
      "Horta com infraestrutura sustentavel e energia solar. O espaco recebe grupos para demonstracoes de tecnicas de baixo impacto.",
    ofertas: ["Energia solar", "Demonstracoes", "Cultivo sustentavel"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.55974,
    longitude: -46.61205,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-vale",
    nome: "Horta Vale",
    descricaoCurta: "Cultivo comunitario e compostagem.",
    descricaoCompleta:
      "Horta extensa com area de compostagem e viveiro. Ideal para quem deseja aprender tecnicas de preparo de solo.",
    ofertas: ["Compostagem", "Viveiro", "Capacitacoes"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.55382,
    longitude: -46.66344,
    cidade: "Sao Paulo",
  },
  {
    id: "horta-canteiro",
    nome: "Horta Canteiro",
    descricaoCurta: "Vagas abertas para novos voluntarios.",
    descricaoCompleta:
      "Horta com vagas abertas para novos voluntarios e familias locais. Possui trilhas internas e canteiros demostrativos.",
    ofertas: ["Novas vagas", "Canteiros demonstrativos", "Trilhas internas"],
    imagens: DEFAULT_IMAGES,
    latitude: -23.54155,
    longitude: -46.64221,
    cidade: "Sao Paulo",
  },
];

export const HORTAS_CENTER = [-23.55052, -46.633308];
