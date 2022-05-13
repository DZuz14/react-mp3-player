export const initialState = {
  playing: false,
  currentSong: {},
  currentTime: 0,
  duration: 0,
  songIndex: 0,
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
      return { ...state, currentSong: action.payload };
    default:
      return state;
  }
}
