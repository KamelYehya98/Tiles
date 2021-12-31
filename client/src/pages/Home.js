import 'bootstrap/dist/css/bootstrap.min.css';
import Utility from '../components/Utility';
import Table from '../components/Table';
import Form from '../components/Form';
import NavBar from '../components/NavBar';
import WinForm from '../components/WinForm';
import { useState } from 'react';
import Axios from 'axios';
import AlertBox from '../components/AlertBox';

function Home() {

    const [M, setM] = useState(null);
    const [win, setWin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [moves, setMoves] = useState(0);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [alert, setAlert] = useState(false);

    function winGame(){
        setWin(true);
    }

    async function sendData(log){
        console.log("LOOOOG IS: " + log);
        if(log === false){
            await Axios.post("https://unmatch-the-tiles.herokuapp.com/add", {
                row: M.height,
                col: M.width, 
                moves,
                username,
                password
            }).then((res)=>{
                console.log(res.data);
                if(res.data === false){
                    setError(true);
                }else{
                    setError(false);
                    window.location.assign('/');
                }
            });
        }else{
            await Axios.post("https://unmatch-the-tiles.herokuapp.com/save", {
                row: M.height,
                col: M.width, 
                moves,
                username,
                password
            }).then((res)=>{
                console.log(res.data);
                if(res.data === false){
                    setError(true);
                }else{
                    setError(false);
                    setMessage(res.data);
                    setAlert(true);
                }
            });
        }
    }

    return (
        <main id="main">
            <NavBar />
            {alert === true ?
                (<AlertBox message={message} setAlert={setAlert}/>) : null }

            {win === false ?
                (<div className="d-flex flex-column align-items-baseline
                                    flex-lg-row align-items-lg-center mt-lg-2" style={{height: '90vh'}}>
                    {M==null ? 
                        (<Form setM={setM}/>) : null}

                        <Table />

                        {M != null ?
                            (<Utility M={M} setMoves={setMoves} moves={moves}/>) : null }
                    
                </div>) : 
                <WinForm sendData={sendData} setUsername={setUsername} setPassword={setPassword} error={error} moves={moves} />
            }
            <button id="win_button" hidden onClick={()=>{winGame()}}></button>
        </main>
    );
}

export default Home;
