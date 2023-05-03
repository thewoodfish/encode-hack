import { BN, BN_ONE } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'

// import the metadata
import * as meta from "./metadata.js";

// blockchain essentials
import { ApiPromise, WsProvider } from '@polkadot/api';
import { mnemonicGenerate, cryptoWaitReady, blake2AsHex, xxhashAsHex } from '@polkadot/util-crypto';
import { ContractPromise } from '@polkadot/api-contract';
import { Keyring } from '@polkadot/keyring';
import { u64 } from "@polkadot/types-codec";

// initializations
const contract_addr = "5EF8GfJmLaDb3aUzpqzYyL7uQWzxdQyKjiB3BBqnXjqUeSzq";
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });
const contract = new ContractPromise(api, meta.metadata(), contract_addr);
const keyring = new Keyring({ type: 'sr25519' });
let alice: any = undefined;

// wait 5 secs for the wasm init
setTimeout(async () => {
  await cryptoWaitReady().then(() => {
    alice = keyring.addFromUri('//Alice');    // for running tests
  });
}, 5000);

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const storageDepositLimit: BN = new BN(1000);

// send message onchain
const value = 10000;
const gasLimit = 3000n * 1000000n;

export async function getElection(): Promise<any> {
  const { result, output } = await contract.query.get(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    }
  );

  return result.toHuman();
}

export async function createElection(hash: string, names: string, parties: string, ipfs_str: string, hours: number): Promise<void> {
  if (!alice) {
    throw new Error('Alice keypair is not initialized');
  }

  await contract.tx
    .commence({
      storageDepositLimit, gasLimit: api.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2
    }, hash, names, parties, ipfs_str, hours)
    .signAndSend(alice, (result) => {
      if (result.status.isInBlock) {
        console.log('in a block');
      } else if (result.status.isFinalized) {
        console.log('finalized');
      }
    });

  return;
}