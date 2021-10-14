import React from "react";

export const gameflowSummonRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          プレイヤーは1つのトークンで1つのゴーストを召喚できます.
          各ゴーストのステータス（ATK、DEF、SPD、LUK、HP）はランダムに決定され、そのレア度は合計ステータスによって決定されます. <br />
          ゴーストのステータスは、5つの属性からの全体的なスコアによって決定されます。 （ATK、DEF、SPD、LUK、HP）. <br />
          ゴーストの属性は、ATK、DEF、SPD、LUKの中でどの統計が最も高い値であるかによって決定されます.
        </p>
      )
    default:
      return (
        <p>
          Player can summon 1 Ghost with 1 Token.
          Each ghost's stats (ATK, DEF, SPD, LUK, HP) are randomly determined, and its
          Rarity is determined by the total status. <br />
          A ghost's status is determined by it's overall score from 5 attributes. (ATK, DEF, SPD, LUK, HP). <br />
          A ghost's attributes are determined by which stats is the highest value among ATK, DEF, SPD LUK.
        </p>
      )
  }
}

export const ghostLifeAndQuitRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          召喚後、召喚されたゴーストは自動的に戦闘に送られ、すべての戦闘が自動的に行われます.
          プレイヤーはバトルスタンバイ画面でゴーストのライフを追加購入できます.
          最初、ゴーストは1ライフ（トークン）を保持し、戦闘結果を通じてライフを取得および喪失します.
          ゴーストAが勝った場合、Aは1ライフ（トークン）を獲得し、ゴーストBは負け、Bは1ライフ（トークン）を失います.
          Ghost’sLifeが0に達するとゲームは終了します
          <br />
          プレイヤーは、次のバトルマッチングが始まる前に、バトルスタンバイ画面で残りの収益（ライフ量）を引き出すこともできます, 
          ただし、プレイヤーが召喚時に設定された戦闘制限よりも早く戦闘を撤回した場合, 
          ハウスエッジの30％が課され、プレーヤーは残りのイヤリングの70％を受け取ります.
          *Ghostの最初の戦闘が終了した後、残りの収益を引き出すことができます
        </p>
      )
    default:
      return (
        <p>
          After summoning, summoned Ghost is automatically sent to battle and all battle take place automatically.
          Players can purchase additional Life for their Ghost on the battle standby screen.
          Initially Ghosts hold 1 Life (Token) and they get and lose their Life through their battle results.
          (if Ghost A win, A get 1 Life (Token) and Ghost B lose, B lose 1 Life (Token))  
          The game ends when Ghost’s Life reaches 0.
          <br />
          Players can also choose to withdraw remaining earnings (Life amount) on the battle standby screen before next battle matching begins, 
          however if players retreat the battle earlier than the battle limit set at the summon, 
          30% of house edge will be imposed and player will receive 70% of remaining earrings.
          *withdraw remaining earnings is available after Ghost’s first battle ends
        </p>
      )
  }
}

export const specialCharacterRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          今日の特殊文字は、サーバー時間0:00にRNGによって選出されます.
          全11文字の中から1文字を選択します.
          (今後のアップデートでさらに文字が追加されると、その番号は現在の11に追加されます)
          特殊文字は、次の特殊文字が選出されるまでボーナスステータス（ステータスx 1.2）を受け取ります.
          ボーナスステータスは、特殊キャラクターが選出された後に開始する戦闘に適用されます. 
          (戦闘中に特殊文字が選出された場合、進行中の戦闘には影響しません.)
          今日の特殊文字はメイン画面にあります.
        </p>
      )
    default:
      return (
        <p>
          Today's special character is elected by RNG at 0:00 server time.
          One character will be selected from among all 11 characters.
          (If more characters are added in future updates, the number will be added to the current 11)
          The special character will receive a bonus status (status x 1.2) until the next special character will be elected.
          The bonus status is applied to battles that start after the special character is elected. (In case a special character is elected in the middle of a battle, it has no effect on the battle in progress.)
          Today's special characters can be found on the main screen.
        </p>
      )
  }
}

