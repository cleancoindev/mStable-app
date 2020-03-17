import { BigNumber } from 'ethers/utils';
import { Connectors } from 'use-wallet';
import { asciiToHex as aToH } from 'web3-utils';

export const PERCENT_SCALE = new BigNumber(1e16.toString());
export const RATIO_SCALE = new BigNumber(1e8.toString());
export const EXP_SCALE = new BigNumber(1e18.toString());

export const KEY_META = aToH('MTA');
export const KEY_MUSD = aToH('mUSD');
export const KEY_MGLD = aToH('mGLD');

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

export const AVAILABLE_CONNECTORS = {
  // TODO support other chain IDs and check parameters
  ...(CHAIN_ID === 1
    ? {
        walletconnect: {},
        portis: { dAppId: process.env.REACT_APP_PORTIS_DAPP_ID },
        torus: {
          chainId: CHAIN_ID,
          initOptions: {
            showTorusButton: true,
          },
        },
        fortmatic: { apiKey: process.env.REACT_APP_FORMATIC_API_KEY },
        walletlink: {
          url: 'https://mstable.org',
          // TODO a better logo URL
          appLogoUrl:
            'https://pbs.twimg.com/profile_images/1226087357461487616/Iq1CHt3I_400x400.jpg',
          appName: 'mStable',
        },
        squarelink: {
          clientId: process.env.REACT_APP_SQUARELINK_CLIENT_ID,
          options: {},
        },
        authereum: {},
      }
    : null),
  injected: {},
  frame: {},
} as Connectors;
