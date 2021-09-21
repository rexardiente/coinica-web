import { lazy } from "react";

//Lazy load screens
const VIP = lazy(() => import("./VIP"));
// const Challenge = lazy(() => import("./Challenge"));
const Tasks = lazy(() => import("./Tasks"));
const Referral = lazy(() => import("./Referral"));
// const News = lazy(() => import("./News"));
// const Rankings = lazy(() => import("./Rankings"));
// const Leaderboard = lazy(() => import("./Leaderboard"));
// const FAQ = lazy(() => import("./FAQ"));
// const AccountSetting = lazy(() => import("./AccountSettings"));
// const Treasurehunt = lazy(() => import("./Treasurehunt"));
// const TreasurehuntGameplayV2 = lazy(() => import("./TreasurehuntGameplayV2"));
// const TreasurehuntAutoplayV2 = lazy(() => import("./TreasurehuntAutoplayV2"));
// const TreasurehuntAutoplayGameplay = lazy(() => import("./TreasurehuntAutoplayGameplay"));
// const GhostQuest = lazy(() => import("./GhostQuest"));
// const GhostQuestGhostList = lazy(() => import("./GhostQuestGhostList"));
// const GhostQuestGameplay = lazy(() => import("./GhostQuestGameplay"));
// const GhostQuestRanking = lazy(() => import("./GhostQuestRanking"));
// const GhostQuestSummonResult = lazy(() => import("./GhostQuestSummonResult"));
// const MahjongMain = lazy(() => import("./MahjongMain"));
// const MahjongGameplay = lazy(() => import("./MahjongGameplay"));

const routes = [
  // {
  //   key: "Home",
  //   exact: true,
  //   path: "/",
  //   component: HomeScreen,
  //   showHistory: false,
  // },
  {
    key: "VIP",
    game: "vip", // temporary variable to trigger sign-up modal
    exact: true,
    path: "/vip",
    component: VIP,
    isPrivate: false,
  },
  // {
  //   key: "Challenge",
  //   game: "challenge",
  //   exact: true,
  //   path: "/challenge",
  //   component: Challenge,
  //   isPrivate: false,
  // },
  {
    key: "Tasks",
    game: "tasks", // temporary variable to trigger sign-up modal
    exact: true,
    path: "/tasks",
    component: Tasks,
    isPrivate: true,
  },
  {
    key: "Referral",
    game: "referral", // temporary variable to trigger sign-up modal
    exact: true,
    path: "/referral",
    component: Referral,
    isPrivate: true,
  },
  // {
  //   key: "News",
  //   exact: true,
  //   path: "/news",
  //   component: News,
  //   isPrivate: false,
  // },
  // {
  //   key: "Rankings",
  //   exact: true,
  //   path: "/rankings",
  //   component: Rankings,
  //   isPrivate: false,
  // },
  // {
  //   key: "Leaderboard",
  //   exact: true,
  //   path: "/leaderboard",
  //   component: Leaderboard,
  //   isPrivate: false,
  // },
  // {
  //   key: "FAQ",
  //   exact: true,
  //   path: "/faq",
  //   component: FAQ,
  //   isPrivate: false,
  // },

  // /**
  //  * @routes_below_are_private
  //  * ======================================
  //  * =========== PRIVATE ROUTES ===========
  //  * ======================================
  //  */
  // {
  //   key: "Account",
  //   exact: false,
  //   path: "/account",
  //   component: AccountSetting,
  //   showHistory: false,
  //   isPrivate: true
  // },
  // /**
  //  * ===========================
  //  * ==== TREASUREHUNT GAME ====
  //  * ===========================
  //  * */
  // {
  //   key: "Treasurehunt",
  //   game: "Treasurehunt",
  //   exact: true,
  //   path: "/game/treasurehunt",
  //   component: Treasurehunt,
  //   isPrivate: true,
  //   showHistory: true,
  // },
  // {
  //   key: "TreasurehuntGameplayV2",
  //   game: "Treasurehunt",
  //   exact: true,
  //   path: "/game/treasurehunt/gameplay",
  //   component: TreasurehuntGameplayV2,
  //   isPrivate: true,
  //   showHistory: true,
  // },
  // {
  //   key: "TreasurehuntAutoplayV2",
  //   game: "Treasurehunt",
  //   exact: true,
  //   path: "/game/treasurehunt/autoplay",
  //   component: TreasurehuntAutoplayV2,
  //   isPrivate: true,
  //   showHistory: true,
  // },
  // {
  //   key: "TreasurehuntAutoplayGameplay",
  //   game: "Treasurehunt",
  //   exact: true,
  //   path: "/game/treasurehunt/autoplay-gameplay",
  //   component: TreasurehuntAutoplayGameplay,
  //   isPrivate: true,
  //   showHistory: true,
  // },
  // /**
  //  * ===========================
  //  * ==== GHOST QUEST GAME =====
  //  * ===========================
  //  * */
  // {
  //   key: "GhostQuest",
  //   game: "GhostQuest",
  //   exact: true,
  //   path: "/game/ghostquest",
  //   component: GhostQuest,
  //   isPrivate: true,
  //   showHistory: true,
  // },
  // {
  //   key: "GhostQuestGhostList",
  //   game: "GhostQuest",
  //   exact: true,
  //   path: "/game/ghostquest/ghostlist",
  //   component: GhostQuestGhostList,
  //   isPrivate: true,
  //   showHistory: false,
  // },
  // {
  //   key: "GhostQuestGameplay",
  //   game: "GhostQuest",
  //   exact: true,
  //   path: "/game/ghostquest/gameplay",
  //   component: GhostQuestGameplay,
  //   isPrivate: true,
  //   showHistory: false,
  // },
  // {
  //   key: "GhostQuestRanking",
  //   game: "GhostQuest",
  //   exact: true,
  //   path: "/game/ghostquest/ranking",
  //   component: GhostQuestRanking,
  //   isPrivate: true,
  //   showHistory: false,
  // },
  // {
  //   key: "GhostQuestSummonResult",
  //   game: "GhostQuest",
  //   exact: true,
  //   path: "/game/ghostquest/result",
  //   component: GhostQuestSummonResult,
  //   isPrivate: true,
  //   showHistory: false,
  // },
  // /**
  //  * ===========================
  //  * ====== MAHJONG GAME =======
  //  * ===========================
  //  * */
  // {
  //   key: "MahjongMain",
  //   game: "Mahjong",
  //   exact: true,
  //   path: "/game/mahjong",
  //   component: MahjongMain,
  //   isPrivate: true,
  //   showHistory: false,
  // },
  // {
  //   key: "MahjongGameplay",
  //   game: "Mahjong",
  //   exact: true,
  //   path: "/game/mahjong/gameplay",
  //   component: MahjongGameplay,
  //   isPrivate: true,
  //   showHistory: false,
  // },
];

export default routes;
