import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
function User(props){
    return(
        <tr>
            <td>{props.index + 1}</td>
             <td>{props.firstname}</td>
             <td>{props.lastname}</td>
             <td>{props.email}</td>
             <td>{props.status ? (
                <Switch {...label}  defaultChecked onClick={() => props.getInfo(props.email, props.status) }/>
             ) : (
                <Switch {...label}  onClick={() => props.getInfo(props.email)}/>
             )}</td>
        </tr>
    )
}

export default User;