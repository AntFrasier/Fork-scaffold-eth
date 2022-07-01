import React, { memo, useMemo, useState } from "react";
import Contract from "./Contract";
import { Menu } from "antd";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

export default function ContractsDebug({
  price,
  signer,
  provider,
  address,
  blockExplorer,
  contractConfig,
  readContracts,

}) {

let cachedcontractConfig = useMemo( () => {
  return (contractConfig)
},[contractConfig]);
let cachedreadContracts = useMemo( () => {
  return (readContracts)
},[readContracts]);
let cachedprovider = useMemo( () => {
  return (provider)
},[provider]);
let cachedaddress = useMemo( () => {
  return (address)
},[address]);
let cachedblockExplorer = useMemo( () => {
  return (blockExplorer)
},[blockExplorer]);
let cachedsigner = useMemo( () => {
  return (signer)
},[signer]);
let cachedprice = useMemo( () => {
  return (price)
},[price]);

console.log('whithoutcached', contractConfig, readContracts)
console.log('with cache', cachedcontractConfig, cachedreadContracts)


  let { url , path } = useRouteMatch();
  

  console.log('***************************component ContractDebug reaload !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  const contractsToShow = Object.keys(readContracts).map (_contractName => 
    
    <Menu.Item key={`${url}/${_contractName}`}>
     <Link to={`${url}/${_contractName}`}>{_contractName}</Link>
   </Menu.Item>
     
     
  );
 
 const ShowContractDebug= () => {

    // let   ContractDebugId =  useMemo ( () => {
    //   return "YourContract" },[])
    let  { ContractDebugId }=  useParams();
    console.log('component ShowContractreaload !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    return(
     <div> contract debug id : {ContractDebugId}
    
      <Contract 
      name={ContractDebugId}
      price={cachedprice}
        signer={cachedsigner}
        provider={cachedprovider}
        address={cachedaddress}
        blockExplorer={cachedblockExplorer}
        contractConfig={cachedcontractConfig}
        />
        </div>);
    }
  

    if(contractsToShow.length == 0){
      return (
        <div>No contract has been deployed yet</div>
      )
    } else {
   
    return (
      <div slyle={{border:"1px solid rgb(240, 240, 240)"}}>
        <Menu style={{ textAlign: "center", marginTop: 20 }} selectedKeys={`${path}`} mode="horizontal">
           {contractsToShow}
        </Menu>
        <Route path ={`${path}/:ContractDebugId`}> <ShowContractDebug /> </Route>
      </div>
      );}
    }