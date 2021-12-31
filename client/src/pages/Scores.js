import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { useState } from 'react';

function Scores() {

    const [empty, setEmpty] = useState(false);
    const [table, setTable] = useState(false);

    setTimeout(()=>{
        const select = document.getElementById("select_menu");
        if(select.innerHTML !== ""){
            return;
        }
        const opt = document.createElement('option');
        opt.value = "";
        opt.disabled = true;
        opt.hidden = true;
        opt.selected = true;
        opt.innerHTML = "Choose Here";
        select.appendChild(opt);

        for(var j=3; j<=9; j++){
            const option = document.createElement('option');
            option.value = "" + j + j;
            option.innerHTML = "" + j + " X " + j;
            select.appendChild(option);
        }
        
        
    }, 100);

    const viewScores = async ()=>{

        const select = document.getElementById('select_menu');
        const val = select.options[select.selectedIndex].value;

        const col = val.substring(0, 1);
        const row = val.substring(1, 2);

        console.log(col);
        console.log(row);

        await Axios.post("https://unmatch-the-tiles.herokuapp.com/getScores", {col:col, row:row} ).then((res)=>{
            setTable(true); setEmpty(false);
            const table = document.getElementById('scores_table');

            if(res.data.length === 0){
                setEmpty(true);
                setTable(false);
                return;
            }
            setEmpty(false);
            setTable(true);

            for(var i=0; i<res.data.length; i++){
                const tr = document.createElement('tr');
                if(i%2 === 0)
                    tr.className = "col-12 slide_left";
                else
                    tr.className = "col-12 slide_right";

                const td0 = document.createElement('th');
                td0.className = "col-4 text-center";
                td0.innerHTML = "" + (i+1);
                
                const td1 = document.createElement('th');
                td1.className = "col-4 text-center";
                td1.innerHTML = res.data[i].username;

                const td2 = document.createElement('th');
                td2.className = "col-4 text-center";
                td2.innerHTML = res.data[i].moves;

                tr.appendChild(td0);
                tr.appendChild(td1);
                tr.appendChild(td2);

                table.appendChild(tr);
            }
        });


    };

    return (
        <main style={{fontFamily: 'Courier New'}}>
            <NavBar />
            <div className="col-10 offset-1 d-flex flex-column col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                
                <div className='d-flex flex-column mt-5'>
                    <label htmlFor='select_menu' className='text-light'>Select a Matrix: </label>
                    <select id="select_menu" onChange={()=>{viewScores()}} className='form-select slide_up'>
                    </select>
                </div> 

                {empty === true ?
                    (<h2 className='text-light col-12 mt-5 text-center jiggle'>
                        NO RECORDS FOUND YET!! <br/>
                        Be the first to get a highscore!!
                    </h2>) : null
                }

                {table === true ? 
                    (<table className='mt-5 table text-light col-10' id="table_id">
                        <thead>
                            <tr className="col-12">
                                <th className="col-4 text-center">Rank</th>
                                <th className="col-4 text-center">Username</th>
                                <th className="col-4 text-center">Moves</th>
                            </tr>
                        </thead>
                        <tbody id="scores_table">

                        </tbody>
                        <tfoot></tfoot>
                    </table>) : null
                }
                
            </div>
        </main>
    );
}

export default Scores;
