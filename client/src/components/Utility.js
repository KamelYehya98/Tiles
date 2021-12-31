import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../App.css';

import arrow_right from '../images/arrow_right.png';
import arrow_left from '../images/arrow_left.png';
import arrow_up from '../images/arrow_up.png';
import arrow_down from '../images/arrow_down.png';


function Utility({M, setMoves, moves}){

    document.onkeydown = checkKey;

    function checkKey(e){
        e = e || window.event;
        if(e.keyCode === 38){
            if(M.moveBlank('up'))
                setMoves(moves + 1);
        }
        if(e.keyCode === 40){
            if(M.moveBlank('down'))
                setMoves(moves + 1);
        }
        if(e.keyCode === 37){
            if(M.moveBlank('left'))
                setMoves(moves + 1);
        }
        if(e.keyCode === 39){
            if(M.moveBlank('right'))
                setMoves(moves + 1);
        }
    }

    return(
        <div className='col-12 col-md-8 offset-md-2 col-lg-3 offset-lg-1 utility mt-5'>
            <h5 id="moves" className='text-center'>Moves: {moves}</h5>
            
            <div className="d-flex flex-column col-10 offset-1 mt-2">
                <img src={arrow_up} alt="arrow_up" 
                    className='col-4 offset-4 control-btn'
                onClick={()=>{if(M.moveBlank('up')) setMoves(moves + 1)}}/>
                <div className='d-flex'>
                    <img src={arrow_left} alt="arrow_left" 
                        className='col-4 control-btn'
                    onClick={()=>{if(M.moveBlank('left')) setMoves(moves + 1)}}/>

                    <img src={arrow_right} alt="arrow_right" 
                        className='col-4 offset-4 control-btn'
                    onClick={()=>{if(M.moveBlank('right')) setMoves(moves + 1)}}/>
                </div>
                <img src={arrow_down} alt="arrow_down" 
                    className='col-4 offset-4 control-btn'
                onClick={()=>{if(M.moveBlank('down')) setMoves(moves + 1)}}/>
            </div>  
        </div>
    );
}

export default Utility;