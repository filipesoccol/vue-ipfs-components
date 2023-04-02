import IPFSMedia from "../components/ipfs-media.vue";
import IPFSAvatar from "../components/ipfs-avatar.vue";
import IPFSImage from "../components/ipfs-image.vue";
import IPFSVideo from "../components/ipfs-video.vue";
import {Initialize, FetchContent, FetchJSON} from "ipfs-public-fetcher";

/**
 * Creates the IPFS Gateway Plugin instance
 */
const IPFSGatewayPlugin = {
  install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("ipfs-media", IPFSMedia);
  Vue.component("ipfs-avatar", IPFSAvatar);
  Vue.component("ipfs-image", IPFSImage);
  Vue.component("ipfs-video", IPFSVideo);

  Initialize(options)

  Vue.provide('fetchJSON', FetchJSON)
  Vue.provide('fetchContent', FetchContent)
 }
};

export default IPFSGatewayPlugin;