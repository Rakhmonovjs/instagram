import { BsInstagram } from 'react-icons/bs';

export default function Loader() {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-white text-crimson flex items-center justify-center text-2xl">
           <BsInstagram size={80} color="crimson"/> 
        </div>
        
    )
}