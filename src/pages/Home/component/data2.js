import renderSinger from '~/component/FCRenderSinger';

function DataPageTwo({ dataPage2Items, navigate, context, handleLike }) {
    return (
        <>
            {dataPage2Items.length > 0 &&
                dataPage2Items.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2 className="pageTitle">{item.title}</h2>
                            <div className="row boxBanner">
                                {item.items.slice(0, 5).map((items, indexx) => {
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
        </>
    );
}

export default DataPageTwo;
