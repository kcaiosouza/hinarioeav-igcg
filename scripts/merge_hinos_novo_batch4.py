# -*- coding: utf-8 -*-
"""
Script de mesclagem do Lote 4 (Hinos 600 a 700) no data/hinosData.json
"""
import json
import os
import shutil
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
BACKUP_PATH = ROOT_DIR / "data" / "hinosData.json.bak"

def main():
    print(f"Total de novos hinos a mesclar: {len(ALL_NEW_HINOS)}")
    assert len(ALL_NEW_HINOS) == 101, f"Esperado 101 hinos, encontrado {len(ALL_NEW_HINOS)}"

    # 1. Backup
    shutil.copyfile(HINOS_DATA_PATH, BACKUP_PATH)
    print(f"Backup criado em: {BACKUP_PATH}")

    # 2. Carregar arquivo original
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    if "novo" not in data:
        raise ValueError("Chave 'novo' não encontrada no hinosData.json!")

    initial_count = len(data["novo"])
    print(f"Total inicial de hinos em data['novo']: {initial_count}")

    # 3. Mesclar hinos 600 a 700
    for hino in ALL_NEW_HINOS:
        k = str(hino["numero"])
        data["novo"][k] = hino

    # 4. Ordenar numericamente
    sorted_novo = {}
    for k in sorted(data["novo"].keys(), key=lambda x: int(x)):
        sorted_novo[k] = data["novo"][k]
    data["novo"] = sorted_novo

    final_count = len(data["novo"])
    print(f"Total final de hinos em data['novo']: {final_count}")
    assert final_count == 700, f"Esperado 700 hinos em 'novo', encontrado {final_count}"

    # 5. Salvar de volta
    with open(HINOS_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Salvo com sucesso em {HINOS_DATA_PATH}!")

if __name__ == "__main__":
    main()
