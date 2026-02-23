import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { Calendar, MapPin, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';

const PublicEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await API.get(`/events/public/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Event not found or link is private');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return <div className="text-center py-32 text-slate-500 font-medium animate-pulse">Loading event details...</div>;

    if (error) return (
        <div className="container mx-auto px-4 mt-24 text-center">
            <div className="card max-w-lg mx-auto py-12">
                <div className="text-red-500 mb-6 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl font-bold border border-red-100 italic">!</div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">{error}</h2>
                <p className="text-slate-500 mb-8">This event might have been deleted or the link is incorrect.</p>
                <Link to="/" className="btn-primary no-underline inline-flex">Go Home</Link>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 max-w-3xl py-12">
            <Link to="/" className="no-underline text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-8 font-bold text-sm transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Dashboard</span>
            </Link>

            <div className="card p-0 overflow-hidden border-none shadow-xl">
                <div className="bg-primary px-10 py-5 text-white relative overflow-hidden">

                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h1 className="m-0 text-4xl sm:text-5xl font-black leading-tight drop-shadow-sm">{event.title}</h1>
                </div>

                <div className="bg-white p-10 pt-5">
                    {event.description && (
                        <p className="text-lg text-slate-600 leading-relaxed m-0 mb-4 italic border-l-4 border-primary/20 pl-6">
                            {event.description}
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                            <div className="bg-slate-50 p-2 rounded-xl ring-1 ring-slate-100 flex shadow-sm"><Calendar size={20} className="text-primary" /></div>
                            <div>
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</span>
                                <span className="text-base font-bold text-slate-800">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-slate-50 p-2 rounded-xl ring-1 ring-slate-100 flex shadow-sm"><Clock size={20} className="text-primary" /></div>
                            <div>
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time</span>
                                <span className="text-base font-bold text-slate-800">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-slate-50 p-2 rounded-xl ring-1 ring-slate-100 flex shadow-sm"><MapPin size={20} className="text-pink-500" /></div>
                            <div>
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</span>
                                <span className="text-base font-bold text-slate-800">{event.location}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="bg-slate-50 p-2 rounded-xl ring-1 ring-slate-100 flex shadow-sm"><User size={20} className="text-emerald-500" /></div>
                            <div>
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Organizer</span>
                                <span className="text-base font-bold text-slate-800">{event.createdBy?.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-sm text-slate-400 font-medium italic">Share this event with your friends and colleagues!</p>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success('Event link copied!');
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold shadow-sm transition-all border border-green-800 flex items-center justify-center gap-2 cursor-pointer no-underline group"
                        >
                            <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                            <span>Copy Event Link</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicEvent;
