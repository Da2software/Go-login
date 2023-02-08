import '../../style.css';
import { AuthEndpoints } from '../../api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import katanagirl from '../../assets/images/katanagirl.jpg';
import { emailRegex } from '../../utils/regexPatterns'

function LoginPage() {
    const emailPattern = emailRegex;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = new AuthEndpoints();
    const navigate = useNavigate();
    let [alertLogin, setAlertLogin] = useState(false);

    const onLogin = (event: any) => {
        setAlertLogin(false);
        event.preventDefault();
        auth.login(email, password)
            .then(res => {
                debugger
                if (res.status === 200) {
                    navigate("/MyDashboard");
                    return res.json();
                }
                setAlertLogin(true);
            });
    }
    return (
        <div className="main-bg">
            <div className="container">
                <div className='col-12 row login-img-bg-base mx-auto'>
                    <div className='col-sm-6 login-img-bg'>
                        <img src={katanagirl} alt="Artmarket-logo" />
                    </div>
                    <div className='col-sm-6 row'>
                        <form className='row needs-validation col-sm-8 mx-auto my-5 align-content-center'
                            onSubmit={onLogin}>
                            <div className="mb-3">
                                <label htmlFor="InputEmail1" className="form-label">Email address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)}
                                    type="email" className="form-control" id="InputEmail1"
                                    required pattern={emailPattern} aria-describedby="InputEmail" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword1" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                    required type="password" className="form-control" id="InputPassword1" />
                            </div>
                            <div className="mb-3 ms-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="Check1">Check me out</label>
                            </div>
                            {alertLogin &&
                                <div className="col-sm-12 alert alert-danger align-self-center" role="alert">
                                    Incorrect Email or Password!
                                </div>
                            }
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
export default LoginPage;