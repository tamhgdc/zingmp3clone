import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import Context from '~/context/context';
import { URL } from '~/url';
import './modalMV.scss';

function ModalMV() {
    const context = useContext(Context);
    const handleClose = () => {
        document.querySelector('.modalMV').style.top = '100vh';
        setDataMV([]);
        video.current.pause();
    };

    const [dataMV, setDataMV] = useState([]);

    const modalMV = useRef();
    const video = useRef();

    useEffect(() => {
        if (context.encodeIdMV.length !== 0) {
            axios
                .get(`${URL}getMV/${context.encodeIdMV}`)
                .then(({ data }) => {
                    setDataMV(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [context.encodeIdMV]);

    useEffect(() => {
        modalMV.current.style.backgroundImage = `url(${dataMV.thumbnailM})`;
    }, [dataMV]);

    const moreMVList = useRef();

    const handleChangeMV = (encodeId) => {
        context.setEncodeIdMV(encodeId);
    };

    return (
        <div className="modalMV">
            <div ref={modalMV} className="modalMV-bg">
                <div className="modalMV-bg-opacity"></div>
            </div>
            <div className="modalMV-header">
                <div className="MV-detail">
                    {dataMV.artists && <img src={dataMV.artists[0].thumbnailM} alt="" />}
                    <div className="MV-box-detail">
                        <span className="MV-title">{dataMV.title}</span>
                        <span className="MV-singer">
                            {dataMV.artists &&
                                dataMV.artists.map((x, i) =>
                                    dataMV.artists.length - 1 === i ? x.name : `${x.name}, `,
                                )}
                        </span>
                    </div>
                </div>
                <button className="btn-close-MV" onClick={() => handleClose()}>
                    <i className="icon ic-close"></i>
                </button>
            </div>
            <div className="modalMV-content">
                {dataMV.streaming && (
                    <video
                        ref={video}
                        className="modalMV-video"
                        controls
                        autoPlay
                        src={
                            dataMV.streaming.mp4['720p'] !== undefined
                                ? dataMV.streaming.mp4['720p']
                                : dataMV.streaming.mp4['480p'] !== undefined
                                ? dataMV.streaming.mp4['480p']
                                : dataMV.streaming.mp4['360p']
                        }
                    ></video>
                )}
                {dataMV.length !== 0 && (
                    <div className="more-MV">
                        <div className="more-MV-header">
                            <span>Danh Sách Gợi Ý</span>
                        </div>
                        <ul className="more-MV-list">
                            <li ref={moreMVList} className="more-MV-item active">
                                <div className="more-MV-item-img">
                                    <img src={dataMV.thumbnailM} alt="" />
                                    <div className="more-MV-item-hover active">
                                        <span>Đang Phát</span>
                                    </div>
                                </div>
                                <div className="more-MV-item-detail">
                                    <span className="more-MV-title">{dataMV.title}</span>
                                    <span className="more-MV-singer">
                                        {dataMV.artists &&
                                            dataMV.artists.map((x, i) =>
                                                dataMV.artists.length - 1 === i ? x.name : `${x.name}, `,
                                            )}
                                    </span>
                                </div>
                            </li>

                            {dataMV.recommends !== undefined &&
                                dataMV.recommends.map((item, index) => {
                                    return (
                                        <li key={index} className="more-MV-item">
                                            <div style={{ position: 'relative' }}>
                                                <img src={item.thumbnailM} alt="" />
                                                <div
                                                    onClick={() => handleChangeMV(item.encodeId)}
                                                    className="more-MV-item-hover"
                                                >
                                                    <img
                                                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.32/static/media/play.81e7696e.svg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="more-MV-item-detail">
                                                <span className="more-MV-title">{item.title}</span>
                                                <span className="more-MV-singer">
                                                    {item.artists &&
                                                        item.artists.map((x, i) =>
                                                            dataMV.artists.length - 1 === i ? x.name : `${x.name}, `,
                                                        )}
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalMV;
