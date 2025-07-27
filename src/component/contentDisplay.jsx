import Nav from "./navbar";
import Album from "./album_item";
import Track_item from "./song_Item";
import { Track_context } from "../context/track_context";
import { useContext } from "react";
const Display_home = () => {

    const { track, track_data, album_data } = useContext(Track_context);
    return track ? (
        <>
            <div className="mx-4 px-4">
                {album_data ? <>
                    <h2 className="font-bold text-white text-xl mb-3">ท็อปชาร์ต</h2>
                    <div className="flex w-[100%] gap-6.5 overflow-auto">
                        {album_data.map((album, idx) => {
                            return <div key={idx} className="cursor-pointer">
                                <Album image={album.image} name={album.name} desc={album.desc} id={album._id} />
                            </div>
                        })}
                    </div>
                </> : ""}
                {track_data ? <>
                    <h2 className="font-bold text-white text-xl mt-4 mb-3">แทร็คยอดนิยม</h2>
                    <div className="flex w-[100%] gap-6.5 overflow-auto">
                        {track_data.map((song, idx) => {
                            return <div key={idx} className="cursor-pointer">
                                <Track_item image={song.image} name={song.name} desc={song.desc} id={song._id} />
                            </div>
                        })}
                    </div>
                </> : ""}
            </div >
        </>
    ) : null
}

export default Display_home;