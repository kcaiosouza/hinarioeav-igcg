# -*- coding: utf-8 -*-
"""
Script de auditoria textual e estrutural para o Lote 3 (Hinos 500 a 599) do Hinário Novo.
"""
import re
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

ALL_HINOS = to_list(HINOS_500_525) + to_list(HINOS_526_550) + to_list(HINOS_551_575) + to_list(HINOS_576_599)

SUSPICIOUS_REGEX = re.compile(r"[«»|~_•\^]")

def audit():
    print(f"Total de hinos carregados: {len(ALL_HINOS)}")
    assert len(ALL_HINOS) == 100, f"Esperado 100 hinos, encontrado {len(ALL_HINOS)}"

    errors = []
    warnings = []

    for i, hino in enumerate(ALL_HINOS):
        expected_num = 500 + i
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
        elif "A EXPERIÊNCIA" in titulo.upper() or ("LOUVOR" in titulo.upper() and "—" in titulo):
            warnings.append(f"Hino [{num}]: Titulo pode conter prefixo de categoria: '{titulo}'")

        # 4. Estrofes
        if not estrofes or not isinstance(estrofes, list) or len(estrofes) == 0:
            errors.append(f"Hino [{num}]: Lista de estrofes vazia ou invalida")
        else:
            for idx, st in enumerate(estrofes):
                if not st or not isinstance(st, str) or len(st.strip()) == 0:
                    errors.append(f"Hino [{num}]: Estrofe {idx+1} vazia")
                matches = SUSPICIOUS_REGEX.findall(st)
                if matches:
                    warnings.append(f"Hino [{num}] Estrofe {idx+1}: Caractere incomum encontrado: {matches}")

        # 5. Coro (opcional)
        if coro is not None:
            if not isinstance(coro, str) or len(coro.strip()) == 0:
                errors.append(f"Hino [{num}]: Coro vazio ou invalido")
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

    print("\nTODOS OS 100 HINOS (500 a 599) PASSARAM NA AUDITORIA COM SUCESSO!")


if __name__ == "__main__":
    audit()
