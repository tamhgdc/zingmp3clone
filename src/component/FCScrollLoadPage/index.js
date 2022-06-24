import { useEffect } from 'react';

function ScrollLoadPage(FCloadData) {
    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            FCloadData();
        }
    };

    useEffect(() => {
        FCloadData();
        window.addEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default ScrollLoadPage;
