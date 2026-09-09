"""
Extract all 97 hymns (300 to 400) of Hinário Novo from scans.
"""
import json
import re
import os

OCR_RESULTS_PATH = r"C:\Users\Caio\.gemini\antigravity-cli\brain\26f7f927-c826-4392-b4d5-927b629c3fd9\scratch\ocr_results.json"
OUT_PATH = r"C:\Users\Caio\.gemini\antigravity-cli\brain\26f7f927-c826-4392-b4d5-927b629c3fd9\scratch\extracted_novo_hinos.json"

def get_scan(scans, scan_idx):
    return scans[scan_idx - 1]

# We will load ocr data
with open(OCR_RESULTS_PATH, 'r', encoding='utf-8-sig') as f:
    all_scans = json.load(f)

print(f"Loaded {len(all_scans)} scans.")
