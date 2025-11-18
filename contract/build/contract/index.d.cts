import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  local_quote(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  local_salt(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
}

export type ImpureCircuits<T> = {
  createFund(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  submitQuote(context: __compactRuntime.CircuitContext<T>,
              fundId_0: Uint8Array,
              commitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  determineWinner(context: __compactRuntime.CircuitContext<T>,
                  fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  verifyILost(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  didIWin(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  getFundStatus(context: __compactRuntime.CircuitContext<T>,
                fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  fundExists(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  createFund(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  submitQuote(context: __compactRuntime.CircuitContext<T>,
              fundId_0: Uint8Array,
              commitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  determineWinner(context: __compactRuntime.CircuitContext<T>,
                  fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  verifyILost(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  didIWin(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  getFundStatus(context: __compactRuntime.CircuitContext<T>,
                fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  fundExists(context: __compactRuntime.CircuitContext<T>, fundId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
}

export type Ledger = {
  funds: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { quoteCount: bigint,
                                 isOpen: boolean,
                                 quoteCommit1: Uint8Array,
                                 quoteCommit2: Uint8Array,
                                 quoteCommit3: Uint8Array,
                                 quoterAddr1: { bytes: Uint8Array },
                                 quoterAddr2: { bytes: Uint8Array },
                                 quoterAddr3: { bytes: Uint8Array },
                                 winner: { bytes: Uint8Array },
                                 isFinalized: boolean
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { quoteCount: bigint,
  isOpen: boolean,
  quoteCommit1: Uint8Array,
  quoteCommit2: Uint8Array,
  quoteCommit3: Uint8Array,
  quoterAddr1: { bytes: Uint8Array },
  quoterAddr2: { bytes: Uint8Array },
  quoterAddr3: { bytes: Uint8Array },
  winner: { bytes: Uint8Array },
  isFinalized: boolean
}]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
