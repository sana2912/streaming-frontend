import { useContext } from "react";
import { Track_context } from "../context/track_context";
import { assets } from "../../script_asset/assets";

// this is the child component of home display
const Track_item = ({ name, image, desc, id }) => {
    const { play_with_id, play_state, track, } = useContext(Track_context);

    return (
        <div onClick={() => play_with_id(id)} className="flex flex-col gap-1 min-w-40 cursor-pointer">
            <div className="relative">
                <img className="w-40 h-40 object-cover" src={image} />
                {
                    play_state && track._id === id ? <img className="absolute w-20 h-20 top-10 left-10 animate-spin" src={assets.disc} /> : <></>
                }
            </div>
            <p className="font-bold text-ml text-white">{`${name.slice(0, 12)}...`}</p>
            <p className=" text-ml text-white">{`${desc.slice(0, 12)}...`}</p>
        </div>
    )
}
export default Track_item;