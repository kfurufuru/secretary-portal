"""denken-hoki TOP の出題頻度ランキングを kakomon.yml から再生成する。

実行: cd C:/Users/kfuru/.secretary && python scripts/gen_hoki_ranking.py
出力: data/hoki-theme-ranking.json

ランク決定: 17テーマを出題回数で降順 → S(1-4) / A(5-10) / B(11-16) / C(17~)
otherは末尾固定（電線接続等の雑多テーマ）。
"""
import yaml, json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = Path('C:/Users/kfuru/Projects/denken-wiki/docs/_data/kakomon.yml')
OUT = ROOT / 'data' / 'hoki-theme-ranking.json'

WINDOWS = {'5y': 2021, '10y': 2016, '15y': 2011}

THEME_LABEL = {
    'setsuchi':         '接地工事',
    'zetsuen':          '絶縁性能・耐圧試験',
    'kachiku-densen':   '架空電線路',
    'jigyoho-taikei':   '電気事業法の体系',
    'shisetsu-kanri':   '電気施設管理',
    'bunsan-dengen':    '分散型電源・系統連系',
    'hogo-sochi':       '保護装置（過電流・地絡）',
    'haisen-koji':      '配線工事・屋内配線',
    'shiyo-basho':      '電気使用場所の施設',
    'shijimono':        '支持物・架空電線路強度',
    'hatsuhendenjo':    '発変電所の施設',
    'yogo-teigi':       '用語の定義',
    'tokushu-basho':    '特殊場所の施設',
    'chichuu-densen':   '地中電線路',
    'densen-cable':     '電線・ケーブルの選定',
    'shunin-gijutsusha':'電気主任技術者',
    'other':            'その他（電線接続等）',
}

THEME_TO_PAGE = {
    'setsuchi':          'setsuchi-ichiran',
    'zetsuen':           'zetsuen-ichiran',
    'kachiku-densen':    'rikkaku-ichiran',
    'shunin-gijutsusha': 'shunin-gijutsusya',
}

THEME_TO_MKDOCS = {
    'setsuchi':         'setsuchi-koji',
    'zetsuen':          'zetsuen-taikatu',
    'kachiku-densen':   'kakuu-densen',
    'jigyoho-taikei':   'denki-jigyoho',
    'shisetsu-kanri':   'shisetsu-kanri',
    'bunsan-dengen':    'bunsan-dengen',
    'hogo-sochi':       'hogo-sochi',
    'haisen-koji':      'haisen-koji',
    'shiyo-basho':      'shiyo-basho',
    'shijimono':        'shijimono-kyoudo',
    'hatsuhendenjo':    'hatsuhendenjo',
    'yogo-teigi':       'yogo-teigi',
    'tokushu-basho':    'tokushu-basho',
    'chichuu-densen':   'chichuu-densen',
    'densen-cable':     'densen-cable',
    'shunin-gijutsusha':'shunin-gijutsusha',
}


def year_num(y: str) -> int:
    if y.startswith('H'):
        return 1988 + int(y[1:3])
    if y.startswith('R'):
        return 2018 + int(y[1:3])
    return 0


def rank_of(idx: int) -> str:
    if idx < 4:  return 'S'
    if idx < 10: return 'A'
    if idx < 16: return 'B'
    return 'C'


def main():
    data = yaml.safe_load(SRC.read_text(encoding='utf-8'))
    problems = data['problems']

    result = {
        'windows': {},
        'meta': {'source': 'kakomon.yml', 'generated_for': 'denken-hoki-wiki TOP'},
    }

    for label, threshold in WINDOWS.items():
        counts = defaultdict(int)
        for p in problems:
            if year_num(p['year']) >= threshold:
                counts[p.get('theme', 'other')] += 1

        items = sorted([(k, v) for k, v in counts.items() if k != 'other'],
                       key=lambda x: -x[1])
        if 'other' in counts:
            items.append(('other', counts['other']))

        themes = []
        for i, (slug, c) in enumerate(items):
            themes.append({
                'slug':   slug,
                'label':  THEME_LABEL.get(slug, slug),
                'count':  c,
                'rank':   rank_of(i),
                'pageId': THEME_TO_PAGE.get(slug),
                'mkdocs': THEME_TO_MKDOCS.get(slug),
            })
        result['windows'][label] = themes

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Generated: {OUT} ({OUT.stat().st_size:,} bytes)")
    for w in WINDOWS:
        top4 = [t['label'] for t in result['windows'][w][:4]]
        print(f"  {w} top4: {' / '.join(top4)}")


if __name__ == '__main__':
    main()
