"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElection = exports.getElection = void 0;
var util_1 = require("@polkadot/util");
// import the metadata
var meta = undefined;
// blockchain essentials
var api_1 = require("@polkadot/api");
var util_crypto_1 = require("@polkadot/util-crypto");
var api_contract_1 = require("@polkadot/api-contract");
var keyring_1 = require("@polkadot/keyring");
// initializations
var contract_addr = "5EF8GfJmLaDb3aUzpqzYyL7uQWzxdQyKjiB3BBqnXjqUeSzq";
var wsProvider = new api_1.WsProvider('ws://127.0.0.1:9944');
var api = undefined;
var contract = undefined;
(async () => {
api = await api_1.ApiPromise.create({ provider: wsProvider });
meta = await import("./metadata.js");
contract = new api_contract_1.ContractPromise(api, meta.metadata(), contract_addr);
})();
var keyring = new keyring_1.Keyring({ type: 'sr25519' });
var alice = undefined;
// wait 5 secs for the wasm init
setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, util_crypto_1.cryptoWaitReady)().then(function () {
                    alice = keyring.addFromUri('//Alice'); // for running tests
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 5000);
var MAX_CALL_WEIGHT = new util_1.BN(5000000000000).isub(util_1.BN_ONE);
var PROOFSIZE = new util_1.BN(1000000);
var storageDepositLimit = new util_1.BN(1000);
// send message onchain
var value = 10000;
var gasLimit = 3000n * 1000000n;
function getElection() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result, output;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contract.query.winner(alice.address, {
                        gasLimit: api === null || api === void 0 ? void 0 : api.registry.createType('WeightV2', {
                            refTime: MAX_CALL_WEIGHT,
                            proofSize: PROOFSIZE,
                        }),
                        storageDepositLimit: storageDepositLimit,
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, output = _a.output;
                    return [2 /*return*/, result.toHuman()];
            }
        });
    });
}
exports.getElection = getElection;
function createElection(hash, names, parties, ipfs_str, hours) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!alice) {
                        throw new Error('Alice keypair is not initialized');
                    }
                    return [4 /*yield*/, contract.tx
                            .commence({
                            storageDepositLimit: storageDepositLimit,
                            gasLimit: api.registry.createType('WeightV2', {
                                refTime: MAX_CALL_WEIGHT,
                                proofSize: PROOFSIZE,
                            })
                        }, hash, names, parties, ipfs_str, hours)
                            .signAndSend(alice, function (result) {
                            if (result.status.isInBlock) {
                                console.log('in a block');
                            }
                            else if (result.status.isFinalized) {
                                console.log('finalized');
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createElection = createElection;
