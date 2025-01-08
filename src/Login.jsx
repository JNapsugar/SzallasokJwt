import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate} from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
            const response = await axios.post("https://szallasjwt.sulla.hu/login", {username, password})
            const token = response.data.token;
            localStorage.setItem("jwt",token);
            navigate("/SzallasList")
        }
        catch(error){
            setError("Hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!")
            console.error("Hiba a bejelentkezés során: ",error)
        }
    }

return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <video autoPlay muted loop style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1}}>
            <source src="vilagos.mp4" type="video/mp4"/>
        </video>
        <div className="p-5" style={{ backgroundColor: "rgb(102, 153, 153, 0.8)", borderRadius: "2rem", display: "block", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "25rem", width: "35%", zIndex: 1, padding: "2rem"}}>
            <h2>Bejelentkezés</h2><br />
            {error && <p style={{color : "red"}}>{error}</p>}
            Felhasználónév: <br />
            <input type='text' placeholder='Felhasználónév' value={username} onChange={(e) => setUsername(e.target.value)}
            style={{borderRadius:"0.8rem", marginLeft:"1.5rem", marginBottom:"1rem", backgroundColor: "rgb(204, 204, 204, 0.8)", width: "80%", height:"2.5rem"}}/> <br />
            Jelszó: <br />
            <input type='password' placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)}
            style={{borderRadius:"0.8rem", marginLeft:"1.5rem", backgroundColor: "rgb(204, 204, 204, 0.8)", width: "80%", height:"2.5rem"}}/><br />
            <button onClick={handleLogin} className='btn btn-secondary float-right' style={{float: "right", margin:"2rem auto"}}>Bejelentkezés</button>
        </div>
    </div>
);

}
