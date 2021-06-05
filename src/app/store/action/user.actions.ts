import { createAction, props } from '@ngrx/store';
import { Users } from 'src/app/models/users.model';

export const loginUser = createAction(
  '[User] Login User',
  (users:Users) => ({users})
);

