import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([
        {
          id: Date.now().toString(),
          content: newNote,
          date: new Date(),
        },
        ...notes,
      ]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Notes</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
        />
        <button
          onClick={addNote}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-start justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-900">{note.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {note.date.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No notes yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
}