# NOBOU. Portfolio

のぼうの個人ブランド・ポートフォリオサイトです。
HTML / CSS / JavaScript のみで構成しており、ビルドやインストールは不要です。

## 起動方法

**いちばん簡単な方法:** `index.html` をダブルクリックしてブラウザで開く。

**ローカルサーバーで確認する場合（推奨）:**

```bash
cd portfolio-site
python -m http.server 5173
# → http://localhost:5173 を開く
```

Node.js がある場合は `npx serve .` でも構いません。

## ファイル構成

```
portfolio-site/
├─ index.html        … ページ構造（各セクション・固定の文言）
├─ css/style.css     … デザイン（色は先頭の :root で一括変更）
├─ js/data.js        … ★コンテンツ（プロフィール・活動・作品・JOURNEY）
├─ js/main.js        … 表示処理・メニュー・アニメーション
└─ assets/
   ├─ icon.png               … プロフィールアイコン（ABOUT に表示）
   ├─ favicon.png            … ブラウザタブのアイコン
   ├─ apple-touch-icon.png   … スマホのホーム画面用
   └─ works/                 … 作品サムネイル置き場
```

## コンテンツの変更方法

ほとんどの内容は **`js/data.js`** を編集して保存し、ブラウザを再読み込みすれば反映されます。

| やりたいこと | 編集する場所 |
| --- | --- |
| 年齢を非表示にする | `profile.showAge` を `false` に |
| プロフィール文を変える | `profile.bio`（段落ごとの配列） |
| プロフィール画像を差し替え | `assets/icon.png` を上書き（正方形・480px以上推奨）。別名なら `profile.avatar` を変更 |
| XのURL・ID を変える | `profile.xUrl` / `profile.xHandle` |
| 活動カードを編集 | `activities`（`icon` は youtube / shorts / consult / ai / automation / x / web / learn） |
| 実績の数字を編集 | `achievements`（空配列 `[]` にすると非表示） |
| 作品を追加・編集 | `works` に項目を追加 |
| 成長記録を追加 | `journey` に項目を追加 |

### 作品（WORKS）の追加例

```js
{
  title: "作品名",
  category: "SHORT VIDEO",
  summary: "作品の概要",
  role: "企画・編集",                  // 空なら非表示
  tools: ["Premiere Pro", "ChatGPT"],  // 空配列なら非表示
  status: "公開中",                     // 空なら非表示
  url: "https://youtube.com/...",      // 入れると「作品を見る ↗」ボタンが出る
  image: "assets/works/sample.jpg",    // 空なら CSS のビジュアル
  visual: "baseball"                   // 画像がない時のビジュアル: baseball / ai / automation / clone
}
```

サムネイル画像は 16:9 の比率がきれいに収まります（スマホ表示では 4:3 で切り抜き）。画像が読み込めない場合は自動で CSS ビジュアルに戻ります。

### JOURNEY の追加例

```js
{ date: "2026.10", title: "やったこと", text: "説明", tags: ["タグ"], current: true }
```

`date` は確認できる日付があるときだけ入れてください（空なら非表示）。
`current: true` の項目は「NOW」として強調されます（1つだけにするのがおすすめ）。

## デザインの方針

- 黒（`--sumi`）をベースに、青（`--ai`）だけをアクセントに使用。多色はアイコン画像だけ。
- 見出しは **Dela Gothic One**、本文は **Zen Kaku Gothic New**（どちらも Google Fonts）。
- ヒーローの縦書きコピーと「地平線から昇る青い光」がサイトの象徴。CONTACT でも同じ光を使っています。
- 自動で動くアニメーションは、ページを開いたときのヒーロー演出だけに絞っています。

## そのほか

- 見出し・キャッチコピー・PHILOSOPHY・CONTACT の文言は `index.html` に直接書いています。
- 色を変える場合は `css/style.css` 先頭の `--blue` などを変更してください。
- フォント（Google Fonts）が読み込めなくても、OS 標準フォントで崩れずに表示されます。
- OS の「視差効果を減らす」設定がオンの場合、アニメーションは自動で無効になります。

## 公開と更新

- 公開URL: https://nobuo-web.github.io/portfolio-site/
- GitHub Pages（`main` ブランチのルート）で公開しています。

内容を変更したら、次のコマンドで公開サイトに反映されます（1〜2分かかります）。

```bash
cd portfolio-site
git add -A
git commit -m "変更内容のメモ"
git push
```

コミットの作者情報は、このフォルダだけ GitHub の非公開アドレス（`…@users.noreply.github.com`）に設定しています。
