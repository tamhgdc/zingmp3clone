function NoData({ suggestTop, suggestSong, inputSearch, context }) {
    return (
        <>
            {suggestSong === undefined && suggestTop === undefined
                ? context.inputSearch && (
                      <>
                          <div className="searchResult">
                              <div className="topSearch">
                                  <h3 style={{ fontSize: '20px' }}>
                                      {`Không Có Kết Quả Phù Hợp Cho "${inputSearch.value}"`}
                                  </h3>
                              </div>
                          </div>
                      </>
                  )
                : !context.inputSearch && (
                      <div className="searchResult">
                          <div className="topSearch">
                              <h3 style={{ fontSize: '20px' }}>{'Nhập Từ Khóa Cần Tìm'}</h3>
                          </div>
                      </div>
                  )}
        </>
    );
}

export default NoData;
