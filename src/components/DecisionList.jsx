import React from 'react';

const DecisionList = ({ decisions, activeId, onSelect, onDelete, onOpenModal }) => {
  return (
    <aside className="w-full md:w-96 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0">
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
              D
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Decision Board</h1>
              <p className="text-[11px] font-medium text-slate-400">Workspace</p>
            </div>
          </div>
          
          <button
            onClick={onOpenModal}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2 px-3.5 rounded-xl text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-base leading-none">+</span> New
          </button>
        </div>

        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            My Decisions
          </span>
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {decisions.length}
          </span>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {decisions.length === 0 ? (
            <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
              <p className="text-xs font-medium text-slate-400">No decisions created yet.</p>
              <button
                onClick={onOpenModal}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                + Create your first
              </button>
            </div>
          ) : (
            decisions.map((dec) => {
              const isActive = dec.id === activeId;
              const optionsCount = dec.options?.length || 0;

              return (
                <div
                  key={dec.id}
                  onClick={() => onSelect(dec.id)}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? 'bg-white border-blue-500 shadow-sm shadow-blue-500/5 text-slate-900 font-semibold'
                      : 'bg-transparent border-transparent text-slate-600 hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden mr-2">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isActive ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    />
                    <div className="truncate">
                      <p className="truncate text-sm">{dec.title}</p>
                      <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                        {optionsCount} option{optionsCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(dec.id);
                    }}
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all cursor-pointer shrink-0"
                    title="Delete decision"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-4 mt-auto border-t border-slate-200/60 hidden md:flex items-center justify-between text-xs text-slate-400">
        <span>NV ProjectLab Task</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
      </div>
    </aside>
  );
};

export default DecisionList;