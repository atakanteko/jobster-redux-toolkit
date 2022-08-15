import logo from '../assets/images/logo.svg';

const MyComponent = () => {
    return (
        <figure>
            <img src={logo} alt="jobster logo" className='logo' />
        </figure>
    );
};

export default MyComponent;
