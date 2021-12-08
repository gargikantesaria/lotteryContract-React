import web3 from './web3';

const address = '';// You can enter your own deployed contract address

const abi = [
    {
      constant: true,
      inputs: [],
      name: 'manager',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'getWinner',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x8e7ea5b2'
    },
    {
      constant: false,
      inputs: [],
      name: 'getPlayersAddress',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
      signature: '0xdc49c39c'
    },
    {
      constant: true,
      inputs: [],
      name: 'getAllPlayers',
      outputs: [{ name: '', type: 'address[]' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xefa1c482'
    },
    {
      constant: true,
      inputs: [{ name: '', type: 'uint256' }],
      name: 'players',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xf71d96cb'
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      signature: 'constructor'
    }
  ];

export default new web3.eth.Contract(abi, address);