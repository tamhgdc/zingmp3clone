function FCSaveLocalList(data) {
    const JSONSongList = JSON.stringify(data);
    localStorage.setItem('songList', JSONSongList);
}

export default FCSaveLocalList;
