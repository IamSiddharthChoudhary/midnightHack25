import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  local_quote(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  local_salt(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
}

export type ImpureCircuits<T> = {
  submitQuote(context: __compactRuntime.CircuitContext<T>,
              commitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  submitQuote(context: __compactRuntime.CircuitContext<T>,
              commitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly quoteCounter: bigint;
  readonly isOpen: boolean;
  readonly quoteCommit1: Uint8Array;
  readonly quoteCommit2: Uint8Array;
  readonly quoteCommit3: Uint8Array;
  readonly quoterAddr1: { bytes: Uint8Array };
  readonly quoterAddr2: { bytes: Uint8Array };
  readonly quoterAddr3: { bytes: Uint8Array };
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
