import FCSaveLocalIndex from '../FCSaveLocalIndex';
import FCSaveLocalList from '../FCSaveLocalList';

const HandlePlay = ({ data, index, context }) => {
    context.setCheckPlaySong(true);
    context.addSongList(data);
    context.playSong();
    context.currentSong(index);

    FCSaveLocalList(data);
    FCSaveLocalIndex(index);
};

export default HandlePlay;
