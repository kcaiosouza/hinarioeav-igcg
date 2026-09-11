# -*- coding: utf-8 -*-
"""
Script de auditoria textual e estrutural para o Lote 4 (Hinos 600 a 700) do Hinário Novo.
"""
import re
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

try:
    from scripts.hinos_data_600_625 import HINOS_600_625
except ImportError:
    HINOS_600_625 = {}

try:
    from scripts.hinos_data_626_650 import HINOS_626_650
except ImportError:
    HINOS_626_650 = {}

try:
    from scripts.hinos_data_651_675 import HINOS_651_675
except ImportError:
    HINOS_651_675 = {}

try:
    from scripts.hinos_data_676_700 import HINOS_676_700
except ImportError:
    HINOS_676_700 = {}


def to_list(data):
    if isinstance(data, dict):
        return [data[k] for k in sorted(data.keys(), key=lambda x: int(x))]
    return list(data)


SUSPICIOUS_REGEX = re.compile(r"[«»|~_•\^]")
LEADING_NUMERAL_REGEX = re.compile(r"^\s*\d+[\.\s\-\)]+")


def audit():
    ALL_HINOS = to_list(HINOS_600_625) + to_list(HINOS_626_650) + to_list(HINOS_651_675) + to_list(HINOS_676_700)
    print(f"Total de hinos carregados: {len(ALL_HINOS)}")
    assert len(ALL_HINOS) == 101, f"Esperado 101 hinos (600 a 700), encontrado {len(ALL_HINOS)}"

    errors = []
    warnings = []

    for i, hino in enumerate(ALL_HINOS):
        expected_num = 600 + i
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
        elif any(p in titulo.upper() for p in ["A EXPERIÊNCIA", "O CONSOLO", "ENCORAJAMENTO", "GLORIAR-SE", "O CAMINHO"]):
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

    print("\nTODOS OS 101 HINOS (600 a 700) PASSARAM NA AUDITORIA COM SUCESSO!")


if __name__ == "__main__":
    audit()
