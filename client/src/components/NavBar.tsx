import { Link } from "react-router-dom";
import { BiLogoGithub } from "react-icons/bi";

const NavBar = () => {
    return (
        <nav className="absolute top-0 m-2 p-3 border-b-2 border-stone-400">
            <div className="container m-auto px-2 w-[1400px] flex justify-between items-center select-none">
                <Link to={"/"}>
                    <span className="text-4xl font-sketchit">
                        GuessTheDrawing
                    </span>
                </Link>
                <a href="/">
                    <BiLogoGithub size={40} />
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
