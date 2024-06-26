import * as THREE from "three";
import { shaderMaterial, useGLTF } from "@react-three/drei";
import { useThree, extend } from "@react-three/fiber";
import vertexShader from "../shaders/particleMorphing/vertex.glsl";
import fragmentShader from "../shaders/particleMorphing/fragment.glsl";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const ParticleMorphing = () => {
  const { viewport } = useThree();
  const particleMorphingMaterialRef = useRef();

  /** GSAP */
  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    new ScrollTrigger({});

    tl.to(particleMorphingMaterialRef.current.uniforms.uProgress, {
      value: 1,
      scrollTrigger: {
        trigger: ".section1",
        start: "10% top",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
      },
    });
  }, []);

  const gltf = useGLTF("/models/EurekaWorks1.glb");
  // Positions
  const positions = gltf.scene.children.map((child) => child.geometry.attributes.position);
  // console.log(positions);
  let particlesMaxCount = 0;
  for (const position of positions) {
    if (position.count > particlesMaxCount) {
      particlesMaxCount = position.count;
    }
  }

  let particlesPositions = [];
  for (const position of positions) {
    const originalArray = position.array;
    const newArray = new Float32Array(particlesMaxCount * 3);

    for (let i = 0; i < particlesMaxCount; i++) {
      const i3 = i * 3;

      if (i3 < originalArray.length) {
        newArray[i3 + 0] = originalArray[i3 + 0];
        newArray[i3 + 1] = originalArray[i3 + 1];
        newArray[i3 + 2] = originalArray[i3 + 2];
      } else {
        const randomIndex = Math.floor(position.count * Math.random()) * 3;
        newArray[i3 + 0] = originalArray[randomIndex + 0];
        newArray[i3 + 1] = originalArray[randomIndex + 1];
        newArray[i3 + 2] = originalArray[randomIndex + 2];
      }
    }

    particlesPositions.push(new THREE.Float32BufferAttribute(newArray, 3));
  }

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Materials
    particleMorphingMaterialRef.current.uniforms.uResolution.value.set(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    );

    // // Update camera
    // camera.aspect = sizes.width / sizes.height
    // camera.updateProjectionMatrix()
  });

  const ParticleMorphingMaterial = shaderMaterial(
    {
      uSize: 0.03,
      uResolution: new THREE.Vector2(
        sizes.width * sizes.pixelRatio,
        sizes.height * sizes.pixelRatio
      ),
      uProgress: 0,
      // uColorA: new THREE.Color("#ff7300"),
      // uColorB: new THREE.Color("#0091ff"),
      uColorA: new THREE.Color("#FF8000"),
      uColorB: new THREE.Color("#0091ff"),
    },
    vertexShader,
    fragmentShader
  );
  // declaratively
  extend({ ParticleMorphingMaterial });
  // Geometry
  const sizesArray = new Float32Array(particlesMaxCount);

  for (let i = 0; i < particlesMaxCount; i++) sizesArray[i] = Math.random();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", particlesPositions[0]);
  geometry.setAttribute("aPositionTarget", particlesPositions[1]);
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));
  return (
    <points geometry={geometry}>
      <particleMorphingMaterial
        ref={particleMorphingMaterialRef}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleMorphing;

// import React, { useRef, useEffect, useMemo } from "react";
// import * as THREE from "three";
// import { shaderMaterial, useGLTF } from "@react-three/drei";
// import { useThree, extend } from "@react-three/fiber";

// // Import your shaders and other necessary files
// import vertexShader from "../shaders/particleMorphing/vertex.glsl";
// import fragmentShader from "../shaders/particleMorphing/fragment.glsl";
// import { animateProgression } from "../utils";

// const ParticleMorphing = () => {
//   const { size } = useThree();
//   const pointsRef = useRef();
//   const particleMorphingMaterialRef = useRef();

//   // GLTF model loading
//   const gltf = useGLTF("/models/EurekaWorks.glb");
//   const positions = gltf.scene.children.map((child) => child.geometry.attributes.position);
//   let particlesMaxCount = 0;
//   for (const position of positions) {
//     if (position.count > particlesMaxCount) {
//       particlesMaxCount = position.count;
//     }
//   }
//   let particlesPositions = [];
//   for (const position of positions) {
//     const originalArray = position.array;
//     const newArray = new Float32Array(particlesMaxCount * 3);
//     for (let i = 0; i < particlesMaxCount; i++) {
//       const i3 = i * 3;
//       if (i3 < originalArray.length) {
//         newArray[i3 + 0] = originalArray[i3 + 0];
//         newArray[i3 + 1] = originalArray[i3 + 1];
//         newArray[i3 + 2] = originalArray[i3 + 2];
//       } else {
//         const randomIndex = Math.floor(position.count * Math.random()) * 3;
//         newArray[i3 + 0] = originalArray[randomIndex + 0];
//         newArray[i3 + 1] = originalArray[randomIndex + 1];
//         newArray[i3 + 2] = originalArray[randomIndex + 2];
//       }
//     }
//     particlesPositions.push(new THREE.Float32BufferAttribute(newArray, 3));
//   }

//   // Sizes
//   const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     pixelRatio: Math.min(window.devicePixelRatio, 2),
//   };

//   // Resize event listener
//   useEffect(() => {
//     const handleResize = () => {
//       sizes.width = window.innerWidth;
//       sizes.height = window.innerHeight;
//       sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
//       particleMorphingMaterialRef.current.uniforms.uResolution.value.set(
//         sizes.width * sizes.pixelRatio,
//         sizes.height * sizes.pixelRatio
//       );
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // ParticleMorphingMaterial shader
//   const ParticleMorphingMaterial = shaderMaterial(
//     {
//       uSize: 0.03,
//       uResolution: new THREE.Vector2(
//         sizes.width * sizes.pixelRatio,
//         sizes.height * sizes.pixelRatio
//       ),
//       uProgress: 0,
//       // uColorA: new THREE.Color("#ff7300"),
//       // uColorB: new THREE.Color("#0091ff"),
//       uColorA: new THREE.Color("#FF8000"),
//       uColorB: new THREE.Color("#6eb7ff"),
//     },
//     vertexShader,
//     fragmentShader
//   );
//   extend({ ParticleMorphingMaterial });

//   // Geometry setup
//   const sizesArray = new Float32Array(particlesMaxCount);
//   for (let i = 0; i < particlesMaxCount; i++) sizesArray[i] = Math.random();
//   const geometry = new THREE.BufferGeometry();
//   geometry.setAttribute("position", particlesPositions[0]);
//   geometry.setAttribute("aPositionTarget", particlesPositions[1]);
//   geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));

//   //Responsive Scale
//   const ratioScale = useMemo(() => {
//     return Math.min(1.2, Math.max(0.5, size.width / 1280));
//   }, [size.width]);

//   // Auto morphing and disappearance
//   useEffect(() => {
//     const autoMorphingTimeout = setTimeout(() => {
//       animateProgression(
//         particleMorphingMaterialRef.current.uniforms.uProgress,
//         pointsRef.current,
//         particleMorphingMaterialRef.current
//       );
//     }, 0); // Adjust delay as needed
//     return () => clearTimeout(autoMorphingTimeout);
//   }, []);

//   // Render
//   return (
//     <points geometry={geometry} ref={pointsRef} scale={ratioScale}>
//       <particleMorphingMaterial
//         ref={particleMorphingMaterialRef}
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   );
// };

// export default ParticleMorphing;
