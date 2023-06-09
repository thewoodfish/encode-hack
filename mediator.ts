import { BN, BN_ONE, BN_TWO } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const storageDepositLimit: BN = new BN(1000);

export async function getElection(contract: any, api: any, alice: any, hash: string): Promise<any> {
  const { result, output } = await contract.query.fetchCandidates(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    hash
  );

  return result.toHuman();
}

export async function getBound(contract: any, api: any, alice: any, hash: string): Promise<any> {
  const { result, output } = await contract.query.fetchTime(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    hash
  );

  return result.toHuman();
}


export async function getVotes(contract: any, api: any, alice: any, hash: string): Promise<any> {
  const { result, output } = await contract.query.getVotes(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    hash
  );

  return result.toHuman();
}

export async function isBvnUnique(contract: any, api: any, alice: any, hash: string, bvn: string): Promise<any> {
  const { result, output } = await contract.query.bvnIsunique(
    alice.address,
    {
      gasLimit: api?.registry.createType('WeightV2', {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    },
    hash, bvn
  );

  return result.toHuman();
}

export async function initElection(api: any, contract: any, account: any, hash: string, names: string, parties: string, bl_hashes: string, hours: any, title: string) {
  // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
  const gasLimit = api.registry.createType(
    'WeightV2',
    api.consts.system.blockWeights['maxBlock']
  )

  // Query the contract message
  // This will return the gas required and storageDeposit to execute the message
  // and the result of the message
  const { gasRequired, storageDeposit, result } = await contract.query.commence(
    account.address,
    {
      gasLimit: gasLimit,
      storageDepositLimit: null,
      value: new BN('1000000000000000000')
    }, hash, names, parties, bl_hashes, hours, title
  )

  // Check for errors
  if (result.isErr) {
    let error = ''
    if (result.asErr.isModule) {
      const dispatchError = api.registry.findMetaError(result.asErr.asModule)
      error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
    } else {
      error = result.asErr.toString()
    }

    console.error(error)
    return
  }

  // Even if the result is Ok, it could be a revert in the contract execution
  if (result.isOk) {
    const flags = result.asOk.flags.toHuman()
    // Check if the result is a revert via flags
    if (flags.includes('Revert')) {
      const type = contract.abi.messages[5].returnType // here 5 is the index of the message in the ABI
      const typeName = type?.lookupName || type?.type || ''
      const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()

      console.error(error ? (error as any).Err : 'Revert')
      return
    }
  }

  // Gas require is more than gas returned in the query
  // To be safe, we double the gasLimit.
  // Note, doubling gasLimit will not cause spending more gas for the Tx
  const estimatedGas = api.registry.createType(
    'WeightV2',
    {
      refTime: gasRequired.refTime.toBn().mul(BN_TWO),
      proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
    }
  ) as WeightV2

  const unsub = await contract.tx
    .commence({
      gasLimit: estimatedGas,
      storageDepositLimit: null,
      value: new BN('10000000') // 1 TOKEN or it could be value you want to send to the contract in title
    }, hash, names, parties, bl_hashes, hours, title)
    .signAndSend(account, (res: any) => {
      // Send the transaction, like elsewhere this is a normal extrinsic
      // with the same rules as applied in the API (As with the read example,
      // additional params, if required can follow)
      if (res.status.isInBlock) {
        console.log('in a block')
      }
      if (res.status.isFinalized) {
        console.log('Successfully sent the txn')
        unsub()
      }
    })
}

export async function castVote(api: any, contract: any, account: any, ehash: string, uniq_hash: string, bvn: string) {
  // Get the initial gas WeightV2 using api.consts.system.blockWeights['maxBlock']
  const gasLimit = api.registry.createType(
    'WeightV2',
    api.consts.system.blockWeights['maxBlock']
  )

  // Query the contract message
  // This will return the gas required and storageDeposit to execute the message
  // and the result of the message
  const { gasRequired, storageDeposit, result } = await contract.query.castVote(
    account.address,
    {
      gasLimit: gasLimit,
      storageDepositLimit: null,
      value: new BN('1000000000000000000')
    }, ehash, uniq_hash, bvn
  )

  // Check for errors
  if (result.isErr) {
    let error = ''
    if (result.asErr.isModule) {
      const dispatchError = api.registry.findMetaError(result.asErr.asModule)
      error = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
    } else {
      error = result.asErr.toString()
    }

    console.error(error)
    return
  }

  // Even if the result is Ok, it could be a revert in the contract execution
  if (result.isOk) {
    const flags = result.asOk.flags.toHuman()
    // Check if the result is a revert via flags
    if (flags.includes('Revert')) {
      const type = contract.abi.messages[5].returnType // here 5 is the index of the message in the ABI
      const typeName = type?.lookupName || type?.type || ''
      const error = contract.abi.registry.createTypeUnsafe(typeName, [result.asOk.data]).toHuman()

      console.error(error ? (error as any).Err : 'Revert')
      return
    }
  }

  // Gas require is more than gas returned in the query
  // To be safe, we double the gasLimit.
  // Note, doubling gasLimit will not cause spending more gas for the Tx
  const estimatedGas = api.registry.createType(
    'WeightV2',
    {
      refTime: gasRequired.refTime.toBn().mul(BN_TWO),
      proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
    }
  ) as WeightV2

  const unsub = await contract.tx
    .castVote({
      gasLimit: estimatedGas,
      storageDepositLimit: null,
      value: new BN('10000000') // 1 TOKEN or it could be value you want to send to the contract in title
    }, ehash, uniq_hash, bvn)
    .signAndSend(account, (res: any) => {
      // Send the transaction, like elsewhere this is a normal extrinsic
      // with the same rules as applied in the API (As with the read example,
      // additional params, if required can follow)
      if (res.status.isInBlock) {
        console.log('in a block')
      }
      if (res.status.isFinalized) {
        console.log('Successfully sent the txn')
        unsub()
      }
    })
}