// @flow

import { combineReducers } from 'redux'
import type { Action } from '../../../ReduxTypes.js'

// ACTIONS
import { ACCOUNT_INIT_COMPLETE } from '../../../../constants/indexConstants.js'

export type SpendingLimits = {
  transaction: {
    isEnabled: boolean,
    amount: number
  }
}

export const PREFIX = 'SPENDING_LIMITS/'
export const NEW_SPENDING_LIMITS = PREFIX + 'NEW_SPENDING_LIMITS'
export const newSpendingLimits = (spendingLimits: SpendingLimits) => ({
  type: NEW_SPENDING_LIMITS,
  data: { spendingLimits }
})

// REDUCERS
export const initialState = {
  transaction: {
    isEnabled: false,
    amount: 0
  }
}

export const isEnabled = (state: boolean = true, action: Action) => {
  if (!action.data) return state
  switch (action.type) {
    case ACCOUNT_INIT_COMPLETE:
    case NEW_SPENDING_LIMITS: {
      return action.data.spendingLimits.transaction.isEnabled || state
    }
    default:
      return state
  }
}

export const amount = (state: number = 100, action: Action) => {
  if (!action.data) return state
  switch (action.type) {
    case ACCOUNT_INIT_COMPLETE:
    case NEW_SPENDING_LIMITS: {
      return action.data.spendingLimits.transaction.amount || state
    }
    default:
      return state
  }
}

export const transaction = combineReducers({
  isEnabled,
  amount
})

export const spendingLimits = combineReducers({
  transaction
})