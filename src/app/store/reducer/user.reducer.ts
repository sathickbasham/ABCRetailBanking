import { Action, createReducer, on } from '@ngrx/store';
import { Users } from 'src/app/models/users.model';
import * as UserActions from '../action/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
users:Users[];
}

export const initialState: UserState = {
  users:[]
};


export const userReducer = createReducer(
  initialState,
  on(UserActions.loginUser, (state:UserState, {users}) => (
    {...state, users:[...state.users, users]}))
);

export function reducer(state: UserState | undefined, action: Action): any {
  
  state?.users.slice(1);
    return userReducer(state, action);
  }