# Vue IPFS Gateway Helpers

## A Vue helper for fetch and display IPFS content using public gateways.

This component will help to fetch media from IPFS without needing to set or configure any gateway. It grabs the data directly from the fastest responding Gateways. In case it failed to fetch data from the gateways multiple time, this source will be removed from the list.

[x] Grab multiple gateways from public-gateways repository. [Repo](https://github.com/ipfs/public-gateway-checker/blob/master/src/gateways.json)
[x] Test what is the response time for each Gateway
[x] Create a function to fetch JSON/Metadata documents 
[x] Create a component for fetch images using a loading placeholder
[x] Detects when URL is only a CID
[x] Detects when URL is a CID and a Subpath
[ ] Grabs the CID and the Subpath from a full link
[ ] Documentation
[ ] Installation Instruction
[ ] How to use Instructions