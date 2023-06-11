import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { LightmodeContext } from './Context/LightMode';

function App() {
  const { mode, setmode, light, outline, dark } = useContext(LightmodeContext);
  return (
    <Box  bg={mode?dark:'white'} className="App">
      <Navbar/>
      <AllRoutes/>
    </Box>
  );
}

export default App;
