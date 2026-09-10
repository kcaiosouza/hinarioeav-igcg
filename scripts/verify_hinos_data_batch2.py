"""
Teste automatizado de verificação para data/hinosData.json após mesclagem do Lote 2.
"""
import json
import re
import sys

HINOS_DATA_PATH = r"C:\IGCGDev\igcghinario\data\hinosData.json"

with open(HINOS_DATA_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

# 1. Verificar categorias existentes intocadas
assert len(data.get("hinos", {})) == 500, f"hinos deve ter 500, tem {len(data.get('hinos', {}))}"
assert len(data.get("canticos", {})) == 100, f"canticos deve ter 100, tem {len(data.get('canticos', {}))}"
assert len(data.get("suplemento", {})) == 105, f"suplemento deve ter 105, tem {len(data.get('suplemento', {}))}"
assert len(data.get("diversos", {})) == 12, f"diversos deve ter 12, tem {len(data.get('diversos', {}))}"

novo = data.get("novo", {})
print(f"Total em 'novo': {len(novo)}")

# 2. Verificar contagem de 'novo': deve ter exatamente 499 hinos
assert len(novo) == 499, f"Esperado 499 hinos em 'novo', encontrado {len(novo)}"

# 3. Verificar sequência contínua de 1 a 499
for i in range(1, 500):
    k = str(i)
    assert k in novo, f"Hino {k} não encontrado em 'novo'!"
    h = novo[k]
    assert h["id"] == k, f"Hino {k}: id mismatch ({h['id']})"
    assert h["numero"] == i, f"Hino {k}: numero mismatch ({h['numero']})"
    assert h.get("titulo") and h["titulo"].strip(), f"Hino {k}: titulo vazio"
    assert h["categoria"] == "Hinário Novo", f"Hino {k}: categoria inválida ({h['categoria']})"
    assert isinstance(h["estrofes"], list) and len(h["estrofes"]) > 0, f"Hino {k}: estrofes vazias"
    for s_idx, strophe in enumerate(h["estrofes"]):
        assert not re.search(r"\b0h[!, \s]", strophe), f"Hino {k} estrofe {s_idx+1} possui erro OCR 0h"
        assert "\ufffd" not in strophe, f"Hino {k} estrofe {s_idx+1} possui caractere corrompido"

print("Todos os testes de validação passaram com 100% de sucesso!")
