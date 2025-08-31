import { useContext } from "react";
import { Track_context } from "../context/track_context";
import { assets } from "../../script_asset/assets";
import { text_display } from "./unitility_func";

// this is the child component of home display
const Track_item = ({ name, image, desc, id }) => {
    const { play_with_id, play_state, track, } = useContext(Track_context);

    return (
        <div onClick={() => play_with_id(id)} className="flex flex-col justify-between w-30 lg:w-40">
            <div className="relative size-fit">
                <img className="size-30 lg:size-40 object-cover" src={image} />
                {
                    play_state && track._id === id ? <img className="absolute size-[60%] top-[20%] left-[20%] animate-spin" src={assets.disc} /> : <></>
                }
            </div>
            <div className='h-[18%] max-w-[100%]'>
                <p className="text-[90%] text-white">{text_display(name, 18)}</p>
                <p className="text-[70%] text-white">{text_display(desc, 26)}</p>
            </div>
        </div>
    )
}
export default Track_item;