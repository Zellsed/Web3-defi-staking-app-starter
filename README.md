# defi-staking-app-starter:

- Explanation: This is a blockchain project with the ERC20 standard theme. It allows the use of a specific address on Ganache connected to MetaMask and deployed on the web. When deployed, it will require entering the MetaMask password to grant access. If the password is not entered correctly, it will display a waiting screen without processing. Once successfully logged in, the account owner can deposit and withdraw funds, with the default balance initialized at 100 ETH. Depositing here means the account owner can delegate to the decentralBank as an intermediary to process the deposited amount, corresponding to an increase in the staking balance with USDT tokens. The withdrawal function allows the account owner to withdraw the entire delegated balance back to the original account. When the sender has more than 50 ETH, it will trigger a countdown timer with 20 seconds.

- Development Direction: Additional features can be added, such as when the countdown timer reaches 0, it will issue tokens or rewards for users. Correspondingly, a certain amount of Reward tokens will be added to their accounts as an encouraging gift, incentivizing their positive actions.

![{C2FA09A1-9BEE-4BDB-8879-B0E368DA88EA} png](https://github.com/Zellsed/defi-staking-app-starter/assets/155917734/7c9423a4-b35e-4cbc-bf59-88cea51093b2)

![{5C84C65C-5EF1-4A0D-B158-0F4443F8348A} png](https://github.com/Zellsed/defi-staking-app-starter/assets/155917734/ea2bdcfc-9543-4713-bcf4-f9eccd9c85a3)

![{0E3A5391-4940-421D-A5FE-66CF7AD3314C} png](https://github.com/Zellsed/defi-staking-app-starter/assets/155917734/cce40c98-d16d-4df5-9ef8-b67a020c38f1)

![{2A738C29-13F2-4819-8DFA-DBB17EFC4D04} png](https://github.com/Zellsed/defi-staking-app-starter/assets/155917734/feaea09b-6b69-40c9-88f9-d76759a9e2dc)

![{8FC69444-F8A6-4424-8D5C-7BD40F1B062C} png](https://github.com/Zellsed/defi-staking-app-starter/assets/155917734/18874e13-5988-48f4-9e10-8ef68a5a4357)

## To download me simply open up the terminal and run: 

git clone https://github.com/Zellsed/defi-staking-app-starter.git

This code has been revesed engineered from Greg DAPPuniversity.com! If you enjoyed this course go check out his work ;) 
Please feel free to clone and style this project at your own discretion!

## 1 To Clone or download this project simply run: 

git clone - https://github.com/Zellsed/defi-staking-app-starter.git

### 2. cd into the directory and Install the necessary packages

npm install

### 4. Make sure truggle -g is installed

# use truffle compiile 
(compile contracts)

# use truffle migrate --reset 
(migrate contracts on the blockchain)

# use truffle test
to run Moch and Chai testing suite

### Activate Application

Go into the App.js folder and replace the current inactive
API key with your API key.

### `npm run start`

**Note: this is a one-way operation. Once you `start`, you can’t go back!**
