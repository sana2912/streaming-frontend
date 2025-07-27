import { useNavigate } from 'react-router-dom';

const Album = ({ image, name, desc, id }) => {
    const navigate = useNavigate();
    // we will use this navigate from react router dom to switch to the new compnent rout for display each song in the alum
    return (
        <div onClick={() => navigate(`/album/${id}`)} className="flex flex-col gap-1 w-40">
            <img className="w-40 h-40 object-cover" src={image} />
            <p className="font-bold text-ml text-white">{name}</p>
            <p className=" text-ml text-white">{desc}</p>
        </div>
    )
}

export default Album