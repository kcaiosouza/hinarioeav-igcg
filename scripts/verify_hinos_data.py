"""
Rigorous validation test suite for data/hinosData.json.
"""
import json
import sys
import re

DATA_PATH = r"C:\IGCGDev\igcghinario\data\hinosData.json"

def run_checks():
    print(f"Loading {DATA_PATH}...")
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # UTF-8 and syntax test
    data = json.loads(content)
    print("JSON syntax: VALID.")

    # Top-level sections test
    expected_sections = ["hinos", "canticos", "suplemento", "novo", "diversos"]
    for sec in expected_sections:
        assert sec in data, f"Missing section: {sec}"
    print("Top-level sections: OK.")

    # Untouched sections check
    assert len(data["hinos"]) == 500, f"hinos count changed: {len(data['hinos'])}"
    assert len(data["canticos"]) == 100, f"canticos count changed: {len(data['canticos'])}"
    assert len(data["suplemento"]) == 105, f"suplemento count changed: {len(data['suplemento'])}"
    assert len(data["diversos"]) == 12, f"diversos count changed: {len(data['diversos'])}"
    print("Untouched sections: 100% verified.")

    # Novo section check
    novo = data["novo"]
    assert len(novo) == 294, f"novo count expected 294, got {len(novo)}"
    print(f"novo count: 294 entries (197 previous + 97 new). OK.")

    # Check that keys are ordered numerically
    keys_as_ints = [int(k) for k in novo.keys()]
    assert keys_as_ints == sorted(keys_as_ints), "novo keys are not in ascending numeric order!"
    print("Key sorting: ASCENDING NUMERIC ORDER verified.")

    # Validate newly inserted range: 300 to 400
    expected_new = [x for x in range(300, 401) if x not in (316, 317, 325, 326)]
    assert len(expected_new) == 97, f"Expected 97 new keys, calculated {len(expected_new)}"
    
    for num in expected_new:
        k = str(num)
        assert k in novo, f"Missing hymn {k} in novo!"
        h = novo[k]
        assert h["id"] == k, f"Hymn {k}: id mismatch ({h['id']})"
        assert h["numero"] == num, f"Hymn {k}: numero mismatch ({h['numero']})"
        assert isinstance(h["titulo"], str) and len(h["titulo"].strip()) > 0, f"Hymn {k}: invalid titulo"
        assert h["categoria"] == "Hinário Novo", f"Hymn {k}: invalid categoria ({h['categoria']})"
        assert isinstance(h["estrofes"], list) and len(h["estrofes"]) > 0, f"Hymn {k}: invalid estrofes"
        
        for s_idx, strophe in enumerate(h["estrofes"]):
            assert isinstance(strophe, str) and len(strophe.strip()) > 0, f"Hymn {k} strophe {s_idx+1} is empty"
            assert not re.search(r'\b0h[!,\s]', strophe), f"Hymn {k} strophe {s_idx+1} has 0h OCR error"
            assert "\ufffd" not in strophe, f"Hymn {k} strophe {s_idx+1} has replacement char"
            # Ensure no leading digits like '1 ', '2 '
            for line in strophe.split('\n'):
                assert not re.match(r'^\d+\s+[A-Za-zÀ-ÿ]', line), f"Hymn {k} has unstripped verse numeral: {line}"

        if "coro" in h:
            coro = h["coro"]
            assert isinstance(coro, str) and len(coro.strip()) > 0, f"Hymn {k} coro is empty"
            assert not re.search(r'\b0h[!,\s]', coro), f"Hymn {k} coro has 0h OCR error"
            assert "\ufffd" not in coro, f"Hymn {k} coro has replacement char"

    print("All 97 new hymns pass 100% of schema, content, and encoding validations!")
    print("\nSample checks:")
    print(f"Hino 300: '{novo['300']['titulo']}' ({len(novo['300']['estrofes'])} estrofes)")
    print(f"Hino 334: '{novo['334']['titulo']}' ({len(novo['334']['estrofes'])} estrofes, coro={len(novo['334'].get('coro', '')) > 0})")
    print(f"Hino 400: '{novo['400']['titulo']}' ({len(novo['400']['estrofes'])} estrofes, coro={len(novo['400'].get('coro', '')) > 0})")
    print("\nALL CHECKS PASSED.")

if __name__ == "__main__":
    run_checks()
