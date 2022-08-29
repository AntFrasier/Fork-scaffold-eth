import {
    Button,
    Card,
    Space,
    Cascader,
  } from "antd";
import React, { useEffect, useState } from "react";
import { usePairList } from "../hooks";
import BotResult from "./BotResult";


  function Arbitrage (provider , signer, graphQlUri) {
    const routerList = [
        {value: "uniswap",
        label : "uniswap",
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        subGraphURI: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
        },
         {value: "sushiSwap",
         label : "sushiSwap",
         address: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
         subGraphURI: "https://api.thegraph.com/subgraphs/name/sushiswap/exchange"
        },
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
    const [matchedPairsList, setMatchedPairsList] = useState([]);
    // const [prices, setPrices] = useState([0,0,0,0])
    const [dex1, setDex1] = useState("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    const [dex2, setDex2] = useState("0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F");
    const [token1, setToken1] = useState("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    const [token2, setToken2] = useState("0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0");
    const [startBot, setStartBot] = useState(false);
    const dex1PairsList = usePairList(dex1[0].subGraphURI) //hook use PairList return an array with all pairs from subgraph request
    const dex2PairsList = usePairList(dex2[0].subGraphURI)

    const tradeList = () => { //fill the matchd pair list array with pairs that exist in both dexs
      setMatchedPairsList([]);
      var newPairsList = [];
      if (dex1PairsList) {
        dex1PairsList.forEach( (pair) => {
          let symbol1 = pair.token0.symbol
          let matchPair = dex2PairsList.find( (pair) => pair.token0.symbol === symbol1)
          if (matchPair) { newPairsList = [...newPairsList, [pair, matchPair]] } 
        })
        setMatchedPairsList( newPairsList)
        console.log("List matchedPairsList ",matchedPairsList)
      }
    }
    // const [priceToShow,setPriceToShow] = useState([0,0,0,0]);
    // const prices = useBot(provider, dex1, dex2, token1, token2)
    const onChangeDex1 = (value, dex) => {
        console.log("la value dex1: ",value , dex);
        setDex1(dex)
        
      };
    const onChangeDex2 = (value, dex) => {
      console.log("la value dex2: ",value , dex);
      setDex2(dex)
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
              <Button  tittle="MAJ" onClick={ () => tradeList() } >MAJ Trade List </Button>
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
             <ul>
                  {matchedPairsList.map( pairs => (
                    <li key={pairs[0].id}> {pairs[0].token0.name} / {pairs[0].token1.name}</li>
                  ))}
                </ul>
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