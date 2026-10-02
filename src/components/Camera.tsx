import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera as PC } from "three";
import * as THREE from "three";

let angle = 0; // 회전 각도 (라디안)
const radius = 20; 

export default function Camera() {
  const ref = useRef<PC | null>(null);

  const cameraPosition = useRef(new THREE.Vector3(20, 10, 20));

  const [, setKeys] = useState<{ [key: string]: boolean }>({
    r: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r") {
        setKeys((prev) => ({ ...prev, r: true }));
      }
      if (e.key === "e") {
        setKeys((prev) => ({ ...prev, e: true }));
        console.log(e.key, cameraPosition.current);
        cameraPosition.current.set(20, 10, 20);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "r") setKeys((prev) => ({ ...prev, r: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(function renderCallback() {
    if (ref.current === null) {
      return;
    }
    // if (keys.r) {

      angle += 0.002;  // 회전 속도 조절 (속도에 맞게 값을 변경할 수 있음)
    
      // 카메라의 x, z 좌표를 원형 경로에 맞게 갱신
      cameraPosition.current.x = radius * Math.cos(angle);
      cameraPosition.current.z = radius * Math.sin(angle);
      // console.log(cameraPosition.current)
      // 카메라 위치로 부드럽게 이동
      if (!ref.current.position.equals(cameraPosition.current)) {
        ref.current.position.lerp(cameraPosition.current, 0.05);
      }
      // 중앙을 향해 바라보기
      ref.current.lookAt(0, 0, 0);
    
  });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={[20, 10, 20]}
      // fov={200}
      // rotation={[1, 1, 1]}
    />
  );
}
