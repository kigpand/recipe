import styled from 'styled-components';
import Menu from './components/Menu';

const AppWrapper = styled.div`
  @font-face {
    font-family: 'IM_Hyemin-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  overflow: hidden;
  font-family: 'IM_Hyemin-Bold';
`;
function App() {
  return (
    <AppWrapper>
      <Menu />
    </AppWrapper>
  );
}

export default App;
