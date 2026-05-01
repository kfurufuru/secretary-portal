#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
極端条件チェック（M19/RULE-21）一括挿入スクリプト
各「この例題のツボ」の </Callout> 直後に極端条件チェック Callout を挿入する
"""

import re

FILE = r"C:\Users\kfuru\.secretary\denken3-riron-wiki.html"

# (old_unique_text, new_text_to_insert_after)
# old_unique_text = ツボ Callout の内容（ユニーク部分）
# 挿入位置 = そのツボの </Callout> の直後

INSERTIONS = [
    # --- CapacitorPage ---
    (
        "直列合成は逆数の和の逆数（1/C = 1/C₁ + 1/C₂）。答えは単独最小値（4μF）より必ず小さくなる——この直感でチェックできる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数】C₂ → ∞: C合成 ≈ C₁（大容量素子が接続ワイヤと等価） / C₂ → 0: C合成 → 0（直列に無いのと同じ）\n    </Callout>"
    ),
    # --- AcPowerPage ---
    (
        "sinφは「1から求める」——cos²φ + sin²φ = 1 を使って sinφ = 0.6。単位の使い分け（W / var / VA）が採点ポイントになる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数】cosφ → 1: Q → 0、S = P（純抵抗負荷） / cosφ → 0: P → 0、S = Q（純リアクタンス負荷、電力を消費しない）\n    </Callout>"
    ),
    # --- ThreePhasePage（例題1）---
    (
        "Y結線は「電圧に√3」——VL = √3·VP。Δ結線は「電流に√3」と逆になる。どちらの結線かを確認してから√3を掛ける場所を決める。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数】cosφ → 0: P → 0（無効電力のみ） / VL → 0: P → 0（断線時）\n    </Callout>"
    ),
    # --- TransistorPage ---
    (
        "IC = hFE × IB（ベース電流を増幅）、IE = IB + IC（KCL）の2式が核心。IE は IC よりわずかに大きく、hFE ≫ 1 なら IC ≈ IE と近似できる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数】hFE → 0: IC → 0（トランジスタOFF） / hFE → ∞: IC ≈ IE（理想増幅）\n    </Callout>"
    ),
    # --- CoulombFieldPage（例題1）---
    (
        "F = kQ₁Q₂/r²——単位変換（μC→C）を忘れず、同符号は斥力・異符号は引力で向きを確認する。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 r】r → 0: F → ∞（クーロン力は距離の2乗に反比例） / r → ∞: F → 0（遠距離では力消滅）\n    </Callout>"
    ),
    # --- CoulombFieldPage（例題2）---
    (
        "電位はスカラーなので代数和で合成する。異符号2点電荷なら V=0 の点が内側・外側に計2箇所——「符号の組み合わせ」で箇所数が決まる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 r】r → 0: V → ∞（点電荷への接近で電位が発散） / r → ∞: V → 0（無限遠で電位消滅）\n    </Callout>"
    ),
    # --- ElectromagneticForcePage（例題1）---
    (
        "F = BILsinθ——B⊥I（直角）のとき sinθ=1 で最大値。問題文に「直角」とあれば sinθ=1 を即適用できる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 θ】θ → 0°: F → 0（電流と磁界が並行） / θ → 90°: F = BIL（最大、直交時）\n    </Callout>"
    ),
    # --- ElectromagneticForcePage（例題2）---
    (
        "同方向電流→引力、逆方向電流→斥力。直感と逆になるため要注意。右ネジ則で各導体まわりの磁界方向を求めると確実に判断できる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 距離d】d → 0: F/L → ∞（単位長さ当たりの力が発散） / d → ∞: F/L → 0（遠距離では力が消滅）\n    </Callout>"
    ),
    # --- MagneticCircuitPage（例題1）---
    (
        "Rm = l/(μ₀μrA)——電気抵抗 R=l/(σA) と1:1対応。μr が大きい（鉄心）ほど磁気抵抗が小さく磁束が通りやすい。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 μr】μr → 1: 鉄心とエアギャップの差なし（空気コア）/ μr → ∞: 鉄心のRmは無視できる（エアギャップが支配）\n    </Callout>"
    ),
    # --- MagneticCircuitPage（例題2）---
    (
        "エアギャップの透磁率は μ₀（μr=1）なので、わずか数mm でも鉄心（μr≫1）に比べて磁気抵抗が桁違いに大きい。「空隙を最小化する＝磁気回路の効率を上げる」が電磁機器設計の鉄則。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 l_gap】l_gap → 0: Rm_gap → 0（エアギャップなし、全磁束が鉄心を通る） / l_gap → ∞: Rm_gap → ∞（ほぼ開磁路、磁束が流れない）\n    </Callout>"
    ),
    # --- MagneticCircuitPage（例題3）---
    (
        "H の大きさは「どれだけ起磁力が必要か」を示す。空隙の H が鉄心の μr 倍になる→コイル設計（NI の必要値）に直結。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 μr】μr → 1（空気と同じ）: 鉄心の H = エアギャップと同等 / μr → ∞: 鉄心の H → 0（起磁力は全てエアギャップが消費）\n    </Callout>"
    ),
    # --- DcCircuitPage（例題1）---
    (
        "並列の合成抵抗は逆数の和の逆数</span>。「1/Rp を求めた後、必ず逆数に戻す」操作を忘れると誤答。Rp は接続した抵抗の最小値（10Ω）より小さくなることで検算できる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 R₂】R₂ → 0: Rp → 0（短絡、電流は全てR₂に流れる） / R₂ → ∞: Rp → R₁（開放、R₁のみが有効）\n    </Callout>"
    ),
    # --- DcCircuitPage（例題2）---
    (
        "電流が増えるほど端子電圧は下がる（V = E - Ir）。充電時と放電時で挙動が逆になる点が頻出引っかけ。<span className=\"marker\">放電時：電流増 → 端子電圧低下</span>。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 I】I → 0: V = E（開放電圧、内部抵抗降下なし） / I → E/r（短絡電流）: V → 0（端子電圧ゼロ）\n    </Callout>"
    ),
    # --- DcCircuitPage（例題3 テブナン）---
    (
        "Rth は電圧源を短絡してから計算する</span>。開放電圧 Vth と合わせて「電源側の等価直列回路」が完成。あとは Vth と Rth だけで負荷電流を計算できる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 RL】RL → 0: P → 0（短絡、電力消費なし） / RL → ∞: P → 0（開放、電流ゼロ） / RL = Rth: P = 最大（最大電力伝達定理）\n    </Callout>"
    ),
    # --- AcBasicsPage（例題1 実効値）---
    (
        "実効値 = 最大値/√2。√2 ≈ 1.414 を覚えておけば即計算できる。コンセント100Vは実効値、最大値は約141V。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 f】f → 0（直流）: 実効値 = 最大値（DC成分のみ、√2の補正不要） / f → ∞: リアクタンスが支配的になり回路のインピーダンスが変化\n    </Callout>"
    ),
    # --- AcBasicsPage（例題2 RL直列）---
    (
        "Z = √(R² + XL²) がポイント。位相差は tan φ = XL/R。3-4-5 の直角三角形は頻出パターン。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 f】f → 0: XL → 0、Z ≈ R（直流抵抗のみ） / f → ∞: XL → ∞、Z → ∞（コイルが遮断）\n    </Callout>"
    ),
    # --- RlcResonancePage（例題1 インピーダンス）---
    (
        "Z = √(R² + (XL-XC)²)。XL &gt; XC なら誘導性（電流遅れ）、XC &gt; XL なら容量性（電流進み）。差を取ってからベクトル合成。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 f】f → f₀: XL=XC、Z = R（最小・共振） / f → 0 または ∞: Z → ∞（容量性または誘導性で遮断）\n    </Callout>"
    ),
    # --- RlcResonancePage（例題2 共振Q値）---
    (
        "共振条件 XL=XC から f₀ = 1/(2π√LC)。Q = XL/R は鋭さの指標。Q=10 なら素子電圧が入力の10倍——高Q回路では過電圧に注意。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 R】R → 0: Q → ∞（理想共振、帯域幅ゼロ） / R → ∞: Q → 0（非共振、ブロードバンド）\n    </Callout>"
    ),
    # --- InductancePage（例題1 エネルギー）---
    (
        "W = ½LI² はコンデンサの ½CV² と対比で覚える。L↔C、I↔V の対称性が見えると混乱しない。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 I】I → 0: W → 0（エネルギー蓄積なし） / L → ∞: 同電流でも無限のエネルギー（超伝導コイルの理想極限）\n    </Callout>"
    ),
    # --- InductancePage（例題2 和動/差動）---
    (
        "和動 L = L₁+L₂+2M、差動 L = L₁+L₂−2M。差を取ると 4M = L和動−L差動 で M が求まる。2Mの符号で和動/差動を区別。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 k】k → 0（結合なし）: 和動 = 差動 = L₁+L₂ / k → 1（完全結合）: 差動 → 0（完全打ち消し）\n    </Callout>"
    ),
    # --- OpAmpPage（例題1 反転増幅）---
    (
        "反転増幅のゲインは必ず −Rf/Ri（マイナス）。出力は入力と逆位相になる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 Rf】Rf → 0: 利得 → 0（増幅なし） / Rf → ∞: 利得 → ∞（発振）\n    </Callout>"
    ),
    # --- OpAmpPage（例題2 積分回路）---
    (
        "積分回路は Vo = -(1/RC)∫Vi dt。ステップ入力にはランプ出力（時間に比例して増加）。時定数 RC が小さいほど急速に変化する。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 RC】RC → 0: 出力が急速に変化（時定数小、高利得高周波） / RC → ∞: 出力変化が極めて緩慢（長時定数積分）\n    </Callout>"
    ),
    # --- MeasurementPage（例題1 倍率器）---
    (
        "倍率器（直列）は電圧計レンジ拡大、分流器（並列）は電流計レンジ拡大。接続方向が逆になるので混同注意。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 n】n → 1: 倍率器抵抗 = 0（測定範囲拡大なし） / n → ∞: 倍率器抵抗 → ∞（高電圧対応）\n    </Callout>"
    ),
    # --- MeasurementPage（例題2 2電力計法）---
    (
        "2電力計法：P = W₁ + W₂、tanφ = √3(W₁−W₂)/(W₁+W₂)。cosφ &lt; 0.5 のとき一方が負指示になることに注意。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 cosφ】cosφ → 1: W₁=W₂（バランス、力率1） / cosφ → 0: W₁=-W₂（一方が負指示、電力ゼロ）\n    </Callout>"
    ),
    # --- TransientPage（例題1 時定数）---
    (
        "1τ後は最終値の約63%。「1τで完了」ではなく「63%到達」と覚える。5τで約99%到達が実用的な完了目安。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 R】R → 0: τ → 0（瞬時変化、理想スイッチ） / R → ∞: τ → ∞（永遠に定常状態に達しない）\n    </Callout>"
    ),
    # --- TransientPage（例題2 一般解）---
    (
        "一般式 f(t) = f(∞) + [f(0) − f(∞)]·e^(−t/τ) に初期値・最終値・時定数を代入するだけ。初期値と最終値の「差分」が指数減衰する構造。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 t】t → 0: f(t) = f(0)（初期値保持） / t → ∞: f(t) → f(∞)（定常値収束）\n    </Callout>"
    ),
    # --- SemiconductorPage ---
    (
        "シリコンの順方向電圧降下 ≈ 0.6V（ゲルマニウムは0.2V）。逆バイアスでも完全遮断にはならず、微小な逆飽和電流が残る——「完全ゼロ」は誤りと判断できる。\n    </Callout>",
        "\n    <Callout variant=\"note\" title=\"極端条件チェック\">\n      【支配変数 T（温度）】T → 0: 逆飽和電流 → 0（完全遮断に近づく） / T → ∞: 逆飽和電流 → 大（温度で急増、PN接合が機能しなくなる）\n    </Callout>"
    ),
]

def main():
    with open(FILE, "r", encoding="utf-8") as f:
        content = f.read()

    original_len = len(content)
    inserted = 0

    for old_suffix, insert_text in INSERTIONS:
        if insert_text.strip() in content:
            print(f"SKIP（既存）: {old_suffix[:60]!r}")
            continue
        if old_suffix not in content:
            print(f"ERROR（未発見）: {old_suffix[:80]!r}")
            continue
        content = content.replace(old_suffix, old_suffix + insert_text, 1)
        inserted += 1
        print(f"OK: {old_suffix[:60]!r}")

    with open(FILE, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\n完了: {inserted}/{len(INSERTIONS)} 件挿入, ファイルサイズ {original_len} → {len(content)} chars")

if __name__ == "__main__":
    main()
