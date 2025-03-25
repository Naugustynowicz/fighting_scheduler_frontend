import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    function handleLogin(event){
      event.preventDefault();
      axios.post("http://localhost:3000/login", {
        user: {
          email: email,
          password: password
        }
      })
      .then(function (response) {
        const userToken = response.headers.authorization.split(' ');
        if(userToken[0] === 'Bearer'){
          setToken(userToken[1]);
          navigate("/", { replace: true });
        } else {
          throw new Error('Invalid token')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   
    return (
      <>
        <main>
          <form onSubmit={handleLogin}>
            <div className="form_control">
              <label htmlFor="user-email">Email:</label>
              <input
                type="email"
                id="user-email"
                name="email"
                placeholder="example@yahoo.com"
                aria-describedby="user-email"
                aria-invalid="false"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <div id="user-email" className="sr-only">
                Please enter a valid username. It must contain at least 6 characters.
              </div>
            </div>
            <div className="form_control">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                aria-describedby="user-password"
                aria-invalid="false"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              <div id="user-password" className="sr-only">
                your password should be more than 6 character
              </div>
            </div>
            <button className="btn-submit">Submit</button>
          </form>
        </main>
      </>
    )
};

export default Login;
