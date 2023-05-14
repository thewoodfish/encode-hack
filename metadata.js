export function metadata() {
    return {
        "source": {
            "hash": "0xcfdee35151135f6b0ac57366857202a2b4533ddef2dc2c0757f68b7b07383ed4",
            "language": "ink! 4.2.0",
            "compiler": "rustc 1.69.0",
            "build_info": {
                "build_mode": "Debug",
                "cargo_contract_version": "2.0.0-rc",
                "rust_toolchain": "stable-aarch64-apple-darwin",
                "wasm_opt_settings": {
                    "keep_debug_symbols": false,
                    "optimization_passes": "Z"
                }
            }
        },
        "contract": {
            "name": "encode",
            "version": "0.1.0",
            "authors": [
                "[your_name] <[your_email]>"
            ]
        },
        "spec": {
            "constructors": [
                {
                    "args": [],
                    "default": false,
                    "docs": [
                        "Constructor that initializes the contract storage"
                    ],
                    "label": "new",
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink_primitives",
                            "ConstructorResult"
                        ],
                        "type": 6
                    },
                    "selector": "0x9bae9d5e"
                }
            ],
            "docs": [],
            "environment": {
                "accountId": {
                    "displayName": [
                        "AccountId"
                    ],
                    "type": 11
                },
                "balance": {
                    "displayName": [
                        "Balance"
                    ],
                    "type": 12
                },
                "blockNumber": {
                    "displayName": [
                        "BlockNumber"
                    ],
                    "type": 14
                },
                "chainExtension": {
                    "displayName": [
                        "ChainExtension"
                    ],
                    "type": 15
                },
                "hash": {
                    "displayName": [
                        "Hash"
                    ],
                    "type": 13
                },
                "maxEventTopics": 4,
                "timestamp": {
                    "displayName": [
                        "Timestamp"
                    ],
                    "type": 0
                }
            },
            "events": [],
            "lang_error": {
                "displayName": [
                    "ink",
                    "LangError"
                ],
                "type": 8
            },
            "messages": [
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 3
                            }
                        },
                        {
                            "label": "names",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 5
                            }
                        },
                        {
                            "label": "parties",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 5
                            }
                        },
                        {
                            "label": "blake_hashes",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 5
                            }
                        },
                        {
                            "label": "time_frame",
                            "type": {
                                "displayName": [
                                    "u64"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " This message intitiliazes an election and sets the countdown"
                    ],
                    "label": "commence",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 6
                    },
                    "selector": "0xfb5a0305"
                },
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 3
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " This message returns all the candidates in the election"
                    ],
                    "label": "fetch_candidates",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 9
                    },
                    "selector": "0xaf493719"
                },
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 3
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " This message returns the time the election ends"
                    ],
                    "label": "fetch_time",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 10
                    },
                    "selector": "0x9c677d96"
                }
            ]
        },
        "storage": {
            "root": {
                "layout": {
                    "struct": {
                        "fields": [
                            {
                                "layout": {
                                    "root": {
                                        "layout": {
                                            "struct": {
                                                "fields": [
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0xac5379d9",
                                                                "ty": 0
                                                            }
                                                        },
                                                        "name": "time_frame"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0xac5379d9",
                                                                "ty": 1
                                                            }
                                                        },
                                                        "name": "candidates"
                                                    }
                                                ],
                                                "name": "Entry"
                                            }
                                        },
                                        "root_key": "0xac5379d9"
                                    }
                                },
                                "name": "entries"
                            }
                        ],
                        "name": "Encode"
                    }
                },
                "root_key": "0x00000000"
            }
        },
        "types": [
            {
                "id": 0,
                "type": {
                    "def": {
                        "primitive": "u64"
                    }
                }
            },
            {
                "id": 1,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 2
                        }
                    }
                }
            },
            {
                "id": 2,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "name": "hash",
                                    "type": 3,
                                    "typeName": "[u8; 32]"
                                },
                                {
                                    "name": "name",
                                    "type": 5,
                                    "typeName": "Vec<u8>"
                                },
                                {
                                    "name": "party",
                                    "type": 5,
                                    "typeName": "Vec<u8>"
                                },
                                {
                                    "name": "votes",
                                    "type": 0,
                                    "typeName": "u64"
                                }
                            ]
                        }
                    },
                    "path": [
                        "sam_os",
                        "encode",
                        "Candidate"
                    ]
                }
            },
            {
                "id": 3,
                "type": {
                    "def": {
                        "array": {
                            "len": 32,
                            "type": 4
                        }
                    }
                }
            },
            {
                "id": 4,
                "type": {
                    "def": {
                        "primitive": "u8"
                    }
                }
            },
            {
                "id": 5,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 4
                        }
                    }
                }
            },
            {
                "id": 6,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 7
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 8
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 7
                        },
                        {
                            "name": "E",
                            "type": 8
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 7,
                "type": {
                    "def": {
                        "tuple": []
                    }
                }
            },
            {
                "id": 8,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "index": 1,
                                    "name": "CouldNotReadInput"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "LangError"
                    ]
                }
            },
            {
                "id": 9,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 5
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 8
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 5
                        },
                        {
                            "name": "E",
                            "type": 8
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 10,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 0
                                        }
                                    ],
                                    "index": 0,
                                    "name": "Ok"
                                },
                                {
                                    "fields": [
                                        {
                                            "type": 8
                                        }
                                    ],
                                    "index": 1,
                                    "name": "Err"
                                }
                            ]
                        }
                    },
                    "params": [
                        {
                            "name": "T",
                            "type": 0
                        },
                        {
                            "name": "E",
                            "type": 8
                        }
                    ],
                    "path": [
                        "Result"
                    ]
                }
            },
            {
                "id": 11,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 3,
                                    "typeName": "[u8; 32]"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "types",
                        "AccountId"
                    ]
                }
            },
            {
                "id": 12,
                "type": {
                    "def": {
                        "primitive": "u128"
                    }
                }
            },
            {
                "id": 13,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 3,
                                    "typeName": "[u8; 32]"
                                }
                            ]
                        }
                    },
                    "path": [
                        "ink_primitives",
                        "types",
                        "Hash"
                    ]
                }
            },
            {
                "id": 14,
                "type": {
                    "def": {
                        "primitive": "u32"
                    }
                }
            },
            {
                "id": 15,
                "type": {
                    "def": {
                        "variant": {}
                    },
                    "path": [
                        "ink_env",
                        "types",
                        "NoChainExtension"
                    ]
                }
            }
        ],
        "version": "4"
    };
}