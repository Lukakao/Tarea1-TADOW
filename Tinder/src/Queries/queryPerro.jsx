import { useQuery } from "react-query";
import axios from "axios";

export function useQueryDetalle(params) {
  return useQuery(["queryDetalle", params], queryDetalle, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

export const queryDetalle = async () => {
    try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random/3");
        return response.data
    } catch (error) {
        throw new Error(error.message); // Maneja cualquier error que pueda ocurrir durante la solicitud
    }
};