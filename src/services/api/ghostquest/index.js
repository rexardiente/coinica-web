import { store } from '../../../redux/store';
import { Eos } from '../../../Config';
import { setGhostQuestData } from '../../../redux/ghost_quest/ghost_quest_actions';
import { updateTokenBalance } from '../../../redux/scatter/scatter_actions';

const takeAction = async (action, data) => {
  console.log(`executing action: ***( ${action} )*** with data: `, data)
  try {
    const result = await Eos.api.transact({
      actions: [{
        account: Eos.GQContractName,
        name: action,
        authorization: [{
          actor: data.username,
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
    console.log({ GQ_CONTRACT_ACTION_DISPATCHER_ERROR: error, withData: data, withAction: action })
    throw (error)
  }
}

export const GQ_ACTION_SUMMON_CHAR = async({ username, amount, battleLimit }) => {
  console.log(`executing action: ***( token transfer for battle limit )*** with amount: ${amount} EOS`)
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
        to: 'ghostquest',
        quantity: `${amount}.0000 EOS`,
        memo: `BTTL_LMT=${battleLimit}`
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });

  GQ_ACTION_GET_BALANCE(username)
  return transaction
};

export const GQ_ACTION_ADD_LIFE = async({ username, amount, life }) => {
  console.log(`executing action: ***( token transfer for adding life )*** with amount: ${amount} EOS`)
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
        to: 'ghostquest',
        quantity: `${amount}.0000 EOS`,
        memo: `ADD_LIFE=${life}`
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });

  GQ_ACTION_GET_BALANCE(username)
  return transaction
};

export const GQ_ACTION_GET_BALANCE = async (username) => {
  const balance = await Eos.rpc.get_currency_balance('eosio.token', username, 'EOS')
  // console.log({ balance })
  store.dispatch(updateTokenBalance(balance[0]))
  return balance[0]
}

export const updateGhostQuestData = async (username) => {
  const table = await GQ_ACTION_GET_TABLE(username)

  await GQ_ACTION_GET_BALANCE(username)
  if (table && table.rows.length > 0 && table.rows[0].username === username) {
    store.dispatch(setGhostQuestData(table.rows[0]))
  } else {
    store.dispatch(setGhostQuestData({
      game_data: null,
      username: null
    }))
  }
}

export const GQ_ACTION_GET_TABLE = async (username) => {
  console.log('executing action: ***( get user table data )*** user: ', username)
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.GQContractName,
    scope: Eos.GQContractName,
    table: 'users',
    limit: 1,
    lower_bound: username,
  });
  
  return table
}

export const GQ_ACTION_GET_ALL_USERS_TABLE = async () => {
  console.log('executing action: ***( get all table data )***')
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.GQContractName,
    scope: Eos.GQContractName,
    table: 'users',
  });

  return table
}

export const GQ_ACTION_INITIALIZE_GAME = ({ username }) => {
  return takeAction('initialize', { username });
}

export const GQ_ACTION_BATTLE = ({ username1, ghost1_key, username2, ghost2_key }) => {
  return takeAction('battle', { username1, ghost1_key, username2, ghost2_key });
}

export const GQ_ACTION_WITHDRAW_GAME = ({ username, key }) => {
  return takeAction('withdraw', { username, key })
}

export const GQ_ACTION_SETTLED_PAY = ({ username, prize, memo }) => {
  return takeAction('settledpay', { username, prize, memo });
}

export const GQ_ACTION_GEN_CHAR = ({ username, quantity, limit }) => {
  return takeAction('genchar', { username, quantity, limit });
}

export const GQ_ACTION_ELIMINATE = ({ username, key }) => {
  return takeAction('eliminate', { username, key });
}

export const GQ_ACTION_END = ({ username }) => {
  return takeAction('end', { username });
}

export const getTicketBalance = async (username) => {
  const table = await Eos.rpc.get_table_rows({
    json: true,
    code: Eos.GQContractName,
    scope: Eos.GQContractName,
    table: 'ticket',
    lower_bound: username,
    limit: 1
  });

  return table
}
