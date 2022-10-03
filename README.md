# Vue IPFS Components
![vue-ipfs-components-logo](https://bafybeih2qkxommebznq6zavgqltidbmszz5j6tssoq75coj2yjg554mldm.ipfs.w3s.link/ipfs.png)

### Load any IPFS content from the fastest gateway available just passing a valid path.

The plugin itself verify for you the fastest suitable gateways from the Public Gateways list provided by Protocol Labs.

Once you have successfully connected to at least 3 of them, the content will show up automatically.

This component will help to fetch media from IPFS without needing to set or configure any gateway, no need for pass correct CID as parameter. It grabs the data directly from the fastest responding Gateways. In case it failed to fetch data from the gateways multiple time, this source will be removed from the list and another one will take it's place. 

The service to fetch Images and JSON(Metadata) files work decoupling the URL/CID/Path passed ad check if is a valid IPFS link. In case of succeded fetch for CID and subpaths, it uses the better gateway possible to fetch content. In case of succeded feching from one of the best gateways it returns immediatelly. Otherwise it will fallback to the URL previously passed.

Sources for media supported includes:

Single CIDv0 or CIDv1: QmPbxeGcXhYQ...LnGKnF8pVFmGsvqi
CIDv0 or CIDv1 with subpath: bafybeibj6paz...hov73vacgiqowpsxwrry4fnxq/1.png
IPFS protocol path: ipfs://QmTDxnzcvj2p3...An2yzCQnZZ9LmFjReuH9/
Gateway path (will be replaced by most suitable): https://ipfs.io/ipfs/bafybeibj6pazf....iqowpsxwrry4fnxq/1.png
CIDv1 subdomain and Gateway(will also be replaced): https://bafybeiaewpy...57pr5z3kyag62kfuc7a.ipfs.dweb.link/2.png
You can even pass normal URLs withou any reference to IPFS, they will not be changed and will fetch correct path.

You could use full IPFS URLs or only CIDs:
```
<ipfs-img src="https://ipfs.io/ipfs/bafybeibaq3546276fsv6qh3ymo57yva6dygsmeukzo2xy5tlkfywl7khdy/derp.png"/>
<ipfs-img src="bafybeibaq3546276fsv6qh3ymo57yva6dygsmeukzo2xy5tlkfywl7khdy/derp.png"/>
```

### ROADMAP:

- [x] Grab multiple gateways from public-gateways repository. [Repo](https://github.com/ipfs/public-gateway-checker/blob/master/src/gateways.json)
- [x] Test what is the response time for each Gateway
- [x] Create a function to fetch JSON/Metadata documents 
- [x] Create a component for fetch images using a loading placeholder
- [x] Detects when URL is only a CID
- [x] Detects when URL is a CID and a Subpath
- [x] Grab the CID and Subpath from IPFS protocol links
- [x] Grabs the CID and the Subpath from a full link
- [x] Grabs the CID and the Subpath on CidV1 domain paths
- [ ] Use a Service Worker for fetch gateways list
- [ ] Documentation
- [ ] Installation Instruction
- [ ] How to use Instructions