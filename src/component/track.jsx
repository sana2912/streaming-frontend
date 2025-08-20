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
        <div className="flex flex-row relative p-2 bg-neutral-900 text-white justify-between">
            <div className="flex flex-row gap-10 w-70">
                <img className="w-20 h-20" src={track.image} alt="" />
                <div className="flex flex-col">
                    <h3 className="text-ml">{track.name.slice(0, 20)}</h3>
                </div>
            </div>
            <div className="flex flex-col items-center self-end max-h-fit gap-4">
                <div className="flex flex-row gap-4 max-w-fit">
                    <img onClick={previouse_track} className="w-5 h-5 cursor-pointer" src={assets.prev_icon} />
                    {
                        !play_state
                            ? <img onClick={play_audio} className="w-5 h-5 cursor-pointer" src={assets.play_icon} />
                            : <img onClick={pause_audio} className="w-5 h-5 cursor-pointer" src={assets.pause_icon} />
                    }
                    <img onClick={next_track} className="w-5 h-5 cursor-pointer" src={assets.next_icon} />
                </div>
                <div className="w-140 flex flex-row gap-6 items-center">
                    <p className=" text-center w-6">{`${timing.current.munite}:${timing.current.second}`}</p>
                    <div ref={trackbar} onClick={seek_func} className="w-122 h-1 bg-neutral-500 rounded-2xl cursor-pointer">
                        <hr ref={trackpoint} className="w-0 h-1 bg-white rounded-2xl cursor-pointer" />
                    </div>
                    <p className="w-6 text-center">{`${timing.total.munite}:${timing.total.second}`}</p>
                </div>
            </div>
            <div className="flex flex-col max-h-fit self-end">
                <div className="flex flex-row gap-2 max-w-fit items-center">
                    <img onClick={loop_setting} className="w-5 h-5 cursor-pointer" src={playing === 'normal' ? assets.loop_icon : assets.looping} />
                    <img onClick={add_liked} className="w-7 h-7 cursor-pointer" src={like_state ? assets.like_icon : assets.like} />
                    <img onClick={list_action} className="w-5 h-5 cursor-pointer" src={assets.queue_icon} />
                    <img className="w-5 h-5 cursor-pointer" src={assets.volume_icon} />
                    <div ref={sound_bar} onClick={sound_volum} className="w-40 h-1 bg-neutral-500 rounded-2xl cursor-pointer">
                        <hr ref={sound_bar_point} className="h-1 bg-white rounded-2xl" />
                    </div>
                </div>
            </div>
            <div className="absolute w-[25%] bottom-60 left-[37.5%] z-2">
                <List_ma track_id={track._id} list_popup={list_popup} set_list_popup={set_list_popup} />
            </div>
        </div>
    ) : null
}

export default Track;