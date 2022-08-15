import { Link } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <figure>
                    <img src={notFoundImg} alt='not found' />
                </figure>
                <h3>Error</h3>
                <p>No corresponding page</p>
                <Link to='/'>back home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;
