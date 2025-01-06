import React, {useState, useEffect} from "react";
import axios from "axios";

export const SzallasList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error ("Nem található JWt token.")
                }
                const response = await axios.get("https://szallasjwt.sulla.hu/data",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(response.data)
            }
            catch(error){
                setError("Adarok lekérése sikertelen. Lehet, hogy nem vagy bejelentkezve")
                console.error("Hiba az adatok lekérése során: ",error)
            }
        }
        fetchData();
    },[])

    return(
        <div>
            <h2>Szállások listája</h2>
            {error && <p style={{color : "red"}}>{error}</p>}
            {data.length>0? (   
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name} - {item.hostname} 
                        - {item.location} - {item.minimum_nights}</li>
                    ))}
                </ul>
            ) : (<p>Nem találhatóak adatok!</p>)}
        </div>
    )
}