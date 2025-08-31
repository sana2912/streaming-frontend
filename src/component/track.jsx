import { assets } from "../../script_asset/assets";
import { Track_context } from "../context/track_context";
import { useContext, useEffect, useState } from "react";
import List_ma from "./list_management";
import { get_like_state, update_like_state } from "../../script_asset/like_api";
import { toast } from "react-toastify";

const Track = () => {
    const { list_popup,
        set_list_popup,
        trackbar,
        trackpoint,
        track,
        play_state,
        play_audio,
        pause_audio,
        timing,
        previouse_track,
        next_track,
        seek_func,
        set_playing,
        playing,
        sound_bar,
        sound_bar_point,
        sound_volum,
        login
    } = useContext(Track_context);
    const [like_state, set_like_state] = useState(false);

    const add_liked = () => {
        if (login) {
            if (like_state) {
                set_like_state(false);
                update_like_state(track._id, 'pop');
            }
            else {
                set_like_state(true);
                update_like_state(track._id, 'push');
            }
        }
        else {
            toast.info("กรุณาเข้าสู่ระบบก่อนใช้งานฟังชันนี้ !!");
        }
    };
    const list_action = () => {
        if (login) {
            set_list_popup(true);
        }
        else {
            toast.info("กรุณาเข้าสู่ระบบก่อนใช้งานฟังชันนี้ !!");
        }
    }
    const loop_setting = () => {
        if (playing === 'normal') {
            set_playing('loop');
        } else {
            set_playing('normal');
        }
    }
    useEffect(() => {
        console.log('use state is run 1');
        if (track && login) {
            console.log('use state is run 2');
            get_like_state(track._id, set_like_state);
        }
    }, [track]);

    return track ? (
        <div className="h-full flex flex-row justify-between relative px-[0.5rem] pl-0 bg-neutral-900 text-white items-center">
            <div className="hidden md:flex h-[100%] w-[20%] max-w-[25%] flex-row gap-2">
                <img className="h-[100%]" src={track.image} />
                <div className="flex flex-col text-lg p-[0.2rem] justify-end">
                    <h3 className="text-ml">{track.name.slice(0, 20)}</h3>
                </div>
            </div>
            <img className="h-[100%] md:hidden" src={track.image} />
            <div className="h-full w-[85%] md:w-[45%] flex flex-col items-center justify-center">
                <div className="h-1/2 flex flex-row items-center gap-[0.5rem]">
                    <img onClick={previouse_track} className="size-5/10 cursor-pointer" src={assets.prev_icon} />
                    {
                        !play_state
                            ? <img onClick={play_audio} className="h-5/10 cursor-pointer" src={assets.play_icon} />
                            : <img onClick={pause_audio} className="h-5/10 cursor-pointer" src={assets.pause_icon} />
                    }
                    <img onClick={next_track} className="h-5/10 cursor-pointer" src={assets.next_icon} />
                    <img onClick={loop_setting} className="h-7/10 cursor-pointer md:hidden" src={playing === 'normal' ? assets.loop_icon : assets.looping} />
                    <img onClick={add_liked} className="h-7/10 cursor-pointer md:hidden" src={like_state && login ? assets.like_icon : assets.like} />
                    <img onClick={list_action} className="h-6/10 cursor-pointer md:hidden" src={assets.queue_icon} />
                </div>
                <div className="h-1/2 w-[100%] flex flex-row gap-2 items-center justify-center">
                    <p className="text-[90%] text-center">{`${timing.current.munite}:${timing.current.second}`}</p>
                    <div ref={trackbar} onClick={seek_func} className="w-[80%] h-2/14 bg-neutral-500 rounded-2xl cursor-pointer">
                        <hr ref={trackpoint} className="w-0 h-1/1 bg-white rounded-2xl cursor-pointer" />
                    </div>
                    <p className="text-[90%] text-center">{`${timing.total.munite}:${timing.total.second}`}</p>
                </div>
            </div>
            <div className="hidden h-1/2 md:flex flex-col ">
                <div className="flex h-full w-fit flex-row gap-2 items-center">
                    <img onClick={loop_setting} className="h-6/10 cursor-pointer" src={playing === 'normal' ? assets.loop_icon : assets.looping} />
                    <img onClick={add_liked} className="h-6/10 cursor-pointer" src={like_state && login ? assets.like_icon : assets.like} />
                    <img onClick={list_action} className="h-5/10 cursor-pointer" src={assets.queue_icon} />
                    <img className="h-5/10 cursor-pointer" src={assets.volume_icon} />
                    <div ref={sound_bar} onClick={sound_volum} className="w-16 h-2/14 bg-neutral-500 rounded-2xl cursor-pointer">
                        <hr ref={sound_bar_point} className="h-1/1 bg-white rounded-2xl" />
                    </div>
                </div>
            </div>
            <div className="absolute w-[80%] left-[10%] md:w-[50%] md:left-[25%]  lg:w-[30%] lg:left-[35%] bottom-[25vh] z-2">
                <List_ma track_id={track._id} list_popup={list_popup} set_list_popup={set_list_popup} />
            </div>
        </div>
    ) : null
}

export default Track;