import { useEffect, useState } from "react";
import { Card, Space } from "antd";
import { ethers } from "ethers";
import { useBlockNumber } from "eth-hooks";
// import { ChainId, Fetcher, Percent, Token, TokenAmount, Trade, WETH } from "@uniswap/sdk";
import { abi as IUniswapV2Router02ABI } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";

import Address from "./Address"


/**
  ~ What it does? ~

  Gets a the two dex router and the two tokens and return prices 

**/

function BotResult (props) {
    console.log ("props ", props)
    const provider = props.provider;
    const dex1 = props.dex1;
    const dex2 = props.dex2;
    const token0 = props.pairs[0].token0.id;
    const token0Decimals = props.pairs[0].token0.decimals;
    const token1 = props.pairs[0].token1.id;
    const token1Decimals = props.pairs[0].token1.decimals;
    const [prices, setPrices] = useState([0,0,0,0]);
    const blockNumber = useBlockNumber(provider);
    
    var Router1 = new ethers.Contract ( dex1, IUniswapV2Router02ABI, provider );
    var Router2 = new ethers.Contract ( dex2, IUniswapV2Router02ABI, provider );
    console.log("router1 dans main : ", Router1)
    console.log("router2 dans main : ", Router1)

    // const checkPrice = async (_tokenBorrow, _amount, _otherToken, _dex1Token0IsWbnb,_startWith) => {
    //     //before sending the transaction wee would like to be sure that the outpout amount of dex2 will be enough to rembourse the loan
    //       console.log("Amount : ", _amount)
    //       const amountDec = Number(ethers.utils.formatUnits(_amount,0))
    //       console.log( "Amount Decimal : ", amountDec)
    //       var amountRequired = await dex1Router.getAmountsIn(_amount, [_otherToken,_tokenBorrow])
    //       var returnedAmount = await dex2Router.getAmountsOut(_amount, [_tokenBorrow,_otherToken])
    //       console.log("big numbers : " ,amountRequired[0], returnedAmount[1] )
    //       const amountRequiredDec= Number(ethers.utils.formatUnits(amountRequired[0],18));
    //       const returnedAmountDec = Number(ethers.utils.formatUnits(returnedAmount[1],18));
    //       console.log ('decimals amount required and amount returned : ', amountRequiredDec, returnedAmountDec)
    //       if (amountRequiredDec < returnedAmountDec){
    //         console.log('**************************Profitable ! ', amountRequiredDec, returnedAmountDec)
    //         console.log ("profite should be : ", returnedAmountDec - amountRequiredDec)
    //         return true;
    //         }
    //       else {
    //         console.log('------------------------------ NOT Profitable ! ', amountRequiredDec, returnedAmountDec)
    //         return false
    //         }
    //       }

    async function getPrice (token0, token0Decimals, token1, token1Decimals, Router1, Router2) { //should have token decimals to replace parseEther by parseUnit
        // console.log("router dans getPrice : ", Router)
        try {
            // let amount = ethers.utils.parseUnits(amount, token0Decimals)
            let amount = ethers.utils.parseUnits("1", token0Decimals);//need to calculate the amoutn to be a percentage of max reserves and token decimal !
            let price = await Router1.getAmountsOut(amount, [token0, token1]);
            let testPrice = await price
            console.log("Router1 price :",parseFloat(testPrice[1]))
            let trade = await Router2.getAmountsIn(amount, [token1, token0]);
            let testTrade = await trade
            console.log("Router2 Trade :",testTrade)
            let diff = parseFloat(testPrice[1]) - parseFloat(testTrade[0])
            console.log ("router price trade diff : ", parseFloat(testPrice[1]), parseFloat(testTrade [0]), diff)
            // console.log("the retunr of getamout : ",ethers.utils.formatEther(price[1]));
            return (testPrice[1]);
         }
        catch (e) {
            console.log("router",e);
          }}
    
    const run = async (Router1, Router2, token0,token0Decimals, token1, token1Decimals) => {
        
        const token1ForToken2OnDex1 = await getPrice(token0,token0Decimals, token1,token1Decimals, Router1, Router2);
        const a = await token1ForToken2OnDex1
        const token2ForToken1OnDex1 = await getPrice(token1,token1Decimals, token0,token0Decimals, Router1,Router2);
        const b = await token2ForToken1OnDex1
        const token1ForToken2OnDex2 = await getPrice(token0,token0Decimals, token1,token1Decimals, Router2, Router1);
        const c = await token1ForToken2OnDex2
        const token2ForToken1OnDex2 = await getPrice(token1,token1Decimals, token0,token0Decimals, Router2, Router1);
        const d = await token2ForToken1OnDex2
        
        let newPrices = [a,b,c,d]
        console.log("newprices : ", newPrices)
        setPrices(newPrices);
    }
    
    useEffect(() => {
        console.log("provider dans bot : ", provider)
        console.log("router1 dans useefefct : ", Router1)
        run (Router1, Router2, token0,token0Decimals, token1, token1Decimals);
    },[blockNumber,token0,token1]);

    console.log("router price 0 ; ",prices)
    console.log("the prices from useBot component : ", parseFloat(prices[0]));
    const diff = ((parseFloat(prices[0])) -  parseFloat(prices[2])) / parseFloat(prices[2]) * 100 ;
    return (
        <div>
            <Card title ={`${props.pairs[0].token0.symbol} / ${props.pairs[0].token1.symbol}`}>
            <h5> Dex1 Pair <Address minimized address={props.pairs[0].id} /> </h5>
            <Space direction="horizontal">
                <div>{parseFloat(prices[0])}</div>
                <div>{parseFloat(prices[1])}</div>
                <div>{diff.toFixed(2)} %</div>
            </Space>
            <h5> Dex2 Pair <Address minimized address={props.pairs[1].id} /> </h5>
            <Space direction="horizontal">
            
                 <div>{parseFloat(prices[2])}</div>
                 <div>{parseFloat(prices[3])}</div>
            </Space>
            </Card>
        </div>
      );
 }
 



export default BotResult;
