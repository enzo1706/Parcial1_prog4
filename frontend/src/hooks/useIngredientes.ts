import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useIngredientes = () => {
return useQuery({
    queryKey: ["ingredientes"],
    queryFn: async () => {
        const res = await api.get("/ingredientes");  
        return res.data;
    },
});
};