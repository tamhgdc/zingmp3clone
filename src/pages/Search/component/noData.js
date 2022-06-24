function NoData({ context }) {
    return (
        <>
            {context.inputSearch ? (
                <>
                    <div className="searchResult">
                        <div className="topSearch">
                            <h3 style={{ fontSize: '20px' }}>
                                {`Không Có Kết Quả Phù Hợp Cho "${context.inputSearch}"`}
                            </h3>
                        </div>
                    </div>
                </>
            ) : (
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
