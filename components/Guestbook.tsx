/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GuestbookEntry } from '../types';
import { Send, Users, ShieldAlert, CheckCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const PRE_SEEDED_NOTES: GuestbookEntry[] = [];

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('aura_guestbook_notes');
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        setEntries(PRE_SEEDED_NOTES);
      }
    } else {
      setEntries(PRE_SEEDED_NOTES);
      localStorage.setItem('aura_guestbook_notes', JSON.stringify(PRE_SEEDED_NOTES));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    // Validate
    if (!name.trim() || !message.trim()) {
      setErrorMsg('Please include your name and a message.');
      return;
    }

    const newEntry: GuestbookEntry = {
      id: `user-note-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Visitor',
      message: message.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      createdAt: Date.now()
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('aura_guestbook_notes', JSON.stringify(updated));

    // Clear form
    setName('');
    setRole('');
    setMessage('');
    setSuccess(true);

    // Reset success banner after 4s
    setTimeout(() => setSuccess(false), 4000);
  };

  const clearGuestbook = () => {
    if (window.confirm('Would you like to restore the default guestbook entries?')) {
      setEntries(PRE_SEEDED_NOTES);
      localStorage.setItem('aura_guestbook_notes', JSON.stringify(PRE_SEEDED_NOTES));
    }
  };

  return (
    <div id="guestbook" className="py-20 bg-transparent border-t border-neutral-200/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-neutral-200/60 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">FEEDBACK & MESSAGES</span>
            <h2 className="font-serif text-4xl md:text-5xl text-black">
              Client <span className="italic font-normal text-neutral-500">Notes</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-sm font-sans leading-relaxed">
            A small space for clients, collaborators, and visitors to leave a message after viewing the work. Note: This feedback is stored locally in your browser.
          </p>
        </div>

        {/* Layout: Form on left, Messages on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Guestbook Form (Col 5) */}
          <div className="lg:col-span-5 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-black mb-2">Leave a Message</h3>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed mb-6">
              Share feedback, ask a question, or simply say hello.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-black focus:ring-1 focus:ring-black bg-themeBg transition-all font-sans text-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Role / Company (Optional)</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Brand or Agency"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-black focus:ring-1 focus:ring-black bg-themeBg transition-all font-sans text-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-black focus:ring-1 focus:ring-black bg-themeBg transition-all font-sans text-black"
                />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2 font-mono">
                  <ShieldAlert size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="p-3 bg-neutral-900 text-neutral-50 border border-black text-xs rounded flex items-center gap-2 font-mono animate-fade-in">
                  <CheckCircle size={14} className="text-neutral-400" />
                  <span>Thanks! Your message was saved locally.</span>
                </div>
              )}

                <button
                type="submit"
                id="guestbook-submit-btn"
                className="w-full py-3 px-6 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send size={12} />
                <span>Submit Message</span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <Users size={12} />
                {entries.length} Messages
              </span>
              <button 
                onClick={clearGuestbook}
                className="hover:text-neutral-900 transition-colors uppercase cursor-pointer underline"
              >
                Reset Messages
              </button>
            </div>
          </div>

          {/* Guestbook Entries Stream (Col 7) */}
          <div className="lg:col-span-7 space-y-6 max-h-[580px] overflow-y-auto pr-2 scrollbar-style">
            {entries.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-neutral-200 rounded-2xl text-neutral-400 font-mono text-xs">
                No messages yet. Be the first to leave one.
              </div>
            ) : (
              entries.map((entry) => (
                <div 
                  key={entry.id}
                  className="bg-white border border-neutral-200/50 rounded-2xl p-5 space-y-3 shadow-sm transition-all hover:border-black/20"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-serif text-lg text-neutral-900 leading-tight">
                        {entry.name}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        {entry.role}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">
                      {entry.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 font-sans leading-relaxed italic">
                    &ldquo;{entry.message}&rdquo;
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Guestbook;
