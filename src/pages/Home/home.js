import { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import renderSinger from '~/component/FCRenderSinger';
import routes from '~/config/routes';
import Context from '~/context/context';
import { GetHomePage1, GetHomePage2, GetHomePage3 } from '~/services';
import Banner from './Banner/banner';

import './home.css';

function Home() {
    const context = useContext(Context);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [banner, home, recent, ...dataPage1Items] = GetHomePage1();
    // eslint-disable-next-line no-unused-vars
    const [radio, ...dataPage2Items] = GetHomePage2();
    // eslint-disable-next-line no-unused-vars
    const [chart, week, slide, ...dataPage3Items] = GetHomePage3();
    console.log(dataPage3Items[0]);
    // const dataPage3Items = [];
    // dataPage3Items.push(album);
    const [indexLike, setIndexLike] = useState();

    document.title = 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV';

    const like = useRef(null);
    const dislike = useRef(null);
    const handleLike = (encodeId, thumbnail, title, sortDescription, index) => {
        context.setIndexLike((prev) => {
            if (prev.includes(encodeId)) {
                return prev.filter((item) => item !== encodeId);
            }
            return [...prev, encodeId];
        });
    };

    const loading = () => {
        return (
            <>
                <div className="pageTitle loading" style={{ width: '30%', marginTop: '10px', height: '25px' }}></div>
                <div className="row sm_gutter boxBanner">
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                </div>
                <div className="pageTitle loading" style={{ width: '30%', marginTop: '10px', height: '25px' }}></div>
                <div className="row sm_gutter boxBanner">
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                </div>
                <div className="pageTitle loading" style={{ width: '30%', marginTop: '10px', height: '25px' }}></div>
                <div className="row sm_gutter boxBanner">
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                </div>
                <div className="pageTitle loading" style={{ width: '30%', marginTop: '10px', height: '25px' }}></div>
                <div className="row sm_gutter boxBanner">
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                </div>
                <div className="pageTitle loading" style={{ width: '30%', marginTop: '10px', height: '25px' }}></div>
                <div className="row sm_gutter boxBanner">
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                    <div className="col l_2_4 m_3 c_4 render-album-item ">
                        <div className="bannerImg loading"></div>
                        <div className="songName loading"></div>
                    </div>
                </div>
            </>
        );
    };

    const render = () => {
        return (
            <>
                {dataPage1Items.length > 0 &&
                    dataPage1Items.slice(1).map((item, index) => {
                        return (
                            <div key={index}>
                                <h2 className="pageTitle">{item.title}</h2>
                                <div className="row boxBanner">
                                    {item.items.slice(0, 5).map((items, indexx) => {
                                        return (
                                            <div
                                                className="col sm_gutter l_2_4 m_3 c_4 render-album-item "
                                                key={indexx}
                                            >
                                                <div className="bannerImg">
                                                    <div className="btnImgList">
                                                        <img className="imgList " src={items.thumbnail} alt="" />
                                                    </div>
                                                    <div
                                                        // to={`/detail/album/${items.encodeId}`}
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
                                                            <i
                                                                ref={dislike}
                                                                className={
                                                                    context.indexLike.length > 0
                                                                        ? context.indexLike[indexx - 1] !== indexx
                                                                            ? 'icon mainListLike ic-like'
                                                                            : 'icon mainListLike ic-like hidden'
                                                                        : 'icon mainListLike ic-like'
                                                                }
                                                            ></i>
                                                            <i
                                                                ref={like}
                                                                className={
                                                                    context.indexLike.length > 0
                                                                        ? context.indexLike[indexx - 1] === indexx
                                                                            ? 'icon mainListFullLike ic-like-full'
                                                                            : 'icon mainListFullLike ic-like-full hidden'
                                                                        : 'icon mainListFullLike ic-like-full hidden'
                                                                }
                                                            ></i>
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
                                                <h5 className="songerName">{items.sortDescription}</h5>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                {dataPage2Items.length > 0 &&
                    dataPage2Items.map((item, index) => {
                        return (
                            <div key={index}>
                                <h2 className="pageTitle">{item.title}</h2>
                                <div className="row boxBanner">
                                    {item.items.slice(0, 5).map((items, indexx) => {
                                        return (
                                            <div
                                                className="col sm_gutter l_2_4 m_3 c_4 render-album-item "
                                                key={indexx}
                                            >
                                                <div className="bannerImg">
                                                    <div className="btnImgList">
                                                        <img className="imgList " src={items.thumbnail} alt="" />
                                                    </div>
                                                    <Link
                                                        to={`/detail/album/${items.encodeId}`}
                                                        className="playSongMain"
                                                    >
                                                        <div className="btnLike">
                                                            <i
                                                                ref={dislike}
                                                                className={
                                                                    indexLike !== indexx
                                                                        ? 'icon mainListLike ic-like'
                                                                        : 'icon mainListLike ic-like hidden'
                                                                }
                                                                onClick={() => handleLike(indexx)}
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

                {dataPage3Items !== undefined && dataPage3Items.length !== 0
                    ? [dataPage3Items[0]].map((item, index) => {
                          return (
                              <div key={index} style={{ position: 'relative' }}>
                                  <Link to={routes.top100} className="see-all">
                                      <span>TẤT CẢ</span> <i className="icon see-all-icon ic-go-right"></i>
                                  </Link>
                                  <h2 className="pageTitle">{item.title}</h2>
                                  <div className="row boxBanner">
                                      {item.items.slice(0, 5).map((items, indexx) => {
                                          return (
                                              <div
                                                  className="col sm_gutter l_2_4 m_3 c_4 render-album-item "
                                                  key={indexx}
                                              >
                                                  <div className="bannerImg">
                                                      <div className="btnImgList">
                                                          <img className="imgList " src={items.thumbnail} alt="" />
                                                      </div>
                                                      <Link
                                                          to={`/detail/album/${items.encodeId}`}
                                                          className="playSongMain"
                                                      >
                                                          <div className="btnLike">
                                                              <i
                                                                  ref={dislike}
                                                                  className={
                                                                      indexLike !== indexx
                                                                          ? 'icon mainListLike ic-like'
                                                                          : 'icon mainListLike ic-like hidden'
                                                                  }
                                                                  onClick={() => handleLike(indexx)}
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
                      })
                    : null}
            </>
        );
    };

    return (
        <>
            <div className="grid wide">
                <Banner />
                {/* {loading()} */}
                <div className="root">{dataPage1Items.length > 0 ? render() : loading()}</div>
            </div>
        </>
    );
}
export default Home;
