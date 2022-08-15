import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Logo, FormRow } from '../components';
import Wrapper from "../assets/wrappers/RegisterPage";
import { loginUser, registerUser } from "../features/user/userSlice";

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
}

const Register = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((store) => store.user)

    const [values, setValues] = useState(initialState);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if ((!isMember && !name ) || !email || !password) {
            toast.error('Please Fill Out All Fields');
            return;
        }
        if (isMember) {
            dispatch(loginUser({ email: email, password: password }));
            return;
        }
        dispatch(registerUser({ name, email, password }));
    }

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember});
    }

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {/* name field */}
                {!values.isMember && (
                        <FormRow type='text'
                             name='name'
                             value={values.name}
                             handleChange={handleChange}
                             labelText='Name' />
                )}
                {/* email field */}
                <FormRow type='email'
                         name='email'
                         value={values.email}
                         handleChange={handleChange}
                         labelText='Email' />
                {/* password field */}
                <FormRow type='password'
                         name='password'
                         value={values.password}
                         handleChange={handleChange}
                         labelText='Password' />
                <button type='submit' className='btn btn-block'>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;
