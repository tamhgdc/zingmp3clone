import { GetTop100 } from '~/services';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './top100.css';
import renderSinger from '~/component/FCRenderSinger';
import { SVGTop100 } from '~/images';
import Context from '~/context/context';

function Top100() {
    const navigate = useNavigate();
    const context = useContext(Context);
    const datas = GetTop100();

    const handleLike = (encodeId, thumbnail, title, sortDescription, index) => {
        context.setIndexLike((prev) => {
            let newLike;
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].encodeId === encodeId) {
                    newLike = prev.filter((item) => item.encodeId !== encodeId);
                    return newLike;
                }
            }
            newLike = [
                ...prev,
                {
                    encodeId,
                    thumbnail,
                    title,
                    sortDescription,
                    index,
                },
            ];
            const JsonLike = JSON.stringify(newLike);
            localStorage.setItem('like', JsonLike);

            return newLike;
        });
    };

    return (
        <div className="top100">
            <div className="svg-top100">
                <SVGTop100 />
            </div>
            <div className="new-music-bg"></div>
            <div className="bg-alpha"></div>
            <div className="bg-alpha-1"></div>
            {datas.length > 0 &&
                datas.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2 className="pageTitle">{item.title}</h2>
                            <div className="row boxBanner">
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
                                                            handleLike(
                                                                items.encodeId,
                                                                items.thumbnail,
                                                                items.title,
                                                                items.sortDescription,
                                                                indexx,
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
                })}
        </div>
    );
}

export default Top100;
