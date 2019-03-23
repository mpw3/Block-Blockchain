var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const sha256 = require('sha256');

app.use("/", express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('blockchain', function(){
    const lengthToCreate = 21;
    createBlockchain(lengthToCreate);
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

class Block {
  constructor(index, timestamp, data, prevHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.thisHash = sha256(
      this.index + this.timestamp + this.data + this.prevHash
    );
    io.emit('displayBlockchain',
     '<span class="data">Block ' + this.index
      + '</span><br />' + '<b>Created at:</b> '
       + this.timestamp + '<br />' + '<b>Prev Hash:</b> '
        + this.prevHash + '<br />' + '<b>This Hash:</b> '
         + this.thisHash);
  }
}

const createGenesisBlock = () => new Block(0, Date.now(), 'Genesis Block', '0');

const nextBlock = (lastBlock, data) =>
  new Block(lastBlock.index + 1, Date.now(), data, lastBlock.thisHash);

const createBlockchain = num => {
  const blockchain = [createGenesisBlock()];
  let previousBlock = blockchain[0];

  for (let j = 1; j < num; j += 1) {
    const blockToAdd = nextBlock(previousBlock, `Block #${j}`);
    blockchain.push(blockToAdd);
    previousBlock = blockToAdd;
  }
};

