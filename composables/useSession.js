import { ref } from 'vue';
import { BrowserLocalStorage, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet';
import WebRenderer from '@wharfkit/web-renderer';

const ui = (process.client) ? new WebRenderer() : null;
const authStorageKey = 'demo-nuxtv3_wharfkit-auth';

const sessionKit = new SessionKit({
	appName: 'demo-nuxtv3_wharfkit',
	chains: [{
		id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    url: 'https://wax.greymass.com',
	}],
	storage: new BrowserLocalStorage(authStorageKey),
	ui,
	walletPlugins: [new WalletPluginAnchor(), new WalletPluginCloudWallet()]
});

const session = ref(null);

sessionKit.restore().then((s) => {
	session.value = s;
});

export function useSessionKit() {
	return {
		login: async () => {
			const response = await sessionKit.login();
			session.value = response.session;
		},
		logout: async () => {
			await sessionKit.logout(session.value);
			session.value = null;
		},
		transact: async () => {
			if (!session.value) {
				throw new Error('cannot transact without a session');
			}
			const action = {
				account: 'eosio.token',
				name: 'transfer',
				authorization: [session.value.permissionLevel],
				data: {
					from: session.value.actor,
					to: 'teamgreymass',
					quantity: '0.00000001 WAX',
					memo: 'Yay WharfKit! Thank you <3'
				}
			};
			try {
				const trx_result = await session.value.transact({ action })
				console.log(trx_result, 'trx_result')
			}
			catch(e) {
				console.log('error caught in transact', e);
			}
		}
	}
}

export function useSession() {
	return session.value
}