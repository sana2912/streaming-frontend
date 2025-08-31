import Nav from "./navbar";
import Album from "./album_item";
import Track_item from "./song_Item";
import { Track_context } from "../context/track_context";
import { useContext } from "react";
const Display_home = () => {

    const { track, track_data, album_data } = useContext(Track_context);
    return track ? (
        <div className="px-4 md:px-8 h-full flex flex-col">
            {album_data ?
                <div className="h-6/12 w-full flex flex-col justify-center">
                    <div className="h-1/10">
                        <h2 className="text-[90%] pb-[0.4rem] font-medium text-white">เพลย์ลิสต์</h2>
                    </div>
                    <div className="flex gap-2 w-[100%] h-fit overflow-auto">
                        {album_data.map((album, idx) => {
                            return <div key={idx} className="h-fit cursor-pointer">
                                <Album image={album.image} name={album.name} desc={album.desc} id={album._id} />
                            </div>
                        })}
                    </div>
                </div> : <></>
            }
            {track_data ?
                <div className="h-6/12 w-full flex flex-col justify-center">
                    <div className="h-1/10">
                        <h2 className="text-[90%] pb-[0.4rem] font-medium text-white">แทร็ค</h2>
                    </div>
                    <div className="flex gap-2 w-[100%] fit overflow-auto">
                        {track_data.map((song, idx) => {
                            return <div key={idx} className="h-fit cursor-pointer">
                                <Track_item image={song.image} name={song.name} desc={song.desc} id={song._id} />
                            </div>
                        })}
                    </div>
                </div> : <></>
            }
        </div >
    ) : null
}

export default Display_home;