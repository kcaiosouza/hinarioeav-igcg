"""
Merge extracted Hinario Novo hymns into data/hinosData.json.
"""
import json
import os
import shutil

HINOS_DATA_PATH = r"C:\IGCGDev\igcghinario\data\hinosData.json"
BACKUP_PATH = r"C:\IGCGDev\igcghinario\data\hinosData.json.bak"
EXTRACTED_PATH = r"C:\Users\Caio\.gemini\antigravity-cli\brain\26f7f927-c826-4392-b4d5-927b629c3fd9\scratch\extracted_novo_hinos.json"

# Step 1: Backup
shutil.copyfile(HINOS_DATA_PATH, BACKUP_PATH)
print(f"Created backup at {BACKUP_PATH}")

# Step 2: Load data
with open(HINOS_DATA_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(EXTRACTED_PATH, 'r', encoding='utf-8') as f:
    extracted = json.load(f)

if "novo" not in data:
    raise ValueError("Key 'novo' not found in hinosData.json!")

initial_count = len(data["novo"])
print(f"Initial count in data['novo']: {initial_count}")
print(f"New hymns to insert: {len(extracted)}")

# Step 3: Insert new hymns
for k, hino in extracted.items():
    if k in data["novo"]:
        print(f"Warning: Overwriting existing hymn {k} in novo")
    data["novo"][k] = hino

# Step 4: Re-sort novo keys numerically
sorted_novo = {}
for k in sorted(data["novo"].keys(), key=lambda x: int(x)):
    sorted_novo[k] = data["novo"][k]
data["novo"] = sorted_novo

final_count = len(data["novo"])
print(f"Final count in data['novo']: {final_count}")

# Step 5: Save with UTF-8, ensure_ascii=False, indent=2
with open(HINOS_DATA_PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Saved updated data/hinosData.json successfully.")

# Step 6: Verify reading back
with open(HINOS_DATA_PATH, 'r', encoding='utf-8') as f:
    verify_data = json.load(f)

assert len(verify_data["novo"]) == final_count, "Verification failed on count!"
print(f"Verified! Key 300: {verify_data['novo']['300']['titulo']}")
print(f"Verified! Key 400: {verify_data['novo']['400']['titulo']}")

# Remove backup if everything is verified
if os.path.exists(BACKUP_PATH):
    os.remove(BACKUP_PATH)
    print("Removed temporary backup file.")

print("Merge completed with 100% success.")
