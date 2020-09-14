import { PayloadAction } from '@reduxjs/toolkit';
// Importing from `utils` makes them more type-safe ✅
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  username: '',
  password: '',
};

const homepageSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLoginInfo(
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) {
      // Here we say lets change the username in my homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

/*
 * `reducer` will be used to add this slice to our Redux Store
 * `actions` will be used to trigger change in the state from where ever you want
 * `name` will be used to add this slice to our Redux Store
 */
export const { actions, reducer, name: sliceKey } = homepageSlice;
