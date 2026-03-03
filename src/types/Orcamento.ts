import { ItemServico } from "./ItemServico";
import { OrcamentoStatus } from "./OrcamentoStatus";

export interface Orcamento {

    id: string;

    cliente: string;

    titulo: string;

    itens: ItemServico[];

    percentualDesconto?: number;

    status: OrcamentoStatus;

    dataCriacao: string;

    dataAtualizacao: string;
}