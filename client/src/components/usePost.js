import React, { useEffect, useState } from 'react';
import axios from 'axios';


function usePost(){

    const[loading,setloading] = useState(true);
    const[list,setlist] = useState([]);
    const[count,setCount] = useState(0);
    const [page,setPage] = useState(1);
    const [query,setquery] = useState({
        country: "",
        state: "",
        city: ""
    });

    const limit = 15;

    useEffect(async () => {
        const c = axios.CancelToken.source();
        const url = 'http://localhost:7000/api/post/list?page='+page+'&limit='+limit+'&country='+query.country+'&state='+query.state+'&city='+query.city
        setloading(true)
        axios.get(url,{cancelToken: c.token}).then(data => {
            data = data.data
            if(data.data !== undefined){
                setCount(data.data)
                setlist(prev => [...prev,...data.doc] || []);
                
            }
            else{
                
                setlist(prev => [...prev,...data] || []);
            }
            
            setloading(false);
        })
        return () => {
            c.cancel();
        }
    }, [page])

    useEffect(() => {

        setPage(1);
        const c = axios.CancelToken.source();
        const url = 'http://localhost:7000/api/post/list?page='+1+'&limit='+limit+'&country='+query.country+'&state='+query.state+'&city='+query.city
        setloading(true)
        axios.get(url,{cancelToken: c.token}).then(data => {
            data = data.data;
            if(data.data !== undefined){
                setCount(data.data)
                setlist(data.doc);
                console.log(list)
            }
            else{
                setlist([]);
            }

            
            
            setloading(false);
        })
        
        return () => {
            c.cancel();
        }
    },[query])

    let UpdatePage = () => {
        setPage(prev => prev+1);
    }

    let HandleQuery = (country,state,city) => {
        setquery(prev => ({
            country: country,
            state: state,
            city: city
        }));
    }
    let IncreaseCount = () => {
        setCount(prev => prev + 1);
    }
    let DecreaseCount = (id) => {
        setCount(prev => prev - 1);
        let TempList = list;
        TempList.filter((pst) => pst._id !== id)
        setlist(TempList)
    }

    return {loading,list,count,page,HandleQuery,UpdatePage, IncreaseCount, DecreaseCount};
}

export default usePost;