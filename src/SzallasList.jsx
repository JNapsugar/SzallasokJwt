import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const SzallasList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                setError("Adatok lekérése sikertelen. Lehet, hogy nem vagy bejelentkezve")
                console.error("Hiba az adatok lekérése során: ",error)
            }
        }
        fetchData();
    },[])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }}, []);

    return(
        <div>
            <video autoPlay muted loop style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1}}>
            <source src="sotet.mp4" type="video/mp4"/>
            </video>
            
            {error && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgb(0, 85, 128, 0.95)",  boxShadow:"3px black", width: "60%", height: "20vh", borderRadius: "2rem", display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem"
                }}>
                    <h3 style={{color : "red"}}>{error}</h3>
                    </div>}
            {data.length>0? ( 
                <div style={{position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgb(0, 85, 128, 0.95)", boxShadow:"3px black", width: "70%", height: "85%", borderRadius: "2rem", overflowY: "scroll", padding: "1rem", scrollbarWidth: "thin", scrollbarColor:"rgb(0, 0, 128) rgb(0, 85, 128, 0.95)"}}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {data.map((item) => (
                        <li key={item.id} style={{borderBottom:"1px black solid", marginTop:"1rem", paddingBottom:"1.5rem",display: window.innerWidth > 850 ? 'flex' : 'block', textAlign: window.innerWidth > 850 ? 'left' : 'center'}}>
                            <div>
                                <h4 className="fw-light text-light">{item.name}</h4><br />
                                <span className="text-light fw-light" style={{ fontStyle: 'italic', marginRight: '1rem', marginLeft: '1rem' }}>Host neve: {item.hostname}</span>
                                <span className="text-light fw-light" style={{ fontStyle: 'italic',  marginRight: '1rem'}}>Helyszín: {item.location}</span>{window.innerWidth < 900 && (<><br />&nbsp;&nbsp;&nbsp;</>)}
                                <span className="text-light fw-light" style={{ fontStyle: 'italic',  marginRight: '1rem'}}>Ár: {item.price}$/éjszaka</span>
                                <span className="text-light fw-light" style={{ fontStyle: 'italic',  marginRight: '1rem'}}>Minimum éjszakák: {item.minimum_nights}</span>
                            </div>
                            <div className="card-body" style={{display: 'flex', justifyContent: window.innerWidth > 850 ? 'flex-end' : 'center', alignItems: 'center', marginRight: '2rem'}}>

                                    <Link to={"/Szallasok/" + item.id} className='btn btn-primary'><i className="bi bi-text-paragraph fs-3"></i></Link>&nbsp;&nbsp;
                                    <Link to={"/Mod-szallas/" + item.id} className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;
                                    <Link to={"/Del-szallas/" + item.id} className='btn btn-danger'><i className="bi bi-trash2 fs-3"></i></Link>    
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
            ) : (<p>Nem találhatóak adatok!</p>)}
        </div>
    )
}