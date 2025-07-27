
import Display from "./component/display"
import Track from "./component/track"
import { useContext, useEffect, useState } from "react"
import { Track_context } from "./context/track_context"
import { useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function App() {
  const { audio_ref, track, set_origin, track_playing, list_popup } = useContext(Track_context);// get track_ref from Track_context;
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.includes('album') && !location.pathname.includes('display')) {
      set_origin('main');
    }
  }, [location])
  return (
    <div className="h-dvh flex flex-col bg-black justify-between relative">
      <div className="h-[100%] flex flex-row">
        <div className="w-[100%]">
          <Display />
        </div>
      </div>
      <Track />
      <audio onEnded={track_playing} ref={audio_ref} preload="auto" src={track ? track.audio : ''}></audio>
      {list_popup
        ? <div className="absolute h-[100%] w-[100%] bg-neutral-200 opacity-20 z-1"></div>
        : <></>}
      <ToastContainer position="top-center" />
    </div>
  )
}

export default App
