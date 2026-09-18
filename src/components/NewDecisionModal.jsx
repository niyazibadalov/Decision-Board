import React, { useState } from 'react';

const NewDecisionModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
    if (error) setError('');
  };

  const handleAddOptionField = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validOptions = options.map((o) => o.trim()).filter(Boolean);

    if (!title.trim()) {
      setError('Please enter a decision title or question.');
      return;
    }

    if (validOptions.length < 2) {
      setError('Please provide at least 2 distinct options.');
      return;
    }

    onCreate(title.trim(), validOptions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-900 mb-4">Create New Decision</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError('')}
              className="text-red-400 hover:text-red-600 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Title / Question</label>
            <input
              type="text"
              placeholder="e.g. Which laptop should I buy?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 bg-white"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Options</label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddOptionField}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-2 cursor-pointer"
            >
              + Add another option
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition cursor-pointer shadow-xs"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDecisionModal;