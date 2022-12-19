import IPFSMedia from "../components/ipfs-media.vue";
import IPFSAvatar from "../components/ipfs-avatar.vue";
import IPFSSquared from "../components/ipfs-squared.vue";
import IPFSFetcher from "ipfs-public-fetcher";

/**
 * Creates the IPFS Gateway Plugin instance
 */
const IPFSGatewayPlugin = {
  install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("ipfs-media", IPFSMedia);
  Vue.component("ipfs-avatar", IPFSAvatar);
  Vue.component("ipfs-squared", IPFSSquared);

  IPFSFetcher.Initialize()

  Vue.provide('fetchJSON', IPFSFetcher.FetchJSON)
  Vue.provide('fetchContent', IPFSFetcher.FetchContent)
 }
};

export default IPFSGatewayPlugin;