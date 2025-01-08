import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasCreate = () => {
    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();
    return (
        <div style={{position: "relative", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <video autoPlay muted loop style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1 }}>
                    <source src="/sotet.mp4" type="video/mp4" />
                </video>
                {!token? (<div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgb(0, 85, 128, 0.95)",  boxShadow:"3px black", width: "60%", height: "20vh", borderRadius: "2rem", display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem"}}>
                            <h3 style={{color : "red"}}>Új szállás felvételéhez be kell jelentkezni!</h3> </div>)
                :(
                <div className="p-5 content text-center text-light " style={{backgroundColor: "rgb(0, 85, 128, 0.95)", boxShadow:"3px black", borderRadius: "2rem", margin: "auto", width: "70%", minHeight: "40rem"}}>
                <h2>Új szállás</h2><br />
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target);
                        const data = {
                            name: formData.get('name'),
                            hostname: formData.get('hostname'),
                            location: formData.get('location'),
                            price: formData.get('price'),
                            minimum_nights: formData.get('minimum_nights'),
                        };
                        const token = localStorage.getItem('jwt');
                        if (!token) {
                            console.error("Nem található érvényes token!");
                            return;
                        }
                
                        axios.post("https://szallasjwt.sulla.hu/data", data, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}` 
                            }
                        })
                        .then(() => navigate("/SzallasList"))
                        .catch((error) => console.error("Hiba történt:", error));
                    
                }}
            >
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Szállás neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            style={{borderRadius: "0.8rem",
                            backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Host neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="hostname"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Helyszín:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Minimum éjszakák:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="minimum_nights"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary" style={{width:"10rem"}}>Küldés</button>
            </form>
            </div>)} 

        </div>
    );
}