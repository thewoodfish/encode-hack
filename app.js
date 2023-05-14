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
const contract_addr = "5EK9xSMnKD1D7ab5r2Y6L53H5Fy2ZFhTyBTsG8hkJnBHizux";
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

        createElection(fields.names, fields.parties, fields.hours, res);
    });
});

async function loadElection(req, res) {
    // extract election hash
    let hash = req.link.split("-")[3];
    if (hash) {
        const data = await mediator.getElection(contract, api, alice, hash);
        const hexString = data.Ok.data.slice(2); // remove '0x' from beginning
        const buffer = Buffer.from(hexString.slice(2), 'hex');
        const string = buffer.toString();
        let result = [];

        [].forEach.call(string.split("&&"), (d) => {
            if (d) {
                // split again
                let res = {};
                let data = d.split("%%");
                res.name = data[0];   // name
                res.party = data[1];
                result.push(res);
            }
        });

        res.status(200).send({ data: result, error: false });
    } else
        res.status(500).send({ data: "invalid election URI specified", error: true });
}

async function createElection(names, parties, hours, res) {
    // the hash of the election is the blake2 hash of all the candidates + nonce
    let hash = blake2AsHex(`${names}${Math.random() * 100000}`);

    console.log("fbdjknfd");

    // Send the transaction
    await mediator.initElection(api, contract, alice, hash, names, parties, getFutureUnixTime(hours))
        .then(() => res.status(200).send({ data: `#elect-0-rate-${hash}` }));
}

function getFutureUnixTime(hours) {
    const millisecondsInHour = 3600000;
    const futureTime = Date.now() + (hours * millisecondsInHour);
    const futureUnixTime = Math.floor(futureTime / 1000);
    return futureUnixTime;
}

// listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`));

