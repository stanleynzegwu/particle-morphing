import { Environment, OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ParticleMorphing from "./ParticleMorphing";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";

const Experience = () => {
  return (
    <Canvas
      shadows
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [0, 0, 8],
      }}
    >
      {/* <OrbitControls enableDamping={false} /> */}
      <ambientLight intensity={1} color={"#babad1"} />
      {/* <directionalLight position={[1, 2, 0]} intensity={2} /> */}
      <Environment files="/textures/city.hdr" />
      <ParticleMorphing />
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer> */}
      <Preload all />
    </Canvas>
  );
};

export default Experience;
