import axios from 'axios';
import { useEffect } from 'react';
import Loading from '~/component/FCLoading';
import ScrollLoadPage from '~/component/FCScrollLoadPage';
import { useDebounce } from '~/hooks';
import { URL } from '~/url';

function Video({ context, loading, setLoading, dataList, setDataList }) {
    const debouncedValue = useDebounce(context.inputSearch, 500);

    let indexPage = 1;

    useEffect(() => {
        if (context.inputSearch.length === 0) {
            context.setKeywordSearch(decodeURI(window.location.pathname.split('/')[3]));
            context.setInputSearch(decodeURI(window.location.pathname.split('/')[3]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadDataVideo = () => {
        if (debouncedValue.length === 0) {
            setDataList([]);
            return;
        }
        setLoading(true);
        axios
            .get(`${URL}searchAllVideo/${debouncedValue}/${indexPage}/10`)
            .then(({ data }) => {
                const newdata = [];
                if (data.data.items !== undefined) {
                    data.data.items.map((item) => newdata.push(item));
                    setDataList((prev) => [...prev, ...newdata]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        indexPage++;
    };

    ScrollLoadPage(loadDataVideo);

    const audio = document.querySelector('audio');

    const handleMV = (encodeId) => {
        document.querySelector('.modalMV').style.top = '0';
        document.querySelector('.modalMV-bg-opacity').style.top = '0';
        context.pauseSong();
        context.setCheckPlaySong(false);
        if (audio !== null) {
            audio.pause();
        }

        context.setEncodeIdMV(encodeId);
    };

    return (
        <>
            {dataList !== undefined && dataList.length !== 0 && (
                <div className="songResult">
                    <h3 className="songResult-title">MV</h3>
                    <div className="row MV-content">
                        {dataList.map((item, index) => {
                            return (
                                <div key={index} className="col sm_gutter l_4 m_6 c_12 render-MV-item">
                                    <div className="MV-img">
                                        <img src={item.thumbnailM} alt="" />
                                        <div
                                            className="MV-hover"
                                            onClick={() => {
                                                if (item.streamingStatus !== 2) {
                                                    handleMV(item.encodeId);
                                                } else {
                                                    alert('Cần nâng tài khoản VIP để xem');
                                                }
                                            }}
                                        >
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
                </div>
            )}

            {loading && dataList.length !== 0 && <Loading height="unset" />}
        </>
    );
}

export default Video;
