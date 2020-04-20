import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';
import './login.css';

const Login = props=>{
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            //console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            }
            else
                setMessage(message);
        });
    }



    return(
        <div>
            <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/1038/1798/products/b9f9a264740937.5adcaeafc9758.jpg?v=1525176799" alt="pic"/>
            <div class="text-block">
            <form onSubmit={onSubmit}>
                <b><h1 style={{color:"white"}}>Please sign in</h1></b>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       class="transparent-input"
                       onChange={onChange} 
                       className="form-control input1" 
                       placeholder="Enter Username"/><br/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password" 
                       onChange={onChange} 
                       className="form-control input1" 
                       placeholder="Enter Password"/><br/>
                <button className="btn btn-lg btn-danger btn-block" 
                        type="submit">Log in </button>
            </form>
            </div>
    {message ? <Message message={message}/> : null}
    </div>
    )
}

export default Login;