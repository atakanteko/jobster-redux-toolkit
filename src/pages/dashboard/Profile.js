import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from 'react-toastify';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {updateUser} from "../../features/user/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((store) => store.user);

    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || '',
    })

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, lastName, location } = userData;

        if (!name || !email || !lastName || !location) {
            toast.error('Please Fill Out All Fields');
            return;
        }
        dispatch(updateUser({ name, email, lastName, location }));
    };

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>

                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={userData.name}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='text'
                        labelText='last name'
                        name='lastName'
                        value={userData.lastName}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={userData.email}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='text'
                        name='location'
                        value={userData.location}
                        handleChange={handleChange}
                    />
                    <button className='btn btn-block'
                            type='submit'
                            disabled={isLoading}
                    >
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;
