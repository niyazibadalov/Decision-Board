import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/id';

const initialDecisions = [
  {
    id: 'dec-1',
    title: 'Where should I study?',
    selectedOptionId: null,
    options: [
      { id: 'opt-1', text: 'Library' },
      { id: 'opt-2', text: 'Home' },
      { id: 'opt-3', text: 'Cafe' }
    ]
  }
];

export function useDecisions() {
  const [decisions, setDecisions] = useLocalStorage('decisions', initialDecisions);
  const [activeDecisionId, setActiveDecisionId] = useState(decisions[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState('list');

  const activeDecision = decisions.find((d) => d.id === activeDecisionId);

  const selectDecision = (id) => {
    setActiveDecisionId(id);
    setMobileView('detail');
  };

  const createDecision = (title, initialOptions) => {
    const newDecision = {
      id: generateId(),
      title,
      selectedOptionId: null,
      options: initialOptions.map((opt) => ({
        id: generateId(),
        text: opt
      }))
    };
    setDecisions([...decisions, newDecision]);
    setActiveDecisionId(newDecision.id);
    setMobileView('detail');
  };

  const deleteDecision = (id) => {
    const filtered = decisions.filter((d) => d.id !== id);
    setDecisions(filtered);
    if (activeDecisionId === id) {
      setActiveDecisionId(filtered[0]?.id || null);
    }
  };

  const addOption = (decisionId, optionText) => {
    setDecisions(
      decisions.map((dec) => {
        if (dec.id === decisionId) {
          return {
            ...dec,
            options: [...dec.options, { id: generateId(), text: optionText }]
          };
        }
        return dec;
      })
    );
  };

  const selectOption = (decisionId, optionId) => {
    setDecisions(
      decisions.map((dec) => {
        if (dec.id === decisionId) {
          if (dec.selectedOptionId === optionId) return dec;
          return { ...dec, selectedOptionId: optionId };
        }
        return dec;
      })
    );
  };

  return {
    decisions,
    activeDecision,
    activeDecisionId,
    mobileView,
    setMobileView,
    selectDecision,
    isModalOpen,
    setIsModalOpen,
    createDecision,
    deleteDecision,
    addOption,
    selectOption
  };
}