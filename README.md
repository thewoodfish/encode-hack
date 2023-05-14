
<img src="https://github.com/thewoodfish/encode-hack/blob/main/public/img/electo.png">

Elect-"0"-Rate is a blockchain solution that solves the election manipulation problem and ENSURES ABSOLUTELY, a free and fair election.<br>
You no longer need to fear or worry that you or your candidate were cheated out of any election.<br>
It is built with <a href="https://use.ink">ink!</a> - a rust eDSL for writing smart contracts.

## How does Elect-"0"-Rate work?

- A certain authority (e.g the electoral commison) creates an election entry by submitting the candidates contesting and their various 
parties. The time-period the election spans is also specified. When the election entry is created and recorded by the smart contract, an election link is then returned to be shared to all voters.
- Voters can then use this link to search for any election of their choice.
- On location of desired election, the voter is asked to fill in her BVN(Bank Verification Number) and name. This is cross-referenced with a government database to ensure only real, accredited citizens take part in the election. Then the user can vote for her preferred candidate.
- Anyone (citizen or not) can always monitor the result of an election in real time as the election takes place. This information is also always available after the election period.
- All these interactions are recorded on the blockchain for transparency and security.

## Notable Elect-"0"-Rate Operations
- `Create Election`
<img src="https://github.com/thewoodfish/encode-hack/blob/main/public/img/electo-1.png" style="width: 700px">

- `Vote for candidate`
<img src="https://github.com/thewoodfish/encode-hack/blob/main/public/img/electo-3.png" style="width: 700px">

-  `Monitor Election`
<img src="https://github.com/thewoodfish/encode-hack/blob/main/public/img/electo-2.png" style="width: 700px">

## How to run or test Elect-"0"-Rate
- Install `npm` and `nodeJS` on your computer with `v16+`.
- Clone this(Encode Hack) repo.
- Set up the local development chain and get it running. Directions are given here -> https://github.com/thewoodfish/encode#running-a-local-node
- Run `npm install`.
- After installation of all the necessary packages, run `npm start`.
- Start interacting with Elect-"0"-Rate!

### Contract Blockchain Node
The contract running on a development node can be found here at -> https://github.com/thewoodfish/encode

## Going forward
There a few improvements that MUST be made to Elect-"0"-Rate going forward:
- Styling (😅 That obvious huh?)
- Emitting events on the contract.
- Proper decoding of contract data (phew!)
- Proper and detailed error handling.
- etc.

### Final
So all in all, in the nearest future, when you find yourself voting for your next leader through Elect-"0"-Rate or it's derivatives, just smile and say to yourself "I AM SAFE, I AM HEARD". Then go home, have a nice dinner and go to bed knowing that no magic can tamper with the election.

Thank you for your time, God bless you! ❤️
