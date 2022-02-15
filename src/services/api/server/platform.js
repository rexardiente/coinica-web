import { store } from "redux/store";
import { AxiosMultiCurrency as api } from "Config";
import { setUserBalance } from "redux/platform/platform_action";
import { getHeaderParams } from "services/auth";
import axios from "axios";

/**
 * @param  {string} name - scatter account name
 */
export const GetUserAccount = (name) => {
  const headers = getHeaderParams();
  return api.get(`/donut/api/v1/account/user/${name}`, { headers });
};

export const GetUserWalletBalance = () => {
  const headers = getHeaderParams();
  return api.get(`/donut/api/v1/account/wallets`, { headers });
};

export const updateUserWalletBalance = async () => {
  const headers = getHeaderParams();
  const { data } = await api.get(`/donut/api/v1/account/wallets`, {
    headers,
  });
  store.dispatch(setUserBalance(data));
};

/**
 * @param  {string} referral_code - user referral code
 */
export const GetUserAccountByReferralCode = (referral_code) => {
  return api.get(`/donut/api/v1/account/code/${referral_code}`);
};

/**
 * @param  {string} id - user id
 */
export const GetUserAccountById = (id) => {
  const headers = getHeaderParams();
  return api.get(`/donut/api/v1/account/id/${id}`, { headers });
};

/**
 * @param  {string} id - platform account id
 */
export const GetVIP = () => {
  const headers = getHeaderParams();
  return api.get("/donut/api/v1/vip", { headers: headers });
};

/**
 * @param  {}
 */
export const GetChallengeRankToday = () => {
  return api.get("/donut/api/v1/challenge/ranks/daily");
};

/**
 * @param  {}
 */
export const GetChallengeRankYesterday = () => {
  return api.get("/donut/api/v1/challenge");
};

/**
 * @param  {string} code referral code to use
 * @param  {uuid} applied_by user id
 */
export const ApplyReferral = (code, applied_by) => {
  const headers = getHeaderParams();
  return api.post(
    "/donut/api/v1/referral/apply",
    {
      code,
      applied_by,
    },
    { headers }
  );
};

/**
 * @param  {string} referral_code the user's own referral code
 */
export const ReferralHistory = (referral_code) => {
  const headers = getHeaderParams();
  return api.get(`/donut/api/v1/referral/history/${referral_code}`, {
    headers,
  });
};

export const TasksList = () => {
  const headers = getHeaderParams();
  return api.get("/donut/api/v1/tasks", {
    headers: headers,
  });
};

/**
 * @param  {string} user user id
 * @param  {string} game_id game id
 */
export const DailyTask = (user, game_id) => {
  const headers = getHeaderParams();
  return api.get("/donut/api/v1/task/daily", {
    params: { user: user, game_id: game_id },
    headers: headers,
  });
};

/**
 * @param  {string} user user id
 * @param  {string} game_id game id
 */
export const MonthlyTask = (user, game_id) => {
  const headers = getHeaderParams();
  return api.get("/donut/api/v1/task/monthly", {
    params: { user, game_id },
    headers: headers,
  });
};

/**
 * @param  {}
 */
export const GameList = () => {
  return api.get("/donut/api/v1/games");
};

/**
 * @param  {}
 */
export const GameGenreList = () => {
  return api.get("/donut/api/v1/genres");
};

/**
 * @param  {}
 */
export const GetMonthlyRanking = () => {
  return api.get("/donut/api/v1/ranking/monthly");
};

/**
 * @param  {}
 */
export const GetDailyRanking = () => {
  return api.get("/donut/api/v1/ranking/daily");
};

/**
 * @param  {}
 */
export const GetNews = (pageNum) => {
  return axios.get(
    `https://forum.coinica.net/wp-json/wp/v2/posts?per_page=5&page=${pageNum}`
  );
};

export const GetNewsById = (id) => {
  return axios.get(
    `https://forum.coinica.net/wp-json/wp/v2/posts?include[]=${id}`
  );
};

// Account Settings //

/**
 * @param  {}
 */
export const GetTransactionHistory = () => {
  const headers = getHeaderParams();
  return api.get(`/donut/api/v1/account/wallet/history`, { headers });
};

/**
 * @param  {}
 */
export const GetServerStatus = () => {
  return api.get("/");
};

/**
 * @param  {string} id account uuid
 */
export const GetUsernameAccountById = (id) => {
  const headers = getHeaderParams();
  return api.get(`/donut/api/v1/get/account/username/by?id=${id}`, { headers });
};

export const GetTotalRegisteredUser = () => {
  return api.get("/donut/api/v1/account/registered");
};

// GET   /donut/api/v1/task/daily
// GET   /donut/api/v1/task/monthly
// GET   /donut/api/v1/referral/history/:code
// GET   /donut/api/v1/challenge
// GET   /donut/api/v1/challenge/ranks/daily
// GET   /donut/api/v1/ranking/monthly
// GET   /donut/api/v1/ranking/daily
// GET   /donut/api/v1/news
// GET   /donut/api/v1/account/user/:user
// GET   /donut/api/v1/games
// GET   /donut/api/v1/genres
// GET /donut/api/v1/account/user/history
