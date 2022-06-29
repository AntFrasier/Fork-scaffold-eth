import React, { useMemo, useState } from "react";
import Contract from "./Contract";
import { Menu } from "antd";
import { Link, Route, Switch, useLocation } from "react-router-dom";



    // const testdemule = false
export default function ContractsDebug({
  name,
  price,
  signer,
  provider,
  address,
  blockExplorer,
  contractConfig,
  readContracts,

}) {

  const location = useLocation();
  var nav = "Contract2";
  const contractsToShow = Object.keys(readContracts).map ( _contractName => 
   
    <Menu.Item key={_contractName}>
      <a href={`/#${_contractName}`}>{_contractName}</a>
        </Menu.Item>
);
    // const debugContractsDiv = Object.keys(readContracts).map(contract =>
    //   <div id={contract}>
    //   <Contract 
    //   name={contract}
    //   price={price}
    //   signer={signer}
    //   provider={provider}
    //   address={address}
    //   blockExplorer={blockExplorer}
    //   contractConfig={contractConfig}/>
    //   </div>
    //   );

   
    return (
      <div slyle={{border:"1px solid rgb(240, 240, 240)"}}>
        <Menu style={{ textAlign: "center", marginTop: 20 }} selectedKeys={`/#${[location.pathname]}`} mode="horizontal">
        {contractsToShow}
      </Menu>
      <Switch>
        <Route exact path="/#Contract2">
        <Contract 
          name="Contract2"
          price={price}
          signer={signer}
          provider={provider}
          address={address}
          blockExplorer={blockExplorer}
          contractConfig={contractConfig}/>

        </Route>
        <Route path="/#YourContract">
        <Contract 
          name="YourContract"
          price={price}
          signer={signer}
          provider={provider}
          address={address}
          blockExplorer={blockExplorer}
          contractConfig={contractConfig}/>

        </Route>
        </Switch>
      </div>
      );
    }