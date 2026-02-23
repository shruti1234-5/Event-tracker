import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ConfirmModal from '../components/ConfirmModal';
import { Clock, MapPin, Share2, Trash2, Calendar, Plus, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await API.get('/events');
            setEvents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteModal({ show: true, id });
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await API.delete(`/events/${deleteModal.id}`);
            setEvents(events.filter(e => e._id !== deleteModal.id));
            toast.success('Event deleted');
            setDeleteModal({ show: false, id: null });
        } catch (err) {
            toast.error('Error deleting event');
        } finally {
            setIsDeleting(false);
        }
    };

    const filtered = events.filter(e => {
        const date = new Date(e.date);
        const now = new Date();
        if (filter === 'upcoming') return date >= now;
        if (filter === 'past') return date < now;
        return true;
    });

    if (loading) return <div className="text-center py-24 text-slate-500 font-medium">Loading Events...</div>;

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="m-0 text-3xl font-extrabold text-slate-800">My Events</h1>
                </div>

                <div className="flex items-center gap-3 bg-white ps-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <Filter size={16} className="text-slate-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-transparent border-none py-1 pe-2 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
                    >
                        <option value="all">All Events</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="card text-center py-16 bg-slate-50 border-dashed border-2 flex flex-col items-center">
                    <Calendar size={48} className="text-slate-300 mb-4" />
                    <h3 className="mb-2 text-xl font-bold text-slate-700">No events found</h3>
                    <p className="text-slate-500 mb-8 max-w-xs">{filter === 'all' ? "You haven't created any events yet." : `No ${filter} events found matching your filter.`}</p>
                    <Link to="/create-event" className="btn-primary no-underline">
                        <Plus size={20} />
                        <span>Create Your First Event</span>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filtered.map(event => (
                        <div key={event._id} className="card flex flex-col justify-between hover:border-primary/30 transition-colors group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-indigo-50 text-primary px-3 py-1 rounded-full text-xs font-bold ring-1 ring-indigo-100 uppercase tracking-tighter">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => {
                                                const url = `${window.location.origin}/event/${event._id}`;
                                                navigator.clipboard.writeText(url);
                                                toast.success('Public link copied!');
                                            }}
                                            className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors bg-transparent border-none cursor-pointer flex"
                                            title="Copy Share Link"
                                        >
                                            <Share2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(event._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-colors bg-transparent border-none cursor-pointer flex"
                                            title="Delete Event"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="m-0 mb-2 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{event.title}</h3>
                                {event.description && (
                                    <p className="text-slate-500 text-sm leading-relaxed mb-1 line-clamp-3">{event.description}</p>
                                )}
                            </div>

                            <div className="border-t border-slate-100 pt-5 mt-auto space-y-3 font-semibold text-sm">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Clock size={16} className="text-primary opacity-70" />
                                    <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <MapPin size={16} className="text-pink-500 opacity-70" />
                                    <span className="truncate">{event.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, id: null })}
                onConfirm={confirmDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone and the public link will stop working."
                loading={isDeleting}
            />
        </div>
    );
};

export default Dashboard;
