
import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch, Link, useLocation } from "react-router-dom";


export default function Test() {
    const location = useLocation();
    console.log("the location",location)
    let { path, url } = useRouteMatch();
  
    function ContractDebug() {
        // The <Route> that rendered this component has a
        // path of `/topics/:topicId`. The `:topicId` portion
        // of the URL indicates a placeholder that we can
        // get from `useParams()`.
        let { ContractDebugId } = useParams();
      
        return (
          <div>
            <h3>{ContractDebugId}</h3>
            <p> where i'm i</p>
          </div>
        );
      }

  return (
    <div>
    <h2>Contracts</h2>
    <ul>
      <li>
        <Link to={`${url}/test1`}>test1</Link>
      </li>
      <li>
        <Link to={`${url}/test2`}>test2</Link>
      </li>
      <li>
        <Link to={`${url}/test3`}>test3</Link>
      </li>
    </ul>
        <Route exact path={url}> Here we are</Route>
        <Route path ={`${path}/:ContractDebugId`}> <ContractDebug /> </Route>
      
   
   </div>
  );}