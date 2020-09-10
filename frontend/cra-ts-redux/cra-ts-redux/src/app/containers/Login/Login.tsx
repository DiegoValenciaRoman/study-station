import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { RootState } from 'types';
import { initialState } from './slice';
export function Login() {
  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // Inject the slice to redux
  useInjectReducer({ key: sliceKey, reducer: reducer });

  // `selectors` are used to read the state. Explained in other chapter
  // Will be inferred as `string` type ✅

  // First select the relevant part from the state
  const selectDomain = (state: RootState) => state.login || initialState;
  const selectUsername = createSelector([selectDomain], user => user.username);
  const username = useSelector(selectUsername);
  const textInputChanged = evt => {
    // Trigger the action to change the state. It accepts `string` as we declared in `slice.ts`. Fully type-safe ✅
    dispatch(
      actions.changeLoginInfo({
        username: evt.target.value,
        password: evt.target.value,
      }),
    );
  };
  return (
    <>
      <span>Login</span>
      {process.env.REACT_APP_PRUEBA}
      {username}
      <input onChange={textInputChanged} value={username}></input>
    </>
  );
}
