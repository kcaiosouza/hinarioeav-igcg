"""
Auditoria rigorosa de qualidade textual e schema dos hinos do Lote 2 do Hinário Novo.
"""
import re
import sys

from hinos_data_316_326 import HINOS_316_326
from hinos_data_401_430 import HINOS_401_430
from hinos_data_431_460 import HINOS_431_460
from hinos_data_461_499 import HINOS_461_499

all_hinos = {}
all_hinos.update(HINOS_316_326)
all_hinos.update(HINOS_401_430)
all_hinos.update(HINOS_431_460)
all_hinos.update(HINOS_461_499)

print(f"Total de hinos a auditar: {len(all_hinos)}")
assert len(all_hinos) == 103, f"Esperado 103 hinos, encontrado {len(all_hinos)}"

# Verificar chaves esperadas
expected_keys = {"316", "317", "325", "326"}.union({str(i) for i in range(401, 500)})
missing_keys = expected_keys - set(all_hinos.keys())
extra_keys = set(all_hinos.keys()) - expected_keys

assert not missing_keys, f"Chaves faltantes: {missing_keys}"
assert not extra_keys, f"Chaves extras inesperadas: {extra_keys}"

errors = []
warnings = []

for num_str, hino in sorted(all_hinos.items(), key=lambda x: int(x[0])):
    num = int(num_str)
    
    # 1. Campos obrigatórios
    if hino.get("id") != num_str:
        errors.append(f"Hino {num_str}: id incorreto '{hino.get('id')}'")
    if hino.get("numero") != num:
        errors.append(f"Hino {num_str}: numero incorreto {hino.get('numero')}")
    if not hino.get("titulo") or not hino["titulo"].strip():
        errors.append(f"Hino {num_str}: titulo vazio")
    if hino.get("categoria") != "Hinário Novo":
        errors.append(f"Hino {num_str}: categoria incorreta '{hino.get('categoria')}'")
        
    estrofes = hino.get("estrofes", [])
    if not estrofes:
        errors.append(f"Hino {num_str}: estrofes vazias")
        
    for s_idx, strophe in enumerate(estrofes):
        if not strophe.strip():
            errors.append(f"Hino {num_str} estrofe {s_idx+1}: estrofe em branco")
            
        lines = strophe.split("\n")
        for l_idx, line in enumerate(lines):
            line_s = line.strip()
            # Checar numerais no início de versos
            if re.match(r"^\d+[\s\.\)]", line_s):
                errors.append(f"Hino {num_str} estrofe {s_idx+1} verso {l_idx+1}: numeral residual no início '{line_s[:15]}'")
            # Checar artefatos de OCR
            if "0h!" in line_s or "0h " in line_s:
                errors.append(f"Hino {num_str} estrofe {s_idx+1} verso {l_idx+1}: artefato de OCR '0h' encontrado")
            if "\ufffd" in line_s:
                errors.append(f"Hino {num_str} estrofe {s_idx+1} verso {l_idx+1}: caractere corrompido unicode encontrado")
                
    coro = hino.get("coro")
    if coro:
        lines = coro.split("\n")
        for l_idx, line in enumerate(lines):
            line_s = line.strip()
            if re.match(r"^\d+[\s\.\)]", line_s):
                errors.append(f"Hino {num_str} coro verso {l_idx+1}: numeral residual no início '{line_s[:15]}'")
            if "0h!" in line_s or "0h " in line_s:
                errors.append(f"Hino {num_str} coro verso {l_idx+1}: artefato de OCR '0h' encontrado")
            if "\ufffd" in line_s:
                errors.append(f"Hino {num_str} coro verso {l_idx+1}: caractere corrompido unicode encontrado")

if errors:
    print(f"ENCONTRADOS {len(errors)} ERROS NA AUDITORIA:")
    for e in errors:
        print(" [ERRO]", e)
    sys.exit(1)

print(f"Auditoria concluída com 100% de sucesso! 103 hinos validados sem nenhum erro.")
