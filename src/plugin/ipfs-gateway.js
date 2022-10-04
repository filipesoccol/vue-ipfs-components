import IPFSMedia from "../components/ipfs-media.vue";
import IPFSAvatar from "../components/ipfs-avatar.vue";
import IPFSSquared from "../components/ipfs-squared.vue";
import * as isIPFS from 'is-ipfs';
import domains from './domains.js'

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

  let gatewaysFetched = []
  // True when sucessfully connected with at least two gateways
  let ipfsConnected = false
  console.log('-- IPFS Starting connection process --')
  // fetch(domains)
  // .then( r => r.json())
  // .then( json => {
  domains.forEach( gatewayPath => {
    const dateBefore = Date.now()
    Promise.race([
      fetch(gatewayPath.replace(':hash', 'bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m'), {timeout:500, mode:'cors'}),
      new Promise( (resolve, reject) => { setTimeout(reject, 500) })
    ]).then( (response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.text();
      } else {
        throw Error(response.statusText);
      }
    })
    .then( () => {
      gatewaysFetched = gatewaysFetched.concat({path: gatewayPath, errors:0, response:Date.now() - dateBefore})
      .sort((a,b) => a.response - b.response)

      if (gatewaysFetched.length > 3 && !ipfsConnected) {
        console.log('-- IPFS Connected to enough gateways --')
        ipfsConnected = true
      }
    })
    .catch( () => {})
  })
  // })

  const digestPath = (url) => {
    let path = ''
    try {
      // Try to geth only the pathname for the URL
      const urlObject = new URL(url);

      // If is a IPFS protocol address
      // ipfs://QmXNwZhBAG9Pw9nBAHGrKMe56U6Vz9K7SxX4Tbcksp6Fsn/121.gif
      if (urlObject.protocol == 'ipfs:') {
        path = url.substring(7)
      // If it is a base32 subdomain path
      // https://bafybeiegj5togigbqpycmqqcdnoiutvrxg377xxdjkmcdzkd74eqobetwe.ipfs.w3s.link/121.gif
      } else if (isIPFS.base32cid(urlObject.host.split('.')[0])) {
        path = urlObject.host.split('.')[0] + urlObject.pathname
      } else {
        // Or in case of a simple gateway, remove the gateway part.
        path = urlObject.pathname
      }
    } catch { 
      // Not a full URL
      path = url
    }
    
    // https://github.com/ipfs-shipyard/is-ipfs
    // In case of a path starting with /ipfs/Qm.... remove the /ipfs
    if (isIPFS.ipfsPath(path)) return path.substring(6)
    // In case of a path containing only the cid+subpath
    if (isIPFS.cidPath(path)) return path
    // In case of cid
    if (isIPFS.cid(path)) return path
    // In case of none of the above, fail.


    throw new Error('Not a valid IPFS URL')
  }

  const fetchJSON = async (path) => {
    let digested = ''
    try { digested = digestPath(path) }
    catch (err) {
      console.error(err)
      // In case of fail to digest use same path to fetch
      return new Promise( (resolve) => {
        fetch(path, {mode: 'cors'})
        .then( (r) => r.json())
        .then( doc => resolve(doc))
      })
    }
    await new Promise( resolve => { waitLoop(resolve) })
    return await Promise.race(
      gatewaysFetched.slice(0,3).map( (g) => {
        return new Promise( (resolve,reject) => {
          fetch(g.path.replace(':hash', digested), {mode: 'cors'})
          .then( (r) => r.json())
          .then( doc => resolve(doc))
          .catch( () => {
            g.errors++
            if (g.errors > 3) gatewaysFetched.splice(gatewaysFetched.indexOf(g), 1)
            reject()
          })
        })
      })
    )
  }

  const fetchImage = async (path) => {
    let digested = ''
    try { digested = digestPath(path) }
    catch {
      // In case of fail to digest use same path to fetch
      return path
    }
    await new Promise( resolve => { waitLoop(resolve) })
    return await Promise.race(
      gatewaysFetched.slice(0,3).map( (g) => {
        return new Promise( (resolve,reject) => {
          fetch(g.path.replace(':hash', digested), {mode: 'cors'})
          .then( (r) => {
            if (r.ok) resolve(g.path.replace(':hash', digested))
            throw new Error('Error fetching image')
          })
          .catch( () => {
            g.errors++
            if (g.errors > 3) gatewaysFetched.splice(gatewaysFetched.indexOf(g), 1)
            reject()
          })
        })
      })
    )
  }

  const waitLoop = (callback) => {
    if (ipfsConnected) {
      callback()
      return
    }
    setTimeout(() => {
      waitLoop(callback)
    }, 100)
  }

  Vue.provide('fetchJSON', fetchJSON)
  Vue.provide('fetchImage', fetchImage)
 }
};

export default IPFSGatewayPlugin;