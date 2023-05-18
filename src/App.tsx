import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { getVersion } from "@tauri-apps/api/app";
import { Table, DatePicker, Button, Space } from "antd";
import Trajectory3D from "./components/Trajectory3D";
import Trajectory3D2 from "./components/Trajectory3D2";

interface DataType {
    time: string;
    x: string;
    y: string;
    z: string;
    q: string;
}

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const [appVersion, setAppVersion] = useState("");
    const [trajectorys, setTra] = useState<Array<DataType>>([]);
    const [rawData, setRawData] = useState<Array<string>>([]);

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
        await invoke("ping");
        const appversion = await getVersion();
        // console.log(res);
        setTra(await invoke("read_trajectory"));

        console.log(appversion);
        setAppVersion(appversion);
    }

    useEffect(() => {
        (async () => {
            const trajects: Array<string> = await invoke("read_trajectory");
            setRawData(trajects);
            let columns: Array<DataType> = [];
            trajects.forEach((s) => {
                let arr = s.split(" ");
                columns.push({
                    time: parseFloat(arr[0]).toFixed(2),
                    x: parseFloat(arr[5]).toFixed(2),
                    y: parseFloat(arr[6]).toFixed(2),
                    z: parseFloat(arr[7]).toFixed(2),
                    q: arr
                        .slice(1, 5)
                        .map((e) => parseFloat(e).toFixed(4))
                        .join(","),
                });
            });
            setTra(columns);
        })();
    }, []);

    return (
        <div className="flex flex-col pt-8 w-full h-screen justify-center items-center">
            {/* <Table
                columns={[
                    {
                        title: "TimeStamp",
                        dataIndex: "time",
                        key: "time",
                    },
                    {
                        title: "x",
                        dataIndex: "x",
                        key: "x",
                    },
                    {
                        title: "y",
                        dataIndex: "y",
                        key: "y",
                    },
                    {
                        title: "z",
                        dataIndex: "z",
                        key: "z",
                    },
                    {
                        title: "q",
                        dataIndex: "q",
                        key: "q",
                    },
                ]}
                dataSource={trajectorys}
                bordered
                title={() => <h2 className="text-center">Trajectorys</h2>}
            /> */}

            <Trajectory3D2 trajectorys={rawData} />
        </div>
    );
}

export default App;
