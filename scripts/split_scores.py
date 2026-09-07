#!/usr/bin/env python3
"""
Script de automação para extrair e separar as partituras de 'assets/pdfs/Partituras.pdf'.
- Mapeia Hinos 1 a 500 (páginas 1 a 536)
- Mapeia Cânticos 1 a 100 (páginas 537 a 652)
- Mapeia Suplemento 1 a 105 (páginas 653 a 763)
- Extrai imagens WebP otimizadas de alta resolução para exibição nativa no app
- Extrai arquivos .pdf individuais para download/compartilhamento
- Gera o arquivo de manifesto TypeScript 'data/partiturasManifest.ts'
"""

import os
import sys
import re
import io
import time
import fitz  # PyMuPDF
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PDF_INPUT = os.path.join(PROJECT_ROOT, 'assets', 'pdfs', 'Partituras.pdf')
OUT_BASE = os.path.join(PROJECT_ROOT, 'assets', 'partituras')
MANIFEST_OUT = os.path.join(PROJECT_ROOT, 'data', 'partiturasManifest.ts')

DPI = 150
WEBP_QUALITY = 85

def ensure_dirs():
    for sec in ['hinos', 'canticos', 'suplemento']:
        os.makedirs(os.path.join(OUT_BASE, sec, 'pages'), exist_ok=True)

def map_hinos(doc):
    print("Mapeando Hinos 1 a 500...")
    hymn_pages = {}
    for p in range(536):
        page = doc[p]
        blocks = page.get_text('blocks')
        found = None
        for b in blocks:
            if b[1] < 100:  # cabeçalho
                lines = [l.strip() for l in b[4].split('\n') if l.strip()]
                for l in lines:
                    if l.isdigit():
                        num = int(l)
                        if 1 <= num <= 500:
                            found = num
                            break
                if found:
                    break
        if found is not None:
            hymn_pages.setdefault(found, []).append(p)
        else:
            raise ValueError(f"Não foi possível identificar o número do hino na página {p + 1}")
            
    missing = [i for i in range(1, 501) if i not in hymn_pages]
    if missing:
        raise ValueError(f"Hinos ausentes: {missing}")
        
    print(f"-> Sucesso: 500 hinos mapeados em {sum(len(v) for v in hymn_pages.values())} páginas.")
    return hymn_pages

def map_canticos(doc):
    print("Mapeando Cânticos 1 a 100...")
    cantico_pages = {}
    for p in range(536, 652):
        page = doc[p]
        blocks = page.get_text('blocks')
        found = None
        for b in blocks:
            if b[1] < 120:  # cabeçalho
                text = b[4].strip()
                m = re.search(r'C\s*-\s*(\d{1,3})', text)
                if m:
                    num = int(m.group(1))
                    if 1 <= num <= 100:
                        found = num
                        break
        if found is not None:
            cantico_pages.setdefault(found, []).append(p)
        else:
            raise ValueError(f"Não foi possível identificar o número do cântico na página {p + 1}")

    missing = [i for i in range(1, 101) if i not in cantico_pages]
    if missing:
        raise ValueError(f"Cânticos ausentes: {missing}")

    print(f"-> Sucesso: 100 cânticos mapeados em {sum(len(v) for v in cantico_pages.values())} páginas.")
    return cantico_pages

def map_suplemento(doc):
    print("Mapeando Suplemento 1 a 105...")
    # Hinos de 2 páginas confirmados visualmente no índice de cabeçalhos
    two_pages = {15, 38, 70, 81, 92, 104}
    suplemento_pages = {}
    curr_page = 653  # 1-based start

    for h in range(1, 106):
        if h in two_pages:
            suplemento_pages[h] = [curr_page - 1, curr_page]  # 0-based
            curr_page += 2
        else:
            suplemento_pages[h] = [curr_page - 1]  # 0-based
            curr_page += 1

    if curr_page - 1 != 763:
        raise ValueError(f"Erro no mapeamento do Suplemento: última página calculada foi {curr_page - 1}, esperava 763.")

    print(f"-> Sucesso: 105 suplementos mapeados em {sum(len(v) for v in suplemento_pages.values())} páginas.")
    return suplemento_pages

