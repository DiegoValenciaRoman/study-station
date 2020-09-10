import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Footer() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>Footer container</span>
    </>
  );
}
