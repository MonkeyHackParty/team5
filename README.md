# プロダクト名：シェアっと
<!-- プロダクト名に変更してください -->


<!-- イメージ画像を置いてください -->
![image](https://github.com/user-attachments/assets/7033f70a-b68a-4cb1-9c3a-356c5231b2f0)

## チーム名：チーム5-全国のお母さんを助け隊
<!-- チーム番号とチーム名を変更してください -->

## 背景・課題・解決されること
<!-- 考案するプロダクトがどういった(Why)背景から思いついたのか、どのよう(What)な課題があり、どのよう(How)に解決するのかを入力してください -->
冷蔵庫の不足しているモノを買い忘れてしまう...

それを家族で共有できず複数買ってしまう...

そんな日常の悩みを解決するために開発したウェブアプリです.

家族で買いたいモノの共有,通知機能を導入することで買い忘れや無駄な買い物を防ぐことを目指しました.

## プロダクト説明 
<!-- 開発したプロダクトの説明を入力してください -->

### 画面構成
- ホーム画面 - ログインページ,新規登録ページに遷移.

- ログイン画面 - 必要情報を入力し,メイン画面に移行.

- アカウント登録画面 - 必要情報を入力し,メイン画面に移行.

- メイン画面 - ほしいモノをリスト化して出力.ここから場所登録画面,商品追加画面に移行.

- 商品追加画面 - ほしいモノの名前と個数を入力して商品を追加.

- 場所登録画面 - 場所の名前と緯度・経度を入力し,登録.

- 画面遷移図
<img src="https://github.com/user-attachments/assets/f3f86914-4b78-4ff9-8035-a20c7e31602b" alt="画面遷移図" style="width: 60%;">

### 機能
- アカウント登録機能 - ファミリーネーム, ユーザー名(複数), パスワードを入力し,メイン画面に移行.

- ログイン機能 - ユーザー名とパスワードを入力し,メイン画面に移行.

- 商品追加機能 - 商品名と個数を入力することで,買うべきモノを追加."誰が"追加したかの情報も出力.

- 位置情報取得機能 - ログイン後,常に端末の位置情報を取得し続ける.

- 位置情報登録機能 - 店の名前と位置情報を入力し,それらを登録.
  
- 通知機能 - 登録した店に近づくと,ほしいモノがあることをgmail(メアド)で通知.

## 操作説明・デモ画像
<!-- 開発したプロダクトの操作説明について入力してください。また、操作説明デモ動画があれば、埋め込みやリンクを記載してください -->
ホーム画面に飛んだらアカウント登録を行い,ログインを行います.
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/4e273272-60b8-4092-9e01-135d3b99ead5" alt="登録画面" style="width: 48%;"/>
  <img src="https://github.com/user-attachments/assets/061d1ba4-0bee-40e2-a35d-d2120cb2a084" alt="ログイン画面" style="width: 48%;"/>
</div>

トップページでは,ほしいものリストが表示されます.
![image](https://github.com/user-attachments/assets/4ccd599e-91b4-4b3a-a5c7-0df518b82e46)

商品追加画面では,商品名と個数を入力することで該当商品を追加することができます.
![image](https://github.com/user-attachments/assets/06facb70-96d4-4e1f-8f8e-2ae88a559a4e)

場所登録画面では,日頃使う店を入力することで位置情報を登録します.
![image](https://github.com/user-attachments/assets/598c99c6-7e19-46d5-9a09-d7310cb95824)

通知は以下のように表示されます.
![image](https://github.com/user-attachments/assets/c930c97f-be41-498a-a859-3a69328b3eb6)


## 注力したポイント・工夫点
<!-- 開発したプロダクトの注力したポイント・工夫点を入力してください -->

### フロントエンド
- レスポンシブデザインの一部対応
- ナビゲーションを意識
- 位置情報の取得
### バックエンド
- 位置情報を利用した通知機能
- セッション管理を用いてユーザビリティの向上
- 位置情報を取得するためのアルゴリズム
- メールで位置情報を知らせる機能

## 使用技術
| Category       | Technology Stack   |
| -------------- | ---------------------------------------------- |
| Frontend          | Next.js, JavaScript   |
| Backend        | React, JavaScript |
| Database        | MySQL       |
| Design       | Figma |
| etc.    | Git, GitHub    |

<!-- 開発したプロダクトの使用技術を入力してください -->


<!--
markdownの記法はこちらを参照してください！
https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
-->
