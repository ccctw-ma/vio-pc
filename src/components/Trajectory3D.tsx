import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Box from "./Box";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Props {
    trajectorys: Array<string>;
}
interface Points {
    points: Array<number[]>;
}

function PointCloud({ points }: Points) {
    const numPoints = points.length; // 点的数量
    const positions = new Float32Array(numPoints * 3); // 存储点的位置
    const colors = new Float32Array(numPoints * 3); // 存储点的颜色

    // 随机生成点的位置和颜色
    for (let i = 0; i < numPoints; i++) {
        positions[i * 3] = points[i][0]; // x 坐标
        positions[i * 3 + 1] = points[i][1]; // y 坐标
        positions[i * 3 + 2] = points[i][2]; // z 坐标
        colors[i * 3] = Math.random(); // 红色通道
        colors[i * 3 + 1] = Math.random(); // 绿色通道
        colors[i * 3 + 2] = Math.random(); // 蓝色通道
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
    });

    return <points geometry={geometry} material={material} />;
}

export default function Trajectory3D({ trajectorys }: Props) {
    const camera = React.useRef<THREE.PerspectiveCamera>(null);
    const controls = useRef<OrbitControls>(null);

    useEffect(() => {
        if (camera.current && controls.current) {
            controls.current.target.set(0, 0, 0); // 设置控制目标点，即相机注视的点
            controls.current.update();
        }
    }, [camera]);

    const rows = trajectorys.map((s) => {
        let arr = s.split(" ");
        return {
            t: parseFloat(arr[0]),
            x: parseFloat(arr[5]),
            y: parseFloat(arr[6]),
            z: parseFloat(arr[7]),
            q1: parseFloat(arr[1]),
            q2: parseFloat(arr[2]),
            q3: parseFloat(arr[3]),
            q4: parseFloat(arr[4]),
        };
    });

    const points = rows.map((row) => [row.x, row.y, row.z]);
    console.log(points);

    return (
        <div className="w-full flex justify-center items-center">
            <Canvas
                camera={{ position: [10, 10, 10] }}
                style={{ height: "100vh", width: "100vw" }}
            >
                <pointLight position={[10, 10, 10]} />
                <PointCloud points={points} />
                <color attach="background" args={[0x000000]} />
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    );
}
