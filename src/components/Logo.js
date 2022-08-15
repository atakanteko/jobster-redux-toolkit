import logo from '../assets/images/logo.svg';

const Logo = () => {
    return (
        <figure>
            <img src={logo} alt="jobster logo" className='logo' />
        </figure>
    );
};

export default Logo;
