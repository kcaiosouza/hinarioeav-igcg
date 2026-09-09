import json

data = json.load(open('C:/Users/Caio/.gemini/antigravity-cli/brain/26f7f927-c826-4392-b4d5-927b629c3fd9/scratch/ocr_results.json', encoding='utf-8-sig'))

with open('C:/Users/Caio/.gemini/antigravity-cli/brain/26f7f927-c826-4392-b4d5-927b629c3fd9/scratch/all_scans_text.txt', 'w', encoding='utf-8') as out:
    for idx, item in enumerate(data):
        out.write(f"=== Scan {idx+1:2d}: {item['file']} ===\n")
        for line in item['lines']:
            out.write(f"    {line}\n")
        out.write("\n")

print("Dumped all 71 scans to scratch/all_scans_text.txt")
