import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props=>{
    const [user,setUser] = useState({username: "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }



    return(
        <div>
             <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/1038/1798/products/b9f9a264740937.5adcaeafc9758.jpg?v=1525176799" alt="pic"/>
             <div className="text-block">
            <form onSubmit={onSubmit}>
               <b> <h1 style={{color:"white"}}>Please Register</h1> </b>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control input1" 
                       placeholder="Enter Username"/><br/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control input1" 
                       placeholder="Enter Password"/><br/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control input1" 
                       placeholder="Enter role (admin/user)"/><br/>
                <button className="btn btn-lg btn-danger btn-block" 
                        type="submit">Register</button>
            </form>
            </div>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;