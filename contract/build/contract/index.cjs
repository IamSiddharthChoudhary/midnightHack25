'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.9.0';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = new __compactRuntime.CompactTypeBoolean();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_3 = new _ZswapCoinPublicKey_0();

class _FundRFQ_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment())))))))));
  }
  fromValue(value_0) {
    return {
      quoteCount: _descriptor_1.fromValue(value_0),
      isOpen: _descriptor_2.fromValue(value_0),
      quoteCommit1: _descriptor_0.fromValue(value_0),
      quoteCommit2: _descriptor_0.fromValue(value_0),
      quoteCommit3: _descriptor_0.fromValue(value_0),
      quoterAddr1: _descriptor_3.fromValue(value_0),
      quoterAddr2: _descriptor_3.fromValue(value_0),
      quoterAddr3: _descriptor_3.fromValue(value_0),
      winner: _descriptor_3.fromValue(value_0),
      isFinalized: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.quoteCount).concat(_descriptor_2.toValue(value_0.isOpen).concat(_descriptor_0.toValue(value_0.quoteCommit1).concat(_descriptor_0.toValue(value_0.quoteCommit2).concat(_descriptor_0.toValue(value_0.quoteCommit3).concat(_descriptor_3.toValue(value_0.quoterAddr1).concat(_descriptor_3.toValue(value_0.quoterAddr2).concat(_descriptor_3.toValue(value_0.quoterAddr3).concat(_descriptor_3.toValue(value_0.winner).concat(_descriptor_2.toValue(value_0.isFinalized))))))))));
  }
}

const _descriptor_4 = new _FundRFQ_0();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _QuoteData_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return {
      fundId: _descriptor_0.fromValue(value_0),
      quote: _descriptor_1.fromValue(value_0),
      salt: _descriptor_5.fromValue(value_0),
      quoter: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.fundId).concat(_descriptor_1.toValue(value_0.quote).concat(_descriptor_5.toValue(value_0.salt).concat(_descriptor_3.toValue(value_0.quoter))));
  }
}

