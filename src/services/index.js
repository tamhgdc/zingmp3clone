import { useEffect, useState } from 'react';

function GetHomePage1() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/home/1')
            .then((res) => res.json())
            .then((data) => {
                setDatas(data.data.items);
            });
    }, []);
    return datas;
}

function GetHomePage2() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/home/2')
            .then((res) => res.json())
            .then((data) => {
                setDatas(data.data.items);
            });
    }, []);
    return datas;
}

function GetHomePage3() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/home/3')
            .then((res) => res.json())
            .then((data) => {
                setDatas(data.data.items);
            });
    }, []);
    return datas;
}

function GetChart() {
    const [chart, setChart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/chart-home')
            .then((res) => res.json())
            .then((data) => {
                setChart(data.data);
            });
    }, []);
    return chart;
}

function GetNewMusic() {
    const [newMusic, setNewMusic] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/getNewReleaseChart')
            .then((res) => res.json())
            .then((data) => {
                setNewMusic(data.data);
            });
    }, []);
    return newMusic;
}

export { GetHomePage1, GetHomePage2, GetHomePage3, GetChart, GetNewMusic };
