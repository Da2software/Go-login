import '../../style.css';
import { AuthEndpoints } from '../../api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = new AuthEndpoints();
    const navigate = useNavigate();

    const onLogin = (event: any) => {
        event.preventDefault();
        auth.login(email, password)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
            }).then(res => navigate("/MyDashboard"));
    }
    return (
        <div className="main-bg">
            <div className="container">
                <form className='row col-sm-12 col-md-4 m-auto align-content-center'
                    onSubmit={onLogin}>
                    <div className="mb-3">
                        <label htmlFor="InputEmail1" className="form-label">Email address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}
                            type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword1" className="form-label">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 ms-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="Check1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary col-sm-12 col-md-3 mx-auto">
                        <strong>Login</strong>
                    </button>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;