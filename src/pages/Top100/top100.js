import { GetTop100 } from '~/services';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import './top100.css';
import renderSinger from '~/component/FCRenderSinger';
import { SVGTop100 } from '~/images';

function Top100() {
    const datas = GetTop100();

    const like = useRef(null);
    const dislike = useRef(null);

    const [indexLike, setIndexLike] = useState();

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
                                        <div className="col l_2_4 m_3 c_12 render-album-item " key={indexx}>
                                            <div className="bannerImg">
                                                <div className="btnImgList">
                                                    <img className="imgList " src={items.thumbnail} alt="" />
                                                </div>
                                                <Link to={`/detail/album/${items.encodeId}`} className="playSongMain">
                                                    <div className="btnLike">
                                                        <i
                                                            ref={dislike}
                                                            className={
                                                                indexLike !== indexx
                                                                    ? 'icon mainListLike ic-like'
                                                                    : 'icon mainListLike ic-like hidden'
                                                            }
                                                        ></i>
                                                        <i
                                                            ref={like}
                                                            className={
                                                                indexLike === indexx
                                                                    ? 'icon mainListFullLike ic-like-full'
                                                                    : 'icon mainListFullLike ic-like-full hidden'
                                                            }
                                                        ></i>
                                                    </div>

                                                    <div className="linkAlbum">
                                                        <i className="icon mainListPlay ic-play-circle-outline"></i>
                                                    </div>
                                                    <div className="btnLike songMore">
                                                        <i className="icon mainListMore ic-more"></i>
                                                        <div className="songMoreDetail"></div>
                                                    </div>
                                                </Link>
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
