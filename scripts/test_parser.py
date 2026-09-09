import json, re

# Load OCR results
OCR_RESULTS_PATH = r"C:\Users\Caio\.gemini\antigravity-cli\brain\26f7f927-c826-4392-b4d5-927b629c3fd9\scratch\ocr_results.json"
with open(OCR_RESULTS_PATH, 'r', encoding='utf-8-sig') as f:
    scans = json.load(f)

def clean_verse(line):
    line = re.sub(r'^[1-9]\s*', '', line)
    line = re.sub(r'^I\s+', '', line)
    line = re.sub(r'0h([!,\s])', r'Oh\1', line)
    return line.strip()

# Scan 1: Hymn 300
h300_lines = scans[0]['lines']
# Let's inspect h300
print("--- Hymn 300 ---")
for l in h300_lines:
    print(l)
