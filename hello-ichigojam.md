---
"title": "IchigoJamを作って学ぶ授業のお手伝いをしてきた"
"created_at": "2025/02/13"
"updated_at": "none"
"abgstract": "IchigoJamというシングルボードコンピューターを、はんだづけで作って、プログラミングを学ぶ授業をお手伝いしてきたので、IchigoJam Webでちょっと遊びました"
"tags": "電子工作,IchigoJam,BASIC"
---
## IchigoJamを作って学ぶ授業のお手伝いをしてきた

高専プロコンなどで知り合ったさくらインターネットの方とお話をしてる間に、どうやら地元（母校ではない）の小学校でプログラミング教室のイベントをやると言うことでお声がけいただいてすこ〜しだけお手伝いさせてもらいました。  
みんないい子で、何より困ったときにちゃんと先生に質問できるのがすごくいい環境だなと思いました。

### [IchigoJam](https://ichigojam.net)って何？

[jig.jp](https://www.jig.jp)の創業者である福野さんが発明したシングルボードコンピューターで、電子工作やロボット教室、プログラミング教室の教材から、バスロケーションシステムで実運用までされているすご〜いヤツです。  
詳しくは [公式サイト](https://ichigojam.net) をどうぞ。

### 川下りゲームの備忘録

今日の本題はこれ。せっかく川下りゲームを自分なりにちょっと改造したのでネットの海に放流したかったのです。

```text
10 CLT:CLS:X=15
20 LOCATE X,5:PRINT "🐱"
30 LOCATE RND(32),23:PRINT "👾"
35 WAIT 3
36 X=X-BTN(LEFT)+BTN(RIGHT)
37 X=X&31
39 IF SCR(X,5) GOTO 50
40 GOTO 20
50 LOCATE 8,9:PRINT "----------------"
51 LOCATE 8,10:PRINT "|              |"
52 LOCATE 8,11:PRINT "|              |"
53 LOCATE 8,12:PRINT "|              |"
54 LOCATE 8,13:PRINT "----------------"
55 LOCATE 10,11:PRINT "SCORE:":LOCATE 16,11:PRINT TICK()
56 LED1:WAIT60:LED0:END
```

といってもスコアが出るのをちょっとリッチにしただけですけど。  
よかったら [IchigoJam Web](https://fukuno.jig.jp/app/IchigoJam/index.html) で試してみてください。

p.s. 関係各所の皆さん本当にありがとうございました、貴重な体験に圧倒的感謝 `m(_ _)m`

