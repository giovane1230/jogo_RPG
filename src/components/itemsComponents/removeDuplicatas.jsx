import { useEffect, useState } from "react";

function useConsolidarItens(itensOriginais) {
  const [itensConsolidados, setItensConsolidados] = useState([]);

  useEffect(() => {
    const mapa = new Map();

    itensOriginais.forEach((item) => {
      if (mapa.has(item.index)) {
        mapa.get(item.index).quantity += 1;
      } else {
        mapa.set(item.index, { ...item, quantity: 1 });
      }
    });

    setItensConsolidados(Array.from(mapa.values()));
  }, [itensOriginais]);

  return itensConsolidados;
}


export default useConsolidarItens;