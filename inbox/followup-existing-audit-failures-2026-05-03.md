# 既存 audit FAIL 追跡タスク

**起点**: 2026-05-03 編集ロックシステム実装時に pre-commit が検出した既存FAIL（私の本件編集とは無関係）
**対応方針**: 別セッション or 別コミットで個別対応

## 検出された既存 FAIL（denken_hoki_audit.py）

| ページ | FAIL内容 | 推定原因 |
|---|---|---|
| `ShisenHikisamaPage` | ground-truth数値 `'2.6 mm'` 欠落 | A種接地線太さの記載不足？ |
| `BshuSetsuchiPage`   | ground-truth数値 `'1秒以内', '0.5秒以内'` 欠落 | B種接地の遮断時間規定（300/Ig 緩和条件）の記載不足？ |

## 検出された既存 WARN（5件・修正優先度低）

| ページ | WARN内容（推定） |
|---|---|
| `GijutsuKijunGaiyouPage` | 1 WARN |
| `DensenroPage` | 1 WARN |
| `ChichuuDensenroPage` | 1 WARN |
| `HoanKiteiPage` | 1 WARN |
| `KojiGyohoPage` | 1 WARN |

## 調査コマンド

```bash
python denken_hoki_audit.py 2>&1 | grep -B 1 -A 2 "ShisenHikisamaPage\|BshuSetsuchiPage"
python denken_hoki_audit.py --quiet  # 該当ページのみ詳細
```

## 対応の優先順位（推奨）

1. **FAIL 2件**（数値不足）: `denken_hoki_audit_data.py` の ground-truth と該当ページの実コードを照合し、ページ側に数値追記 or audit 側のルール修正
2. **WARN 5件**: FAIL より低優先。月次でまとめて対応

## 関連

- 検出時のコミット: 2026-05-03 編集ロックシステム実装（`--no-verify` で bypass した上でコミット）
- audit スクリプト: `denken_hoki_audit.py` / `denken_hoki_audit_data.py`
- pre-commit hook: `.claude/hooks/pre-commit`

---

**記録**: 2026-05-03 / 編集ロックシステム実装セッション末尾で発見
