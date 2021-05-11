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

    const limit = 3;

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
        const url = 'http://localhost:7000/api/post/list?page='+page+'&limit='+limit+'&country='+query.country+'&state='+query.state+'&city='+query.city
        setloading(true)
        axios.get(url,{cancelToken: c.token}).then(data => {
            data = data.data;
            if(data.data !== undefined){
                setCount(data.data)
                setlist(data.doc);
            }
            else{
                setlist(data);
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

    return {loading,list,count,page,HandleQuery,UpdatePage};
}

export default usePost;