export const houseEdgeRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>ハウスエッジ[6％-10％*残りの寿命数]は支払い時に差し引かれます.</p>
      )
    default:
      return (
        <p>House edge [6%-10% * number of life remainings] is deducted at payout.</p>
      )
  }
}

export const earningRankingRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          収益に基づくランキング. <br />
          ランキングは、ゴースト別とプレイヤー別の2つのカテゴリに分類されます. <br />
          24時間、1週間、および生涯の部門があります. <br /><br />

          ランキング報酬 <br />
          ゴーストランキングで24時間1週間で上位10位にVIPポイントが付与されます. <br />
          VIPポイントはランクに応じて付与されます. <br /><br />

          24時間1週間のプレイヤーランキングでトップ10にランクされたプレイヤーにはトークンが与えられます. <br />
          24時間および1週間の売上高の0.5％が、ランクに応じて上位10位のプレーヤーに与えられます.
        </p>
      )
    default:
      return (
        <p>
          Ranking based on earnings. <br />
          Rankings are broken down into two categories: by ghost and by player. <br />
          There are 24 hour, 1 week, and Lifetime divisions. <br /><br />

          Ranking Rewards <br />
          VIP points will be given to the top 10 rankers in the 24 hour and 1 week in ghost ranking. <br />
          VIP points will be awarded according to their rank. <br /><br />

          Top 10 ranked player in player ranking for 24 hours and 1 week will be rewarded with Token. <br />
          0.5% of 24-hour and 1-week sales amount will be given to the top 10 ranked players according to their rank.
        </p>
      )
  }
}

export const winstreakRankingRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          個々の幽霊による最大の連勝に基づくランキング. <br />
          したがって、このランキングはプレイヤーではなく、ゴーストのみを対象としています. <br />
          24時間、1週間、および全体的な時間区分があります. <br /><br />
            
          ランキング報酬 <br />
          VIPポイントは24時間と1週間のランキングで上位10位の幽霊に与えられます. <br />
          VIPポイントはランクに応じて付与されます. <br />
        </p>
      )
    default:
      return (
        <p>
          Ranking based on the largest win streak by an individual ghost. <br />
          Therefore, this ranking is for ghosts only, not players. <br />
          There are 24-hour, 1-week, and overall time divisions. <br /><br />
            
          Ranking Reward <br />
          VIP points will be given to the top 10 ranked ghosts in the 24 hour and 1 week rankings. <br />
          VIP points will be awarded according to their rank. <br />
        </p>
      )
  }
}

export const autplayRules = (lang) => {
  switch(lang) {
    case 'ja':
      return (
        <p>
          プレイヤーは、以下のパラメータを設定することにより、ゴーストクエストの自動再生オプションを使用できます. <br />
          
          1. 戦闘制限設定: 召喚された幽霊が戦闘の途中で倒されない場合 (人生は0に達しない), 
          戦闘はここで設定された数まで続きます. <br />

          2. 自動召喚設定: プレイヤーが持っている幽霊の数がここで設定した数を下回ったとき, 
          それは自動的に新しい幽霊を召喚して補充します. <br />

          3. 自動再生終了設定: プレイヤーが自動再生を終了するポイントを設定します. 
          累積数のゴーストの最大数を超えると、自動再生は自動的に終了します, 
          プレーヤーのウォレットの設定残高を超えたとき、またはプレーヤーのウォレットの設定残高を下回ったとき. 
          プレイヤーはこれらの条件の1つ、2つ、または3つすべてを設定できます.
        </p>
      )
    default:
      return (
        <p>
          Player can use Auto Play option in Ghost Quest by setting parameter below. <br />
          
          1. Battle limit setting: If the summoned ghost is not defeated in the middle of the battle (Life does not reach 0), 
          the battle will continue until the number set here. <br />

          2. Auto-summon setting: When the number of ghosts that player has falls below the number set here, 
          it will automatically summon new ghosts to replenish. <br />

          3. Autoplay End Settings: Set a point at which player want to end autoplay. 
          Autoplay will automatically end when it exceeds the maximum number of ghosts in cumulative number, 
          when it exceeds the set balance in player’s wallet, or when it falls below the set balance in player’s wallet. 
          Player can set one, two, or all three of these conditions.
        </p>
      )
  }
}
