import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('jwt')
        navigate('/')
    }
    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <video autoPlay muted loop style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1}}>
            <source src="vilagos.mp4" type="video/mp4"/>
        </video>
        <div className="p-5" style={{ backgroundColor: "rgb(102, 153, 153, 0.8)", borderRadius: "2rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "25rem", width: "35%", zIndex: 1, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h2 style={{ textAlign: "center" }}>Kijelentkezés</h2><br />
                <p style={{ textAlign: "center" }}>Biztosan ki szeretnél jelentkezni?</p>
                <button onClick={handleLogout} className='btn btn-danger' style={{ margin: "2rem auto", height: "3rem", width: "10rem", display: "block" }}>
                    Kijelentkezés
                </button>
            </div>
        </div>
    )
}