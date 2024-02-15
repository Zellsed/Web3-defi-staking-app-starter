import React, { Component } from 'react';
import tether from '../tether.png';
import Airdrop from './Airdrop';

class Main extends Component {

    render () {
        return (
            <div id = 'content' className = 'mt-3'>
                <table className = 'table text-muted text-center'>
                    <thead>
                        <tr style = {{color: 'white'}}>
                            <th scope = 'col'>Staking Balance</th>
                            <th scope = 'col'>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody style = {{color: 'white'}}>
                        <tr>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} - <strong>USDT</strong></td>
                            <td>{window.web3.utils.fromWei(this.props.rewardBalance, 'Ether')} - <strong>REWARD</strong></td>
                        </tr>
                    </tbody>
                </table>
               <div className="card mb-2" style={{ opacity:'0.9' }}>
                   <form className="mb-3" onSubmit={(e) => {
                       e.preventDefault();
                       let amount = this.input.value.toString();
                       amount = window.web3.utils.toWei(amount, 'Ether')
                       this.props.stakeTokens(amount);
                   }}>
                       <div style = {{borderSpacing: '0 1em'}}>
                            <label className = 'float-left' style = {{marginLeft: '15px'}}>
                                <b>Stake Tokens</b>
                            </label>
                            <span className = 'float-right' style={{marginRight: '8px'}}>
                            <strong>Balance:</strong> {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} 
                            </span>
                            <div className = 'input-group mb-4'>
                                <input type="text" placeholder="0" required ref={(input) => {this.input = input}} />
                                <div className = 'input-group-open'>
                                    <div className = 'input-group-text'>
                                        <img src = {tether} alt = 'tether' height = '32px'/>
                                        &nbsp;&nbsp;&nbsp;USDT
                                     </div>
                                 </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">DEPOSIT</button>
                       </div>
                   </form>
                   <button 
                    type='submit'
                    onClick={(event) => {
                        event.preventDefault(
                            this.props.unstakeTokens()
                        )
                    }}
                    className = 'btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                   <div className="card-body text-center" style={{color: 'blue'}}>
                        Air Drop 
                        <Airdrop stakingBalance = {this.props.stakingBalance}
                                 decentralBank={this.props.decentralBank}
                                 account={this.props.account}/>
                   </div>
               </div>
            </div>
        )
    }
}

export default Main;