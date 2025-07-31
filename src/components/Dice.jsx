import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default function Dice({ value }) {
  const mesh = useRef();
  const targetRotation = useRef(new THREE.Euler());

  const textures = useLoader(THREE.TextureLoader, [
    '/textures/dice1.png',
    '/textures/dice2.png',
    '/textures/dice3.png',
    '/textures/dice4.png',
    '/textures/dice5.png',
    '/textures/dice6.png',
  ]);

  textures.forEach(tex => tex.colorSpace = THREE.SRGBColorSpace);

  const materials = [
    new THREE.MeshStandardMaterial({ map: textures[2] }),
    new THREE.MeshStandardMaterial({ map: textures[3] }),
    new THREE.MeshStandardMaterial({ map: textures[0] }),
    new THREE.MeshStandardMaterial({ map: textures[1] }),
    new THREE.MeshStandardMaterial({ map: textures[4] }),
    new THREE.MeshStandardMaterial({ map: textures[5] }),
  ];

  const rotationMap = {
    1: [0, 0, 0],
    2: [Math.PI, 0, 0],
    3: [0, 0, Math.PI / 2],
    4: [0, 0, -Math.PI / 2],
    5: [-Math.PI / 2, 0, 0],
    6: [Math.PI / 2, 0, 0],
  };

  useEffect(() => {
    const [rx, ry, rz] = rotationMap[value];
    targetRotation.current.set(rx, ry, rz);
  }, [value]);

  useFrame(() => {
    if (!mesh.current) return;

    // Interpolation simple vers la rotation cible
    mesh.current.rotation.x += (targetRotation.current.x - mesh.current.rotation.x) * 0.2;
    mesh.current.rotation.y += (targetRotation.current.y - mesh.current.rotation.y) * 0.2;
    mesh.current.rotation.z += (targetRotation.current.z - mesh.current.rotation.z) * 0.2;
  });

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
