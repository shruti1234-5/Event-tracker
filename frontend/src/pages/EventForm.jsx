import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Calendar, MapPin, AlignLeft, Type, Loader2, Check, ArrowLeft, Globe, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await API.post('/events', {
                title,
                description,
                date: new Date(`${date}T${time}`),
                location
            });
            toast.success('Event created successfully!');
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message || 'Error creating event';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-2xl py-8">
            <button
                onClick={() => navigate('/')}
                className="bg-transparent border-none text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-6 cursor-pointer font-bold text-sm transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
            </button>

            <div className="card px-8 py-10">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="m-0 text-3xl font-extrabold text-slate-800">Create Event</h2>
                        <p className="text-slate-500 mt-2">Schedule your next big thing</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-slate-600 block mb-1.5 ml-1">Event Title</label>
                        <div className="relative">
                            <Type size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                className="input-field pl-10"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="E.g. Team Brainstorming Session"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-600 block mb-1.5 ml-1">Description (Optional)</label>
                        <div className="relative">
                            <AlignLeft size={18} className="absolute left-3 top-3 text-slate-400" />
                            <textarea
                                className="input-field pl-10"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                placeholder="Tell us more about the event..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-bold text-slate-600 block mb-1.5 ml-1">Date</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="date"
                                    className="input-field pl-10"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-600 block mb-1.5 ml-1">Time</label>
                            <div className="relative">
                                <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="time"
                                    className="input-field pl-10"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-600 block mb-1.5 ml-1">Location</label>
                        <div className="relative">
                            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                className="input-field pl-10"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                placeholder="E.g. Conference Room 3 or Online"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn-secondary flex-1 py-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow-sm transition-all border border-green-800 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 flex-[2]"
                            disabled={loading}
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : (
                                <>
                                    <Check size={20} />
                                    <span>Create Event</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
