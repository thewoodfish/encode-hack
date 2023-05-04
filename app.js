import { createRequire } from "module";
const require = createRequire(import.meta.url);
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// blockchain essentials
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { mnemonicGenerate, cryptoWaitReady, blake2AsHex, xxhashAsHex } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';


// initializations
const contract_addr = "5C9WkoQHTPFwTaqcbXpZdkceSGzzS5tt1KveHUJ9gPmU1SrN";
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });
const contract = new ContractPromise(api, meta.metadata(), contract_addr);
const keyring = new Keyring({ type: 'sr25519' });
let alice = undefined;

// wait 5 secs for the wasm init
setTimeout(async () => {
    await cryptoWaitReady().then(() => {
        alice = keyring.addFromUri('//Alice');    // for running tests
    });
}, 5000);

// import the metadata
import * as meta from "./metadata.js";

// imports
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const fs = require('fs');

// import from our all-important TS file
const mediator = await import('./mediator.cjs');

// IPFS
import * as IPFS from "ipfs-core";
// import toBuffer from 'it-to-buffer';

const ipfs = await IPFS.create();

// static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// formidable form handler
const formidable = require('formidable');
const uploadFolder = path.join(__dirname, "public/files/");

formidable.multiples = true;
formidable.maxFileSize = 50 * 1024 * 1024; // 5MB
formidable.uploadDir = uploadFolder;

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (_, res) => {
    res.render('index');
});

app.post('/load-election', (req, res) => {
    loadElection(req.body, res);
});

app.post('/create-election', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.error(err.message);
            return;
        }
        let total_uri = [];
        for (const j in files) {
            let f = files[j];
            let num = Math.random() * 100;
            let parties = `images-${num}`;

            var oldpath = f.filepath;
            var newpath = uploadFolder + parties + ".png";
            total_uri.push(newpath);
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
        };

        initElection(fields.names, fields.parties, fields.hours, total_uri, res);
    });
});

async function loadElection(req, res) {
    // extract election hash
    let hash = req.link.split("-")[3];
    if (hash) {
        let result = await mediator.getElection(contract, api, alice, hash);
        console.log(result);
    }
}

async function initElection(names, parties, hours, total_uri, res) {
    let ipfs_str = "";
    // we have to upload the files to IPFS
    for (var i = 0; i < total_uri.length; i++) {
        const cid = await uploadToIPFS(total_uri[i]);
        ipfs_str += `${cid},`;
    }
    ipfs_str = ipfs_str.substring(0, ipfs_str.length - 1);

    // send message onchain
    const value = 10000;
    const gasLimit = 3000n * 1000000n;
    const storageDepositLimit = null;

    // the hash of the election is the blake2 hash of all the candidates + nonce
    let hash = blake2AsHex(`${names}${Math.random() * 100000}`);

    // Send the transaction, like elsewhere this is a normal extrinsic
    await contract.tx
        .commence({ storageDepositLimit, gasLimit }, hash, names, parties, ipfs_str, getFutureUnixTime(hours))
        .signAndSend(alice, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        }).then(() => res.status(200).send({ data: `#elect-0-rate-${hash}` }));
}

async function uploadToIPFS(path) {
    const { cid } = await ipfs.add(path);
    console.info(cid);
    if (cid)
        console.log(cid.toV0().toString());
    else
        throw new Error('IPFS add failed, please try again.');
    return cid;
}

function getFutureUnixTime(hours) {
    const millisecondsInHour = 3600000;
    const futureTime = Date.now() + (hours * millisecondsInHour);
    const futureUnixTime = Math.floor(futureTime / 1000);
    return futureUnixTime;
}

// listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`));

