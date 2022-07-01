import { useContext, useEffect, useState } from 'react';
import { URL } from '~/url';
import axios from 'axios';
import Context from '~/context/context';

function GetHomePage() {
    const context = useContext(Context);

    const [datas, setDatas] = useState([]);
    useEffect(() => {
        if (context.dataHome.length === 0) {
            axios.get(`${URL}home`).then(({ data }) => {
                setDatas([data.data.items]);
                context.setDataHome(data.data.items);
            });
        } else {
            setDatas([context.dataHome]);
        }
    }, []);
    return datas;
}

function GetChart() {
    const context = useContext(Context);
    const [chart, setChart] = useState([]);
    useEffect(() => {
        if (context.dataChart.length === 0) {
            axios.get(`${URL}chart-home`).then(({ data }) => {
                setChart(data.data);
                context.setDataChart(data.data);
            });
        } else {
            setChart(context.dataChart);
        }
    }, []);
    return chart;
}

function GetNewMusic() {
    const [newMusic, setNewMusic] = useState([]);
    const context = useContext(Context);
    useEffect(() => {
        if (context.dataNewSong.length === 0) {
            axios.get(`${URL}getNewReleaseChart`).then(({ data }) => {
                setNewMusic(data.data);
                context.setDataNewSong(data.data);
            });
        } else {
            setNewMusic(context.dataNewSong);
        }
    }, []);
    return newMusic;
}

function GetTop100() {
    const context = useContext(Context);
    const [top100, setTop100] = useState([]);
    useEffect(() => {
        if (context.dataTop100.length === 0) {
            axios.get(`${URL}getTop100`).then(({ data }) => {
                setTop100(data.data);
                context.setDataTop100(data.data);
            });
        } else {
            setTop100(context.dataTop100);
        }
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

export { GetHomePage, GetChart, GetNewMusic, GetTop100, GetRecommend };
