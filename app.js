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
const contract_addr = "5ERivmFPg8yyFH7dYngHYGwERzviAwZBXGDuQZqPdkchcKCf";
const wsProvider = new WsProvider('ws://127.0.0.1:9944');
const api = await ApiPromise.create({ provider: wsProvider });
const contract = new ContractPromise(api, meta.metadata(), contract_addr);
const keyring = new Keyring({ type: 'sr25519' });
let alice = undefined;

// wait 5 secs for the wasm init
setTimeout(async () => {
    await cryptoWaitReady().then(() => {
        alice = keyring.addFromUri('//Bob');    // for running tests
    });
}, 1000);

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

app.post('/vote', (req, res) => {
    castVote(req.body, res);
});

app.post('/load-result', (req, res) => {
    loadResult(req.body, res);
});

app.post('/create-election', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.error(err.message);
            return;
        }

        // create the hashes
        let bl_hashes = [];
        let ns = fields.names.split(",");
        for (var i = 0; i < ns.length; i++) {
            bl_hashes.push(getRandomNum());
        }
        createElection(fields.title, fields.names, fields.parties, fields.hours, bl_hashes.join(","), res);
    });
});

async function castVote(req, res) {
    try {
        const now = new Date();
        const unixTimestamp = Math.floor(now.getTime() / 1000); // divide by 1000 to convert to Unix timestamp
        const result = await mediator.getBound(contract, api, alice, req.elink);
        const hex = result.Ok.data;
        const elecTIme = extractUnixTimestamp(hex);
        if (unixTimestamp < elecTIme) {
            if (await verifyBVN(req.bvn, req.name)) {
                let result = await mediator.isBvnUnique(contract, api, alice, req.elink, req.bvn);
                if (result.Ok.data == "0x0000") {
                    await mediator.castVote(api, contract, alice, req.elink, req.hash, req.bvn)
                        .then(() => res.status(200).send({ error: false, data: "Vote cast successfully" }));
                } else {
                    res.status(500).send({ error: true, data: "You cannot cast your vote twice" });
                }
            } else {
                res.status(500).send({ error: true, data: "BVN verification failed" });
            }
        } else {
            res.status(500).send({ error: true, data: "Election is over" });
        }
    } catch (err) {
        res.status(500).send({ error: true, data: "Could not complete operation" });
    }
}

async function loadResult(req, res) {
    try {
        let hash = req.link.split("-")[3];
        if (hash) {
            const returned = await mediator.getElection(contract, api, alice, hash);
            const hexString = returned.Ok.data.slice(2);
            const buffer = Buffer.from(hexString.slice(2), 'hex');
            const string = buffer.toString();
            
            // separate the election name and other data
            const [others, elect_name] = string.split("***");
            let result = [];
            [].forEach.call(others.split("&&"), (d) => {
                if (d) {
                    let res = {};
                    [res.name, res.party, res.hash] = d.split("%%");
                    result.push(res);
                }
            });
            const rslt = await mediator.getVotes(contract, api, alice, hash);
            let votes = getNonZeroDecimalValues(rslt.Ok.data).slice(2);
            res.status(200).send({ data: result, votes, error: false, name: elect_name });
        } else
            res.status(500).send({ data: "invalid election URI specified", error: true });
    } catch (err) {
        res.status(500).send({ error: true, data: "Could not complete operation" });
    }
}

async function loadElection(req, res) {
    try {
        let hash = req.link.split("-")[3];
        if (hash) {
            const data = await mediator.getElection(contract, api, alice, hash);
            const hexString = data.Ok.data.slice(2);
            const buffer = Buffer.from(hexString.slice(2), 'hex');
            const string = buffer.toString();

            // separate the election name and other data
            const [others, elect_name] = string.split("***");
            let result = [];
            [].forEach.call(others.split("&&"), (d) => {
                if (d) {
                    let res = {};
                    [res.name, res.party, res.hash] = d.split("%%");
                    result.push(res);
                }
            });
            res.status(200).send({ data: result, error: false, name: elect_name });
        } else
            res.status(500).send({ data: "invalid election URI specified", error: true });
    } catch (err) {
        res.status(500).send({ error: true, data: "Could not complete operation" });
    }
}

async function createElection(title, names, parties, hours, blake_hashes, res) {
    try {
        // the hash of the election is the blake2 hash of all the candidates + nonce
        let hash = blake2AsHex(`${names}${Math.random() * 100000}`);
        // Send the transaction
        await mediator.initElection(api, contract, alice, hash, names, parties, blake_hashes, getFutureUnixTime(hours), title)
            .then(() => res.status(200).send({ data: `#elect-0-rate-${hash}` }));
    } catch (err) {
        res.status(500).send({ error: true, data: "Could not complete operation" });
    }
}

function getFutureUnixTime(hours) {
    const millisecondsInHour = 3600000;
    const futureTime = Date.now() + (hours * millisecondsInHour);
    const futureUnixTime = Math.floor(futureTime / 1000);
    return futureUnixTime;
}

// function to query foreign API to verify BVN
async function verifyBVN(number, name) {
    return true
}

function getRandomNum() {
    let min = 100000;
    let max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function breakStringIntoArray(str) {
    // Create a new array.
    var arr = [];

    // Loop through the string and add each character to the array.
    for (var i = 0; i < str.length; i++) {
        arr.push(str[i]);
    }

    // Return the array.
    return arr;
}

function getNonZeroDecimalValues(str) {
    // Break the string into an array.
    var arr = breakStringIntoArray(str);

    // Create a new array to store the non zero values.
    var nonZeroValues = [];

    // Loop through the array and add each non zero value to the new array.
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != 0 && arr[i] != NaN) {
            nonZeroValues.push(parseInt(arr[i], 16));
        }
    }

    // Return the new array.
    return nonZeroValues;
}

function extractUnixTimestamp(hex) {
    // Convert the hex string to a byte array.
    var bytes = hex.match(/.{2}/g).reverse();

    // Convert the little-endian byte array to a big-endian byte array.
    var bigEndianBytes = bytes.join('').split('').filter(c => c != 'x').join('');

    // Parse the big-endian byte array as a BigInt.
    var timestamp = BigInt('0x' + bigEndianBytes);

    // Convert the BigInt timestamp to a Unix timestamp in seconds.
    var unixTimestamp = Math.floor(Number(timestamp) / 1000);

    // Return the Unix timestamp in seconds.
    return unixTimestamp;
}

// listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`));

