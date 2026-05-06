// hoki-glossary-data.js — 電験3種 法規Wiki 用語クイズデータ
// schema_version 1: id/term/yomi/meaning/field/articles/exam_note/distractors/addedDate
// localStorage 規約: hoki_quiz_<cardType>_<field>  (e.g. hoki_quiz_glossary_progress)

window.GLOSSARY_TERMS_V1 = {
  schema_version: 1,
  cardType: 'glossary',
  config: { stage_intervals_days: [0, 7, 30, 90, 180] },
  terms: [
    {
      id: 'shiyo-denatsu',
      term: '使用電圧',
      yomi: 'しようでんあつ',
      meaning: '電路に印加される線間電圧',
      field: 'hoki',
      articles: ['58'],
      exam_note: '「対地電圧」との混同に注意。条文冒頭は使用電圧で区分',
      distractors: ['対地電圧', '公称電圧', '定格電圧'],
      addedDate: '2026-05-06'
    },
    {
      id: 'taichi-denatsu',
      term: '対地電圧',
      yomi: 'たいちでんあつ',
      meaning: '電線と大地間の電圧。接地式では電線-大地間、非接地式では電線間の値となる',
      field: 'hoki',
      articles: ['58'],
      exam_note: '第58条の区分判定の核心。150V境界を正確に把握する',
      distractors: ['使用電圧', '公称電圧', '線間電圧'],
      addedDate: '2026-05-06'
    },
    {
      id: 'zetsuen-teikou',
      term: '絶縁抵抗',
      yomi: 'ぜつえんていこう',
      meaning: '電路の導体と大地（または他の導体）間の抵抗値',
      field: 'hoki',
      articles: ['58'],
      exam_note: 'メガーで測定し、単位はMΩ',
      distractors: ['接地抵抗', '導体抵抗', '漏電抵抗'],
      addedDate: '2026-05-06'
    },
    {
      id: 'kaiheiki',
      term: '開閉器',
      yomi: 'かいへいき',
      meaning: '電路を手動で開閉する機器の総称（カバー付ナイフスイッチ・電磁開閉器等）。過電流を自動遮断する機能はない。条文では「開閉器又は過電流遮断器」のセットで使われ、両者を電路の区分単位として規定する',
      field: 'hoki',
      articles: ['58'],
      exam_note: '「自動遮断」の語が入ったら過電流遮断器のひっかけ。開閉器は手動のみ',
      distractors: ['過電流遮断器', '断路器', '接触器'],
      addedDate: '2026-05-06'
    },
    {
      id: 'kadenryu-shadanki',
      term: '過電流遮断器',
      yomi: 'かでんりゅうしゃだんき',
      meaning: '過電流（短絡・過負荷）を検出して自動遮断する機器の総称。代表例は配線用遮断器（MCCB／ブレーカー）・ヒューズ。高圧側では気中遮断器・真空遮断器が該当する。手動の開閉器や、地絡保護目的の漏電遮断器とは目的が異なる（混同に注意）',
      field: 'hoki',
      articles: ['58'],
      exam_note: '「開閉器又は過電流遮断器で区切ることのできる電路ごと」で頻出。漏電遮断器をひっかけ選択肢として混ぜる出題に注意',
      distractors: ['漏電遮断器', '開閉器', '電磁開閉器'],
      addedDate: '2026-05-06'
    },
    {
      id: 'haisenyou-shadanki',
      term: '配線用遮断器',
      yomi: 'はいせんようしゃだんき',
      meaning: '過電流遮断器の代表的な種類。MCCB、ブレーカーとも呼ぶ',
      field: 'hoki',
      articles: ['58'],
      exam_note: '過電流遮断器とほぼ同義で使われるが、条文の文言は「過電流遮断器」',
      distractors: ['過電流遮断器', '漏電遮断器', '電磁開閉器'],
      addedDate: '2026-05-06'
    },
    {
      id: 'rouden-shadanki',
      term: '漏電遮断器',
      yomi: 'ろうでんしゃだんき',
      meaning: '漏えい電流（地絡）を検出して自動遮断する機器。ELB／ELCB。過電流保護機能付きのタイプ（過電流遮断器の役割も持つ）もあるが、主目的は地絡保護で過電流遮断器とは区別される',
      field: 'hoki',
      articles: ['58'],
      exam_note: '第58条の条文には登場しない（条文は過電流遮断器のみ）。「漏電遮断器で電路を区切る」と書かれていたら誤りのひっかけ',
      distractors: ['過電流遮断器', '配線用遮断器', '地絡継電器'],
      addedDate: '2026-05-06'
    },
    {
      id: 'megger',
      term: 'メガー',
      yomi: 'めがー',
      meaning: '絶縁抵抗計（メガオーム計）。直流高電圧を印加して抵抗を測定する',
      field: 'hoki',
      articles: ['58'],
      exam_note: '低圧電路では直流500V印加が標準（JIS C 1302）',
      distractors: ['テスター', 'クランプメーター', 'アーステスター'],
      addedDate: '2026-05-06'
    },
    {
      id: 'rouei-denryu',
      term: '漏えい電流',
      yomi: 'ろうえいでんりゅう',
      meaning: '絶縁劣化により電路から大地へ流れる電流',
      field: 'hoki',
      articles: ['58'],
      exam_note: '解釈第14条で1mA以下が絶縁抵抗測定の同等基準',
      distractors: ['地絡電流', '短絡電流', '充電電流'],
      addedDate: '2026-05-06'
    },
    {
      id: 'densen-sougokan',
      term: '電線相互間',
      yomi: 'でんせんそうごかん',
      meaning: '電線と電線の間（相間）',
      field: 'hoki',
      articles: ['58'],
      exam_note: '「対地間」とペアで出題。条文の「及び」に注意',
      distractors: ['対地間', '電線地絡間', '中性点間'],
      addedDate: '2026-05-06'
    }
  ]
};
