import { store } from '../../../redux/store';
import { Eos } from '../../../Config';
import { setTreasurehuntData } from '../../../redux/treasurehunt/treasurehunt_actions';
import { updateTokenBalance } from '../../../redux/scatter/scatter_actions';

const takeAction = async (action, data) => {
  console.log(`executing action: ***( ${action} )*** with data: `, data)
  try {
    const result = await Eos.api.transact({
      actions: [{
        account: Eos.contractName,
        name: action,
        authorization: [{
          actor: 'treasurehunt',
          permission: 'active',
        }],
        data
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    return result;
  } catch (error) {
    console.log({ TH_CONTRACT_ACTION_DISPATCHER_ERROR: error, withData: data, withAction: action })
    throw (error)
  }
}

export const TH_ACTION_GET_BALANCE = async (username) => {
  const balance = await Eos.rpc.get_currency_balance('eosio.token', username, 'EOS')
  store.dispatch(updateTokenBalance(balance[0]))
  return balance[0]
}

export const updateTreasurehuntData = async (id) => {
  const table = await TH_ACTION_GET_TABLE(id)
  // await TH_ACTION_GET_BALANCE(id)
  if (table && table.rows.length > 0 && table.rows[0].id === id) {
    store.dispatch(setTreasurehuntData(table.rows[0]))
  } else {
    store.dispatch(setTreasurehuntData({
      game_data: null,
      id: null,
      // total_win: 0,
      // username: null
    }))
  }
}

export const updateTreasurehuntDataAutoplay = async (username) => {
  const table = await TH_ACTION_GET_TABLE(username)
  let data = {
    winCount: null,
    loseCount: null,
    isLose: null,
    prize: null
  }

  if (table && table.rows.length > 0 && table.rows[0].username === username) {
    const { panel_set, win_count, prize } = table.rows[0].game_data
    const loseCount = panel_set.filter(obj => obj.isopen === 1 && obj.iswin === 0).length
    if (!loseCount) {
      await TH_ACTION_WITHDRAW_GAME({ username })
    }
    await TH_ACTION_GET_BALANCE(username)

    data.winCount = win_count
    data.loseCount = loseCount
    data.isWin = loseCount === 0
    data.prize = prize

    store.dispatch(setTreasurehuntData(table.rows[0]))
  } else {
    store.dispatch(setTreasurehuntData({
      game_data: null,
      game_id: null,
      total_win: 0,
      username: null
    }))
  }

  return data
}

export const TH_ACTION_GET_TABLE = async (id) => {
  console.log('executing action: ***( get user table data )*** user: ', id)
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.contractName,
    scope: Eos.contractName,
    table: 'users',
    limit: 1,
    lower_bound: id,
  });
  console.log({ table })
  
  return table
}

export const TH_ACTION_GET_ALL_USERS_TABLE = async () => {
  console.log('executing action: ***( get all table data )***')
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.contractName,
    scope: Eos.contractName,
    table: 'users',
  });

  return table
}

export const TH_ACTION_TRANSFER_TOKEN = async({ username, amount, memo }) => {
  console.log(`executing action: ***( token_transfer )*** with amount: ${amount}`)
  const transaction = await Eos.api.transact({
    actions: [{
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: username,
        permission: 'active',
      }],
      data: {
        from: username,
        to: 'treasurehunt',
        quantity: `${amount}.0000 EOS`,
        memo: memo ? memo : `${username}-${amount}`
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });

  TH_ACTION_GET_BALANCE(username)
  return transaction
};

export const TH_ACTION_INITIALIZE_GAME = (data) => {
  return takeAction('initialize', {...data});
}

export const TH_ACTION_REMOVE_EXISTING_GAME = (data) => {
  return takeAction('end', {...data});
}

export const TH_ACTION_SET_GAME_PANEL = (data) => {
  return takeAction('setpanel', {
    ...data,
    panelset: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  });
}

export const TH_ACTION_SET_DESTINATION = (data) => {
  return takeAction('destination', {...data});
}

export const TH_ACTION_SET_ENEMY = (data) => {
  return takeAction('setenemy', {...data})
}

export const TH_ACTION_GAME_START = (data) => {
  return takeAction('gamestart', {...data});
}

export const TH_ACTION_OPEN_TILE = (data) => {
  return takeAction('opentile', {...data})
}

export const TH_ACTION_WITHDRAW_GAME = (data) => {
  return takeAction('withdraw', {...data})
}

export const TH_ACTION_AUTOPLAY_OPT = (data) => {
  return takeAction('autoplay', {...data})
}

export const setExplorer = (data) => {
  return takeAction('setexplr', {...data});
}

export const getTicketBalance = async (username) => {
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.contractName,
    scope: Eos.contractName,
    table: 'ticket',
    lower_bound: username,
    limit: 1
  });

  return table
}

export const puchaseNewTicket = ({ username, amount }) => {
  return takeAction('purchase', { username, amount });
}