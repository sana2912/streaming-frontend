
import Display from "./component/display"
import Track from "./component/track"
import { useContext, useEffect, useState } from "react"
import { Track_context } from "./context/track_context"
import { useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Nav from "./component/navbar"

function App() {
  const { audio_ref, track, set_origin, track_playing, list_popup, form_popup, set_form_popup } = useContext(Track_context);// get track_ref from Track_context;
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.includes('album') && !location.pathname.includes('display')) {
      set_origin('main');
    }
  }, [location])
  return (
    <div className="relative">
      <div className="bg-black h-screen w-screen">
        <div className="h-2/20 w-screen">
          <Nav />
        </div>
        <div className="h-16/20">
          <Display />
        </div>
        <div className="h-2/20">
          <Track />
        </div>
        <audio onEnded={track_playing} ref={audio_ref} preload="auto" src={track ? track.audio : <></>}></audio>
      </div>
      {list_popup || form_popup
        ? <div onClick={() => set_form_popup(false)} className="absolute top-0 h-screen w-screen bg-neutral-500 opacity-20 z-1"></div>
        : <></>}
      {track === null && <div className="absolute top-0 h-screen w-screen bg-neutral-200 opacity-20 z-1 flex justify-center items-center">
        <div className="absolute w-20 h-20 border-r-neutral-200 border-6 rounded-full animate-spin z-10"></div>
      </div>
      }
      <ToastContainer position="top-center" />
    </div>
  )
}

export default App
