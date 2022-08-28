import React, { useState, useEffect } from "react";




export default function usePairList(graphQlUri) {
    // const graphQlUri2 = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
    const [pairs, setPairs] = useState();
   
    const EXAMPLE_GRAPHQL = `
    {
      pairs(
        where: {reserveUSD_gt: "1000000", volumeUSD_gt: "50000", token1 : "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" }
        orderBy: reserveUSD
        orderDirection: desc
      ) {
        id
        token0 {
          id
          symbol
          decimals
        }
        token1 {
          id
          symbol
          decimals
        }
        reserveUSD
        volumeUSD
      }
    }
    `;
    // const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
    // const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

    useEffect ( ()=> {
        console.log("suuposed grahql uri :",graphQlUri)
        fetch(graphQlUri, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({query : EXAMPLE_GRAPHQL}),
          }).then(response => response.json())
            .then(data => setPairs(data.data.pairs))
            .catch (e => console.log("Erreur Sa mere ",e));
     
    },[graphQlUri])

    return (pairs)
}