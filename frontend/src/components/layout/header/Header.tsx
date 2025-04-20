import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout } from '../../../redux/authSlice';

export default function Header() {
    const user = useAppSelector((state) => state.auth.user);
    const isAdmin = user?.role === 'admin';
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function logMeOut() {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div className="Header">
            <div className="logo-container">
                <NavLink to="/home">
                    <img src="/VacationSystemLogo.png" alt="Vacation System" className="logo" />
                </NavLink>
            </div>

            <div>
                <nav>
                    <NavLink to="/home">Home</NavLink>
                    {isAdmin &&
                        <>
                            <NavLink to="/admin/add-vacation">Add Vacation</NavLink>
                            <NavLink to="/admin/reports">Reports</NavLink>
                        </>
                    }
                </nav>
            </div>

            <div>
                Hello {user?.firstName} {user?.lastName} | <button onClick={logMeOut}>logout</button>
            </div>
        </div>
    );
}
