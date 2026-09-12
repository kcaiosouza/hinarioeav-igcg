# -*- coding: utf-8 -*-
"""
Script de verificação final do data/hinosData.json após mesclagem do Lote 8 (Hinário Novo Completo 1100)
"""
import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from scripts.hinos_data_1001_1025 import HINOS_1001_1025
from scripts.hinos_data_1026_1050 import HINOS_1026_1050
from scripts.hinos_data_1051_1075 import HINOS_1051_1075
from scripts.hinos_data_1076_1100 import HINOS_1076_1100

def to_list(data):
    if isinstance(data, dict):
        return [data[k] for k in sorted(data.keys(), key=lambda x: int(x))]
    return list(data)

ALL_NEW_HINOS = to_list(HINOS_1001_1025) + to_list(HINOS_1026_1050) + to_list(HINOS_1051_1075) + to_list(HINOS_1076_1100)

HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"

def verify():
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "novo" in data, "Chave 'novo' não encontrada!"
    novo = data["novo"]

    assert len(novo) == 1100, f"Esperado 1100 hinos em 'novo', encontrado {len(novo)}"

    # Verificar chaves de 1 a 1100 completas
    for i in range(1, 1101):
        k = str(i)
        assert k in novo, f"Chave {k} ausente em data['novo']!"
        entry = novo[k]
        assert entry["numero"] == i, f"Número incorreto no hino {k}: {entry.get('numero')}"
        assert entry["id"] == k, f"ID incorreto no hino {k}: {entry.get('id')}"

    # Verificar integridade dos hinos 1001 a 1100 contra as fontes
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

    print(f"SUCESSO ABSOLUTO: Todos os 1100 hinos do Hinário Novo em data['novo'] verificados e consistentes!")

if __name__ == "__main__":
    verify()
