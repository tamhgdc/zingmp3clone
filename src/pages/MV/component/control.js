function Control({ indexPage, setIndexPage }) {
    return (
        <div className="MV-control">
            <div
                className="MV-btn"
                onClick={() => {
                    // window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIndexPage(indexPage + 1);
                }}
            >
                Xem thêm
            </div>
        </div>
    );
}

export default Control;
