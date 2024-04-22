import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Link to={"/join-create-room"} className="border border-stone-400 rounded-lg px-4 py-2 text-3xl font-sketchit">Join/Create</Link>
        </div>
    );
};

export default Home;
