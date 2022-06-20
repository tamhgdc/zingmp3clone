import { useEffect } from 'react';

function ScrollLoadPage(FCloadData, loading) {
    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            loading(true);
            FCloadData();
            loading(false);
        }
    };

    useEffect(() => {
        FCloadData();
        window.addEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default ScrollLoadPage;
