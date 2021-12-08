import './App.css';
import web3 from './web3';
import { Component } from 'react';
import lottery from './lottery';
class App extends Component {
  
  state = { manager: '', players: [], playersWinMoney: '', playerEthervalue: '', message: '' };
  
  // call the contract methods inside the componentDidMount method
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players =  await lottery.methods.getAllPlayers().call();
    const playersWinMoney = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, playersWinMoney });
  }

  formSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    //Msg to display users while processing
    this.setState({ message: "Waiting for the transaction to complete..."});

    // Send the ethers to transaction, initiate the transaction
    await lottery.methods.getPlayersAddress().send({ from: accounts[0], value: web3.utils.toWei(this.state.playerEthervalue, 'ether') });

    // Once the transaction finished
    this.setState({ message: "Woo!!! You're in."});
  }

  // To choose winner
  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    //Msg to display users while processing
    this.setState({ message: "Waiting for the pick winner process to complete..."});

    // Send the ethers to transaction, initiate the transaction
    await lottery.methods.getWinner().send({ from: accounts[0] });

    // Once the transaction finished
    this.setState({ message: "Hey!!! Winner picked up."});
  }

  render(){
    console.log(web3.version);
    web3.eth.requestAccounts().then(acc => console.log(acc));
    // web3.eth.getAccounts().then(acc => console.log(acc));
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by manager: { this.state.manager }</p>
        <p> Currently { this.state.players.length } here to win the lottery with { web3.utils.fromWei(this.state.playersWinMoney, 'ether') } ether!!</p>
        <hr />
        {/* Take ethers and let enter player */}
        <form onSubmit={this.formSubmit}>
          <h2>Do you want to try your luck in lottery?</h2>
          <div>
            Enter the ether:
            <input type="text" value={this.state.playerEthervalue}
              onChange={event => this.setState({playerEthervalue: event.target.value})}>
            </input>
            <button type="submit">Enter</button>
          </div>
        </form>

        <hr />

        <p>Want to pick winner?</p>
        <button type="button" onClick={this.pickWinner}>Pick Winner</button>
        
        <hr />
        <p className="text-warning">{ this.state.message }</p>
      </div>
    );
  }
}

export default App;
