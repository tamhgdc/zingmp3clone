import axios from 'axios';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tabMV from '~/component/DataTitleMV';
import Context from '~/context/context';
import { URL } from '~/url';

import './mv.scss';

function MV() {
    const [activeTab, setActiveTab] = useState(0);

    const navigation = useNavigate();
    const context = useContext(Context);

    const tabItem = useRef();
    const lineTab = useRef();

    useLayoutEffect(() => {
        lineTab.current.style.left = tabItem.current.offsetLeft + 'px';
        lineTab.current.style.width = tabItem.current.offsetWidth + 'px';
    }, [tabItem, lineTab, activeTab]);

    const [code, setCode] = useState('IWZ9Z08I');
    const [link, setLink] = useState('viet-nam');

    const handleClickTab = (index, code, link) => {
        setActiveTab(index);
        setCode(code);
        setLink(link);
        setIndexPage(1);
        navigation(`/mv/${link}/${code}`);
    };

    const [dataMV, setDataMV] = useState([]);

    const [loading, setLoading] = useState(false);

    const [indexPage, setIndexPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${URL}listMV/${code}/${indexPage}/30`)
            .then(({ data }) => {
                setDataMV(data.data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code, indexPage]);

    const audio = document.querySelector('audio');

    const handleMV = (encodeId) => {
        document.querySelector('.modalMV').style.top = '0';
        document.querySelector('.modalMV-bg-opacity').style.top = '0';
        context.pauseSong();
        context.setCheckPlaySong(false);
        audio.pause();

        context.setEncodeIdMV(encodeId);
    };

    return (
        <div className="MV">
            <div className="MV-tab">
                {tabMV.map((item, index) => {
                    return (
                        <div
                            key={index}
                            ref={activeTab === index ? tabItem : null}
                            onClick={() => handleClickTab(index, item.code, item.link)}
                            className={activeTab === index ? 'tab-MV-item active' : 'tab-MV-item'}
                        >
                            {item.title}
                        </div>
                    );
                })}
                <div ref={lineTab} className="line-tab"></div>
            </div>
            <div className="row MV-content">
                {dataMV !== undefined &&
                    dataMV.map((item, index) => {
                        return (
                            <div key={index} className="col sm_gutter l_4 m_6 c_12 render-MV-item">
                                <div className="MV-img">
                                    <img src={item.thumbnailM} alt="" />
                                    <div className="MV-hover" onClick={() => handleMV(item.encodeId)}>
                                        <i className="icon icon-play-MV ic-play-circle-outline"></i>
                                    </div>
                                </div>
                                <div className="MV-detail">
                                    {item.artists && <img src={item.artists[0].thumbnailM} alt="" />}
                                    <div className="MV-box-detail">
                                        <span className="MV-title">{item.title}</span>
                                        <span className="MV-singer">
                                            {item.artists &&
                                                item.artists.map((x, i) =>
                                                    item.artists.length - 1 === i ? x.name : `${x.name}, `,
                                                )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="MV-control">
                <div
                    className="MV-btn"
                    onClick={() => {
                        if (indexPage > 1) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIndexPage(indexPage - 1);
                        }
                    }}
                >
                    <i className="icon ic-go-left"></i>
                </div>
                <div
                    className="MV-btn"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIndexPage(indexPage + 1);
                    }}
                >
                    <i className="icon ic-go-right"></i>
                </div>
            </div>
        </div>
    );
}

export default MV;
