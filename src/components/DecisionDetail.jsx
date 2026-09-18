import React, { useState } from 'react';

const DecisionDetail = ({ decision, onSelectOption, onAddOption, onBackToList }) => {
  const [newOptionText, setNewOptionText] = useState('');

  if (!decision) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 min-h-[50vh]">
        <p className="text-sm font-medium">Select or create a decision to get started.</p>
      </div>
    );
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newOptionText.trim()) return;
    onAddOption(decision.id, newOptionText.trim());
    setNewOptionText('');
  };

  const selectedOption = decision.options.find(
    (opt) => opt.id === decision.selectedOptionId
  );

  return (
    <div className="flex-1 p-5 md:p-10 max-w-3xl mx-auto w-full">
      <button
        onClick={onBackToList}
        className="md:hidden mb-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl transition cursor-pointer"
      >
        ← Back to Decisions
      </button>

      <div className="mb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
          Active Decision
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 wrap-break-word">
          {decision.title}
        </h2>
      </div>

      {selectedOption ? (
        <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
              Selected Result
            </span>
            <p className="text-base md:text-lg font-bold text-slate-900 mt-0.5">
              {selectedOption.text}
            </p>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            ✓
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-2xl bg-slate-100 border border-dashed border-slate-300 text-slate-500 text-xs md:text-sm">
          No option selected yet. Click an option below to make your decision.
        </div>
      )}

      <div className="space-y-2.5 mb-8">
        {decision.options.map((opt) => {
          const isSelected = decision.selectedOptionId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(decision.id, opt.id)}
              className={`p-3.5 md:p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/60 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-blue-300 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden mr-2">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className={`font-medium text-sm md:text-base truncate ${isSelected ? 'text-blue-950 font-semibold' : 'text-slate-800'}`}>
                  {opt.text}
                </span>
              </div>

              {isSelected && (
                <span className="text-[10px] bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-medium shrink-0">
                  Selected
                </span>
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleAddSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new option..."
          value={newOptionText}
          onChange={(e) => setNewOptionText(e.target.value)}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:border-blue-500 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 md:py-3 rounded-xl text-sm transition cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default DecisionDetail;