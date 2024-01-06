---
"title": "Deno Deployへのデプロイをホワイトリスト指定にする"
"created_at": "2023/01/06"
"updated_at": "none"
"abstract": "Deno DeployにGitHub Actionsを利用してアップロードするときにいらないものまでアップロードしないように"
"tags": "deno,GitHub Actions"
---
## Deno Deployへのデプロイをホワイトリスト指定にする

2年前の夏くらいに作ったDeno Deployを使ったwebアプリを改良する際に、GitHub Actionsを利用したデプロイに置き換えました。
その際にやけにデプロイに時間がかかり、実行中のログ出力を確認したところリポジトリ内の全ファイルをアップロードしてしまっていたので、ホワイトリストで指定したファイル・ディレクトリのみアップロードするように変更した話です。

### まず GitHub Actions で Deno Deploy にデプロイする

公式サイトに易しめな手順が書いてあった気がするので詳しくは書きません。

個人的にハマったポイントはDeno Deployのプロジェクト側でもちゃんとGitHub Actionsによるデプロイに設定を変更しなければならない点でした。

### deployctlでのデプロイがめっちゃ長い

![初回の実行時間](imgs/20240106/Screenshot%202024-01-06%2014.55.13.png)

この時点だと2分半くらいかかっていました。この時点でちょっと遅い気がしたので実行結果の詳細を確認したところdeployで1分強もかかっていました。  
Re-runなどで確認した感じどうやらビルド元も中のnode_modulesも全部デプロイしてしまっていそうです。  
deployctlをコマンドラインから実行するときには`--include`などでデプロイするファイルを限定できるようだったので、Github Actionsでも同様の処理ができると考えて探したところ、`uses: denoland/deployctl@v1`の`with`に`include`を追加できるようだったのでこれを利用しました。

```yml
- name: Deploy to Deno Deploy
  uses: denoland/deployctl@v1
  with:
    project: my-project
    entrypoint: server.js
    include: |
      dist
      server.js
```

これで`server.js`と`dist`に出力されるビルド結果のみをデプロイするように変更できました。

### まとめ

`include` を使ってホワイトリスト指定にしたあとの GitHub Actions の実行時間が↓です。

![ホワイトリスト指定にしたあとの実行時間](imgs/20240106/Screenshot%202024-01-06%2015.04.58.png)

なんとたったの6秒まで短縮しました。  
GitHub Actionsの実行時間は通常ユーザーだと月上限の設定があった気がするので、早めに気づいて1分も減らしておけたのはだいぶ良かったです。
では皆様もよきDeno Deployライフを！
