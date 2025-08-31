import { useNavigate } from 'react-router-dom';
import { text_display } from './unitility_func';
const Album = ({ image, name, desc, id }) => {
    const navigate = useNavigate();
    // we will use this navigate from react router dom to switch to the new compnent rout for display each song in the alum
    return (
        <div onClick={() => navigate(`/album/${id}`)} className="flex flex-col justify-between w-30 lg:w-40">
            <img className="size-30 lg:size-40 object-cover" src={image} />
            <div className='h-[18%] max-w-[100%]'>
                <p className="text-[90%] text-white">{text_display(name, 18)}</p>
                <p className="text-[70%] text-white">{text_display(desc, 26)}</p>
            </div>
        </div>
    )
}

export default Album