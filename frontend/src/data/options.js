export const PERFIS = ["VENDEDOR", "GERENTE", "ESTOQUISTA"];

export const ORIGENS_VENDA = ["LIGACAO", "WHATSAPP", "PESSOALMENTE"];

export const RESULTADOS_LIGACAO = [
  "PEDIDO_REALIZADO",
  "NAO_ATENDEU",
  "RETORNAR",
  "INDICOU_CLIENTE",
  "SEM_INTERESSE",
];

export const STATUS_PEDIDO = ["EM_ANDAMENTO", "SEPARADO", "ENTREGUE"];

export function label(value) {
  if (!value) return "-";
  return value
    .toString()
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
