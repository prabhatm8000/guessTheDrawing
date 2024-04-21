import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to={"/join-create-room"}>Join/Create</Link>
        </div>
    );
};

export default Home;
