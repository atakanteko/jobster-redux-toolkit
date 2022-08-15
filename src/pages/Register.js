import { useEffect, useState } from "react";
import { Logo } from '../components';
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    console.log(values.name, values.email, values.password, values.isMember);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        name
                    </label>
                    <input type="text"
                           name='name'
                           className='form-input'
                           value={values.name}
                           onChange={handleChange}/>
                </div>
                <div className="form-row">
                    <label htmlFor="email" className="form-label">
                        email
                    </label>
                    <input type="email"
                           name='email'
                           className='form-input'
                           value={values.email}
                           onChange={handleChange}/>
                </div>
                <div className="form-row">
                    <label htmlFor="password" className="form-label">
                        password
                    </label>
                    <input type="password"
                           name='password'
                           className='form-input'
                           value={values.password}
                           onChange={handleChange}/>
                </div>
                <button type='submit' className='btn btn-block'>submit</button>
            </form>
        </Wrapper>
    );
};

export default Register;
