import { store } from "../../../redux/store";
import { Eos } from "../../../Config";
import { setMahjongHiloData } from "../../../redux/mahjong_hilo/mahjong_hilo_actions";
import { updateTokenBalance } from "../../../redux/scatter/scatter_actions";

const takeAction = async (action, data) => {
  console.log(`executing action: ***( ${action} )*** with data: `, data);
  try {
    const result = await Eos.api.transact(
      {
        actions: [
          {
            account: Eos.MJContractName,
            name: action,
            authorization: [
              {
                actor: data.username,
                permission: "active",
              },
            ],
            data,
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    return result;
  } catch (error) {
    console.log({
      GQ_CONTRACT_ACTION_DISPATCHER_ERROR: error,
      withData: data,
      withAction: action,
    });
    throw error;
  }
};

export const GET_BALANCE = async (username) => {
  const balance = await Eos.rpc.get_currency_balance(
    "eosio.token",
    username,
    "EOS"
  );
  // console.log({ balance })
  store.dispatch(updateTokenBalance(balance[0]));
  return balance[0];
};

export const MJ_ACTION_GET_TABLE = async (username) => {
  console.log(
    "executing action: ***( get user table data )*** user: ",
    username
  );
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.MJContractName,
    scope: Eos.MJContractName,
    table: "users",
    limit: 1,
    lower_bound: username,
  });

  return table;
};

export const updateMahjongHiloData = async (username) => {
  const table = await MJ_ACTION_GET_TABLE(username);
  console.log({ table });

  await GET_BALANCE(username);
  if (table && table.rows.length > 0 && table.rows[0].username === username) {
    store.dispatch(setMahjongHiloData(table.rows[0]));
  } else {
    store.dispatch(
      setMahjongHiloData({
        game_data: null,
        username: null,
      })
    );
  }
};

export const MJ_ACTION_GET_ALL_USERS_TABLE = async () => {
  console.log("executing action: ***( get all table data )***");
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.MJContractName,
    scope: Eos.MJContractName,
    table: "users",
  });

  return table;
};

type MJ_START_GAME_PARAMS = {
  id: number;
};
export const MJ_START_GAME = async ({ id }: MJ_START_GAME_PARAMS) => {
  /**
   * @desc: to start a new game
   */
  // return takeAction('initialize', { username });

  console.log(`executing action: ***( initialize )*** with data: `, {
    id,
  });
  const data = { id };
  try {
    const result = await Eos.api.transact(
      {
        actions: [
          {
            account: Eos.MJContractName,
            name: "initialize",
            authorization: [
              {
                actor: Eos.MJContractName,
                permission: "active",
              },
            ],
            data,
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    return result;
  } catch (error) {
    console.log({
      GQ_CONTRACT_ACTION_DISPATCHER_ERROR: error,
      withData: data,
      withAction: "initialize",
    });
    throw error;
  }
};

type MJ_ACTION_END_PARAMS = {
  id: number;
};
export const MJ_ACTION_END = ({ id }: MJ_ACTION_END_PARAMS) => {
  /**
   * @desc: Deleting existing mj account for the user]
   */
  return takeAction("end", { id });
};

type MJ_ACTION_RESET_GAME_PARAMS = {
  id: number;
};
export const MJ_ACTION_RESET_GAME = ({
  id,
}: MJ_ACTION_RESET_GAME_PARAMS) => {
  /**
   * @desc: reset game data for the user]
   */
  return takeAction("endgame", { id });
};

type MJ_PLAY_HILO_PARAMS = {
  id: number;
  option: number;
  /**
   *   if option value:
   *   = (1 => low )
   *   = (2 => draw)
   *   = (3 => high)
   */
};
export const MJ_PLAY_HILO = ({ id, option }: MJ_PLAY_HILO_PARAMS) => {
  /**
   * @desc: to draw a tile
   * @note : players can play hi-lo with or without deposit, all drawn tiles will be within gamedata
   */
  return takeAction("playhilo", { id, option });
};

type MJ_DISCARD_TILE_PARAMS = {
  id: number;
  idx: number; // idx: index of the tile desired to be discarded from hand
};
export const MJ_DISCARD_TILE = ({ id, idx }: MJ_DISCARD_TILE_PARAMS) => {
  /**
   * @desc: to discard a tile
   * @note : there will be a message if a player hands reaches certain amount of tiles
   */
  return takeAction("discardtile", { id, idx });
};

type MJ_DECLARE_KONG_PARAMS = {
  id: number;
  array_idx: number[];
};
export const MJ_DECLARE_KONG = ({
  id,
  array_idx,
}: MJ_DECLARE_KONG_PARAMS) => {
  /**
   * @desc: to declare a kong
   * @note : note : declaring a kong will automatically draw a tile which is also possible for Hi-Lo
   */
  return takeAction("dclrkong", { id, idx: array_idx });
};

type MJ_DCLR_WIN_HAND_PARAMS = {
  id: number;
};
export const MJ_DCLR_WIN_HAND = ({ id }: MJ_DCLR_WIN_HAND_PARAMS) => {
  /**
   * @desc: to declare a winning hand
   * @note : note : game data of the user will be used for checking
   */
  return takeAction("dclrwinhand", { id });
};

type MJ_DEPOSIT_TOKEN_PARAMS = {
  username: string;
  amount: number;
};
export const MJ_DEPOSIT_TOKEN = async ({
  username,
  amount,
}: MJ_DEPOSIT_TOKEN_PARAMS) => {
  console.log(
    `executing action: ***( token transfer for MJ TRANSFER )*** with amount: ${amount} EOS`
  );
  const transaction = await Eos.api.transact(
    {
      actions: [
        {
          account: "eosio.token",
          name: "transfer",
          authorization: [
            {
              actor: username,
              permission: "active",
            },
          ],
          data: {
            from: username,
            to: Eos.MJContractName,
            quantity: `${amount}.0000 EOS`,
            memo: `MHL Deposit`,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );

  GET_BALANCE(username);
  return transaction;
};

type MJ_WITHDRAW_TOKEN_PARAMS = {
  id: number;
};
export const MJ_WITHDRAW_TOKEN = async ({
  id,
}: MJ_WITHDRAW_TOKEN_PARAMS) => {
  /**
   * @desc: withdraw winnings
   * @note :
   */
  return takeAction("withdraw", { id });
};

type MJ_TRANSFER_TOKEN_PARAMS = {
  id: number;
};
export const MJ_TRANSFER_TOKEN = async ({
  id,
}: MJ_TRANSFER_TOKEN_PARAMS) => {
  /**
   * @desc: transfer winnings
   * @note :
   */
  return takeAction("wintransfer", { id });
};
type MJ_BET_PARAMS = {
  id: number;
};
export const MJ_BET_TOKEN = async ({ id }: MJ_BET_PARAMS) => {
  /**
   * @desc: bet to play hilo
   * @note :
   */
  return takeAction("startbet", { id });
};
