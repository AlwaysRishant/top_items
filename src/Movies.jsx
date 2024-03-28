import{useState,useEffect} from 'react';
import Addmovie from './Addmovie';
import {v4} from 'uuid';
import "./movies.css";
export default function Movies()
{
    const[movies,setData]=useState(null);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const[status,setStatus]=useState(false);
    useEffect(()=>{
    //   const res = await fetch("");
    // const data = await res.json();
    // if (data && data.products) {
    //   setProduct(data.products);
    // }

        const url='https://dummyjson.com/products?limit=30';
        fetch(url)
        .then((response)=>{
          if(!response.ok){
            let errorObj=new Error('HTTP Error Occurred:'+response.status);
            throw errorObj;
          }
         return response.json();
        }
        ).then((actualData)=>{
          console.log("data is");
          console.log(actualData.products); 
          setData(actualData.products);
          setError(null);
        }).catch((err)=>{
          console.log("error"); 
          setError(err.message);
          setData(null);
        }).finally(()=>{
          setLoading(false);
        })
       },[])
       const handleClick=()=>
       {
          setStatus(!status);
       }
       return(
        <div className='movie'>
          <br/>
          <h1><div className='hdiv'>List of Top Rated Items</div></h1>
          {/* <button onClick={handleClick}><div className='bdiv'>Add more Items</div></button> */}
         {loading && <div className='hdiv'>Loading. Please wait. . .</div>}
         {error &&(<div>{`There is a problem in loading the user data:${error}`}</div>)}
         <div>{status && <Addmovie movieDetail={movies}setDataMovie={setData} setStatus={setStatus}/>}</div>
         <ul>
          {movies && movies.map((movie)=>(
            <div key={v4()}className='movie_box'>
            <li>
              {console.log(movie.thumbnail)}
              {movie.id===0 && <img className='movie_backdrop' src={`${movie.thumbnail}`} alt="Not Found"></img>}
              {movie.id>0&&<img className='movie_backdrop' src={`${movie.thumbnail}`} alt="Not Found"></img>}<br/><br/>
              <h3 className='head'>Title : </h3><h3 className='text'>{movie.title}</h3><br/><hr/><br/>
              <div className='size_overview'><h3 className='head'>Overview : </h3><h3 className='text'>{movie.description}</h3></div><br/><hr/><br/>
              <h3 className='head'>Rating : </h3><h3 className='text'>{Math.floor(movie.rating*10)/10}</h3><br/><hr/><br/>
              <h3 className='head'>Price : </h3><h3 className='text'>{movie.price}</h3>
            </li>
            </div>
          ))}
         </ul>
        </div>
      )
}