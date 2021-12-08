import { WebSocketProvider } from '@ethersproject/providers';
const wsUrl = process.env.VUE_APP_WS_URL;
const wsProvider = new WebSocketProvider(wsUrl);
export default wsProvider;
