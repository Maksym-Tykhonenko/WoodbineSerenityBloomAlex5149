import SenerityBloomStack from './bloomserenittySrc/bloomserenitynavigtr/SenerityBloomStack';
import { NavigationContainer } from '@react-navigation/native';
import { initMetaSdk } from './bloomserenittySrc/service/metaSdk';
import Toast from 'react-native-toast-message';

import { ContextProvider } from './bloomserenittySrc/bloomstorecntx/serenitybloomctxt';
import SerenityBloomLoader from './bloomserenittySrc/[bloomserenitycmpnts]/SerenityBloomLoader';
import { useEffect, useState } from 'react';

const App = () => {

  useEffect(() => {
    initMetaSdk();
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        <SenerityBloomStack />
        <Toast position="top" topOffset={53} />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
