export const creditManager = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ghoToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_poolAave",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ghoStableDebt",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ghoVarDebt",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanID",
        type: "uint256",
      },
    ],
    name: "acceptLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addyToBorrower",
    outputs: [
      {
        internalType: "uint256",
        name: "totalDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalAmountPaid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfLoans",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "activeLoans",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addyToInfo",
    outputs: [
      {
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBorrowed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfLoans",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeCreated",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanID",
        type: "uint256",
      },
    ],
    name: "borrowFromLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountWanted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "promisedPayDate",
        type: "uint256",
      },
    ],
    name: "createLoanOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getCreditScore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ghoStableDebt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ghoToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ghoVarDebt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "loanID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountGiven",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTaken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOwed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeCreated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "promisedPayDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToOffer",
    outputs: [
      {
        internalType: "uint256",
        name: "loanID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountWanted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountToBePayed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "promisedPayDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeCreated",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "taken",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lenderID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lenderToLoans",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "makeValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "payOffLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "poolAave",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "stopLending",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "validators",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "verifiedUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "verifiedUserData",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "verifyUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
