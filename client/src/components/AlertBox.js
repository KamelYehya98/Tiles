import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

function AlertBox({message, setAlert}) {
    const navigate = useNavigate();
    return(
        <div className='alert alert-success text-center' onClick={()=>{setAlert(false); navigate('/scores');}}>
            {message}
        </div>
    );
}
export default AlertBox;