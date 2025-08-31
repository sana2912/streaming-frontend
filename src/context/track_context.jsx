// this component will run when main.jsx loaded;
import { createContext, useEffect, useRef, useState } from "react";
import { al_fetching, track_fetching } from "../../script_asset/api_func";
import { am_i_login } from "../../script_asset/authenticate_api";
const Track_context = createContext();

// second step creat context provider
function TrackProvide({ children }) {
    const audio_ref = useRef();
    const trackbar = useRef();
    const trackpoint = useRef();// access and changing style of track EL
    const sound_bar = useRef();
    const sound_bar_point = useRef();

    // auth state
    const [profile_image, set_profile_image] = useState(null);
    const [login, set_login] = useState(false);

    // interaction state
    const [form_popup, set_form_popup] = useState(false);
    const [list_popup, set_list_popup] = useState(false);
    const [playing, set_playing] = useState('normal');
    const [origin, set_origin] = useState('main');
    const [play_state, set_play] = useState(false);
    const [timing, set_timing] = useState({
        current: {
            munite: 0,
            second: 0,
        },
        total: {
            munite: 0,
            second: 0,
        }
    });

    // content data state
    const [track, set_track] = useState(null);
    const [track_data, set_track_data] = useState([]);
    const [album_data, set_album_data] = useState([]);
    const [album_track, set_album_track] = useState([]);
    const [like_track, set_like_track] = useState([]);
    const [list_track, set_list_track] = useState([]);

    // create play and puase function 
    const play_audio = () => {
        set_play(true)
        audio_ref.current.play();
    }
    const pause_audio = () => {
        set_play(false);
        audio_ref.current.pause();
    }

    // playing style
    function track_playing() {
        set_play(false);
        if (playing === 'normal') {
            console.log(playing);
            next_track();
        }
        else {
            audio_ref.current.play();
            set_play(true);
        }
    }

    // use this function to update audio play back time
    function playback() {
        audio_ref.current.ontimeupdate = () => {
            const percent = (audio_ref.current.currentTime / audio_ref.current.duration) * 100;
            trackpoint.current.style.width = percent + "%";
            set_timing(
                {
                    current: {
                        munite: Math.floor(audio_ref.current.currentTime / 60),
                        second: Math.floor(audio_ref.current.currentTime),
                    },
                    total: {
                        munite: Math.floor(audio_ref.current.duration ? audio_ref.current.duration / 60 : 0),
                        second: Math.floor(audio_ref.current.duration ? audio_ref.current.duration : 0),
                    }
                }
            )
        }
    }

    // crate function that play the specific song with id
    const play_with_id = async (id) => {
        track_data.forEach(async (data) => {
            if (data._id === id) {
                await set_track(data);
                await audio_ref.current.play();// play when user was selected
                set_play(true);
                return;
            }
        })
    }
    const play_with_ori = async (track_display, ori) => {
        await set_track(track_display);
        await audio_ref.current.play();// play when user was selected
        set_play(true);
        set_origin(ori);
    }

    // create neat and previouse function
    function pre_set(arr) {
        for (let idx = 0; idx < arr.length; idx++) {
            const data = arr[idx];
            if (data._id === track._id && idx > 0) {
                const pre_Track = arr[idx - 1];
                set_track(pre_Track);
                set_play(true);
                break;
            }
        }
    }
    async function next_set(arr) {
        for (let idx = 0; idx < arr.length - 1; idx++) {
            const data = arr[idx];
            if (data._id === track._id) {
                const nextTrack = arr[idx + 1];
                set_track(nextTrack);
                set_play(true);
                break;
            }
        }
    }
    const previouse_track = async () => {
        if (origin === 'main') { pre_set(track_data); }
        else if (origin === 'album') { pre_set(album_track); }
        else if (origin === 'like') { pre_set(like_track); }
        else if (origin === 'list') { pre_set(list_track) };
    }
    const next_track = async () => {
        if (origin === 'main') { next_set(track_data); }
        else if (origin === 'album') { next_set(album_track); }
        else if (origin === 'like') { next_set(like_track); }
        else if (origin === 'list') { next_set(list_track) };
    }

    // seek curent time for track song 
    const seek_func = (e) => {
        const percentage = Math.floor(e.nativeEvent.offsetX / trackbar.current.offsetWidth * 100);
        trackpoint.current.style.width = percentage + '%';
        audio_ref.current.currentTime = (percentage / 100) * audio_ref.current.duration;
    }
    const sound_volum = (e) => {
        const percentage = Math.floor(e.nativeEvent.offsetX / sound_bar.current.offsetWidth * 100);
        sound_bar_point.current.style.width = percentage + '%';
        audio_ref.current.volume = percentage / 100;
    }

    useEffect(() => {
        // play audio when track is update
        if (!track || !audio_ref.current) return;
        console.log('this function is work');
        const audio = audio_ref.current;
        audio.oncanplay = async () => {
            try {
                await audio.play();
                set_play(true);
            } catch (err) {
                console.warn("Autoplay failed:", err.message);
            }
        };
        playback();

    }, [track]);

    useEffect(() => {
        async function loadAllData() {
            await track_fetching(set_track_data, set_track);
            await al_fetching(set_album_data);
        }
        loadAllData();
        am_i_login(set_profile_image, set_login);

    }, []);

    const context_val = {
        login,
        profile_image,
        origin,
        track_data,
        album_data,
        audio_ref,
        trackbar,
        trackpoint,
        play_state,
        track,
        timing,
        album_track,
        playing,
        list_popup,
        sound_bar,
        sound_bar_point,
        form_popup,
        play_audio,
        pause_audio,
        play_with_id,
        previouse_track,
        next_track,
        seek_func,
        set_play,
        set_track,
        set_timing,
        set_origin,
        set_album_track,
        play_with_ori,
        set_like_track,
        set_list_track,
        track_playing,
        set_playing,
        set_list_popup,
        sound_volum,
        set_profile_image,
        set_login,
        set_form_popup
    }
    return (
        <Track_context.Provider value={context_val}>
            {children}
        </Track_context.Provider>
    )
}

export { TrackProvide, Track_context }