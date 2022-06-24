import React, { useContext, useLayoutEffect, useState } from 'react';

import { GetChart } from '~/services';
import Context from '~/context/context';
import './zingchart.css';

import ChartRender from './component/chart';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import FCSaveLocalList from '~/component/FCSaveLocalList';
import FCSaveLocalIndex from '~/component/FCSaveLocalIndex';
import Top10 from './component/top10';
import Loading from '~/component/LoadingListSong/loading';
Chart.register(CategoryScale);

function ZingChart() {
    const context = useContext(Context);

    document.title = '#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại';

    let chart = GetChart();

    const handlePlayAll = () => {
        context.setCheckPlaySong(true);
        context.addSongList(chart.RTChart.items);
        context.playSong();
        context.currentSong(0);

        FCSaveLocalList(chart.RTChart.items);
        FCSaveLocalIndex(0);
    };

    const [slice, setSlice] = useState(10);

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        context.setInputSearch('');
    }, []);

    const renderChart = () => {
        return (
            <div className="zing-chart">
                <ChartRender chart={chart} />

                <div className="zingchart__list">
                    <Top10 chart={chart} context={context} slice={slice} />
                    {slice === 10 ? (
                        <button onClick={() => setSlice(100)} className="btn-show-more-song">
                            Xem top 100
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setSlice(10);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="btn-show-more-song"
                        >
                            Ẩn top 100
                        </button>
                    )}
                </div>
            </div>
        );
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
            {chart.length !== 0 ? renderChart() : <Loading />}
        </div>
    );
}

export default ZingChart;
