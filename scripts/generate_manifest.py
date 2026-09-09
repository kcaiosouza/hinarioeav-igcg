import json, re

data = json.load(open('C:/Users/Caio/.gemini/antigravity-cli/brain/26f7f927-c826-4392-b4d5-927b629c3fd9/scratch/ocr_results.json', encoding='utf-8-sig'))

manifest = []

for idx, item in enumerate(data):
    f = item['file']
    lines = [l.strip() for l in item['lines'] if l.strip()]
    words = item['words']
    
    # Book page number is typically at the bottom (y > max_y * 0.85)
    bottom_words = [w for w in words if w['y'] > 1800]
    page_num = None
    for w in bottom_words:
        if re.match(r'^\d{3}$', w['text']):
            page_num = int(w['text'])
            break
            
    # Find all hymn numbers mentioned in headers
    # Usually in top half (y < 1200)
    top_words = [w for w in words if w['y'] < 1000]
    hymn_candidates = []
    for w in top_words:
        if re.match(r'^[3-4]\d\d$', w['text']):
            num = int(w['text'])
            if 300 <= num <= 400 and num not in hymn_candidates:
                hymn_candidates.append(num)
                
    manifest.append({
        'scan_idx': idx + 1,
        'file': f,
        'page_num': page_num,
        'hymns': hymn_candidates,
        'header': lines[:3]
    })

print(f"{'Idx':3s} | {'Page':4s} | {'Hymns':12s} | {'Header Preview'}")
print("-" * 75)
for m in manifest:
    h_str = ", ".join(map(str, m['hymns'])) if m['hymns'] else "NONE"
    p_str = str(m['page_num']) if m['page_num'] else "???"
    hdr = " / ".join(m['header'][:2])
    print(f"{m['scan_idx']:3d} | {p_str:4s} | {h_str:12s} | {hdr[:45]}")
