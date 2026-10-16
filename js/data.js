/* ==========================================================================
   NOBOU. サイトコンテンツ
   --------------------------------------------------------------------------
   プロフィール・活動・作品・JOURNEY はすべてこのファイルで編集できます。
   HTML / CSS を触らずに、ここを書き換えて保存 → ブラウザ再読み込みで反映されます。
   ========================================================================== */

window.SITE_DATA = {
  /* ---------------- プロフィール ---------------- */
  profile: {
    name: "のぼう",
    nameEn: "NOBOU",
    age: 15,
    showAge: true, // false にすると年齢を非表示にします

    // プロフィール画像（アイコン・ロゴ）。正方形の画像がおすすめです。
    // 空文字にするか画像が読み込めない場合は、CSS で描いた「N.」ロゴが表示されます。
    avatar: "assets/icon.png",

    xUrl: "https://x.com/hototogiszimusy",
    xHandle: "@hototogiszimusy",

    bio: [
      "将来やりたいことを実現するために、今できることから準備を始めています。",
      "YouTube運営やSNSでの発信、AIツールの活用、Web制作など、さまざまな分野に挑戦しながら、知識と経験を一つずつ積み重ねています。",
      "自分で学び、行動し、形にする。その繰り返しを、何より大切にしています。"
    ],

    // ABOUT の要点（4つ程度がおすすめ）
    points: [
      { title: "目標から逆算して準備する", text: "将来の目標に向けて、今やるべきことを考え、行動に移しています。" },
      { title: "SNS運用で経験を積む", text: "SNSでの発信を通じて実践的に学びながら、目標に向けた活動資金づくりにも取り組んでいます。" },
      { title: "新しい分野に挑戦する", text: "YouTube、AIツール、自動化、Web制作。興味を持った分野には、まず飛び込んでみます。" },
      { title: "学んだことを形にする", text: "知って終わりにせず、実際に作って試す。手を動かしながら理解を深めています。" }
    ]
  },

  /* ---------------- ACTIVITY ----------------
     icon に使える名前: youtube / shorts / consult / ai / automation / x / web / learn */
  activities: [
    { icon: "youtube", title: "YouTube運営", en: "YOUTUBE", text: "チャンネルの企画から制作、公開後の振り返りまで。視聴者に届く動画づくりを実践しながら学んでいます。" },
    { icon: "shorts", title: "ショート動画制作", en: "SHORT VIDEO", text: "数十秒で伝わる構成とテンポを意識して、ショート動画の企画・編集に取り組んでいます。" },
    { icon: "consult", title: "動画コンサルティング", en: "CONSULTING", text: "動画制作や運営で得た学びをもとに、企画や改善の相談に向き合っています。" },
    { icon: "ai", title: "AIツール活用", en: "AI TOOLS", text: "文章・画像・音声などのAIツールを目的に合わせて使い分け、制作や学習に役立てています。" },
    { icon: "automation", title: "AIによる自動化", en: "AUTOMATION", text: "繰り返しの作業を仕組みに置き換え、制作工程を効率化する方法を試しています。" },
    { icon: "x", title: "X（Twitter）運用", en: "X / TWITTER", text: "日々の活動や学びを発信しながら、言葉で伝える力と人とのつながりを育てています。" },
    { icon: "web", title: "Webサイト制作", en: "WEB DESIGN", text: "デザインとコードの両面から、伝わるWebサイトづくりを学んでいます。このサイトもその一つです。" },
    { icon: "learn", title: "学習・新しい挑戦", en: "LEARNING", text: "分からないことは調べ、試し、自分のものにする。新しい分野にも積極的に踏み込みます。" }
  ],

  /* ---------------- 実績（WORKS の上に表示） ----------------
     空配列にすると非表示になります。 */
  achievements: [
    { value: "1000万", unit: "回再生", label: "運営する複数アカウントの月間合計" },
    { value: "500万", unit: "回再生", label: "1本の動画での最高再生数" }
  ],

  /* ---------------- WORKS ----------------
     各項目で使えるフィールド:
       title     : 作品名
       category  : カテゴリ表示
       summary   : 概要
       role      : 担当したこと（空なら非表示）
       tools     : 使用ツールの配列（空なら非表示） 例: ["Premiere Pro", "ChatGPT"]
       status    : 制作状況（空なら非表示）
       url       : 作品URL（空ならボタン非表示）
       linkLabel : ボタンの文言（省略時は「作品を見る」）
       image     : サムネイル画像パス 例: "assets/works/baseball.jpg"（空なら CSS ビジュアル）
       visual    : 画像がないときの CSS ビジュアル（baseball / ai / automation / clone） */
  works: [
    {
      title: "AIクローン",
      category: "AI / 自動化",
      summary: "自分の考え方を学習させたAIクローンの開発。自分が手を動かさなくても、自分のように考えて働く仕組みを目指しています。",
      role: "",
      tools: [],
      status: "データ収集中",
      url: "",
      image: "",
      visual: "clone"
    },
    {
      title: "野球系YouTube Shorts",
      category: "SHORT VIDEO",
      summary: "野球をテーマにしたショート動画の企画・制作。短い時間でも魅力が伝わる構成を探っています。",
      role: "",
      tools: [],
      status: "取り組み中",
      url: "",
      image: "",
      visual: "baseball"
    },
    {
      title: "AIニュース動画",
      category: "VIDEO / AI",
      summary: "AIに関する情報を、誰にでも分かりやすく伝えることを目指した動画制作。",
      role: "",
      tools: [],
      status: "取り組み中",
      url: "",
      image: "",
      visual: "ai"
    },
    {
      title: "自動動画制作システム",
      category: "AUTOMATION",
      summary: "AIツールや動画制作ツールを組み合わせ、制作工程を効率化する仕組みづくり。",
      role: "",
      tools: [],
      status: "取り組み中",
      url: "",
      image: "",
      visual: "automation"
    }
  ],

  /* ---------------- JOURNEY ----------------
     date は確認できる場合のみ記入してください（空なら非表示）。
     新しい記録は配列の末尾（または先頭）に追加するだけで表示されます。
     current: true の項目は「NOW」として強調表示されます。 */
  journey: [
    {
      date: "",
      title: "YouTube運営を通じて、企画と分析を学ぶ",
      text: "動画の企画を考え、公開後の反応を振り返りながら、次の改善につなげる。その繰り返しから多くを学んでいます。",
      tags: ["YouTube", "企画", "分析"]
    },
    {
      date: "",
      title: "SNSでの発信を始める",
      text: "Xを中心に、自分の活動や学びを言葉にして発信。伝え方を工夫しながら、少しずつ経験を積んでいます。",
      tags: ["X", "発信"]
    },
    {
      date: "",
      title: "AIツールで作業の効率化に挑戦",
      text: "AIを使って制作や作業を効率化する方法を試行錯誤しています。うまくいかないことも含めて、学びの途中です。",
      tags: ["AI", "自動化"]
    },
    {
      date: "",
      title: "Web制作を学び、このサイトをつくる",
      text: "新しい技術としてWeb制作に挑戦。自分の考えや活動を伝える場所として、このポートフォリオを制作しました。",
      tags: ["Web", "デザイン"]
    },
    {
      date: "",
      title: "自分の考え方を持つ、AIクローンをつくり始める",
      text: "自分が働かなくても、自分のように考えて動いてくれる存在を目指して開発中。いまはクローンに学ばせるためのデータを集めています。",
      tags: ["AI", "クローン", "データ収集"],
      current: true
    }
  ]
};
