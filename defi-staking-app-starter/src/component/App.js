import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import Reward from '../truffle_abis/Reward.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main';
import ParticleSettings from './ParticleSettings';

class App extends Component {
    async UNSAFE_componentWillMount() { // runs when app mounts in browser
        await this.loadWeb3(); // run the loadWeb3 function + connect to metamask
        await this.loadBlockchainData(); // load blockchain data 
    }

    // load in web3 and connect metamask when the app loads 
    async loadWeb3() {
        if(window.ethereuem) { // if the browser window detects Ethereum
            window.Web3 = new Web3(window.ethereum);
            await window.ethereuem.enable();
        } else if (window.web3) { // or if we detect web3 in the browser
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No ethereum browser detected! You can check out MetaMask!');
        }
    }

    // load in blockchain data 
    async loadBlockchainData() {
        const web3 = await window.web3;
        const account = await web3.eth.requestAccounts(); // get the account from our blockchain data
        this.setState({account: account[0]});
        const networkId = await web3.eth.net.getId(); // set up network ID that we can connect to Tether contract
        
        // load in blockchain data 
        const tetherData = Tether.networks[networkId];
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi,tetherData.address);
            this.setState({tether});
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
            this.setState({tetherBalance: tetherBalance.toString() });
            //console.log(tetherBalance)
        } else {
            window.alert('Error! Tether contract not deployed - no detected network!');
        }

        // load Reward token Contract
        const rewardData = Reward.networks[networkId];
        if (rewardData) {
            const reward = new web3.eth.Contract(Reward.abi, rewardData.address)  // ABI + Address 
            this.setState({ reward });
            // load Tether balance
            let rewardBalance = await reward.methods.balanceOf(this.state.account).call();
            this.setState({ rewardBalance: rewardBalance.toString() }); 
        } else { 
            alert('Error! Reward contract data not available. Consider changing to the Ganache network.')
        }

        // load Decentral Bank Contract
        const decentralBankData = DecentralBank.networks[networkId];
        if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi,decentralBankData.address);
            this.setState({decentralBank});
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
            this.setState({stakingBalance: stakingBalance.toString() });
        } else {
            window.alert('Error! Tether contract not deployed - no detected network!');
        }

        this.setState({loading: false});
    }

    // staking function 
    stakeTokens = (amount) => {
        //let ethAmount = Web3.utils.fromWei(amount, 'ether');
        this.setState({loading: true});
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            // grab decentralBank and then grab depositTokens()....send from the state of Account....
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loading: false});
            })
        })
    }

    unstakeTokens = () => {
        this.setState({loading: true })
        this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
          this.setState({loading:false})
        }) 
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rewardBalance: '0',
            stakingBalance: '0',
            loading: true
        };
    }

    render() { 
        let content;
        {this.state.loading ? 
            content = <p id="loader" className="text-center" style={{margin: '30px'}}>
                <strong style={{ fontSize: '18px', color: 'white'}}>LOADING PLASE...</strong>
            </p> 
            :content = <Main 
                tetherBalance = {this.state.tetherBalance}
                rewardBalance = {this.state.rewardBalance}
                stakingBalance = {this.state.stakingBalance}
                stakeTokens = {this.stakeTokens}
                unstakeTokens={this.unstakeTokens}
                decentralBank={this.state.decentralBank}
                account={this.state.account}
            />}

        return (
            <div className="App" style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}>
                    <ParticleSettings />
                </div>

                <Navbar account = {this.state.account}/>
                <div className = 'container-fluid mt-5'>
                    <div className = 'row'>
                        <main role = 'main' className = 'col-lg-12 ml-auto mr-auto' style = {{maxWidth: '600px', minHeight: '100vm'}}>
                            <div>
                            {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default App;