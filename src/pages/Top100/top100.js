import { GetTop100 } from '~/services';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import './top100.css';
import renderSinger from '~/component/FCRenderSinger';
import { SVGTop100 } from '~/images';
import Context from '~/context/context';
import Loading from '~/component/LoadingListAlbum/loading';
import HandleLike from '~/component/HandleLike';

function Top100() {
    const navigate = useNavigate();
    const context = useContext(Context);
    const datas = GetTop100();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        context.setInputSearch('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="top100">
            {datas.length > 0 && (
                <div className="bg-top100">
                    <div className="svg-top100">
                        <SVGTop100 />
                    </div>
                    <div className="new-music-bg"></div>
                    <div className="bg-alpha"></div>
                    <div className="bg-alpha-1"></div>
                </div>
            )}
            {datas.length > 0 ? (
                datas.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2 className="pageTitle">{item.title}</h2>
                            <div className="row sm_gutter boxBanner">
                                {item.items.map((items, indexx) => {
                                    return (
                                        <div className="col l_2_4 m_3 c_4 render-album-item " key={indexx}>
                                            <div className="bannerImg">
                                                <div className="btnImgList">
                                                    <img className="imgList " src={items.thumbnail} alt="" />
                                                </div>
                                                <div
                                                    className="playSongMain"
                                                    onClick={() => navigate(`/detail/album/${items.encodeId}`)}
                                                ></div>
                                                <div className="play-song-control">
                                                    <div
                                                        className="btnLike"
                                                        onClick={() =>
                                                            HandleLike(
                                                                items.encodeId,
                                                                items.thumbnail,
                                                                items.title,
                                                                items.sortDescription,
                                                                indexx,
                                                                context,
                                                            )
                                                        }
                                                    >
                                                        <i className="icon mainListLike ic-like"></i>
                                                        {context.indexLike.map((i) => {
                                                            return (
                                                                i.encodeId === items.encodeId && (
                                                                    <i
                                                                        key={i.encodeId}
                                                                        className="icon mainListFullLike ic-like-full"
                                                                    ></i>
                                                                )
                                                            );
                                                        })}
                                                    </div>

                                                    <div
                                                        className="linkAlbum"
                                                        onClick={() => navigate(`/detail/album/${items.encodeId}`)}
                                                    >
                                                        <i className="icon mainListPlay ic-play-circle-outline"></i>
                                                    </div>
                                                    <div className="btnLike songMore">
                                                        <i className="icon mainListMore ic-more"></i>
                                                        <div className="songMoreDetail"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="songName">{items.title}</h3>
                                            {renderSinger(items.artists)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Top100;
