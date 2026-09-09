"""
Combine and validate all 97 extracted hymns, saving to scratch/extracted_novo_hinos.json.
"""
import json
import os
import sys

from hinos_data_300_320 import HINOS_300_320
from hinos_data_321_340 import HINOS_321_340
from hinos_data_341_360 import HINOS_341_360
from hinos_data_361_380 import HINOS_361_380
from hinos_data_381_400 import HINOS_381_400

all_hinos = {}
all_hinos.update(HINOS_300_320)
all_hinos.update(HINOS_321_340)
all_hinos.update(HINOS_341_360)
all_hinos.update(HINOS_361_380)
all_hinos.update(HINOS_381_400)

print(f"Total hymns assembled: {len(all_hinos)}")

# Sort by numeric key
sorted_keys = sorted(all_hinos.keys(), key=lambda k: int(k))
sorted_hinos = {k: all_hinos[k] for k in sorted_keys}

# Validate each entry
errors = []
for k, h in sorted_hinos.items():
    if h['id'] != k or str(h['numero']) != k:
        errors.append(f"Key mismatch for {k}: id={h['id']}, numero={h['numero']}")
    if not h.get('titulo'):
        errors.append(f"Missing titulo for {k}")
    if h.get('categoria') != "Hinário Novo":
        errors.append(f"Invalid categoria for {k}: {h.get('categoria')}")
    if not h.get('estrofes') or len(h['estrofes']) == 0:
        errors.append(f"Empty estrofes for {k}")
    for idx, e in enumerate(h.get('estrofes', [])):
        if not e.strip():
            errors.append(f"Blank estrofe {idx+1} in hymn {k}")

if errors:
    print("Validation errors encountered:")
    for err in errors:
        print(" - ", err)
    sys.exit(1)

out_path = r"C:\Users\Caio\.gemini\antigravity-cli\brain\26f7f927-c826-4392-b4d5-927b629c3fd9\scratch\extracted_novo_hinos.json"
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(sorted_hinos, f, ensure_ascii=False, indent=2)

print(f"Successfully saved {len(sorted_hinos)} hymns to {out_path}")
print(f"Hymn range: {sorted_keys[0]} to {sorted_keys[-1]}")
