import songs from './songs.json';

export const initialState = {
  playing: false,
  currentTime: 0,
  duration: 0,
  songIndex: 0,
  songs,
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYING':
      return { ...state, playing: action.payload };
    case 'CHOOSE_SONG':
      return {
        ...state,
        playing: true,
        currentSong: action.payload.song,
        songIndex: action.payload.index,
      };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'NEXT_SONG':
      return {
        ...state,
        songIndex:
          state.songIndex === songs.length - 1 ? 0 : state.songIndex + 1,
        playing: true,
      };
    case 'PREV_SONG':
      return {
        ...state,
        songIndex:
          state.songIndex === 0 ? state.songs.length - 1 : state.songIndex - 1,
        playing: true,
      };
    default:
      return state;
  }
}
