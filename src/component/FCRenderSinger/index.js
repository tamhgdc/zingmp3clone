const renderSinger = (data) => {
    let singer = [];
    for (let i = 0; i < data.length; i++) {
        if (i !== data.length - 1) {
            singer.push(data[i].name + ', ');
        } else {
            singer.push(data[i].name + '.');
        }
    }

    return <h5 className="songerName">{singer}</h5>;
};

export default renderSinger;
