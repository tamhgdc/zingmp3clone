import HandleLike from '~/component/HandleLike';

function DataPageOne({ dataRender, navigate, context }) {
    return (
        <>
            {dataRender.length > 0 &&
                dataRender.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2 className="pageTitle">{item.title}</h2>
                            <div className="row boxBanner">
                                {item.title === 'Mới phát hành'
                                    ? item.items[0].song.slice(0, 5).map((items, indexx) => {
                                          return (
                                              <div
                                                  className="col sm_gutter l_2_4 m_3 c_4 render-album-item "
                                                  key={indexx}
                                              >
                                                  <div className="bannerImg">
                                                      <div className="btnImgList">
                                                          <img
                                                              className="imgList "
                                                              src={items.thumbnailM || items.thumbnail}
                                                              alt=""
                                                          />
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
                                                                      items.sortDescription || items.artistsNames,
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
                                                              onClick={() =>
                                                                  navigate(`/detail/album/${items.encodeId}`)
                                                              }
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
                                                      {items.sortDescription || items.artistsNames}
                                                  </h5>
                                              </div>
                                          );
                                      })
                                    : item.items.slice(0, 5).map((items, indexx) => {
                                          return (
                                              <div
                                                  className="col sm_gutter l_2_4 m_3 c_4 render-album-item "
                                                  key={indexx}
                                              >
                                                  <div className="bannerImg">
                                                      <div className="btnImgList">
                                                          <img
                                                              className="imgList "
                                                              src={items.thumbnailM || items.thumbnail}
                                                              alt=""
                                                          />
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
                                                              onClick={() =>
                                                                  navigate(`/detail/album/${items.encodeId}`)
                                                              }
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
        </>
    );
}

export default DataPageOne;
