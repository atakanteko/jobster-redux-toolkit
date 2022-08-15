import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <figure>
                    <img src={logo} alt="jobster logo" className='logo' />
                </figure>
            </nav>
            <div className="container page">
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Chambray cray fingerstache tbh, sus craft beer shabby chic biodiesel chartreuse tumblr. Paleo vaporware cray letterpress leggings direct trade, small batch whatever flexitarian offal kombucha affogato next level.
                    </p>
                    <button className='btn btn-hero'>
                        Login/Register
                    </button>
                </div>
                <figure>
                    <img src={main} alt="job hunt" className='img main-img' />
                </figure>
            </div>
        </Wrapper>
    );
};

export default Landing;
