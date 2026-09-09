import json, re

data = json.load(open('C:/Users/Caio/.gemini/antigravity-cli/brain/26f7f927-c826-4392-b4d5-927b629c3fd9/scratch/ocr_results.json', encoding='utf-8-sig'))

# Let's inspect Scan 1 to Scan 10 in detail
for idx in range(10):
    item = data[idx]
    print(f"=== Scan {idx+1}: {item['file']} ===")
    lines = item['lines']
    for l in lines:
        print("  ", l)
