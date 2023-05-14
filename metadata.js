export function metadata() {
    return {
        "source": {
            "hash": "0xdca86a09adda41823b119a0cdfb4a23696c069ec0e70bff9034c2a2bdfe031ef",
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
                    "type": 14
                },
                "balance": {
                    "displayName": [
                        "Balance"
                    ],
                    "type": 15
                },
                "blockNumber": {
                    "displayName": [
                        "BlockNumber"
                    ],
                    "type": 17
                },
                "chainExtension": {
                    "displayName": [
                        "ChainExtension"
                    ],
                    "type": 18
                },
                "hash": {
                    "displayName": [
                        "Hash"
                    ],
                    "type": 16
                },
                "maxEventTopics": 4,
                "timestamp": {
                    "displayName": [
                        "Timestamp"
                    ],
                    "type": 2
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
                                "type": 9
                            }
                        },
                        {
                            "label": "names",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "parties",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "blake_hashes",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "time_frame",
                            "type": {
                                "displayName": [
                                    "u64"
                                ],
                                "type": 2
                            }
                        },
                        {
                            "label": "election_name",
                            "type": {
                                "displayName": [
                                    "Vec"
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
                                "type": 9
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
                        "type": 10
                    },
                    "selector": "0xaf493719"
                },
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 9
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
                        "type": 11
                    },
                    "selector": "0x9c677d96"
                },
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 9
                            }
                        },
                        {
                            "label": "bvn",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "default": false,
                    "docs": [],
                    "label": "bvn_isunique",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 12
                    },
                    "selector": "0xa232648b"
                },
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 9
                            }
                        }
                    ],
                    "default": false,
                    "docs": [],
                    "label": "get_votes",
                    "mutates": false,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 10
                    },
                    "selector": "0x5f9d374c"
                },
                {
                    "args": [
                        {
                            "label": "hash",
                            "type": {
                                "displayName": [],
                                "type": 9
                            }
                        },
                        {
                            "label": "uniq_str",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        },
                        {
                            "label": "bvn",
                            "type": {
                                "displayName": [
                                    "Vec"
                                ],
                                "type": 0
                            }
                        }
                    ],
                    "default": false,
                    "docs": [
                        " This is the message that casts the vote on a voters behalf"
                    ],
                    "label": "cast_vote",
                    "mutates": true,
                    "payable": true,
                    "returnType": {
                        "displayName": [
                            "ink",
                            "MessageResult"
                        ],
                        "type": 6
                    },
                    "selector": "0xcaed155c"
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
                                                        "name": "name"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0xac5379d9",
                                                                "ty": 2
                                                            }
                                                        },
                                                        "name": "time_frame"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0xac5379d9",
                                                                "ty": 3
                                                            }
                                                        },
                                                        "name": "candidates"
                                                    },
                                                    {
                                                        "layout": {
                                                            "leaf": {
                                                                "key": "0xac5379d9",
                                                                "ty": 5
                                                            }
                                                        },
                                                        "name": "bvns"
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
                        "sequence": {
                            "type": 1
                        }
                    }
                }
            },
            {
                "id": 1,
                "type": {
                    "def": {
                        "primitive": "u8"
                    }
                }
            },
            {
                "id": 2,
                "type": {
                    "def": {
                        "primitive": "u64"
                    }
                }
            },
            {
                "id": 3,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 4
                        }
                    }
                }
            },
            {
                "id": 4,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "name": "hash",
                                    "type": 0,
                                    "typeName": "Vec<u8>"
                                },
                                {
                                    "name": "name",
                                    "type": 0,
                                    "typeName": "Vec<u8>"
                                },
                                {
                                    "name": "party",
                                    "type": 0,
                                    "typeName": "Vec<u8>"
                                },
                                {
                                    "name": "votes",
                                    "type": 2,
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
                "id": 5,
                "type": {
                    "def": {
                        "sequence": {
                            "type": 0
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
                        "array": {
                            "len": 32,
                            "type": 1
                        }
                    }
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
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 2
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
                            "type": 2
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
                "id": 12,
                "type": {
                    "def": {
                        "variant": {
                            "variants": [
                                {
                                    "fields": [
                                        {
                                            "type": 13
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
                            "type": 13
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
                "id": 13,
                "type": {
                    "def": {
                        "primitive": "bool"
                    }
                }
            },
            {
                "id": 14,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 9,
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
                "id": 15,
                "type": {
                    "def": {
                        "primitive": "u128"
                    }
                }
            },
            {
                "id": 16,
                "type": {
                    "def": {
                        "composite": {
                            "fields": [
                                {
                                    "type": 9,
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
                "id": 17,
                "type": {
                    "def": {
                        "primitive": "u32"
                    }
                }
            },
            {
                "id": 18,
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