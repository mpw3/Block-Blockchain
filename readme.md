# Simple Block Blockchain

My goal with this project was to get a better knowledge about how a blockchain works. It's built using Node.js
<br /><br />
<img width="775" alt="image" src="https://user-images.githubusercontent.com/48786837/54867361-9d7e5b80-4d7f-11e9-841b-e4169607fe0e.png">
<br /><br />
#### Requirements (npm packages):
- sha256 = hash the blocks <br />
- express = setup local server <br />
- socketIO = push data to client
<br /><br />
#### Some explanation about the blocks:
- each block will contain 4 pieces of data
    - the block’s index
    - the time it was created
    - the hash value of the block preceding it
    - the hash of itself
- first block is known as the Genesis Block which is created by an extra function because it has no previous hash
- after the Genesis Block was created it uses the nextBlock() function to create the following blocks
    - for that it only takes the last block's data and the data from the new block as parameters
- blocks are connected by the cryptographic hash of its previous block
- each block’s prevHash value matches the thisHash value of the block preceding it, so the blocks are referencing its previous block by using a cryptographic hash
    - this links all the blocks together in something similar to a linked-list
<br /><br />
## How to use

First you have to clone this repository.

> git clone https://github.com/mpw3/Block-Blockchain <br />

Navigate to the directory.

> npm install <br />
> node server.js

Then the server should be startet and is reachable using: <br />
> http://localhost:3000
