import { Instance, Instances } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Shoe({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const [newPosition, setPosition] = useState<[number, number, number]>(position || [0, 0, 0]);
  const ref = useRef(null);

  const color = useMemo(() => {
    const hue = Math.random() * 360; // 색상 (0~360도)
    const saturation = 70 + Math.random() * 30; // 채도 (70~100%)
    const lightness = 50 + Math.random() * 10; // 밝기 (50~60%)
    return new THREE.Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isActive && ref.current) {
        setPosition((prevPosition) => {
          const { key } = event;
          if (key === "ArrowUp")
            return [prevPosition[0], prevPosition[1] + 1, prevPosition[2]];
          if (key === "ArrowDown")
            return [prevPosition[0], prevPosition[1] - 1, prevPosition[2]];
          if (key === "ArrowLeft")
            return [prevPosition[0] - 1, prevPosition[1], prevPosition[2]];
          if (key === "ArrowRight")
            return [prevPosition[0] + 1, prevPosition[1], prevPosition[2]];
          if (key === " ") return [0, 0, 0];
          return prevPosition;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return (
    <group ref={ref} position={newPosition}>
      <Instance color={isActive ? "black" : color} />
    </group>
  );
}

export function Boxes({ data }: { data: number[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      console.log(event.key);
      if (key === "Enter") {
        setActiveIndex(0);
      }
      // if (key === "ArrowDown")
      //   return [prevPosition[0], prevPosition[1] - 0.5, prevPosition[2]];
      // if (key === "ArrowLeft")
      //   return [prevPosition[0] - 0.5, prevPosition[1], prevPosition[2]];
      // if (key === "ArrowRight")
      //   return [prevPosition[0] + 0.5, prevPosition[1], prevPosition[2]];
      // if (key === " ") return [0, 0, 0];
      // return prevPosition;
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <Instances
      limit={1000} // Max instances
      range={1000}
    >
      <boxGeometry />
      <meshStandardMaterial />
      {/* <Select box multiple onChange={console.log} filter={(items) => items}> */}
      {data.map((_: unknown, i: number) => (
        <Shoe
          key={i}
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
          ]}
          isActive={i == activeIndex}
        />
      ))}
      {/* </Select> */}
    </Instances>
  );
}
