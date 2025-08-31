import { Routes, Route } from 'react-router-dom'
import Display_home from "./contentDisplay";
import Display_AL from "./display_album";
import { useRef, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { Track_context } from '../context/track_context';
import Display_track from './display_track';
import Nav from './navbar';
import Playlist from './playlist';
import Display_search from './search_display';

const get_album = (album_data, al_id) => {
    for (let items of album_data) {
        if (items._id === al_id) {
            console.log(items.bg_color);
            return items.bg_color;
        }
    }
}

const Display = () => {
    const baground_ref = useRef(null);// use this useRef to store bg-color with reder this page again
    const on_album = useLocation().pathname.includes('album') ? true : false;// check now are we on album rout?
    const segments = location.pathname.split('/'); // ["", "album", "68518b3ff6638f170c1d7da8"]
    const albumId = segments[2];
    const { album_data } = useContext(Track_context);
    useEffect(() => {
        if (on_album) {
            baground_ref.current.style.background = `linear-gradient(black,${get_album(album_data, albumId)})`;
        }
        else {
            baground_ref.current.style.background = 'black';
        }
    }, [on_album, album_data]);

    return (
        <div ref={baground_ref} className="h-full">
            <Routes>
                <Route path="/" element={<Display_home />} />
                <Route path="/album/:id" element={<Display_AL />} />
                <Route path="/display/:user_id/:_id" element={<Display_track />} />
                <Route path="/playlist/:user_id" element={<Playlist />} />
                <Route path="/search/:field" element={<Display_search />} />
            </Routes>
        </div>
    )
}
export default Display;