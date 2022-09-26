# Vue IPFS Components
![vue-ipfs-components-logo](https://bafybeih2qkxommebznq6zavgqltidbmszz5j6tssoq75coj2yjg554mldm.ipfs.w3s.link/ipfs.png)

### Some Vue components for help fetch and display IPFS content using public gateways.

This component will help to fetch media from IPFS without needing to set or configure any gateway, no need for pass correct CID as parameter. It grabs the data directly from the fastest responding Gateways. In case it failed to fetch data from the gateways multiple time, this source will be removed from the list and another one will take it's place. 

The service to fetch Images and JSON(Metadata) files work decoupling the URL/CID/Path passed ad check if is a valid IPFS link. In case of succeded fetch for CID and subpaths, it uses the better gateway possible to fetch content. In case of succeded feching from one of the 3 best gateways it returns immediatelly. Otherwise it will fallback to the URL previously passed.

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
- [ ] Grabs the CID and the Subpath from a full link
- [ ] Grabs the CID and the Subpath on CidV1 domain paths
- [ ] Documentation
- [ ] Installation Instruction
- [ ] How to use Instructions