import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

export const useGastosPorCategoria = () => {
  const { transacoes } = useAppContext();

  const gastosPorCategoria = useMemo(() => {
    return transacoes
      .filter((transacao) => transacao.tipo === "despesa")
      .reduce<Record<string, number>>((acc, transacao) => {
        acc[transacao.categoria] =
          (acc[transacao.categoria] || 0) + transacao.valor;
        return acc;
      }, {});
  }, [transacoes]);

  return gastosPorCategoria;
};
