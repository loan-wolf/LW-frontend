/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface TraderInterface extends ethers.utils.Interface {
  functions: {
    "currentAMM()": FunctionFragment;
    "getAmountOut(address,address,uint256)": FunctionFragment;
    "initPair(address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAMM(uint8)": FunctionFragment;
    "trade(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "uniswap()": FunctionFragment;
    "zap(address,address,address,address,uint256)": FunctionFragment;
    "zapLPtoTokens(address,uint256,address,address)": FunctionFragment;
    "zapTokensToLP(address,address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "currentAMM",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountOut",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initPair",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAMM",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "trade",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "uniswap", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "zap",
    values: [string, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "zapLPtoTokens",
    values: [string, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "zapTokensToLP",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "currentAMM", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAMM", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "trade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "uniswap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "zap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "zapLPtoTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "zapTokensToLP",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "UniswapLPDeposit(address,address,uint256,uint256,uint256)": EventFragment;
    "UniswapLPWithdrawal(address,address,uint256,uint256)": EventFragment;
    "UniswapPairInitialization(address,address)": EventFragment;
    "UniswapTrade(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UniswapLPDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UniswapLPWithdrawal"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UniswapPairInitialization"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UniswapTrade"): EventFragment;
}

export class Trader extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TraderInterface;

  functions: {
    currentAMM(overrides?: CallOverrides): Promise<[number]>;

    getAmountOut(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initPair(
      _token0: string,
      _token1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAMM(
      _amm: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    trade(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniswap(overrides?: CallOverrides): Promise<[string]>;

    "zap(address,address,address,address,uint256)"(
      _lpToken: string,
      _from: string,
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "zap(address,address,uint256,address)"(
      _t0: string,
      _t1: string,
      _t0Am: BigNumberish,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    zapLPtoTokens(
      _lpToken: string,
      _amount: BigNumberish,
      _outToken: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    zapTokensToLP(
      _token0: string,
      _token1: string,
      _amount0: BigNumberish,
      _amount1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  currentAMM(overrides?: CallOverrides): Promise<number>;

  getAmountOut(
    _in: string,
    _out: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initPair(
    _token0: string,
    _token1: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAMM(
    _amm: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  trade(
    _in: string,
    _out: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniswap(overrides?: CallOverrides): Promise<string>;

  "zap(address,address,address,address,uint256)"(
    _lpToken: string,
    _from: string,
    _to: string,
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "zap(address,address,uint256,address)"(
    _t0: string,
    _t1: string,
    _t0Am: BigNumberish,
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  zapLPtoTokens(
    _lpToken: string,
    _amount: BigNumberish,
    _outToken: string,
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  zapTokensToLP(
    _token0: string,
    _token1: string,
    _amount0: BigNumberish,
    _amount1: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    currentAMM(overrides?: CallOverrides): Promise<number>;

    getAmountOut(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initPair(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAMM(_amm: BigNumberish, overrides?: CallOverrides): Promise<void>;

    trade(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    uniswap(overrides?: CallOverrides): Promise<string>;

    "zap(address,address,address,address,uint256)"(
      _lpToken: string,
      _from: string,
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "zap(address,address,uint256,address)"(
      _t0: string,
      _t1: string,
      _t0Am: BigNumberish,
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    zapLPtoTokens(
      _lpToken: string,
      _amount: BigNumberish,
      _outToken: string,
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    zapTokensToLP(
      _token0: string,
      _token1: string,
      _amount0: BigNumberish,
      _amount1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    UniswapLPDeposit(
      token0?: null,
      token1?: null,
      amount0?: null,
      amount1?: null,
      liquidity?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber],
      {
        token0: string;
        token1: string;
        amount0: BigNumber;
        amount1: BigNumber;
        liquidity: BigNumber;
      }
    >;

    UniswapLPWithdrawal(
      token0?: null,
      token1?: null,
      amount0?: null,
      amount1?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber],
      { token0: string; token1: string; amount0: BigNumber; amount1: BigNumber }
    >;

    UniswapPairInitialization(
      token0?: null,
      token1?: null
    ): TypedEventFilter<[string, string], { token0: string; token1: string }>;

    UniswapTrade(
      _in?: null,
      _out?: null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _in: string; _out: string; _amount: BigNumber }
    >;
  };

  estimateGas: {
    currentAMM(overrides?: CallOverrides): Promise<BigNumber>;

    getAmountOut(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initPair(
      _token0: string,
      _token1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAMM(
      _amm: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    trade(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniswap(overrides?: CallOverrides): Promise<BigNumber>;

    "zap(address,address,address,address,uint256)"(
      _lpToken: string,
      _from: string,
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "zap(address,address,uint256,address)"(
      _t0: string,
      _t1: string,
      _t0Am: BigNumberish,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    zapLPtoTokens(
      _lpToken: string,
      _amount: BigNumberish,
      _outToken: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    zapTokensToLP(
      _token0: string,
      _token1: string,
      _amount0: BigNumberish,
      _amount1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentAMM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAmountOut(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initPair(
      _token0: string,
      _token1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAMM(
      _amm: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    trade(
      _in: string,
      _out: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniswap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "zap(address,address,address,address,uint256)"(
      _lpToken: string,
      _from: string,
      _to: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "zap(address,address,uint256,address)"(
      _t0: string,
      _t1: string,
      _t0Am: BigNumberish,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    zapLPtoTokens(
      _lpToken: string,
      _amount: BigNumberish,
      _outToken: string,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    zapTokensToLP(
      _token0: string,
      _token1: string,
      _amount0: BigNumberish,
      _amount1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
