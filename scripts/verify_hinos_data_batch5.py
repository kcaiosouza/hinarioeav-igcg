# -*- coding: utf-8 -*-
"""
Script de verificação final do data/hinosData.json após mesclagem do Lote 5
"""
import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from scripts.hinos_data_701_725 import HINOS_701_725
from scripts.hinos_data_726_750 import HINOS_726_750
from scripts.hinos_data_751_775 import HINOS_751_775
from scripts.hinos_data_776_800 import HINOS_776_800

def to_list(data):
    if isinstance(data, dict):
        return [data[k] for k in sorted(data.keys(), key=lambda x: int(x))]
    return list(data)

ALL_NEW_HINOS = to_list(HINOS_701_725) + to_list(HINOS_726_750) + to_list(HINOS_751_775) + to_list(HINOS_776_800)

HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"

def verify():
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "novo" in data, "Chave 'novo' não encontrada!"
    novo = data["novo"]

    assert len(novo) == 800, f"Esperado 800 hinos em 'novo', encontrado {len(novo)}"

    # Verificar chaves de 1 a 800
    for i in range(1, 801):
        k = str(i)
        assert k in novo, f"Chave {k} ausente em data['novo']!"
        entry = novo[k]
        assert entry["numero"] == i, f"Número incorreto no hino {k}: {entry.get('numero')}"
        assert entry["id"] == k, f"ID incorreto no hino {k}: {entry.get('id')}"

    # Verificar integridade dos hinos 701 a 800 contra as fontes
    for expected in ALL_NEW_HINOS:
        k = str(expected["numero"])
        actual = novo[k]
        assert actual["titulo"] == expected["titulo"], f"Título divergente no hino {k}"
        assert actual["categoria"] == expected["categoria"], f"Categoria divergente no hino {k}"
        assert actual["estrofes"] == expected["estrofes"], f"Estrofes divergentes no hino {k}"
        if "coro" in expected:
            assert actual.get("coro") == expected["coro"], f"Coro divergente no hino {k}"
        else:
            assert "coro" not in actual, f"Coro inesperado no hino {k}"

    print(f"SUCESSO: Todos os 800 hinos em data['novo'] verificados e consistentes!")

if __name__ == "__main__":
    verify()
