import React from 'react';
import {AppProvider} from './Provider/AppConfig';
import {UIProvider} from './Provider/UIProvider';
import {Navigation} from './Navigation/Navigation';

export const App = () => {
  return (
    <AppProvider>
      <UIProvider>
        <Navigation />
      </UIProvider>
    </AppProvider>
  );
};
