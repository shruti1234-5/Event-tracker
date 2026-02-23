import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            const msg = 'Passwords do not match';
            setError(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        setError('');
        try {
            await register(name, email, password);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message || 'Error creating account';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-lg mt-12 mb-12">
            <div className="card max-w-md mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-slate-100 text-primary p-4 rounded-2xl mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="m-0 text-3xl font-extrabold text-slate-800">Create Account</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-slate-600 ml-1 block mb-1">Full Name</label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                className="input-field pl-10"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

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

                    <div>
                        <label className="text-sm font-bold text-slate-600 ml-1 block mb-1">Confirm Password</label>
                        <div className="relative">
                            <ShieldCheck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type={showPass ? "text" : "password"}
                                className="input-field pl-10"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full py-3 mt-4"
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={24} className="animate-spin" /> : 'Create Account'}
                    </button>

                    <p className="text-center mt-8 text-slate-500 text-sm">
                        Already have an account? <Link to="/login" className="text-primary font-bold no-underline hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
