import IPFSImage from "../components/ipfs-image.vue";
import * as isIPFS from 'is-ipfs';

const IPFSGatewayPlugin = {
 install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("ipfs-img", IPFSImage);

  // {path: 'https://asdasdasd', response: 22}

  let gatewaysFetched = []
  // True when sucessfully connected with at least two gateways
  let ipfsAttached = false

  fetch('https://raw.githubusercontent.com/ipfs/public-gateway-checker/master/src/gateways.json')
  .then( r => r.json())
  .then( json => {
    json.forEach( gatewayPath => {
      const dateBefore = Date.now()
      fetch(gatewayPath.replace(':hash', 'bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m'))
      .then( (response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.text();
        } else {
          throw Error(response.statusText);
        }
      })
      .then( () => {
        gatewaysFetched = gatewaysFetched.concat({path: gatewayPath, errors:0, response:Date.now() - dateBefore}).sort((a,b) => a.response - b.response)
        console.log(gatewaysFetched)
      })
      .catch( () => {})
    })
  })

  const digestPath = (url) => {
    let path = ''
    try {
      // Try to geth only the pathname for the URL
      path = new URL(url).pathname;
    } catch { 
      // Not a full URL
      path = url
    }

    // https://github.com/ipfs-shipyard/is-ipfs
    // In case of a path starting with /ipfs/Qm.... remove the /ipfs
    if (isIPFS.ipfsPath(path)) return path.substring(6)
    // In case of a path containing only the cid+subpath
    if (isIPFS.cidPath(path)) return path
    // In case of none of the above, fail.
    throw new Error('Not a valid IPFS URL')
  }

  const fetchJSON = async (path) => {
    let digested = ''
    try { digested = digestPath(path) }
    catch {
      // In case of fail to digest use same path to fetch
      return new Promise( (resolve) => {
        fetch(path)
        .then( (r) => r.json())
        .then( doc => resolve(doc))
      })
    }

    return await Promise.race(
      gatewaysFetched.slice(0,3).map( (g) => {
        return new Promise( (resolve,reject) => {
          fetch(g.path.replace(':hash', digested))
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

    return await Promise.race(
      gatewaysFetched.slice(0,3).map( (g) => {
        return new Promise( (resolve,reject) => {
          fetch(g.path.replace(':hash', digested))
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

  Vue.provide('fetchJSON', fetchJSON)
  Vue.provide('fetchImage', fetchImage)
 }
};

export default IPFSGatewayPlugin;