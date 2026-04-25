#!/usr/bin/env python3
import sys, json, os

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    rules_path = os.path.join(os.path.dirname(__file__), '..', 'style-rules.txt')
    rules_path = os.path.normpath(rules_path)

    try:
        with open(rules_path, encoding='utf-8') as f:
            rules = f.read().strip()
        prompt = data.get('prompt', '')
        data['prompt'] = f"{rules}\n\n---\n\n{prompt}"
    except FileNotFoundError:
        pass  # ファイルなければ何もしない

    print(json.dumps(data, ensure_ascii=False))

if __name__ == '__main__':
    main()
