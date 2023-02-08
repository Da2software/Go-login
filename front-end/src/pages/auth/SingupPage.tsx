import '../../style.css';
import { AuthEndpoints } from '../../api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import katanagirl from '../../assets/images/katanagirl.jpg';

function SingupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidate, setPasswordValidate] = useState("");
    const auth = new AuthEndpoints();
    const navigate = useNavigate();

    const onSingup = (event: any) => {
        event.preventDefault();
        auth.login(email, password)
            .then(res => {
                if (res.status === 200) {
                    navigate("/MyDashboard");
                    return res.json();
                }
            });
    }
    return (
        <div className="main-bg">
            <div className="container">
                <div className='col-12 row login-img-bg-base mx-auto'>
                    <div className='col-sm-6 login-img-bg'>
                        <img alt="Artmarket-logo" />
                    </div>
                    <div className='col-sm-6 row'>
                        <form className='row col-sm-8 mx-auto needs-validation my-5 align-content-center'
                            onSubmit={onSingup}>
                            <div className="mb-3">
                                <label htmlFor="InputEmail1" className="form-label">Email address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)}
                                    type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword1" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                    type="password" className="form-control" id="InputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword2" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPasswordValidate(e.target.value)}
                                    type="password" className="form-control" id="InputPassword2" />
                            </div>
                            <div className="mb-3 ms-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="Check1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary col-sm-12 col-md-4 col-lg-3 mx-auto">
                                <strong>Login</strong>
                            </button>

                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}
export default SingupPage;