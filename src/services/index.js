import { useEffect, useState } from 'react';
import { URL } from '~/url';
import axios from 'axios';

function GetHomePage1() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        axios.get(`${URL}home/1`).then(({ data }) => {
            setDatas(data.data.items);
        });
    }, []);
    return datas;
}

function GetHomePage2() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        axios.get(`${URL}home/2`).then(({ data }) => {
            setDatas(data.data.items);
        });
    }, []);
    return datas;
}

function GetHomePage3() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        axios.get(`${URL}home/3`).then(({ data }) => {
            setDatas(data.data.items);
        });
    }, []);
    return datas;
}

function GetChart() {
    const [chart, setChart] = useState([]);
    useEffect(() => {
        axios.get(`${URL}chart-home`).then(({ data }) => {
            setChart(data.data);
        });
    }, []);
    return chart;
}

function GetNewMusic() {
    const [newMusic, setNewMusic] = useState([]);
    useEffect(() => {
        axios.get(`${URL}getNewReleaseChart`).then(({ data }) => {
            setNewMusic(data.data);
        });
    }, []);
    return newMusic;
}

function GetTop100() {
    const [top100, setTop100] = useState([]);
    useEffect(() => {
        axios.get(`${URL}getTop100`).then(({ data }) => {
            setTop100(data.data);
        });
    }, []);
    return top100;
}

function GetRecommend() {
    const [recommend, setRecommend] = useState([]);
    useEffect(() => {
        axios.get(`${URL}recommend-keyword`).then(({ data }) => {
            setRecommend(data.data);
        });
    }, []);
    return recommend;
}

export { GetHomePage1, GetHomePage2, GetHomePage3, GetChart, GetNewMusic, GetTop100, GetRecommend };
