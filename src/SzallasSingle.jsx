import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const SzallasSingle = () => {

    const { szallasId } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error ("Nem található JWt token.")
                }
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${szallasId}`,{
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
    },[szallasId])

    return (
        <div style={{position: "relative", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <video autoPlay muted loop style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1 }}>
                <source src="/sotet.mp4" type="video/mp4" />
            </video>
            <div className="row justify-content-center align-items-center" style={{width:"50%"}}>
                        <div className="card p-4"  style={{backgroundColor: "rgb(0, 85, 128, 0.95)", borderRadius:"2rem", boxShadow:"5px black"}}>
                        <h2 className="text-light text-center text-decoration-underline" >Szállás neve: {data.name}</h2><br />
                            <p className="text-light fw-light text-center">Host neve: {data.hostname}</p>
                            <p className="text-light fw-light text-center">Helyszín: {data.location}</p>
                            <p className="text-light fw-light text-center">Ár: {data.price}</p>
                            <p className="text-light fw-light text-center">Minimum éjszakák: {data.minimum_nights}</p><br />
                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                                <Link to="/SzallasList" className='btn btn-primary'><i className="bi bi-backspace-fill fs-3"></i></Link>&nbsp;&nbsp;
                                <Link to={"/Mod-szallas/" + data.id} className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;
                                <Link to={"/Del-szallas/" + data.id} className='btn btn-danger'><i className="bi bi-trash2 fs-3"></i></Link>
                            </div>
                    </div>
            </div>
        </div>
    );
}