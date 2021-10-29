import React from "react";

export const gameflowRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          目的地を選択し、宝探しのために航海する地図を選択します.
          マップに応じて、コストは1トークン、10トークン、20トークンと異なります.
          宝探しでライバルとなる海賊の数を1〜15の範囲で入力します.
          ライバルの海賊に遭遇することなく、マップ上のパネルA〜P16から宝物を見つけてください.
          海賊に出会うとゲームに負ける.
          マップ上に宝物が残っている場合は、同じマップ上でそれを検索し続けることができます.
          この場合、宝物の数が減るので、より高い報酬を得ることができますが、逃すと、これまでに獲得したすべての宝物を失うことになります.
          これを防ぐために、あなたはそれを獲得したときに宝物を引き出すことを選ぶことができます.
          宝物が払い戻された後、同じマップで最初から新しい航海を開始できます.
        </p>
      )
    case 'chinese':
      return (
        <p>
          選擇目的地，選擇一張要航行的地圖進行尋寶.
          根據地圖，費用會從 1 代幣、10 代幣和 20 代幣不等.
          輸入在尋寶中將成為你對手的海盜數量，範圍為 1~15.
          在不遇到任何敵對海盜的情況下，從地圖上的 A~P 16 面板中找到寶藏.
          遇到海盜你就輸了.
          如果地圖上還有寶藏，可以在同一張地圖上繼續尋找.
          在這種情況下，寶物的數量會減少，因此您可以獲得更高的獎勵，但如果錯過，您將失去迄今為止獲得的所有寶物.
          為了防止這種情況發生，您可以選擇在您贏得寶藏時提取.
          寶物返還後，可以用同一張地圖從頭開始新的航程.
        </p>
      )
    default:
      return (
        <p>
          Select Distination, choose a map to sail to for your treasure hunt.
          Depending on the map, the cost will vary from 1 Token, 10 Tokens, and 20 Tokens.
          Enter the number of pirates that will be your rivals in the treasure hunt, in the range of 1~15.
          Find the treasure from panels A~P 16 on the map without encountering any rival pirates.
          If you meet a pirate, you lose the game.
          If there is any treasure left on the map, you can keep searching for it on the same map.
          In this case, the number of treasures will be reduced, so you can get a higher reward, but if you miss, you will lose all the treasures you have earned so far.
          To prevent this from happening, you can choose to withdraw the treasure at the time you win it.
          After the treasure is refunded, you can start a new voyage from the beginning with the same map.
        </p>
      )
  }
}

export const oddsCalculation = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          賞金の乗数は、パネルセット内の賞品数とゲームプレイでの連続ヒット数のプレーヤーのセットによって異なります.
          オッズの計算式は次のとおりです
          X = 開いたパネル
          (16 - x) / (16 - ライバル - x) * (1 - ハウスエッジ),
          (16 - x) / (16 - ライバル - x) * (16-x’) / (16-Rivals-x’) * (1 - ハウスエッジ)
        </p>
      )
    case 'chinese':
      return (
        <p>
          獎品的乘數根據玩家在面板組中的獎品數量和遊戲中連續點擊的數量而變化.
          賠率計算公式為
          X = 打開面板
          (16 - x) / (16 - 競爭對手 - x) * (1 - 房屋邊緣),
          (16 - x) / (16 - 競爭對手 - x) * (16 - x’) / (16 - 競爭對手 - x’) * (1 - 房屋邊緣)
        </p>
      )
    default:
      return (
        <p>
          The Multiplier of Prize varies according to the Player’s set of the number of Prize in a panel set and the number of successive hits in game play.
          The formula of odds calculation is
          X=opened panel
          (16 - x) / (16 - Rivals - x) * (1 - House Edge),
          (16 - x) / (16 - Rivals - x) * (16 - x’) / (16 - Rivals - x’) * (1 - House Edge)
        </p>
      )
  }
}

export const randomness = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          乱数ジェネレーター
          COINICAのすべてのトランザクションは、スマートコントラクトテクノロジーを使用してEOSブロックチェーンで実行されます.
          COINICAのすべてのゲームでは、公平性を保証するために、ゲームごとにランダムシードが生成されます.

          "以前のゲームのすべてのRNG結果は、結果の重複を避けるためにメモリに書き込まれます,
          ただし、その前に、すべての乱数は、現在のタイムスタンプを持つ最後のランダムシードに基づいて生成されます."

          トランザクションの確認
          プライベートデータベースとトークンサーバーで、すべてのトランザクションとより詳細な詳細をフェッチするために使用できるAPIがあります.
        </p>
      )
    case 'chinese':
      return (
        <p>
          隨機數發生器
          COINICA 的所有交易都使用智能合約技術在 EOS 區塊鏈上執行.
          在 COINICA 下的所有遊戲中，每個遊戲都會生成一個隨機種子以保證公平性.

          "之前遊戲的所有RNG結果都寫入內存以避免結果重複,
          但在此之前，所有隨機數都是基於具有當前時間戳的最後一個隨機種子生成的."

          檢查交易
          有一些 API 可用於在我們的私人數據庫和令牌服務器上獲取所有交易和更深入的詳細信息.
        </p>
      )
    default:
      return (
        <p>
          Random Number Generator
          All of COINICA's transactions are executed on the EOS blockchain using smart contract technology.
          In all games under COINICA a random seed will be generated per a game to guarantee fairness.

          "All RNG results from previous games are written in memory to avoid duplication of the result,
          but before that happen all random number are generated based on last random seed with current timestamp."

          Checking Transactions
          There are APIs that can be used to fetch all transactions and more in-depth details in our private database and on the Token server.
        </p>
      )
  }
}
