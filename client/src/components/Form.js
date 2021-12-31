import 'bootstrap/dist/css/bootstrap.min.css';
import { Matrix } from '../classes/Matrix';

function Form({setM}) {

    const displayGame = (e)=>{
        e.preventDefault();
        document.getElementById("error_div").classList.add('d-none');
        document.getElementById("error_div").innerHTML = "";
        let height = parseInt(document.getElementsByName("height")[0].value);
        if(height > 9 || height < 3 || isNaN(height)){
            document.getElementById("error_div").classList.remove('d-none');
            document.getElementById("error_div").innerHTML = "Values must be between (3 - 9)";
        }else{
            setM(new Matrix(height, height));
        }
        document.getElementById("matrix").hidden = false;
    }

    return (
        <div className="d-flex flex-column form text-light col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3"
             style={{fontFamily: "Courier New"}}>
            <h1 className='text-center mt-3 slide_left'>Unmatch The Tiles</h1>
            <hr/>
            <form className="col-12 slide_right mt-4">  
                <h6>Select the size of the Matrix:</h6>  
                <div className="d-none" id="error_div"></div>
                <div className='form-group m-1'>
                    <label htmlFor="height">Dimension:</label>
                    <input className="form-control" type="number" name="height" placeholder='Max: 9   Min: 3'/>
                </div>
                <button className='btn btn-outline-light col-12 mt-3' onClick={displayGame}>Create Game</button>
            </form>
            <hr />
            <div className="col-12 slide_left mt-4">
                <h4>Description:</h4>
                <p className='text-left'>The game is very simple, all you have to do is move the white square until no two matching colors are adjacent.</p>
            </div>
        </div>
    );
}

export default Form;
