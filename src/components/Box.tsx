import { Edges } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Box(props: ThreeElements["mesh"]) {
  const [position, setPosition] = useState<[number, number, number]>(() => {
    const initial = props.position;
    if (initial instanceof THREE.Vector3) return [initial.x, initial.y, initial.z];
    if (typeof initial === "number") return [initial, initial, initial];
    return initial ? [initial[0], initial[1], initial[2]] : [0, 0, 0];
  });
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPosition((prevPosition) => {
        const { key } = event;

        if (key === "ArrowUp")
          return [prevPosition[0], prevPosition[1] + 0.5, prevPosition[2]];
        if (key === "ArrowDown")
          return [prevPosition[0], prevPosition[1] - 0.5, prevPosition[2]];
        if (key === "ArrowLeft")
          return [prevPosition[0] - 0.5, prevPosition[1], prevPosition[2]];
        if (key === "ArrowRight")
          return [prevPosition[0] + 0.5, prevPosition[1], prevPosition[2]];
        if (key === " ") return [0, 0, 0];
        return prevPosition;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <mesh {...props} position={position} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
      <Edges color="black" />
    </mesh>
  );
}
