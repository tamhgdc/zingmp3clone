import React, { useContext, useState } from 'react';

import secondsToHms from '~/component/FCTime';
import { GetChart } from '~/services';
import Context from '~/context/context';
import './zingchart.css';

import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
Chart.register(CategoryScale);

function ZingChart() {
    const context = useContext(Context);

    document.title = '#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại';

    let chart = GetChart();

    let times = [];

    let values = [];

    let datas = [];
    if (chart.length !== 0) {
        const items2 = chart.RTChart.chart.items;
        for (let i = 0; i < chart.RTChart.chart.times.length; i++) {
            times.push(chart.RTChart.chart.times[i].hour);
        }

        for (let i = 0; i < Object.keys(items2).length; i++) {
            for (let j = 0; j < Object.values(items2)[i].length; j++) {
                values.push(Object.values(items2)[i][j].counter);
            }
            const color = ['#4A90E2', '#27BD9C', '#E35050'];
            datas.push({
                label: chart.RTChart.items[i].title,
                borderColor: color[i],
                data: values.splice(0, 24),
                tension: 0.4,
                backgroundColor: color[i],
                pointRadius: 3,
                pointHoverRadius: 8,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 2,
                pointBorderColor: '#fff',
                showLine: true,
            });
        }
    }

    const state = {
        labels: times,
        datasets: datas,
    };

    const handelPlay = (index) => {
        context.setCheckPlaySong(true);
        context.addSongList(chart.RTChart.items);
        context.playSong();
        context.currentSong(index);

        FCSaveLocalList(chart.RTChart.items);
        FCSaveLocalIndex(index);
    };

    const handlePlayAll = () => {
        context.setCheckPlaySong(true);
        context.addSongList(chart.RTChart.items);
        context.playSong();
        context.currentSong(0);

        FCSaveLocalList(chart.RTChart.items);
        FCSaveLocalIndex(0);
    };

    const [view100, setView100] = useState(false);

    const handleView100 = () => {
        return (
            <>
                {chart.length !== 0 &&
                    chart.RTChart.items.map((item, index) => {
                        let time = secondsToHms(item.duration);
                        return (
                            <div
                                className={
                                    context.indexSong === index && context.songList[0][index].encodeId === item.encodeId
                                        ? 'list-album-item songActive'
                                        : 'list-album-item'
                                }
                                key={index}
                                onClick={() => {
                                    handelPlay(index);
                                }}
                            >
                                <div className="list-album-song-name song-album-item">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="zingchart__top">
                                            <h1
                                                className={
                                                    index === 0
                                                        ? 'zingchart__top-num top1'
                                                        : index === 1
                                                        ? 'zingchart__top-num top2'
                                                        : index === 2
                                                        ? 'zingchart__top-num top3'
                                                        : 'zingchart__top-num'
                                                }
                                            >
                                                {index + 1}
                                            </h1>{' '}
                                            {item.rakingStatus !== 0 ? (
                                                <div className="zingchart__top-rakingStatus">
                                                    <div
                                                        className={
                                                            item.rakingStatus > 0
                                                                ? 'zingchart__top-statusRaking'
                                                                : 'zingchart__top-statusRaking negative'
                                                        }
                                                    ></div>
                                                    <h3>{Math.abs(item.rakingStatus)}</h3>
                                                </div>
                                            ) : (
                                                <i className="icon zingchart__top-icon grey ic-balance"></i>
                                            )}
                                        </div>
                                        <img className="song-album-item-img" src={item.thumbnailM} alt="" />
                                    </div>
                                    <div className="detail">
                                        <span style={{ color: 'white', marginBottom: '5px' }}>{item.title}</span>
                                        <span>{item.artistsNames}</span>
                                    </div>
                                </div>
                                <div className="list-albums-album">
                                    <span>{item.album ? item.album.title : null}</span>
                                </div>
                                <div className="list-albums-time">
                                    <span>{time}</span>
                                </div>
                            </div>
                        );
                    })}
            </>
        );
    };

    const handleView10 = () => {
        return (
            <>
                {chart.length !== 0 &&
                    chart.RTChart.items.slice(0, 10).map((item, index) => {
                        let time = secondsToHms(item.duration);
                        return (
                            <div
                                className={
                                    context.indexSong === index && context.songList[0][index].encodeId === item.encodeId
                                        ? 'list-album-item songActive'
                                        : 'list-album-item'
                                }
                                key={index}
                                onClick={() => {
                                    handelPlay(index);
                                }}
                            >
                                <div className="list-album-song-name song-album-item">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="zingchart__top">
                                            <h1
                                                className={
                                                    index === 0
                                                        ? 'zingchart__top-num top1'
                                                        : index === 1
                                                        ? 'zingchart__top-num top2'
                                                        : index === 2
                                                        ? 'zingchart__top-num top3'
                                                        : 'zingchart__top-num'
                                                }
                                            >
                                                {index + 1}
                                            </h1>
                                            {item.rakingStatus !== 0 ? (
                                                <div className="zingchart__top-rakingStatus">
                                                    <div
                                                        className={
                                                            item.rakingStatus > 0
                                                                ? 'zingchart__top-statusRaking'
                                                                : 'zingchart__top-statusRaking negative'
                                                        }
                                                    ></div>
                                                    <h3>{Math.abs(item.rakingStatus)}</h3>
                                                </div>
                                            ) : (
                                                <i className="icon zingchart__top-icon grey ic-balance"></i>
                                            )}
                                        </div>
                                        <img className="song-album-item-img" src={item.thumbnailM} alt="" />
                                    </div>
                                    <div className="detail">
                                        <span style={{ color: 'white', marginBottom: '5px' }}>{item.title}</span>
                                        <span>{item.artistsNames}</span>
                                    </div>
                                </div>
                                <div className="list-albums-album">
                                    <span>{item.album ? item.album.title : null}</span>
                                </div>
                                <div className="list-albums-time">
                                    <span>{time}</span>
                                </div>
                            </div>
                        );
                    })}
            </>
        );
    };

    const renderChart = () => {
        return (
            <div className="zing-chart">
                <div className="zing-chart-canvas">
                    <Line
                        data={state}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                },
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                            },
                            interaction: {
                                intersect: false,
                            },
                            scales: {
                                x: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Time ( hour)',
                                        color: 'white',
                                    },
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                                y: {
                                    display: false,
                                    title: {
                                        display: false,
                                    },
                                    suggestedMin: 0,
                                },
                            },
                            chartArea: {
                                backgroundColor: 'rgba(251, 85, 85, 0.4)',
                            },
                        }}
                    />
                </div>

                <div className="zingchart__list">
                    {view100 ? handleView100() : handleView10()}
                    {!view100 ? (
                        <button onClick={() => setView100(!view100)} className="btn-show-more-song">
                            Xem top 100
                        </button>
                    ) : (
                        <button onClick={() => setView100(!view100)} className="btn-show-more-song">
                            Ẩn top 100
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const loadings = () => {
        return <div style={{ width: '100%', height: '400px', marginTop: '15px' }} className="loading"></div>;
    };

    return (
        <div className="zing-chart">
            {chart.length !== 0 && (
                <>
                    <div className="new-music-bg"></div>
                    <div className="bg-alpha"></div>
                    <div className="bg-alpha-1"></div>
                </>
            )}
            <div className="zingchart__header">
                <h2 className="zingchart__title">#zingchart</h2>
                <i onClick={handlePlayAll} className="icon zingchart__header-icon ic-play"></i>
            </div>
            {chart.length !== 0 ? renderChart() : loadings()}
        </div>
    );
}

export default ZingChart;
