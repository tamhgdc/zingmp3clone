import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollLoadPage from '~/component/FCScrollLoadPage';
import HandleLike from '~/component/HandleLike';
import { useDebounce } from '~/hooks';
import { URL } from '~/url';
import LoaddingPlaylist from './loadingPlaylist';

function Playlist({ context }) {
    const [dataPlaylist, setDataPlaylist] = useState([]);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(context.inputSearch, 500);

    let indexPage = 1;

    const loadDataPlaylist = () => {
        if (debouncedValue.length === 0) {
            setDataPlaylist([]);
            return;
        }
        setLoading(true);
        axios
            .get(`${URL}searchAllPlaylist/${debouncedValue}/${indexPage}/20`)
            .then(({ data }) => {
                const newdata = [];
                if (data.data.items !== undefined) {
                    data.data.items.map((item) => newdata.push(item));
                    setDataPlaylist((prev) => [...prev, ...newdata]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        indexPage++;
    };

    ScrollLoadPage(loadDataPlaylist);

    return (
        <>
            {dataPlaylist !== undefined && dataPlaylist.length !== 0 && (
                <div className="songResult">
                    <h3 className="songResult-title">Playlists</h3>
                    <div className="row boxBanner">
                        {dataPlaylist.map((items, indexx) => {
                            return (
                                <div className="col sm_gutter l_2_4 m_3 c_4 render-album-item " key={indexx}>
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
                                    <h5 className="songerName">
                                        {items.artists
                                            ? items.artists.map((x, i) =>
                                                  items.artists.length - 1 === i ? x.name : `${x.name}, `,
                                              )
                                            : items.userName}
                                    </h5>
                                </div>
                            );
                        })}
                        {loading && <LoaddingPlaylist />}
                    </div>
                </div>
            )}
        </>
    );
}

export default Playlist;
