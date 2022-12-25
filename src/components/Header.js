import { Link, NavLink } from "react-router-dom";
import { logout } from "../firebase";
import Icon from "./Icon";
import Search from "./Search";



export default function Header() {
    return(
        <header className=" bg-white border-b border-gray-300">
            <div className=" flex items-center justify-between h-[60px] container mx-auto">
                <Link to="">
                    <img className="h-[48px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSFk25BM4UrxXvfDGa8_FyLKXmLphypZgfrXbMoCOPe4gPhw7qhWWq9UJzJHAvcgnWvY&usqp=CAU" alt=""/>
                </Link>

                <Search/>

                <nav className="flex items-center gap-x-5">
                <NavLink to="/">
						{({ isActive }) => <Icon name={isActive ? 'home-filled' : 'home'} size={24} />}
					</NavLink>
                    <NavLink to="/">
						<Icon name="new" size={24} />
						
					</NavLink>
					<NavLink to="/">
						<Icon name="explore" size={24} />
					</NavLink>
					<NavLink to="/">
						<Icon name="heart" size={24} />
					</NavLink>
                    <button onClick={logout}>
                        Logout
                    </button>
                </nav>

            </div>


        </header>
    )
}