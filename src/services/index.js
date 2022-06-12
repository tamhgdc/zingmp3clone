import { useEffect, useState } from 'react';
import { URL } from '~/url';

function GetHomePage1() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        fetch(`${URL}home/1`)
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
        fetch(`${URL}home/2`)
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
        fetch(`${URL}home/3`)
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
        fetch(`${URL}chart-home`)
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
        fetch(`${URL}getNewReleaseChart`)
            .then((res) => res.json())
            .then((data) => {
                setNewMusic(data.data);
            });
    }, []);
    return newMusic;
}

function GetTop100() {
    const [top100, setTop100] = useState([]);
    useEffect(() => {
        fetch(`${URL}getTop100`)
            .then((res) => res.json())
            .then((data) => {
                setTop100(data.data);
            });
    }, []);
    return top100;
}

export { GetHomePage1, GetHomePage2, GetHomePage3, GetChart, GetNewMusic, GetTop100 };
