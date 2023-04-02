<p align="center">
  <a href="https://filipesoccol.github.io/vue-ipfs-components-demo/" title="Vue IPFS Components">
    <img src="https://bafybeih5ekofdyjj3go7h2bhbrsvfo2n3zwhmj53vrmpv4ilqtkksd6s4u.ipfs.w3s.link/logo_ipfs_vue.svg" alt="IPFS logo" width="244" />
  </a>
</p>

<h3 align="center">Vue IPFS Components</h3>

### Load any IPFS content from the fastest gateway available just passing a valid path.

The plugin itself verify for you the fastest suitable gateways from the Public Gateways list provided by Protocol Labs.

Once you have successfully connected to at least 3 of them, the content will show up automatically.

This component will help to fetch media from IPFS without needing to set or configure any gateway, no need for pass correct CID as parameter. It grabs the data directly from the fastest responding Gateways. In case it failed to fetch data from the gateways multiple time, this source will be removed from the list and another one will take it's place. 

The service to fetch Images and JSON(Metadata) files work decoupling the URL/CID/Path passed ad check if is a valid IPFS link. In case of succeded fetch for CID and subpaths, it uses the better gateway possible to fetch content. In case of succeded feching from one of the best gateways it returns immediatelly. Otherwise it will fallback to the URL previously passed.

[Live Demo](https://filipesoccol.github.io/vue-ipfs-components-demo/) / [Live Demo Repo](https://github.com/filipesoccol/vue-ipfs-components-demo)

## Sources for media supported includes:

- [x] Path with CIDv0 only: Qm...
- [x] Path with CIDv1 only: bafy...
- [x] IPFS protocol path: ipfs://...
- [x] Pre-filled IPFS gateway path: https://ipfs.io/ipfs/...
- [x] CIDv1 with subdomain path: https://bafy.../2.png
- [x] Non IPFS URLs (Will fetch url itself.)

## Installation

First install package on your project:
```
npm install -s vue-ipfs-components
```

Then use package on your Vue constructor:
```
import VueIPFS from 'vue-ipfs-components'

createApp(App).use(VueIPFS).mount('#app')
```

## Usage

We feature two different components with preload:

**ipfs-avatar**: A component that has two different properties. 

- size: The size of the image in pixels.
- radius: The border radius of the image. 
```
<ipfs-avatar size="20" radius="20" src="path or cid"/>
<ipfs-avatar size="100" radius="0" src="path or cid"/>
```

**ipfs-image**: A component that has two different properties. 

- width: The width of the image in pixels.
- height: The height of the image in pixels. 
```
<ipfs-image width="20" height="20" src="path or cid"/>
<ipfs-image width="100" height="300" src="path or cid"/>
```

**ipfs-video**: A component that renders video tag and has two different properties. 

- width: The width of the video in pixels.
- height: The height of the video in pixels. 
- controls: Show video controls to play/pause/mute/fullscreen 
- muted: Video muted by default (required for autoplay feature)
- loop: Loop video
- autoplay: Autoplay video once loaded
```
<ipfs-video width="20" height="20" src="path or cid"/>
<ipfs-video width="100" height="300" src="path or cid"/>
```

Both are extending the thid component called **ipfs-media**, if you want to customize an implementation, you can extend **ipfs-media** same way **ipfs-image**, **ipfs-avatar**  and **ipfs-video** does with the desired modifications. **ipfs-media** will deal with comunication with the component core, while you just deal with how you will display the object.

## References:

- IPFS Public Fetcher Library - [Repo](https://github.com/filipesoccol/ipfs-public-fetcher)

- Protocol-Labs public gateway list: [Website](https://ipfs.github.io/public-gateway-checker/) / [Repo](https://github.com/ipfs/public-gateway-checker/blob/master/src/gateways.json)