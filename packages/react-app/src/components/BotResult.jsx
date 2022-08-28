import { useEffect, useState } from "react";
import { Card } from "antd";
import { ethers } from "ethers";
import { useBlockNumber } from "eth-hooks";
import { ChainId, Fetcher, Percent, Token, TokenAmount, Trade, WETH } from "@uniswap/sdk";
import { abi as IUniswapV2Router02ABI } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import { ConsoleSqlOutlined } from "@ant-design/icons";

/**
  ~ What it does? ~

  Gets a the two dex router and the two tokens and return prices 

**/

function BotResult (props) {
    const provider = props.provider;
    const dex1 = props.dex1;
    const dex2 = props.dex2;
    const token1 = props.token1;
    const token2 = props.token2;
    const [prices, setPrices] = useState([0,0,0,0]);
    const blockNumber = useBlockNumber(provider);
    
    var Router1 = new ethers.Contract ( dex1, IUniswapV2Router02ABI, provider );
    var Router2 = new ethers.Contract ( dex2, IUniswapV2Router02ABI, provider );
    console.log("router1 dans main : ", Router1)

    async function getPrice (token0, token1, Router1, Router2) {
        // console.log("router dans getPrice : ", Router)
        try {
            let amount = ethers.utils.parseEther("0.01");//need to calculate the amoutn to be a percentage of max reserves
            let price = await Router1.getAmountsOut(amount, [token0, token1]);
            let testPrice = await price
            console.log("Router1 price :",parseFloat(testPrice[1]))
            let trade = await Router2.getAmountsIn(testPrice[1], [token1, token0]);
            let testTrade = await trade
            console.log("Router2 Trade :",testTrade)
            let diff = parseFloat(testPrice[1]) - parseFloat(testTrade[0])
            console.log ("router price trade diff : ", parseFloat(testPrice[1]), parseFloat(testTrade [1]), diff)
            // console.log("the retunr of getamout : ",ethers.utils.formatEther(price[1]));
            return (testPrice[1]);
         }
        catch (e) {
            console.log("router",e);
          }}
    
    const run = async (Router1, Router2, token1, token2) => {
        
        const token1ForToken2OnDex1 = await getPrice(token1, token2, Router1, Router2);
        const a = await token1ForToken2OnDex1
        const token2ForToken1OnDex1 = await getPrice(token2, token1, Router1,Router2);
        const b = await token2ForToken1OnDex1
        const token1ForToken2OnDex2 = await getPrice(token1, token2, Router2, Router1);
        const c = await token1ForToken2OnDex2
        const token2ForToken1OnDex2 = await getPrice(token2, token1, Router2, Router1);
        const d = await token2ForToken1OnDex2
        
        let newPrices = [a,b,c,d]
        console.log("newprices : ", newPrices)
        setPrices(newPrices);
    }
    
    useEffect(() => {
        console.log("provider dans bot : ", provider)
        console.log("router1 dans useefefct : ", Router1)
        run (Router1, Router2, token1,token2);
    },[blockNumber,token1,token2]);

    console.log("router price 0 ; ",prices)
    console.log("the prices from useBot component : ", parseFloat(prices[0]));
    const diff = ((parseFloat(prices[0])) -  parseFloat(prices[2])) / parseFloat(prices[2]) * 100 ;
    return (
        <div>
            <Card title ="dex1 price">
                <div>{parseFloat(prices[0])}</div>
                <div>{parseFloat(prices[1])}</div>
                <div>{diff} %</div>
            </Card>
            <Card title ="dex2 price">
                 <div>{parseFloat(prices[2])}</div>
                 <div>{parseFloat(prices[3])}</div>
            </Card>
        </div>
      );
 }
 



export default BotResult;
