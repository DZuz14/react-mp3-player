import { useRef, useContext, useEffect } from 'react';
import { StoreContext } from './AudioPlayer';
import './Playbar.css';

const formatTime = (inputSeconds) => {
  let seconds = Math.floor(inputSeconds % 60);
  if (seconds < 10) seconds = `0${seconds}`;

  const minutes = Math.floor(inputSeconds / 60);

  return `${minutes}:${seconds}`;
};

const handleProgress = (currentTime, duration) =>
  600 * (currentTime / duration);

export default function Playbar() {
  const { state, dispatch } = useContext(StoreContext);
  const audioRef = useRef();

  useEffect(() => {
    if (state.playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [state.playing, state.currentSong]);

  return (
    <div className="playbar">
      <audio
        ref={audioRef}
        src={`/audio/${state.currentSong.title}.mp3`}
        onLoadedMetadata={() =>
          dispatch({
            type: 'SET_DURATION',
            payload: audioRef.current.duration,
          })
        }
        onTimeUpdate={(e) =>
          dispatch({ type: 'SET_CURRENT_TIME', payload: e.target.currentTime })
        }
      />

      <div className="time">
        <div>{formatTime(Math.floor(state.currentTime))}</div>
        <div>{formatTime(state.duration)}</div>
      </div>

      <div className="progress">
        <div
          className="progress-inner"
          style={{ width: handleProgress(state.currentTime, state.duration) }}
        />
      </div>

      <div className="controls">
        <button>
          <i className="fa fa-backward" />
        </button>

        <button
          onClick={() => {
            dispatch({
              type: 'SET_PLAYING',
              payload: state.playing ? false : true,
            });
          }}
        >
          {state.playing ? (
            <i className="fa fa-pause" />
          ) : (
            <i className="fa fa-play" />
          )}
        </button>

        <button>
          <i className="fa fa-forward" />
        </button>
      </div>
    </div>
  );
}
