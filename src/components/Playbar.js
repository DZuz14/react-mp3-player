import { useRef, useContext, useEffect } from 'react';
import { StoreContext } from './AudioPlayer';
import './Playbar.css';

const formatTime = (inputSeconds) => {
  let seconds = Math.floor(inputSeconds % 60);
  if (seconds < 10) seconds = `0${seconds}`;

  const minutes = Math.floor(inputSeconds / 60);

  return `${minutes}:${seconds}`;
};

const handleProgress = (currentTime, duration) => {
  if (currentTime === 0 && duration === 0) {
    return 0;
  }
  return 100 * (currentTime / duration);
};

export default function Playbar() {
  const { state, dispatch } = useContext(StoreContext);
  const audioRef = useRef();

  const { playing, songIndex, songs, currentTime, duration } = state;

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing, songIndex]);

  return (
    <div className="playbar">
      <audio
        ref={audioRef}
        src={`/audio/${songs[songIndex].title}.mp3`}
        onLoadedMetadata={() =>
          dispatch({
            type: 'SET_DURATION',
            payload: audioRef.current.duration,
          })
        }
        onTimeUpdate={(e) =>
          dispatch({ type: 'SET_CURRENT_TIME', payload: e.target.currentTime })
        }
        onEnded={() =>
          dispatch({
            type: 'NEXT_SONG',
          })
        }
      />

      <div className="time">
        <div>{formatTime(Math.floor(currentTime))}</div>
        <div>{formatTime(duration)}</div>
      </div>

      <div
        className="progress"
        onClick={(e) => {
          const { offsetLeft, offsetParent, offsetWidth } = e.target;
          const pos =
            (e.pageX - (offsetLeft + offsetParent.offsetLeft)) / offsetWidth;

          audioRef.current.currentTime = pos * audioRef.current.duration;
        }}
      >
        <div
          className="progress-inner"
          style={{ width: `${handleProgress(currentTime, duration)}%` }}
        />
      </div>

      <div className="controls">
        <button
          onClick={() => {
            dispatch({
              type: 'PREV_SONG',
            });
          }}
        >
          <i className="fa fa-backward" />
        </button>

        <button
          onClick={() => {
            dispatch({
              type: 'SET_PLAYING',
              payload: playing ? false : true,
            });
          }}
        >
          {playing ? (
            <i className="fa fa-pause" />
          ) : (
            <i className="fa fa-play" />
          )}
        </button>

        <button
          onClick={() => {
            dispatch({
              type: 'NEXT_SONG',
            });
          }}
        >
          <i className="fa fa-forward" />
        </button>
      </div>
    </div>
  );
}
