"""
Mescla os 103 hinos do Lote 2 no arquivo data/hinosData.json sob a chave 'novo'.
"""
import json
import os
import shutil

from hinos_data_316_326 import HINOS_316_326
from hinos_data_401_430 import HINOS_401_430
from hinos_data_431_460 import HINOS_431_460
from hinos_data_461_499 import HINOS_461_499

HINOS_DATA_PATH = r"C:\IGCGDev\igcghinario\data\hinosData.json"
BACKUP_PATH = r"C:\IGCGDev\igcghinario\data\hinosData.json.bak"

# 1. Backup de segurança
shutil.copyfile(HINOS_DATA_PATH, BACKUP_PATH)
print(f"Backup criado em {BACKUP_PATH}")

# 2. Carregar dados existentes
with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

if "novo" not in data:
    raise ValueError("Chave 'novo' não encontrada no hinosData.json!")

initial_count = len(data["novo"])
print(f"Contagem inicial em 'novo': {initial_count}")

# 3. Reunir os novos hinos
batch2_hinos = {}
batch2_hinos.update(HINOS_316_326)
batch2_hinos.update(HINOS_401_430)
batch2_hinos.update(HINOS_431_460)
batch2_hinos.update(HINOS_461_499)
print(f"Total de hinos a mesclar no lote 2: {len(batch2_hinos)}")

# 4. Inserir no dicionário 'novo'
for k, hino in batch2_hinos.items():
    if k in data["novo"]:
        print(f"Aviso: Sobrescrevendo chave existente {k} em 'novo'")
    data["novo"][k] = hino

# 5. Reordenar chaves numericamente
sorted_novo = {}
for k in sorted(data["novo"].keys(), key=lambda x: int(x)):
    sorted_novo[k] = data["novo"][k]
data["novo"] = sorted_novo

final_count = len(data["novo"])
print(f"Contagem final em 'novo': {final_count}")

# 6. Salvar em UTF-8 com indentação de 2 espaços
with open(HINOS_DATA_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"data/hinosData.json atualizado com sucesso!")

# 7. Remover backup temporário
if os.path.exists(BACKUP_PATH):
    os.remove(BACKUP_PATH)
    print("Backup temporário removido.")
