import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-lg mt-16">
            <div className="card max-w-md mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-slate-100 text-primary p-4 rounded-2xl mb-4">
                        <LogIn size={32} />
                    </div>
                    <h2 className="m-0 text-3xl font-extrabold text-slate-800">Welcome Back</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-bold text-slate-600 ml-1 block mb-1">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                className="input-field pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-600 ml-1 block mb-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type={showPass ? "text" : "password"}
                                className="input-field pl-10 pr-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none p-2 text-slate-500 cursor-pointer flex hover:text-slate-700"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow-sm transition-all border border-green-800 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Log In'}
                    </button>

                    <p className="text-center mt-8 text-slate-500 text-sm">
                        Don't have an account? <Link to="/register" className="text-primary font-bold no-underline hover:underline">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
