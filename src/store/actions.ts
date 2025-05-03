import { Fight } from './types';

export const ActionTypes = {
  VOTE: 'VOTE',
  RESET: 'RESET',
  ADD_FIGHT: 'ADD_FIGHT'
} as const;

export type ActionType = typeof ActionTypes[keyof typeof ActionTypes];

export interface Action {
  type: ActionType;
  payload?: any;
}

export const voteAction = (fightId: string, characterId: string): Action => ({
  type: ActionTypes.VOTE,
  payload: { fightId, characterId }
});

export const resetAction = (): Action => ({
  type: ActionTypes.RESET
});

export const addFightAction = (fight: Fight): Action => ({
  type: ActionTypes.ADD_FIGHT,
  payload: { fight }
});

export type VotePayload = {
  fightId: string;
  characterId: string;
};

export type AddFightPayload = {
  fight: Fight;
};