def export_section(doc, mapping, section_name, force=False):
    pages_dir = os.path.join(OUT_BASE, section_name, 'pages')
    pdf_dir = os.path.join(OUT_BASE, section_name, 'pdf')
    
    total = len(mapping)
    print(f"\nVerificando/Exportando {total} partituras de '{section_name}'...")
    
    start_time = time.time()
    exported_count = 0
    
    for idx, (num, page_indices) in enumerate(sorted(mapping.items()), 1):
        all_webp_exist = all(
            os.path.exists(os.path.join(pages_dir, f"{num}_{p}.webp"))
            for p in range(1, len(page_indices) + 1)
        )
        
        if not force and all_webp_exist:
            continue
            
        exported_count += 1
        
        # Exportar páginas WebP
        for page_num_1based, p_idx in enumerate(page_indices, 1):
            page = doc[p_idx]
            pix = page.get_pixmap(dpi=DPI)
            img = Image.open(io.BytesIO(pix.tobytes('png')))
            webp_path = os.path.join(pages_dir, f"{num}_{page_num_1based}.webp")
            img.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=4)
            
        if idx % 25 == 0 or idx == total:
            elapsed = time.time() - start_time
            rate = idx / elapsed if elapsed > 0 else 0
            print(f"[{idx}/{total}] {section_name} ({rate:.1f} itens/s)...", flush=True)

    print(f"-> {section_name}: {exported_count} novos itens gerados (os demais já existiam em cache).")

def generate_manifest(hinos_map, canticos_map, suplemento_map):
    print("\nGerando manifesto TypeScript em:", MANIFEST_OUT)
    
    lines = [
        "// Auto-generated by scripts/split_scores.py - DO NOT EDIT MANUALLY",
        "/* eslint-disable */",
        'import { ImageSourcePropType } from "react-native";',
        "",
        "export interface PartituraInfo {",
        '  book: "hinos" | "canticos" | "suplemento";',
        "  numero: number;",
        "  pageCount: number;",
        "  pages: ImageSourcePropType[];",
        "}",
        "",
        "export const HINOS_PARTITURAS: Record<number, PartituraInfo> = {",
    ]
    
    for num in sorted(hinos_map.keys()):
        pages_count = len(hinos_map[num])
        reqs = ", ".join([f'require("../assets/partituras/hinos/pages/{num}_{p}.webp")' for p in range(1, pages_count + 1)])
        lines.append(f'  {num}: {{ book: "hinos", numero: {num}, pageCount: {pages_count}, pages: [{reqs}] }},')
    lines.append("};\n")
    
    lines.append("export const CANTICOS_PARTITURAS: Record<number, PartituraInfo> = {")
    for num in sorted(canticos_map.keys()):
        pages_count = len(canticos_map[num])
        reqs = ", ".join([f'require("../assets/partituras/canticos/pages/{num}_{p}.webp")' for p in range(1, pages_count + 1)])
        lines.append(f'  {num}: {{ book: "canticos", numero: {num}, pageCount: {pages_count}, pages: [{reqs}] }},')
    lines.append("};\n")
    
    lines.append("export const SUPLEMENTO_PARTITURAS: Record<number, PartituraInfo> = {")
    for num in sorted(suplemento_map.keys()):
        pages_count = len(suplemento_map[num])
        reqs = ", ".join([f'require("../assets/partituras/suplemento/pages/{num}_{p}.webp")' for p in range(1, pages_count + 1)])
        lines.append(f'  {num}: {{ book: "suplemento", numero: {num}, pageCount: {pages_count}, pages: [{reqs}] }},')
    lines.append("};\n")

    lines.append("""/**
 * Retorna as informações da partitura para exibição no visualizador unificado.
 */
export function getPartitura(book?: string | null, numero?: number | string | null): PartituraInfo | null {
  if (numero === undefined || numero === null || numero === "") return null;
  const num = typeof numero === "string" ? parseInt(numero, 10) : numero;
  if (isNaN(num)) return null;

  const normalizedBook = book ? book.toLowerCase().trim() : "hinos";
  
  if (normalizedBook === "canticos" || normalizedBook === "cantico") {
    return CANTICOS_PARTITURAS[num] ?? null;
  }
  
  if (normalizedBook === "suplemento" || normalizedBook === "suplementos") {
    return SUPLEMENTO_PARTITURAS[num] ?? null;
  }

  // Padrão: hinos
  return HINOS_PARTITURAS[num] ?? null;
}
""")

    with open(MANIFEST_OUT, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    print("Manifesto gerado com sucesso!")

def main():
    if not os.path.exists(PDF_INPUT):
        print(f"Erro: Arquivo não encontrado: {PDF_INPUT}")
        sys.exit(1)
        
    print(f"Abrindo documento: {PDF_INPUT}")
    doc = fitz.open(PDF_INPUT)
    print(f"Total de páginas no documento: {len(doc)}")
    
    ensure_dirs()
    
    hinos_map = map_hinos(doc)
    canticos_map = map_canticos(doc)
    suplemento_map = map_suplemento(doc)
    
    export_section(doc, hinos_map, 'hinos')
    export_section(doc, canticos_map, 'canticos')
    export_section(doc, suplemento_map, 'suplemento')
    
    generate_manifest(hinos_map, canticos_map, suplemento_map)
    
    print("\nProcesso concluído com sucesso!")

if __name__ == '__main__':
    main()
