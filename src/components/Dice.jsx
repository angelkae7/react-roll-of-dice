import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function Dice({ value }) {
  const mesh = useRef();

  const textures = useLoader(THREE.TextureLoader, [
    '/textures/dice1.png', // haut
    '/textures/dice2.png', // bas
    '/textures/dice3.png', // droite
    '/textures/dice4.png', // gauche
    '/textures/dice5.png', // devant
    '/textures/dice6.png'  // derrière
  ]);

  textures.forEach(tex => tex.colorSpace = THREE.SRGBColorSpace);

  const materials = [
    new THREE.MeshStandardMaterial({ map: textures[2] }),  
    new THREE.MeshStandardMaterial({ map: textures[3] }), 
    new THREE.MeshStandardMaterial({ map: textures[0] }), 
    new THREE.MeshStandardMaterial({ map: textures[1] }),  
    new THREE.MeshStandardMaterial({ map: textures[4] }),  
    new THREE.MeshStandardMaterial({ map: textures[5] })  
  ];

  const targetRotations = {
    1: [0, 0, 0],
    2: [Math.PI, 0, 0],
    3: [0, 0, Math.PI / 2],
    4: [0, 0, -Math.PI / 2],
    5: [-Math.PI / 2, 0, 0],
    6: [Math.PI / 2, 0, 0],
  };

  useEffect(() => {
    const [rx, ry, rz] = targetRotations[value];
    mesh.current.rotation.set(rx, ry, rz);
  }, [value]);

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
