import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, PlusCircle, User, LogIn } from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.info('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-200 py-3 sticky top-0 z-50 mb-10">
            <div className="container mx-auto px-4 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary no-underline">
                    <Calendar size={24} />
                    <span>Event Tracker</span>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/create-event" className="btn-secondary no-underline">
                                <PlusCircle size={18} />
                                <span className="hidden sm:inline">New Event</span>
                            </Link>
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                        <User size={16} className="text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 hidden sm:inline">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-transparent border-none text-red-500 p-2 cursor-pointer flex hover:bg-red-50 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                to="/login"
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 no-underline border border-green-800 shadow-sm transition-all"
                            >
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className="btn-primary no-underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
