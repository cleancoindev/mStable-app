import React, { FC } from 'react';

import { ApolloProvider } from './ApolloProvider';
import { ContractsProvider } from './ContractsProvider';
import { KnownAddressProvider } from './KnownAddressProvider';
import { TokensProvider } from './TokensProvider';
import { DataProvider } from './DataProvider';
import { BlockProvider } from './BlockProvider';

export const AllDataProviders: FC<{}> = ({ children }) => (
  <ApolloProvider>
    <KnownAddressProvider>
      <ContractsProvider>
        <TokensProvider>
          <BlockProvider>
            <DataProvider>{children}</DataProvider>
          </BlockProvider>
        </TokensProvider>
      </ContractsProvider>
    </KnownAddressProvider>
  </ApolloProvider>
);
