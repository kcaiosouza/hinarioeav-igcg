# -*- coding: utf-8 -*-
"""
Script de verificação final do data/hinosData.json após mesclagem do Lote 7
"""
import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from scripts.hinos_data_901_925 import HINOS_901_925
from scripts.hinos_data_926_950 import HINOS_926_950
from scripts.hinos_data_951_975 import HINOS_951_975
from scripts.hinos_data_976_1000 import HINOS_976_1000

def to_list(data):
    if isinstance(data, dict):
        return [data[k] for k in sorted(data.keys(), key=lambda x: int(x))]
    return list(data)

ALL_NEW_HINOS = to_list(HINOS_901_925) + to_list(HINOS_926_950) + to_list(HINOS_951_975) + to_list(HINOS_976_1000)

HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"

def verify():
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "novo" in data, "Chave 'novo' não encontrada!"
    novo = data["novo"]

    assert len(novo) == 1000, f"Esperado 1000 hinos em 'novo', encontrado {len(novo)}"

    # Verificar chaves de 1 a 1000
    for i in range(1, 1001):
        k = str(i)
        assert k in novo, f"Chave {k} ausente em data['novo']!"
        entry = novo[k]
        assert entry["numero"] == i, f"Número incorreto no hino {k}: {entry.get('numero')}"
        assert entry["id"] == k, f"ID incorreto no hino {k}: {entry.get('id')}"

    # Verificar integridade dos hinos 901 a 1000 contra as fontes
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

    print(f"SUCESSO: Todos os 1000 hinos em data['novo'] verificados e consistentes!")

if __name__ == "__main__":
    verify()
