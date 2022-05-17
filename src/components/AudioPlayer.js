import { createContext, useReducer } from 'react';
import reducer, { initialState } from '../reducer';
import Playbar from './Playbar';
import SongList from './SongList';
import './AudioPlayer.css';

export const StoreContext = createContext(null);

export default function AudioPlayer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const song = state.songs[state.songIndex];

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="audio-player">
        <div className="title">{song.title}</div>
        <div className="artist-info">{song.artist}</div>

        <Playbar />
        <SongList />
      </div>
    </StoreContext.Provider>
  );
}
