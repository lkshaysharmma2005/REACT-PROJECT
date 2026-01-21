import React from "react";
import { Canvas } from "@react-three/fiber";
import Dog from "./components/Temp";
import "./App.css";

const App = () => {
  return (
    <main>
    <Canvas style={{
      height:"100vh",
      width:"100vw",
      position:"fixed",
      top:0,
      left:0
    }}>
      <Dog />
    </Canvas>
    <section></section>
    <section></section>
    <section></section>
    </main>
  );
};

export default App;
