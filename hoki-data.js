// hoki-data.js — 電験3種 法規Wiki データ定義
window.WIKI_DATA = { chapters: [
  { id:"sec00", num:"00", title:"はじめに", pages:[
    { id:"top", num:"00.0", title:"法規の学習マップ" }
  ]},
  { id:"sec01", num:"01", title:"B問題・計算問題対策", ch:"CH04", pages:[
    { id:"zetsuen-tairyoku",   num:"1.1", title:"絶縁耐力試験",                   freq:"max",  ch:"CH04" },
    { id:"denatsu-kouka",      num:"1.2", title:"電圧降下",                       freq:"high", ch:"CH04" },
    { id:"shisen-hikisama",    num:"1.3", title:"支線の引張強さ",                 freq:"high", ch:"CH04" },
    { id:"henshatsuki-koritu", num:"1.4", title:"変圧器の全日効率",               freq:"high", ch:"CH04" },
    { id:"ryokuritsu-kaizen",  num:"1.5", title:"力率改善",                       freq:"mid",  ch:"CH04" },
    { id:"juyoritsu-keisan",   num:"1.6", title:"需要率・負荷率・不等率（計算）", freq:"max",  ch:"CH04", twin:"juyoritsu-gainen" },
    { id:"bshu-setsuchi",      num:"1.7", title:"B種接地抵抗値",                  freq:"max",  ch:"CH04" }
  ]},
  { id:"sec02", num:"02", title:"頻出数値・表暗記", ch:"CH03/04", pages:[
    { id:"setsuchi-ichiran",    num:"2.1", title:"接地工事一覧表",       freq:"max",  ch:"CH03" },
    { id:"zetsuen-ichiran",     num:"2.2", title:"絶縁耐力試験一覧表",   freq:"max",  ch:"CH03" },
    { id:"rikkaku-ichiran",     num:"2.3", title:"離隔距離一覧表",       freq:"high", ch:"CH03" },
    { id:"den-atsu-kubun",      num:"2.4", title:"電圧区分一覧表",       freq:"high", ch:"CH03" },
    { id:"densen-size",         num:"2.5", title:"電線サイズ一覧表",     freq:"mid",  ch:"CH03" },
    { id:"hokoku-todoke-kigen", num:"2.6", title:"報告・届出期限一覧表", freq:"high", ch:"CH01" }
  ]},
  { id:"sec03", num:"03", title:"電気設備技術基準・解釈", ch:"CH03", pages:[
    { id:"denro-zetsuen",        num:"3.1", title:"電路の絶縁",           freq:"max",  ch:"CH03", priority:"required" },
    { id:"setsuchi-koji",        num:"3.2", title:"接地工事",             freq:"max",  ch:"CH03", priority:"required" },
    { id:"densenro",             num:"3.3", title:"電線路",               freq:"high", ch:"CH03", priority:"required" },
    { id:"okunai-haisen",        num:"3.4", title:"屋内配線",             freq:"mid",  ch:"CH03", priority:"optional" },
    { id:"kako-denryu",          num:"3.5", title:"過電流保護",           freq:"mid",  ch:"CH03", priority:"optional" },
    { id:"chichuu-densenro",     num:"3.6", title:"地中電線路",           freq:"mid",  ch:"CH03", priority:"optional" },
    { id:"bunsangata-dengen",    num:"3.7", title:"分散型電源連系",       freq:"mid",  ch:"CH03", priority:"optional" },
    { id:"gijutsu-kijun-gaiyou", num:"3.0", title:"電気設備技術基準の概要", freq:"mid", ch:"CH03", priority:"optional" }
  ]},
  { id:"sec04", num:"04", title:"法令・制度", ch:"CH01+CH02", pages:[
    { id:"kosakubutsu-bunrui", num:"4.1", title:"電気工作物の区分", freq:"max",  ch:"CH01", priority:"required" },
    { id:"shunin-gijutsusya",  num:"4.2", title:"主任技術者",       freq:"max",  ch:"CH01", priority:"required" },
    { id:"hoan-kitei",         num:"4.3", title:"保安規程",         freq:"max",  ch:"CH01", priority:"required" },
    { id:"shiyo-jishu-kensa",  num:"4.4", title:"使用前自主検査",   freq:"high", ch:"CH01", priority:"optional" },
    { id:"jiko-hokoku",        num:"4.5", title:"事故報告",         freq:"high", ch:"CH01", priority:"optional" },
    { id:"denki-yohin-anzen",  num:"4.6", title:"電気用品安全法",   freq:"mid",  ch:"CH02", priority:"optional" },
    { id:"koji-shi-ho",        num:"4.7", title:"電気工事士法",     freq:"mid",  ch:"CH02", priority:"optional" },
    { id:"koji-gyoho",         num:"4.8", title:"電気工事業法",     freq:"mid",  ch:"CH02", priority:"optional" }
  ]},
  { id:"sec05", num:"05", title:"再エネ技術基準", ch:"CH05", pages:[
    { id:"furyoku-gijutsukijun",   num:"5.1", title:"風力発電の技術基準",    freq:"mid", ch:"CH05" },
    { id:"taiyouchi-gijutsukijun", num:"5.2", title:"太陽電池発電の技術基準",freq:"mid", ch:"CH05" },
    { id:"keito-renkei",           num:"5.3", title:"系統連系・保護装置",     freq:"mid", ch:"CH05" }
  ]},
  { id:"sec06", num:"06", title:"電気施設管理", ch:"CH06", pages:[
    { id:"juyoritsu-gainen",   num:"6.1", title:"需要率・負荷率・不等率（概念）", freq:"high", ch:"CH06", twin:"juyoritsu-keisan" },
    { id:"furitsu",            num:"6.2", title:"負荷率",           freq:"high", ch:"CH06" },
    { id:"futorito",           num:"6.3", title:"不等率",           freq:"mid",  ch:"CH06" },
    { id:"hensyatsuki-yoryo",  num:"6.4", title:"変圧器容量",       freq:"high", ch:"CH06" },
    { id:"haiden-kanri",       num:"6.5", title:"配電管理",         freq:"mid",  ch:"CH06" },
    { id:"juden-setsubi-kanri",num:"6.6", title:"受電設備管理",     freq:"mid",  ch:"CH06" }
  ]},
  { id:"sec07", num:"07", title:"過去問テーマ別演習", pages:[
    { id:"kakomon-b",        num:"7.1", title:"B問題だけ" },
    { id:"kakomon-setsuchi", num:"7.2", title:"接地" },
    { id:"kakomon-zetsuen",  num:"7.3", title:"絶縁" },
    { id:"kakomon-shunin",   num:"7.4", title:"主任技術者" },
    { id:"kakomon-hoan",     num:"7.5", title:"保安規程" },
    { id:"kakomon-jiko",     num:"7.6", title:"事故報告" },
    { id:"kakomon-densenro", num:"7.7", title:"電線路" },
    { id:"kakomon-saiene",   num:"7.8", title:"再エネ" },
    { id:"kakomon-random",   num:"7.R", title:"ランダム10問モード（65分タイマー）" }
  ]},
  { id:"sec08", num:"08", title:"直前チェック", pages:[
    { id:"chokuzen-suuchi",   num:"8.1", title:"数値だけ確認" },
    { id:"chokuzen-formula",  num:"8.2", title:"公式だけ確認" },
    { id:"chokuzen-hikkake",  num:"8.3", title:"ひっかけだけ確認" },
    { id:"chokuzen-machigai", num:"8.4", title:"間違いノート" }
  ]}
]};
