import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-red-50 p-3 rounded-xl">
                            <AlertTriangle className="text-red-600" size={24} />
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors bg-transparent border-none cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title || 'Confirm Action'}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        {message || 'Are you sure you want to proceed? This action cannot be undone.'}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all shadow-sm shadow-red-200 cursor-pointer border-none disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
