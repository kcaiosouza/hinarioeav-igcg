# -*- coding: utf-8 -*-
"""
Script de mesclagem do Lote 3 (Hinos 500 a 599) no data/hinosData.json
"""
import json
import os
import shutil
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
BACKUP_PATH = ROOT_DIR / "data" / "hinosData.json.bak"

def main():
    print(f"Total de novos hinos a mesclar: {len(ALL_NEW_HINOS)}")
    assert len(ALL_NEW_HINOS) == 100, f"Esperado 100 hinos, encontrado {len(ALL_NEW_HINOS)}"

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

    # 3. Mesclar hinos 500 a 599
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
    assert final_count == 599, f"Esperado 599 hinos em 'novo', encontrado {final_count}"

    # 5. Salvar
    with open(HINOS_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Arquivo {HINOS_DATA_PATH} atualizado com sucesso.")

    # 6. Validar recarregando
    with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
        verified_data = json.load(f)

    assert len(verified_data["novo"]) == 599, "Falha na verificação de contagem!"
    assert str(500) in verified_data["novo"], "Hino 500 não encontrado!"
    assert str(599) in verified_data["novo"], "Hino 599 não encontrado!"

    # 7. Remover backup após sucesso
    if BACKUP_PATH.exists():
        os.remove(BACKUP_PATH)
        print("Backup removido.")

    print("Mesclagem concluída e validada com sucesso!")

if __name__ == "__main__":
    main()
