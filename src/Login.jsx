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
            setError("/SzallasList")
        }
        catch(error){
            setError("Hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!")
            console.error("Hiba a bejelentkezés során: ",error)
        }
    }

return (
    <div className="p-5" style={{backgroundColor: "rgb(195, 177, 225, 0.5)", borderRadius:"2rem", display: "block", margin: "5rem auto", height:"22rem", width:"35%"}}>
        <h2>Bejelentkezés</h2><br />
        {error && <p style={{color : "red"}}>{error}</p>}
        Felhasználónév: <br />
        <input type='text' placeholder='Felhasználónév' value={username} onChange={(e) => setUsername(e.target.value)}
        style={{borderRadius:"0.8rem", marginLeft:"1.5rem", marginBottom:"1rem", backgroundColor: "rgb(200, 255, 255, 0.5)", width: "80%", height:"2.5rem"}}/> <br />
        Jelszó: <br />
        <input type='password' placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)}
        style={{borderRadius:"0.8rem", marginLeft:"1.5rem", backgroundColor: "rgb(200, 255, 255, 0.5)", width: "80%", height:"2.5rem"}}/><br />
        <button onClick={handleLogin} className='btn btn-secondary float-right' style={{float: "right", margin:"2rem auto"}}>Bejelentkezés</button>
    </div>
);

}
