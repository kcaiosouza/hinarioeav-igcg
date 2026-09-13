# -*- coding: utf-8 -*-
"""
Script de mesclagem dos hinos 13 a 25 na categoria Diversos no data/hinosData.json
"""
import json
import os
import shutil
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from scripts.hinos_data_diversos_13_25 import HINOS_DIVERSOS_13_25

HINOS_DATA_PATH = ROOT_DIR / "data" / "hinosData.json"
BACKUP_PATH = ROOT_DIR / "data" / "hinosData.json.bak"

def main():
    print(f"Total de hinos diversos a mesclar: {len(HINOS_DIVERSOS_13_25)}")
    assert len(HINOS_DIVERSOS_13_25) == 13, f"Esperado 13 hinos, encontrado {len(HINOS_DIVERSOS_13_25)}"

    # 1. Backup
    shutil.copyfile(HINOS_DATA_PATH, BACKUP_PATH)
    print(f"Backup criado em: {BACKUP_PATH}")

    # 2. Carregar arquivo original
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    if "diversos" not in data:
        raise ValueError("Chave 'diversos' não encontrada no hinosData.json!")

    initial_count = len(data["diversos"])
    print(f"Total inicial de hinos em data['diversos']: {initial_count}")
    assert initial_count == 12, f"Esperado 12 hinos iniciais, encontrado {initial_count}"

    # 3. Mesclar hinos 13 a 25
    for k, hino in HINOS_DIVERSOS_13_25.items():
        data["diversos"][k] = hino

    # 4. Ordenar numericamente
    sorted_diversos = {}
    for k in sorted(data["diversos"].keys(), key=lambda x: int(x)):
        sorted_diversos[k] = data["diversos"][k]
    data["diversos"] = sorted_diversos

    final_count = len(data["diversos"])
    print(f"Total final de hinos em data['diversos']: {final_count}")
    assert final_count == 25, f"Esperado 25 hinos em 'diversos', encontrado {final_count}"

    # 5. Salvar de volta
    with open(HINOS_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Mesclagem concluída com sucesso!")

    # 6. Remover backup se tudo correu bem
    if BACKUP_PATH.exists():
        os.remove(BACKUP_PATH)
        print("Arquivo de backup removido.")

if __name__ == "__main__":
    main()
