# -*- coding: utf-8 -*-
"""
Script de verificação final do data/hinosData.json após mesclagem do Lote 4
"""
import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from scripts.hinos_data_600_625 import HINOS_600_625
from scripts.hinos_data_626_650 import HINOS_626_650
from scripts.hinos_data_651_675 import HINOS_651_675
from scripts.hinos_data_676_700 import HINOS_676_700

def to_list(data):
    if isinstance(data, dict):
        return [data[k] for k in sorted(data.keys(), key=lambda x: int(x))]
    return list(data)

ALL_NEW_HINOS = to_list(HINOS_600_625) + to_list(HINOS_626_650) + to_list(HINOS_651_675) + to_list(HINOS_676_700)

HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"

def verify():
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "novo" in data, "Chave 'novo' não encontrada!"
    novo = data["novo"]

    assert len(novo) == 700, f"Esperado 700 hinos em 'novo', encontrado {len(novo)}"

    # Verificar chaves de 1 a 700
    for i in range(1, 701):
        k = str(i)
        assert k in novo, f"Chave {k} ausente em data['novo']!"
        entry = novo[k]
        assert entry["numero"] == i, f"Número incorreto no hino {k}: {entry.get('numero')}"
        assert entry["id"] == k, f"ID incorreto no hino {k}: {entry.get('id')}"

    # Verificar integridade dos hinos 600 a 700 contra as fontes
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

    print(f"SUCESSO: Todos os 700 hinos em data['novo'] verificados e consistentes!")

if __name__ == "__main__":
    verify()
