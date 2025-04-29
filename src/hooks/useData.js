import apiClient from '../utils/api-client'
import { useQuery } from '@tanstack/react-query';


const useData = (endpoint, customConfig = {}, queryKey, staleTime = 300_000) => {
  const fetchFunction = () => apiClient.get(endpoint, customConfig).then(res => res.data);

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: staleTime
  })

}


// const useData = (endpoint, customConfig, dependencies) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//       setIsLoading(true);

//       apiClient.get(endpoint, customConfig)
//         .then(res => {

//           if(endpoint === "/products" && data && data.products && customConfig.params.page != 1){
//             setData(prev => (
//               {...prev, products: [...prev.products, ...res.data.products]})
//             )
//           } else {
//             setData(res.data);
//           }
//           setIsLoading(false);

//         })
//         .catch(err => {
          
//           setError(err.message);
//           setIsLoading(false);

//         })
//     }
//     , dependencies ? dependencies : []);

//     return {data, error, isLoading}

// }




//==========for pagination==================
//note: change also in ProductList.jsx

// const useData = (enpoint, customConfig, dependencies) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);

//     apiClient.get(enpoint, customConfig)
//       .then(res => {
        
//         setData(res.data);
//         setIsLoading(false);
//       })
//       .catch(err => {
        
//         setError(err.message);
//         setIsLoading(false);

//       })
//   }
//   , dependencies ? dependencies : []);

//   return {data, error, isLoading}

// }
//==========for pagination==================

export default useData