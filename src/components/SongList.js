import { useContext } from 'react';
import { StoreContext } from './AudioPlayer';
import songs from '../songs.json';
import './SongList.css';

export default function SongList() {
  const { dispatch } = useContext(StoreContext);

  return (
    <div className="song-list">
      <ul>
        {songs.map((song, i) => (
          <li
            key={song.title}
            onClick={() => {
              dispatch({ type: 'CHOOSE_SONG', payload: { song, index: i } });
            }}
          >
            <div>
              <div className="title">{song.title}</div>
              <div className="artist">{song.artist}</div>
            </div>

            <div className="duration">{song.duration}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
