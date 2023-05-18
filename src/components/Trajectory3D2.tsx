import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts-gl";

interface Points {
    points: Array<number[]>;
}
interface Props {
    trajectorys: Array<string>;
}
export default function Trajectory3D2({ trajectorys }: Props) {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const myCharts = container.current && echarts.init(container.current);
        const data = trajectorys.map((s) => {
            let arr = s.split(" ");
            return [parseFloat(arr[1]), parseFloat(arr[2]), parseFloat(arr[3])];
        });
        // let data = [];
        // // Parametric curve
        // for (let t = 0; t < 25; t += 0.001) {
        //     let x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
        //     let y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
        //     let z = t + 2.0 * Math.sin(75 * t);
        //     data.push([x, y, z]);
        // }
        let option = {
            tooltip: {},
            backgroundColor: "#fff",
            visualMap: {
                show: false,
                dimension: 2,
                min: 0,
                max: 1,
                inRange: {
                    color: [
                        "#313695",
                        "#4575b4",
                        "#74add1",
                        "#abd9e9",
                        "#e0f3f8",
                        "#ffffbf",
                        "#fee090",
                        "#fdae61",
                        "#f46d43",
                        "#d73027",
                        "#a50026",
                    ],
                },
            },
            xAxis3D: {
                type: "value",
            },
            yAxis3D: {
                type: "value",
            },
            zAxis3D: {
                type: "value",
            },
            grid3D: {
                viewControl: {
                    projection: "orthographic",
                },
            },
            series: [
                {
                    type: "line3D",
                    data: data,
                    lineStyle: {
                        width: 4,
                    },
                },
            ],
        };

        option && myCharts!.setOption(option);
    }, []);
    return (
        <div
            ref={container}
            className="w-screen h-screen"
            style={{ width: "500px", height: "500px" }}
        ></div>
    );
}
