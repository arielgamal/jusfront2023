interface IMovimentacoes {
  data: string,
  descricao: string
}

interface IPartes {
  nome: string,
  posicao: string
}


export interface IProcessos {
  id: number,
  cnj: string,
  data_inicio: string,
  tribunal_origem: string,
  movimentacoes: IMovimentacoes[],
  partes_processo: IPartes[]
}