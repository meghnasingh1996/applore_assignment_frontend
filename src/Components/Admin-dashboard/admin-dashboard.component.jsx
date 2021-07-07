import { Button, FormControl } from '@material-ui/core';
import axios from 'axios';
import React , {useState } from 'react';
import './admin-dashboard.styles.scss';
import { Input } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import Table from '../Table/table.component';

const AdminDashboard = () => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('token'));
    const registerUser = () => {
        if ( getTokenFromLocalStorage){
            axios.post("http://localhost:4000/api/user-register" , {
                name : name,
                email : email,
                password: password
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }    
    } 

    const [openPopup , setOpenPopup] = useState(false);
    const [ name , setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [password , setPassword ] = useState('');


    return (
        <div className='admin-dashboard'>
            <Button onClick={() => setOpenPopup(true)}>Create User</Button>
            <Dialog className="registration-form" open={openPopup}>
                <FormControl>
                <Input type="text" name="name" placeholder="name" 
                value={name} onChange={e => setName(e.target.value)}/>
                </FormControl>
                <FormControl>
                <Input type="text" name="email" placeholder="email" 
                value={email} onChange={e => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl>
                <Input type="password" name="password" placeholder="password" 
                value={password} onChange={e => setPassword(e.target.value)}/>
                </FormControl>
                <div className="custom-button">
                <Button type="submit" value="close" onClick={() => setOpenPopup(false)}>Close</Button>
                <Button type="submit" value="save" onClick={registerUser}>Save</Button>
                </div>
            </Dialog>
            <div>
                <Table />
            </div>
        </div>
    );
}

export default AdminDashboard;