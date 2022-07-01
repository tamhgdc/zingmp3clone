import axios from 'axios';
import { useEffect } from 'react';
import { URL } from '~/url';

const DataApi = (setLoading, dataMV, code, indexPage, setDataMV) => {
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${URL}listMV/${code}/${indexPage}/30`)
            .then(({ data }) => {
                const newdata = [];
                if (data.data.items !== undefined) {
                    data.data.items.map((item) => newdata.push(item));
                    setDataMV((prev) => [...prev, ...newdata]);
                }

                // data.data.items !== undefined ? hData(data) : dhData();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

        indexPage++;
    }, [code]);
};

export default DataApi;
