import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasDel = () => {
    const { szallasId } = useParams();
    const [szallas, setSzallas] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const adatLekeres = async () => {
            const storedToken = localStorage.getItem('jwt');
            if (storedToken) {
                setToken(storedToken);
            }

            if (storedToken) {
                try {
                    const response = await axios.get(`https://szallasjwt.sulla.hu/data/${szallasId}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    setSzallas(response.data);
                } catch (error) {
                    console.log("Nem sikerült az adat lekérés:", error);
                }
            }
        };

        adatLekeres();
    }, [szallasId]);

    const handleDelete = () => {
        axios.delete(`https://szallasjwt.sulla.hu/data/${szallasId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            navigate("/Szallasok");
        })
        .catch((error) => {
            console.log('Hiba a szállás törlésekor:', error);
        });
    };

    return (
        <div style={{position: "relative", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <video autoPlay muted loop style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1 }}>
                <source src="/sotet.mp4" type="video/mp4" />
            </video>
            <div className="row justify-content-center align-items-center" style={{width:"50%"}}>
                        <div className="card p-4"  style={{backgroundColor: "rgb(0, 85, 128, 0.95)", borderRadius:"2rem", boxShadow:"5px black"}}>
                        <h2 className="text-light text-center text-decoration-underline" >Szállás neve: {szallas.name}</h2><br />
                            <p className="text-light fw-light text-center">Host neve: {szallas.hostname}</p>
                            <p className="text-light fw-light text-center">Helyszín: {szallas.location}</p>
                            <p className="text-light fw-light text-center">Ár: {szallas.price}</p>
                            <p className="text-light fw-light text-center">Minimum éjszakák: {szallas.minimum_nights}</p><br />
                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                                <Link to="/SzallasList" className='btn btn-primary'>
                                    <i className="bi bi-backspace-fill fs-3"></i>&nbsp;Mégsem
                                </Link>&nbsp;&nbsp;
                                <button onClick={handleDelete} className='btn btn-danger'>
                                    <i className="bi bi-trash2 fs-3"></i>&nbsp;Törlés
                                </button>
                            </div>
                    </div>
            </div>
        </div>
    );
};