const _descriptor_6 = new _QuoteData_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_7 = new _ContractAddress_0();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.local_quote) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_quote');
    }
    if (typeof(witnesses_0.local_salt) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_salt');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      createFund: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`createFund: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createFund',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 33 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('createFund',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 33 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createFund_0(context, partialProofData, fundId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      submitQuote: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`submitQuote: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        const commitment_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('submitQuote',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 55 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('submitQuote',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 55 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          __compactRuntime.type_error('submitQuote',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'main.compact line 55 char 1',
                                      'Bytes<32>',
                                      commitment_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0).concat(_descriptor_0.toValue(commitment_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._submitQuote_0(context,
                                             partialProofData,
                                             fundId_0,
                                             commitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      determineWinner: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`determineWinner: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('determineWinner',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 127 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('determineWinner',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 127 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._determineWinner_0(context,
                                                 partialProofData,
                                                 fundId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifyILost: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`verifyILost: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyILost',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 152 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('verifyILost',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 152 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyILost_0(context, partialProofData, fundId_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      didIWin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`didIWin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('didIWin',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 165 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('didIWin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 165 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._didIWin_0(context, partialProofData, fundId_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getFundStatus: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getFundStatus: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getFundStatus',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 175 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('getFundStatus',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 175 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getFundStatus_0(context,
                                               partialProofData,
                                               fundId_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      fundExists: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`fundExists: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const fundId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('fundExists',
                                      'argument 1 (as invoked from Typescript)',
                                      'main.compact line 183 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(fundId_0.buffer instanceof ArrayBuffer && fundId_0.BYTES_PER_ELEMENT === 1 && fundId_0.length === 32)) {
          __compactRuntime.type_error('fundExists',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'main.compact line 183 char 1',
                                      'Bytes<32>',
                                      fundId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(fundId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._fundExists_0(context, partialProofData, fundId_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      createFund: this.circuits.createFund,
      submitQuote: this.circuits.submitQuote,
      determineWinner: this.circuits.determineWinner,
      verifyILost: this.circuits.verifyILost,
      didIWin: this.circuits.didIWin,
      getFundStatus: this.circuits.getFundStatus,
      fundExists: this.circuits.fundExists
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('createFund', new __compactRuntime.ContractOperation());
    state_0.setOperation('submitQuote', new __compactRuntime.ContractOperation());
    state_0.setOperation('determineWinner', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyILost', new __compactRuntime.ContractOperation());
    state_0.setOperation('didIWin', new __compactRuntime.ContractOperation());
    state_0.setOperation('getFundStatus', new __compactRuntime.ContractOperation());
    state_0.setOperation('fundExists', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_6, value_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_3.toValue(result_0),
      alignment: _descriptor_3.alignment()
    });
    return result_0;
  }
  _local_quote_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.local_quote(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('local_quote',
                                  'return value',
                                  'main.compact line 27 char 1',
                                  'Uint<0..18446744073709551615>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _local_salt_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.local_salt(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.type_error('local_salt',
                                  'return value',
                                  'main.compact line 28 char 1',
                                  'Uint<0..340282366920938463463374607431768211455>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_5.toValue(result_0),
      alignment: _descriptor_5.alignment()
    });
    return result_0;
  }
  _createFund_0(context, partialProofData, fundId_0) {
    const disclosedFundId_0 = fundId_0;
    __compactRuntime.assert(!_descriptor_2.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_8.toValue(0n),
                                                                                                 alignment: _descriptor_8.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'Fund already exists');
    const emptyBytes_0 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const newFund_0 = { quoteCount: 0n,
                        isOpen: true,
                        quoteCommit1: emptyBytes_0,
                        quoteCommit2: emptyBytes_0,
                        quoteCommit3: emptyBytes_0,
                        quoterAddr1: { bytes: emptyBytes_0 },
                        quoterAddr2: { bytes: emptyBytes_0 },
                        quoterAddr3: { bytes: emptyBytes_0 },
                        winner: { bytes: emptyBytes_0 },
                        isFinalized: false };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_8.toValue(0n),
                                                alignment: _descriptor_8.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newFund_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _submitQuote_0(context, partialProofData, fundId_0, commitment_0) {
    const disclosedFundId_0 = fundId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_8.toValue(0n),
                                                                                                alignment: _descriptor_8.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Fund does not exist');
    const fund_0 = _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_8.toValue(0n),
                                                                                       alignment: _descriptor_8.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
    __compactRuntime.assert(fund_0.isOpen, 'RFQ is closed');
    const q_0 = this._local_quote_0(context, partialProofData);
    __compactRuntime.assert(q_0 > 0n, 'Quote must be > 0');
    const s_0 = this._local_salt_0(context, partialProofData);
    const caller_0 = this._ownPublicKey_0(context, partialProofData);
    const data_0 = { fundId: disclosedFundId_0,
                     quote: q_0,
                     salt: s_0,
                     quoter: caller_0 };
    const recomputed_0 = this._persistentHash_0(data_0);
    __compactRuntime.assert(this._equal_0(recomputed_0, commitment_0),
                            'Commitment mismatch');
    const disclosed_commitment_0 = commitment_0;
    const count_0 = fund_0.quoteCount;
    __compactRuntime.assert(count_0 < 3n, 'Already received 3 quotes');
    if (this._equal_1(count_0, 0n)) {
      const updatedFund_0 = { quoteCount: 1n,
                              isOpen: true,
                              quoteCommit1: disclosed_commitment_0,
                              quoteCommit2: fund_0.quoteCommit2,
                              quoteCommit3: fund_0.quoteCommit3,
                              quoterAddr1: caller_0,
                              quoterAddr2: fund_0.quoterAddr2,
                              quoterAddr3: fund_0.quoterAddr3,
                              winner: fund_0.winner,
                              isFinalized: fund_0.isFinalized };
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_8.toValue(0n),
                                                  alignment: _descriptor_8.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(updatedFund_0),
                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
    } else {
      if (this._equal_2(count_0, 1n)) {
        const updatedFund_1 = { quoteCount: 2n,
                                isOpen: true,
                                quoteCommit1: fund_0.quoteCommit1,
                                quoteCommit2: disclosed_commitment_0,
                                quoteCommit3: fund_0.quoteCommit3,
                                quoterAddr1: fund_0.quoterAddr1,
                                quoterAddr2: caller_0,
                                quoterAddr3: fund_0.quoterAddr3,
                                winner: fund_0.winner,
                                isFinalized: fund_0.isFinalized };
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_8.toValue(0n),
                                                    alignment: _descriptor_8.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(updatedFund_1),
                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 1 } }]);
      } else {
        const updatedFund_2 = { quoteCount: 3n,
                                isOpen: false,
                                quoteCommit1: fund_0.quoteCommit1,
                                quoteCommit2: fund_0.quoteCommit2,
                                quoteCommit3: disclosed_commitment_0,
                                quoterAddr1: fund_0.quoterAddr1,
                                quoterAddr2: fund_0.quoterAddr2,
                                quoterAddr3: caller_0,
                                winner: fund_0.winner,
                                isFinalized: fund_0.isFinalized };
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_8.toValue(0n),
                                                    alignment: _descriptor_8.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(updatedFund_2),
                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 1 } }]);
      }
    }
    return [];
  }
  _determineWinner_0(context, partialProofData, fundId_0) {
    const disclosedFundId_0 = fundId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_8.toValue(0n),
                                                                                                alignment: _descriptor_8.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Fund does not exist');
    const fund_0 = _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_8.toValue(0n),
                                                                                       alignment: _descriptor_8.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
    __compactRuntime.assert(!fund_0.isOpen, 'RFQ still open');
    __compactRuntime.assert(!fund_0.isFinalized, 'Already finalized');
    __compactRuntime.assert(this._equal_3(fund_0.quoteCount, 3n),
                            'Not all quotes received');
    const updatedFund_0 = { quoteCount: fund_0.quoteCount,
                            isOpen: fund_0.isOpen,
                            quoteCommit1: fund_0.quoteCommit1,
                            quoteCommit2: fund_0.quoteCommit2,
                            quoteCommit3: fund_0.quoteCommit3,
                            quoterAddr1: fund_0.quoterAddr1,
                            quoterAddr2: fund_0.quoterAddr2,
                            quoterAddr3: fund_0.quoterAddr3,
                            winner: fund_0.quoterAddr1,
                            isFinalized: true };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_8.toValue(0n),
                                                alignment: _descriptor_8.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(updatedFund_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _verifyILost_0(context, partialProofData, fundId_0) {
    const disclosedFundId_0 = fundId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_8.toValue(0n),
                                                                                                alignment: _descriptor_8.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Fund does not exist');
    const fund_0 = _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_8.toValue(0n),
                                                                                       alignment: _descriptor_8.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
    __compactRuntime.assert(fund_0.isFinalized, 'Not finalized yet');
    __compactRuntime.assert(!this._equal_4(this._ownPublicKey_0(context,
                                                                partialProofData),
                                           fund_0.winner),
                            'You won!');
    const myQuote_0 = this._local_quote_0(context, partialProofData);
    return true;
  }
  _didIWin_0(context, partialProofData, fundId_0) {
    const disclosedFundId_0 = fundId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_8.toValue(0n),
                                                                                                alignment: _descriptor_8.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Fund does not exist');
    const fund_0 = _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_8.toValue(0n),
                                                                                       alignment: _descriptor_8.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
    __compactRuntime.assert(fund_0.isFinalized, 'Not finalized yet');
    return this._equal_5(this._ownPublicKey_0(context, partialProofData),
                         fund_0.winner);
  }
  _getFundStatus_0(context, partialProofData, fundId_0) {
    const disclosedFundId_0 = fundId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_8.toValue(0n),
                                                                                                alignment: _descriptor_8.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Fund does not exist');
    const fund_0 = _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_8.toValue(0n),
                                                                                       alignment: _descriptor_8.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
    return fund_0.isOpen;
  }
  _fundExists_0(context, partialProofData, fundId_0) {
    const disclosedFundId_0 = fundId_0;
    return _descriptor_2.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_8.toValue(0n),
                                                                               alignment: _descriptor_8.alignment() } }] } },
                                                    { push: { storage: false,
                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedFundId_0),
                                                                                                           alignment: _descriptor_0.alignment() }).encode() } },
                                                    'member',
                                                    { popeq: { cached: true,
                                                               result: undefined } }]).value);
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_5(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    funds: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'main.compact line 18 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'main.compact line 18 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_4.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  local_quote: (...args) => undefined, local_salt: (...args) => undefined
});
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
