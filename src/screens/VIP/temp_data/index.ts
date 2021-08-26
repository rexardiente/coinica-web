import { translate } from "helpers/translate";


// |-- TEMP API VALUES --|
const rank_titles = [
  {
    title: translate("vip.temp_data.rank.titles.rank"),
    sub: translate("vip.temp_data.rank.titles.rank.sub"),
  },
  {
    title: translate("vip.temp_data.rank.titles.totalPayout"),
    sub: translate("vip.temp_data.rank.titles.total_payout.sub"),
  },
  {
    title: translate("vip.temp_data.rank.titles.total_vip_points"),
    sub: translate("vip.temp_data.rank.titles.totalPayout.sub"),
    value: "1342",
  },
  {
    title: translate("vip.temp_data.rank.titles.estimated_rank"),
    sub: translate("vip.temp_data.rank.titles.estimated_rank.sub"),
  },
];

const progress_values = [
  {
    title: translate("vip.temp_data.progress_values.total_points"),
    currentVal: "0",
    maxVal: "10,000",
  },
  {
    title: translate("vip.temp_data.progress_values.vip_points"),
    currentVal: "0",
    maxVal: "1,000",
  },
];

const benefits_values = [
  {
    benefits: translate("vip.temp_data.benefits_values.cash_back.benefits"),
    bronze: translate("vip.temp_data.benefits_values.cash_back.benefits.bronze"),
    silver: translate("vip.temp_data.benefits_values.cash_back.benefits.silver"),
    gold: translate("vip.temp_data.benefits_values.cash_back.benefits.gold"),
  },
  {
    benefits: translate("vip.temp_data.benefits_values.redemption_rate.benefits"),
    bronze: "10%",
    silver: "20%",
    gold: "30%",
  },
  {
    benefits: translate("vip.temp_data.benefits_values.referral.benefits"),
    bronze: "0.12%",
    silver: "0.14%",
    gold: "0.16%",
  },
  {
    benefits: translate("vip.temp_data.benefits_values.test_play.benefits"),
    bronze: translate("vip.temp_data.benefits_values.test_play.benefits.bronze"),
    silver: translate("vip.temp_data.benefits_values.test_play.benefits.silver"),
    gold: translate("vip.temp_data.benefits_values.test_play.benefits.gold"),
  },
  { 
    benefits: translate("vip.temp_data.benefits_values.vip_concierge.benefits"), 
    bronze: translate("vip.temp_data.benefits_values.vip_concierge.benefits.bronze"), 
    silver: translate("vip.temp_data.benefits_values.vip_concierge.benefits.silver"), 
    gold: translate("vip.temp_data.benefits_values.vip_concierge.benefits.gold") 
  },
];

const points_and_rank = [
  {
    benefits: translate("vip.temp_data.points_and_rank.cumulative_payout.benefits"),
    bronze: "1000",
    silver: "10000",
    gold: "100000",
  },
  {
    benefits: translate("vip.temp_data.points_and_rank.cumulative_vip_points.benefits"),
    bronze: "100",
    silver: "1000",
    gold: "5000",
  },
];

export { rank_titles, progress_values, benefits_values, points_and_rank };
