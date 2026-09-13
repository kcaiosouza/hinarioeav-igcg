# -*- coding: utf-8 -*-
"""
Script de auditoria e verificação da categoria Diversos no data/hinosData.json
"""
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"

def main():
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Checar outras coleções
    assert len(data["hinos"]) == 500, f"Hinos corrompido: {len(data['hinos'])}"
    assert len(data["canticos"]) == 100, f"Cânticos corrompido: {len(data['canticos'])}"
    assert len(data["suplemento"]) == 105, f"Suplemento corrompido: {len(data['suplemento'])}"
    assert len(data["novo"]) == 1100, f"Novo corrompido: {len(data['novo'])}"

    # 2. Checar diversos
    diversos = data.get("diversos", {})
    assert len(diversos) == 25, f"Esperado 25 em diversos, encontrado {len(diversos)}"

    for i in range(1, 26):
        k = str(i)
        assert k in diversos, f"Chave {k} ausente em diversos!"
        h = diversos[k]
        assert h["id"] == k, f"ID incorreto no hino {k}: {h.get('id')}"
        assert h["numero"] == i, f"Número incorreto no hino {k}: {h.get('numero')}"
        assert h["titulo"], f"Título vazio no hino {k}"
        assert h["categoria"] == "Diversos", f"Categoria incorreta no hino {k}: {h.get('categoria')}"
        assert isinstance(h["estrofes"], list) and len(h["estrofes"]) > 0, f"Estrofes vazias no hino {k}"
        for idx, est in enumerate(h["estrofes"], 1):
            assert isinstance(est, str) and est.strip(), f"Estrofe {idx} vazia no hino {k}"

    print("Auditoria completa: Todos os 25 hinos de 'diversos' e as demais 4 coleções estão 100% íntegros!")

if __name__ == "__main__":
    main()
