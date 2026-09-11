# -*- coding: utf-8 -*-
"""
Script de verificação final do data/hinosData.json após mesclagem do Lote 3
"""
import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from scripts.hinos_data_500_525 import HINOS_500_525
from scripts.hinos_data_526_550 import HINOS_526_550
from scripts.hinos_data_551_575 import HINOS_551_575
from scripts.hinos_data_576_599 import HINOS_576_599

def to_list(data):
    if isinstance(data, dict):
        return list(data.values())
    return list(data)

ALL_NEW_HINOS = to_list(HINOS_500_525) + to_list(HINOS_526_550) + to_list(HINOS_551_575) + to_list(HINOS_576_599)

HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"

def verify():
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "novo" in data, "Chave 'novo' não encontrada!"
    novo = data["novo"]

    assert len(novo) == 599, f"Esperado 599 hinos em 'novo', encontrado {len(novo)}"

    # Verificar chaves de 1 a 599
    for i in range(1, 600):
        k = str(i)
        assert k in novo, f"Chave {k} ausente em data['novo']!"
        entry = novo[k]
        assert entry["numero"] == i, f"Número incorreto no hino {k}: {entry.get('numero')}"
        assert entry["id"] == k, f"ID incorreto no hino {k}: {entry.get('id')}"

    # Verificar integridade dos hinos 500 a 599 contra as fontes
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

    print(f"SUCESSO: Todos os 599 hinos em data['novo'] verificados e consistentes!")

if __name__ == "__main__":
    verify()
