import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '../Login/slice';
export function Perfil() {
  const selectDomain = (state: RootState) => state.login || initialState;
  const selectUsername = createSelector([selectDomain], user => user.username);
  const username = useSelector(selectUsername);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>Perfil container nombre usuario {username}</span>
    </>
  );
}
