export interface ItemServico {

    id: string;

    descricao: string;
    // Exemplo: "Instalação de sistema", "Manutenção preventiva".

    quantidade: number;
    // Quantidade de vezes que o serviço será realizado.
    // Exemplo: 2 instalações.

    precoUnitario: number;
    // Valor unitário do serviço.
    // Exemplo: 150.00 (valor em reais).
}