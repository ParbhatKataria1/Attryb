import { Box } from "@chakra-ui/react";
import { createContext, useRef, useState } from "react";

export const LightmodeContext = createContext();

export default function LightMode({ children }) {
  const [mode, setmode] = useState(sessionStorage.getItem("mode") || false);
  function toggleMode(){
    sessionStorage.setItem('mode',!mode);
    setmode(prev=>!prev)
  }
  const dark = useRef('gray.800');
  const light = useRef('#eeeeee');
  const outline = useRef('#414141')
  const lightbg = useRef('gray.50');
  const white = useRef('#eeee');
  return (
    <LightmodeContext.Provider value={{ white:white.current, mode,lightbg:lightbg.current, setmode:toggleMode,light:light.current,outline:outline.current, dark:dark.current }}>
      {children}
    </LightmodeContext.Provider>
  );
}
