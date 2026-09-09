import json

data = json.load(open('C:/Users/Caio/.gemini/antigravity-cli/brain/26f7f927-c826-4392-b4d5-927b629c3fd9/scratch/ocr_results.json', encoding='utf-8-sig'))

for idx in range(0, 14):
    item = data[idx]
    print(f"=== Scan {idx+1:2d}: {item['file']} ===")
    for line in item['lines']:
        print("   ", line)
