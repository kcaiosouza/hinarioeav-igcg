# -*- coding: utf-8 -*-
"""
Script de auditoria textual e estrutural para o Lote 5 (Hinos 701 a 800) do Hinário Novo.
"""
import re
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

try:
    from scripts.hinos_data_701_725 import HINOS_701_725
except ImportError:
    HINOS_701_725 = {}

try:
    from scripts.hinos_data_726_750 import HINOS_726_750
except ImportError:
    HINOS_726_750 = {}

try:
    from scripts.hinos_data_751_775 import HINOS_751_775
except ImportError:
    HINOS_751_775 = {}

try:
    from scripts.hinos_data_776_800 import HINOS_776_800
except ImportError:
    HINOS_776_800 = {}


def to_list(data):
    if isinstance(data, dict):
        return [data[k] for k in sorted(data.keys(), key=lambda x: int(x))]
    return list(data)


SUSPICIOUS_REGEX = re.compile(r"[«»|~_•\^]")
LEADING_NUMERAL_REGEX = re.compile(r"^\s*\d+[\.\s\-\)]+")


def audit():
    ALL_HINOS = to_list(HINOS_701_725) + to_list(HINOS_726_750) + to_list(HINOS_751_775) + to_list(HINOS_776_800)
    print(f"Total de hinos carregados: {len(ALL_HINOS)}")
    assert len(ALL_HINOS) == 100, f"Esperado 100 hinos (701 a 800), encontrado {len(ALL_HINOS)}"

    errors = []
    warnings = []

    for i, hino in enumerate(ALL_HINOS):
        expected_num = 701 + i
        num = hino.get("numero")
        hid = hino.get("id")
        titulo = hino.get("titulo")
        cat = hino.get("categoria")
        estrofes = hino.get("estrofes")
        coro = hino.get("coro")

        # 1. Checagem de numeracao e id
        if num != expected_num:
            errors.append(f"Hino [{i}]: numero incorreto. Esperado {expected_num}, obtido {num}")
        if hid != str(expected_num):
            errors.append(f"Hino [{num}]: ID incorreto. Esperado '{expected_num}', obtido '{hid}'")

        # 2. Categoria
        if cat != "Hinário Novo":
            errors.append(f"Hino [{num}]: Categoria incorreta '{cat}'")

        # 3. Titulo
        if not titulo or not isinstance(titulo, str) or len(titulo.strip()) == 0:
            errors.append(f"Hino [{num}]: Titulo invalido ou vazio")
        elif any(p in titulo.upper() for p in ["A IGREJA", "REUNIÕES", "A LUTA ESPIRITUAL", "ORAÇÃO", "A PALAVRA"]):
            if " - " in titulo or " — " in titulo:
                warnings.append(f"Hino [{num}]: Titulo pode conter prefixo de categoria: '{titulo}'")

        # 4. Estrofes
        if not estrofes or not isinstance(estrofes, list) or len(estrofes) == 0:
            errors.append(f"Hino [{num}]: Lista de estrofes vazia ou invalida")
        else:
            for idx, st in enumerate(estrofes):
                if not st or not isinstance(st, str) or len(st.strip()) == 0:
                    errors.append(f"Hino [{num}]: Estrofe {idx+1} vazia")
                if LEADING_NUMERAL_REGEX.match(st):
                    errors.append(f"Hino [{num}] Estrofe {idx+1}: Numeral residual no início da estrofe: '{st[:20]}...'")
                matches = SUSPICIOUS_REGEX.findall(st)
                if matches:
                    warnings.append(f"Hino [{num}] Estrofe {idx+1}: Caractere incomum encontrado: {matches}")

        # 5. Coro (opcional)
        if coro is not None:
            if not isinstance(coro, str) or len(coro.strip()) == 0:
                errors.append(f"Hino [{num}]: Coro vazio ou invalido")
            if LEADING_NUMERAL_REGEX.match(coro):
                errors.append(f"Hino [{num}] Coro: Numeral residual no início do coro: '{coro[:20]}...'")
            matches = SUSPICIOUS_REGEX.findall(coro)
            if matches:
                warnings.append(f"Hino [{num}] Coro: Caractere incomum encontrado: {matches}")

    print(f"Auditoria concluida com {len(errors)} erros e {len(warnings)} avisos.")

    if warnings:
        print("\n--- AVISOS ---")
        for w in warnings:
            print("  *", w)

    if errors:
        print("\n--- ERROS ---")
        for e in errors:
            print("  !", e)
        sys.exit(1)

    print("\nTODOS OS 100 HINOS (701 a 800) PASSARAM NA AUDITORIA COM SUCESSO!")


if __name__ == "__main__":
    audit()

