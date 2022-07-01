// import Loading from '~/component/LoadingListMV/loading';

import Loading from '~/component/FCLoading';

function Content({ dataMV, context, audio, loading }) {
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
            <div className="row MV-content">
                {dataMV !== undefined &&
                    dataMV.map((item, index) => {
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

            {loading && <Loading height="unset" />}
        </>
    );
}

export default Content;
