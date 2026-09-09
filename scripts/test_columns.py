import json

data = json.load(open('C:/Users/Caio/.gemini/antigravity-cli/brain/26f7f927-c826-4392-b4d5-927b629c3fd9/scratch/ocr_results.json', encoding='utf-8-sig'))

# Let's inspect scan 30 (Hymn 347) words
item = data[29]
print("File:", item['file'])
words = item['words']
# Find page width
xs = [w['x'] + w['w'] for w in words]
min_x = min(w['x'] for w in words)
max_x = max(xs)
mid_x = (min_x + max_x) / 2
print(f"X range: {min_x} to {max_x}, Mid: {mid_x}")

# Separate words into left and right columns
left_words = [w for w in words if w['x'] < mid_x and w['y'] > 400]
right_words = [w for w in words if w['x'] >= mid_x and w['y'] > 400]

# Group left words into lines by Y
def group_words_into_lines(w_list, y_thresh=25):
    w_list = sorted(w_list, key=lambda w: (w['y'], w['x']))
    lines = []
    curr_line = []
    curr_y = None
    for w in w_list:
        if curr_y is None or abs(w['y'] - curr_y) < y_thresh:
            curr_line.append(w)
            curr_y = w['y'] if curr_y is None else (curr_y + w['y'])/2
        else:
            lines.append(" ".join([x['text'] for x in sorted(curr_line, key=lambda k: k['x'])]))
            curr_line = [w]
            curr_y = w['y']
    if curr_line:
        lines.append(" ".join([x['text'] for x in sorted(curr_line, key=lambda k: k['x'])]))
    return lines

left_lines = group_words_into_lines(left_words)
right_lines = group_words_into_lines(right_words)

print("=== LEFT COLUMN ===")
for l in left_lines[:15]:
    print("  ", l)
print("=== RIGHT COLUMN ===")
for l in right_lines[:15]:
    print("  ", l)
