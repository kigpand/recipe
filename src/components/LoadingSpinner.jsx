import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
    position: absoulte;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
`;
const LoadingSpinner = () =>{
    return(
        <SpinnerWrapper>
            <Loader
                type="Oval"
                color="#000000"
                width={100}
                height={100}
            />
        </SpinnerWrapper>
    )
}

export default LoadingSpinner;