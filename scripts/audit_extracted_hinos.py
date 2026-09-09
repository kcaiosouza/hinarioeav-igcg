"""
Audit script for extracted hymns in scratch/extracted_novo_hinos.json.
"""
import json
import re

json_path = r"C:\Users\Caio\.gemini\antigravity-cli\brain\26f7f927-c826-4392-b4d5-927b629c3fd9\scratch\extracted_novo_hinos.json"
with open(json_path, 'r', encoding='utf-8') as f:
    hinos = json.load(f)

print(f"Auditing {len(hinos)} hymns...")

warnings = []
for k, h in hinos.items():
    # check title
    if not h['titulo']:
        warnings.append(f"Hymn {k}: Empty title")
    # check category
    if h['categoria'] != "Hinário Novo":
        warnings.append(f"Hymn {k}: Categoria not 'Hinário Novo' ({h['categoria']})")
    
    # check strophes
    for s_idx, strophe in enumerate(h['estrofes']):
        lines = strophe.split('\n')
        for l_idx, line in enumerate(lines):
            # check for leading digit marker like '1 ', '2.'
            if re.match(r'^\d+\s*[\.\-\)]?\s+[A-Za-zÀ-ÿ]', line):
                warnings.append(f"Hymn {k} strophe {s_idx+1} line {l_idx+1}: leading digit marker: {line[:30]}")
            # check for OCR glitch like 0h!
            if re.search(r'\b0h[!,\s]', line):
                warnings.append(f"Hymn {k} strophe {s_idx+1} line {l_idx+1}: contains 0h: {line}")
            # check for corrupted characters
            if '\ufffd' in line:
                warnings.append(f"Hymn {k} strophe {s_idx+1} line {l_idx+1}: contains replacement char")

    # check chorus if present
    if 'coro' in h:
        lines = h['coro'].split('\n')
        for l_idx, line in enumerate(lines):
            if re.search(r'\b0h[!,\s]', line):
                warnings.append(f"Hymn {k} coro line {l_idx+1}: contains 0h: {line}")
            if '\ufffd' in line:
                warnings.append(f"Hymn {k} coro line {l_idx+1}: contains replacement char")

if warnings:
    print(f"Audit completed with {len(warnings)} warning(s):")
    for w in warnings:
        print(" [WARNING]", w)
else:
    print("Audit passed with 0 warnings! All 97 hymns are clean and well-formed.")
