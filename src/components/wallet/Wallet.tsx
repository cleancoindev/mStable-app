import React, { FC, useMemo } from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';

import {
  useIsWalletConnecting,
  useResetWallet,
  useConnectWallet,
  useWalletState,
  useWalletConnector,
} from '../../context/AppProvider';
import { AVAILABLE_CONNECTORS, CONNECTORS } from '../../web3/connectors';
import { Button } from '../core/Button';
import { H3 } from '../core/Typography';
import { Address } from '../core/Address';
import { ActivitySpinner } from '../core/ActivitySpinner';
import { FlexRow } from '../core/Containers';
import { FontSize } from '../../theme';
import { PageHeader } from '../pages/PageHeader';
import { ReactComponent as AccountIcon } from '../icons/circle/account.svg';
import { Balances } from './Balances';
import { HistoricTransactions } from './HistoricTransactions';
import { Transactions } from './Transactions';
import { Connector } from '../../types';

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  color: white;

  a {
    color: white;
  }
`;

const Rows = styled.div`
  width: 100%;
`;

const Row = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  border-top: 1px ${({ theme }) => theme.color.whiteTransparent} solid;
`;

const StyledAccountIcon = styled(AccountIcon)`
  > g:first-child > circle:first-child {
    fill: white;
  }
`;

const DisconnectButton = styled(Button)`
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.red};
`;

const AddressGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Error = styled.div`
  color: ${({ theme }) => theme.color.red};
  font-weight: bold;
  margin: ${({ theme }) => theme.spacing.m} 0;
`;

const ConnectorsList = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  width: 100%;

  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-column-gap: ${({ theme }) => theme.spacing.m};
`;

const ConnectorIcon = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 96px;

  > * {
    width: 50%;
    height: auto;
  }
`;

const ConnectorLabel = styled.div``;

const ConnectorButton = styled(Button)`
  margin-bottom: 16px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: ${FontSize.s};
`;

const Connecting = styled.div`
  width: 120px;
`;

const Disconnected: FC<{}> = () => {
  const connectWallet = useConnectWallet();
  const list: Connector[] = useMemo(
    () => CONNECTORS.filter(({ id }) => !!AVAILABLE_CONNECTORS[id]),
    [],
  );

  return (
    <ConnectorsList>
      {list.map(({ id, subType, label, icon: Icon }) => (
        <ConnectorButton
          key={subType ?? id}
          type="button"
          onClick={() => connectWallet(id, subType)}
          inverted
        >
          <ConnectorIcon>{Icon ? <Icon /> : null}</ConnectorIcon>
          <ConnectorLabel>{label}</ConnectorLabel>
        </ConnectorButton>
      ))}
    </ConnectorsList>
  );
};

const Connected: FC<{ walletLabel: string; account: string }> = ({
  walletLabel,
  account,
}) => {
  const resetWallet = useResetWallet();
  return (
    <Rows>
      <Row>
        <H3>Connected with {walletLabel}</H3>
        <AddressGroup>
          <Address address={account} type="account" copyable />
          <DisconnectButton type="button" onClick={resetWallet}>
            Disconnect
          </DisconnectButton>
        </AddressGroup>
      </Row>
      <Row>
        <H3>Balances</H3>
        <Balances />
      </Row>
      <Row>
        <H3>Transactions</H3>
        <Transactions />
      </Row>
      <Row>
        <H3>Historic transactions</H3>
        <HistoricTransactions />
      </Row>
    </Rows>
  );
};

export const Wallet: FC<{}> = () => {
  const { error } = useWalletState();
  const connecting = useIsWalletConnecting();
  const { status, account } = useWallet();
  const connected = status === 'connected';
  const wallet = useWalletConnector();

  return (
    <Container>
      <div>
        <PageHeader
          icon={<StyledAccountIcon />}
          title="Account"
          subtitle={
            connected
              ? `Connected`
              : connecting && wallet
              ? `Connecting to ${wallet.label} wallet`
              : 'Connect wallet'
          }
        />
        {error ? <Error>{error}</Error> : null}
        <FlexRow>
          {/* FIXME problem when first connecting; updates on unmounted components */}
          {connected && account && wallet ? (
            <Connected walletLabel={wallet.label} account={account} />
          ) : connecting ? (
            <Connecting>
              <ActivitySpinner pending />
            </Connecting>
          ) : (
            <Disconnected />
          )}
        </FlexRow>
      </div>
    </Container>
  );
};
