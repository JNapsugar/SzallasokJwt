import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasMod = () => {
    const [szallas, setSzallas] = useState({
        name: '',
        hostname: '',
        location: '',
        price: 0,
        minimum_nights: 0
    });
    
    const [token, setToken] = useState('');
    const params = useParams();
    const id = params.szallasId;
    const navigate = useNavigate();

    useEffect(() => {
        const adatLekeres = async () => {
            try {
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSzallas(response.data);
            } catch (error) {
                console.log("Nem sikerült az adat lekérése:", error);
            }
        };

        const storedToken = localStorage.getItem('jwt');
        if (storedToken) {
            setToken(storedToken);
        }

        if (token) {
            adatLekeres();
        }
    }, [id, token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSzallas(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://szallasjwt.sulla.hu/data/${id}`, szallas, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            navigate("/SzallasList");
        })
        .catch((error) => {
            console.log('Hiba a szállás adatainak módosításakor:', error);
        });
    };

    return (
            <div style={{position: "relative", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <video autoPlay muted loop style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1 }}>
                    <source src="/sotet.mp4" type="video/mp4" />
                </video>
                <div className="p-5 content text-center text-light " style={{backgroundColor: "rgb(0, 85, 128, 0.95)", boxShadow:"3px black", borderRadius: "2rem", margin: "auto", width: "70%", minHeight: "40rem"}}>
                <h2>Szállás módosítása</h2><br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Szállás neve:</label>
                        <div className="col-sm-9">
                            <input  type="text" name="name" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.name} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Host neve:</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" 
                                name="hostname" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.hostname} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Helyszín:</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" 
                                name="location" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.location} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Ár:</label>
                        <div className="col-sm-9">
                            <input 
                                type="number" 
                                name="price" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.price} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Minimum éjszakák:</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" 
                                name="minimum_nights" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.minimum_nights} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-secondary" style={{width:"10rem"}}>Küldés</button>
                </form>
            </div>
        </div>
    );
};
