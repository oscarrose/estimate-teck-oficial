import { useContext } from "react";
import estimateContext from "../contexts/UseProviderEstimate";
const useEstimate=()=>{
    return useContext(estimateContext)
}
export default useEstimate;