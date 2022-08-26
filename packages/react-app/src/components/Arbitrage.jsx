import {
    Button,
    Card,
    Descriptions,
    Divider,
    Drawer,
    InputNumber,
    Modal,
    notification,
    Row,
    Select,
    Space,
    Cascader,
    Input,
    Tooltip,
    Typography,
    Menu,
  } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { useBlockNumber, usePoller } from "eth-hooks";
import { RetweetOutlined, SettingOutlined } from "@ant-design/icons";
import { ChainId, Fetcher, Percent, Token, TokenAmount, Trade, WETH } from "@uniswap/sdk";
import { abi as IUniswapV2Router02ABI } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";  
import Column from "antd/lib/table/Column";
import { useBot } from "../hooks";
import BotResult from "./BotResult";

  function Arbitrage (provider , signer) {
    // const provider = props.provider;
    // const signer = props.signer; 
    const routerList = [
        {value: "uniswap",
        label : "uniswap",
         address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"},
         {value: "sushiSwap",
         label : "sushiSwap",
         address: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"},
    ]
    const tokenList = [
        {value: "Wrappe Eth",
         label: "WETH",
         address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"},
         {value: "Matic",
          label: "Matic",
          address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"},
    ]
    const [router, setRouter] = useState();
    const [token, setToken] = useState();
    // const [prices, setPrices] = useState([0,0,0,0])
    const [dex1, setDex1] = useState("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    const [dex2, setDex2] = useState("0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F");
    const [token1, setToken1] = useState("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    const [token2, setToken2] = useState("0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0");
    const [startBot, setStartBot] = useState(false);
    // const [priceToShow,setPriceToShow] = useState([0,0,0,0]);
    // const prices = useBot(provider, dex1, dex2, token1, token2)
    const onChangeDex1 = (value, token) => {
        console.log("la value : ",value , token[0].address);
        setDex1(token[0].address)
      };
    const onChangeDex2 = (value, token) => {
      console.log("la value : ",value , token[0].address);
      setDex2(token[0].address)
    };
    const onChangeToken1 = (value, token) => {
        console.log("la value : ",value , token[0].address);
        setToken1(token[0].address)
    };
    const onChangeToken2 = (value, token) => {
        console.log("la value : ",value , token[0].address);
        setToken2(token[0].address)
    };
    
    console.log("the provider is : ",provider.provider)
    return (
        <div>
          <Card 
            title = "Arbitrage between UniswapV2 router DEX">
              <Space direction="horizontal">
                {<Cascader options={routerList} placeholder="Dex1" onChange={onChangeDex1} style={{ width: 150 }} />}
                {<Cascader options={routerList} placeholder="Dex2" onChange={onChangeDex2} style={{ width: 150 }} />}
                {<Cascader options={tokenList} placeholder="Token1" onChange={onChangeToken1} style={{ width: 150 }} />}
                {<Cascader options={tokenList} placeholder="Token2" onChange={onChangeToken2} style={{ width: 150 }} />}
                <Button 
                title="run"
                onClick={ () => {
                    setStartBot(!startBot)
                    // setPriceToShow(prices);
                    // console.log("price to show : ",priceToShow[0])
                }}>Run</Button>
             </Space>
              { startBot ? <BotResult 
                provider = {provider.provider}
                dex1 = {dex1}
                dex2={dex2}
                token1={token1}
                token2={token2}
              /> : <div>The bot is stoped</div>}
            </Card>
     
        </div>
    );}

  export default Arbitrage;