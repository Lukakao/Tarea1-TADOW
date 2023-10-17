import { useQuery } from "react-query";
import axios from "axios";

export function useBuscarInfoQuery(params) {
  return useQuery(
    ["buscarInfoQuery",params], buscarInfoQuery, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

export const buscarInfoQuery = async (params) => { 
  //console.log("params original",params);
  //console.log("params detalle ",params.queryKey);

  const [queryName, paramsFilter] = params.queryKey;
  
  let url2 = "https://dog.ceo/api/breeds/image/random"
  let url3= `https://pokeapi.co/api/v2/pokemon?limit=${paramsFilter.limit}&page=${paramsFilter.page}`;
  
  const { data } = await axios.get(url3);

  return data.results;
};