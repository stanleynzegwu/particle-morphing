// import * as THREE from "three";
// import {shaderMaterial, useGLTF } from "@react-three/drei";
// import { useThree, extend} from "@react-three/fiber";
// import vertexShader from "../shaders/particleMorphing/vertex.glsl";
// import fragmentShader from "../shaders/particleMorphing/fragment.glsl";
// import {useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// const ParticleMorphing = () => {
//   const { viewport } = useThree();
//   const particleMorphingMaterialRef = useRef();

//   /** GSAP */
//   const tl = gsap.timeline();
//   gsap.registerPlugin(ScrollTrigger);
//   useGSAP(() => {
//     new ScrollTrigger({});

//     tl.to(particleMorphingMaterialRef.current.uniforms.uProgress, {
//       value: 1,
//       scrollTrigger: {
//         trigger: ".section1",
//         start: "center top",
//         end: "bottom top",
//         scrub: true,
//         immediateRender: false,
//         markers: true,
//       },
//     });
//   }, []);

//   const gltf = useGLTF("/models/EurekaWorks.glb");
//   // Positions
//   const positions = gltf.scene.children.map((child) => child.geometry.attributes.position);
//   // console.log(positions);
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

//   /**
//    * Sizes
//    */
//   const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     pixelRatio: Math.min(window.devicePixelRatio, 2),
//   };

//   window.addEventListener("resize", () => {
//     // Update sizes
//     sizes.width = window.innerWidth;
//     sizes.height = window.innerHeight;
//     sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

//     // Materials
//     particleMorphingMaterialRef.current.uniforms.uResolution.value.set(
//       sizes.width * sizes.pixelRatio,
//       sizes.height * sizes.pixelRatio
//     );

//     // // Update camera
//     // camera.aspect = sizes.width / sizes.height
//     // camera.updateProjectionMatrix()
//   });

//   const ParticleMorphingMaterial = shaderMaterial(
//     {
//       uSize: 0.03,
//       uResolution: new THREE.Vector2(
//         sizes.width * sizes.pixelRatio,
//         sizes.height * sizes.pixelRatio
//       ),
//       uProgress: 0,
//     },
//     vertexShader,
//     fragmentShader
//   );
//   // declaratively
//   extend({ ParticleMorphingMaterial });
//   // Geometry
//   const geometry = new THREE.BufferGeometry();
//   geometry.setAttribute("position", particlesPositions[0]);
//   geometry.setAttribute("aPositionTarget", particlesPositions[1]);
//   // geometry.setIndex(null);
//   return (
//     <>
//       {/* <Box scale={5}>
//         <meshBasicMaterial color={"#00FF00"} />
//       </Box> */}
//       <points geometry={geometry}>
//         <particleMorphingMaterial
//           ref={particleMorphingMaterialRef}
//           blending={THREE.AdditiveBlending}
//           depthWrite={false}
//         />
//       </points>
//     </>
//   );
// };

// export default ParticleMorphing;

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

  const gltf = useGLTF("/models/EurekaWorks3.glb");
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
      uColorB: new THREE.Color("##FF0000"),
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
  geometry.setAttribute("position", particlesPositions[1]);
  geometry.setAttribute("aPositionTarget", particlesPositions[0]);
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));
  // geometry.setIndex(null);
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
