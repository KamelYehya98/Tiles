import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function WinForm({sendData, setUsername, setPassword, error, moves}) {

    const [log, setLog] = useState(true);

    const updateAnimation = (cond)=>{
        const username_div = document.getElementById('username_div');
        const password_div = document.getElementById('password_div');
        username_div.classList.remove('slide_left', 'slide_right');
        password_div.classList.remove('slide_left', 'slide_right');

        setTimeout(()=>{
            if(cond === "new"){
                username_div.classList.add('slide_left');
                password_div.classList.add('slide_left');
            }else{
                username_div.classList.add('slide_right');
                password_div.classList.add('slide_right');
            }
        }, 50)
    }

    return (
        <div className="d-flex flex-column form text-light col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3"
                 style={{fontFamily: "Courier New"}}>
            <h1 className='text-center mt-3 slide_left'>Congrats!! You Won</h1>
            <h4 className='text-center slide_right'>With {moves} moves</h4>
            <hr/>
            <div className="col-12 slide_right mt-4">  
                {error === true ? (
                    <div className="mt-4 d-flex flex-column align-items-center text-center" id="error_div">
                        {log === false ? (<>Username Exists!</>) : (<>Wrong Credentials</>)}
                    </div>
                ) : null}
                <div className='d-flex justify-content-around mt-4'>
                    <button className='btn auth-btn text-light bg-none' id="login" onClick={()=>{error=false; setLog(true); updateAnimation("exist");}}>Existing</button>
                    <div className='vertical-line'></div>
                    <button className='btn auth-btn text-light bg-none' id="signup" onClick={()=>{error=false; setLog(false); updateAnimation("new");}}>New</button>
                </div>
                <div className='form-group m-1 slide_left' id='username_div'>
                    <label htmlFor="username">Username:</label>
                    <input className="form-control" type="text" name="username" placeholder='Username' 
                        onChange={(e)=>{setUsername(e.target.value)}}
                    />
                </div>
                <div className='form-group m-1 slide_left' id='password_div'>
                    <label htmlFor="password">Password:</label>
                    <input className="form-control" type="password" name="password" placeholder='Password'
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <button className='btn btn-outline-light col-12 mt-3'
                     onClick={()=>{
                         sendData(log);
                    }}>Save Score
                </button>
            </div>
            <hr />
            <div className="col-12 slide_left mt-4">
                <h4>How this Works?</h4>
                <p className='text-left'>
                    If this is your first time seeing this then go ahead and create a username / password <br/>
                    Next time you win a game your score will be automatically updated (if better) based on the credentials you provided.
                </p>
            </div>
        </div>
    );
}

export default WinForm;
