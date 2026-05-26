import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Inbox,
  Star,
  Send,
  FileText,
  Archive,
  Trash2,
  MoreHorizontal,
  Search,
  Paperclip,
  Reply,
  Forward,
  CornerUpLeft,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';

interface ThreadMessage {
  id: string;
  sender: string;
  initials: string;
  avatarGradient: string;
  time: string;
  body: string[];
}

interface Email {
  id: string;
  sender: string;
  initials: string;
  avatarGradient: string;
  subject: string;
  preview: string;
  time: string;
  body: string[];
  summary: string;
  unread: boolean;
  starred: boolean;
  archived: boolean;
  trashed: boolean;
  category: 'Work' | 'Personal' | 'Travel' | 'Finance';
  attachment?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Urgent';
  history?: ThreadMessage[];
}

export default function InboxMockup() {
  // Global email state to allow real mechanics (archive, delete, star, search, filter)
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      sender: 'Linear',
      initials: 'L',
      avatarGradient: 'from-[#00d2ff] to-[#0B2551]',
      subject: 'Weekly product digest',
      preview: 'Your team shipped 23 issues this week...',
      time: '9:41 AM',
      unread: true,
      starred: false,
      archived: false,
      trashed: false,
      category: 'Work',
      sentiment: 'Neutral',
      summary: 'Your team closed 23 issues, merged 14 PRs, and shipped 2 features. Top contributor: Marcus. No action needed.',
      attachment: 'digest-may-6.pdf',
      body: [
        'Hi team,',
        'Here is your weekly digest of everything happening across your projects. This was a strong week with significant progress on the Q3 roadmap.',
        'Twenty-three issues were closed, fourteen pull requests were merged, and two customer-facing features went out. The velocity trend continues to climb.',
        'Let me know if you would like a deeper breakdown by project or contributor.',
        '— The Linear team'
      ],
      history: [
        {
          id: 'h1_1',
          sender: 'Linear Support',
          initials: 'LS',
          avatarGradient: 'from-slate-700 to-slate-900',
          time: 'May 20, 2:15 PM',
          body: [
            'Automated integration check: Linear is successfully synchronized with Vesper Workspace databases. All closed issues are tracking correctly towards Q3 design targets.'
          ]
        }
      ]
    },
    {
      id: '2',
      sender: 'Sophia Chen',
      initials: 'SC',
      avatarGradient: 'from-[#A4F4FD] to-[#3D81E3]',
      subject: 'Re: Q3 roadmap review',
      preview: 'Thanks for sending the deck over. I had a few thoughts...',
      time: '8:12 AM',
      unread: true,
      starred: true,
      archived: false,
      trashed: false,
      category: 'Personal',
      sentiment: 'Urgent',
      summary: 'Sophia reviewed the Q3 roadmap deck. She is fully aligned with the timelines but requests a correction on slide 14 regarding resources before Wednesday.',
      body: [
        'Hi folks,',
        'Thanks for sending the Q3 roadmap deck over! The timeline looks solid.',
        'Just one note: Let\'s review Slide 14. We might need to adjust the resource allocation to ensure we are aligned with current design priority changes.',
        'Let\'s catch up briefly on Zoom tomorrow morning.',
        'Best,',
        'Sophia Chen · Product Strategy'
      ],
      history: [
        {
          id: 'h2_1',
          sender: 'Me (Vesper Workspace)',
          initials: 'VE',
          avatarGradient: 'from-brand/40 to-brand/80',
          time: 'Yesterday, 4:15 PM',
          body: [
            'Hi Sophia, finding here the initial draft of the Q3 product and design sprint roadmap deck.',
            'Please review slide 14 specifically since that contains our proposed human resource allocations. Let me know what you think!',
            'Best, User'
          ]
        },
        {
          id: 'h2_2',
          sender: 'Sophia Chen',
          initials: 'SC',
          avatarGradient: 'from-[#A4F4FD] to-[#3D81E3]',
          time: 'Yesterday, 3:30 PM',
          body: [
            'Thanks for setting up the workspace! Let\'s get the Q3 roadmap deck rolling as soon as possible so we can align our design milestones early with the engineering team.'
          ]
        }
      ]
    },
    {
      id: '3',
      sender: 'Figma',
      initials: 'F',
      avatarGradient: 'from-[#ff5f57] to-[#febc2e]',
      subject: 'Marcus commented on your file',
      preview: 'Love the new direction on the landing hero.',
      time: 'Yesterday',
      unread: false,
      starred: false,
      archived: false,
      trashed: false,
      category: 'Work',
      sentiment: 'Positive',
      summary: 'Marcus left constructive feedback on the Vesper-marketing canvas. He loves the high contrast layout and suggests refining the Bezier keyframes.',
      body: [
        'Marcus commented on "Vesper-marketing-v3":',
        '"Love the new direction on the landing hero! The high contrast aesthetic feels incredibly modern and crisp. Let\'s make sure we test the animations with the cubic-bezier curve to preserve that cinematic feel."',
        'View comment notification thread in Figma to Reply directly.'
      ],
      history: [
        {
          id: 'h3_1',
          sender: 'Me (Vesper Workspace)',
          initials: 'VE',
          avatarGradient: 'from-brand/40 to-brand/80',
          time: 'Monday, 2:10 PM',
          body: [
            'Uploaded mockups for the updated "Vesper-marketing-v3" in Figma!',
            'Ready for review on layout density, high contrast curves, and interactive canvas components.'
          ]
        }
      ]
    },
    {
      id: '4',
      sender: 'Stripe',
      initials: 'S',
      avatarGradient: 'from-[#10b981] to-[#04332d]',
      subject: 'Payout of $12,480.00 sent',
      preview: 'Your payout is on its way to your bank...',
      time: 'Yesterday',
      unread: false,
      starred: false,
      archived: false,
      trashed: false,
      category: 'Finance',
      sentiment: 'Positive',
      summary: 'Stripe processed a payout of $12,480.00 USD. Funds are scheduled to arrive in your bank account within 24 to 48 hours.',
      body: [
        'Your payout is on its way.',
        'Payout ID: po_1Mza2qLkd8F92mS. The transfer of $12,480.00 is complete on our end and is currently being processed by your bank.',
        'If the funds do not reflect in your account by Thursday, contact your account administrator.',
        '— Stripe Financial'
      ]
    },
    {
      id: '5',
      sender: 'Vercel',
      initials: 'V',
      avatarGradient: 'from-zinc-700 to-zinc-950',
      subject: 'Deployment ready for vesper-web',
      preview: 'Preview is live at vesper-web-g3f.vercel.app',
      time: 'Mon',
      unread: false,
      starred: false,
      archived: false,
      trashed: false,
      category: 'Work',
      sentiment: 'Positive',
      summary: 'Vercel succeeded building branch and deployed vesper-web. Performance score remains at a flawless 100 on LightHouse metrics.',
      body: [
        'Deployment complete for vesper-web (branch production).',
        'Preview URL: vesper-web-g3f.vercel.app',
        'Vite has finished compiling assets, tree-shaking 92% of dead branches, and hosting on isolated global edge networks.',
        'Build speed: 0.9s | Lighthouse Score: 100/100 UI compliance'
      ]
    },
    {
      id: '6',
      sender: 'GitHub',
      initials: 'G',
      avatarGradient: 'from-slate-700 to-slate-900',
      subject: '[vesper/core] PR #482 approved',
      preview: 'david-lim approved your pull request.',
      time: 'Mon',
      unread: false,
      starred: false,
      archived: false,
      trashed: false,
      category: 'Work',
      sentiment: 'Neutral',
      summary: 'David Lim reviewed and approved your PR to decouple static landing utilities. Code passed all strict ESLint, build compiles successfully.',
      body: [
        'david-lim approved pull request #[vesper/core-482] "Decouple static components":',
        '"Clean implementation of modular folders! This matches our internal design principles. Ready to merge to primary staging branches on next runner clearance."',
        'All automated checks passed smoothly.'
      ],
      history: [
        {
          id: 'h6_1',
          sender: 'GitHub Actions',
          initials: 'GH',
          avatarGradient: 'from-purple-900 to-black',
          time: 'Monday, 11:30 AM',
          body: [
            'Workflow "build-and-test" triggered for branch vesper/core-482.',
            'Summary: 14 lint checks succeeded, unit test execution complete (coverage: 98%), esbuild compilation completed in 140ms.'
          ]
        }
      ]
    }
  ]);

  // UI state variables
  const [activeFolder, setActiveFolder] = useState<'Inbox' | 'Starred' | 'Sent' | 'Drafts' | 'Archive' | 'Trash'>('Inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedMessageIds, setExpandedMessageIds] = useState<Record<string, boolean>>({});

  const toggleMessageExpand = (msgId: string) => {
    setExpandedMessageIds(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [newEmailTo, setNewEmailTo] = useState<string>('');
  const [newEmailSubject, setNewEmailSubject] = useState<string>('');
  const [newEmailBody, setNewEmailBody] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter labels selection
  const [selectedLabelFilter, setSelectedLabelFilter] = useState<string | null>(null);

  // Computed Inbox email count for sidebar (unread and active in folder)
  const folderCounts = useMemo(() => {
    return {
      Inbox: emails.filter(e => !e.archived && !e.trashed).length,
      Starred: emails.filter(e => e.starred && !e.trashed).length,
      Drafts: 2, // static visual placeholder counts
      Archive: emails.filter(e => e.archived && !e.trashed).length,
      Trash: emails.filter(e => e.trashed).length
    };
  }, [emails]);

  // Derived filter list
  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      // Folder logic
      if (activeFolder === 'Inbox' && (email.archived || email.trashed)) return false;
      if (activeFolder === 'Starred' && (!email.starred || email.trashed)) return false;
      if (activeFolder === 'Archive' && (!email.archived || email.trashed)) return false;
      if (activeFolder === 'Trash' && !email.trashed) return false;
      if (activeFolder === 'Drafts' || activeFolder === 'Sent') return false; // simulated empty/mock for these folders

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          email.sender.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Label filter
      if (selectedLabelFilter) {
        if (email.category !== selectedLabelFilter) return false;
      }

      return true;
    });
  }, [emails, activeFolder, searchQuery, selectedLabelFilter]);

  // Current reading email
  const currentEmail = useMemo(() => {
    return emails.find(e => e.id === selectedEmailId) || emails[0];
  }, [emails, selectedEmailId]);

  // Helper action: Show a dynamic auto-dismissing toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Archive action
  const handleToggleArchive = (id: string) => {
    setEmails(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newState = !item.archived;
          triggerToast(newState ? 'Email archived.' : 'Email moved back to Inbox.');
          return { ...item, archived: newState };
        }
        return item;
      })
    );
  };

  // Star action
  const handleToggleStar = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEmails(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, starred: !item.starred };
        }
        return item;
      })
    );
  };

  // Trash action
  const handleToggleTrash = (id: string) => {
    setEmails(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newState = !item.trashed;
          triggerToast(newState ? 'Email moved to Trash.' : 'Email restored.');
          return { ...item, trashed: newState, archived: false };
        }
        return item;
      })
    );
  };

  // Mark all read helper
  const handleMarkRead = (id: string) => {
    setEmails(prev =>
      prev.map(item => {
        if (item.id === id && item.unread) {
          return { ...item, unread: false };
        }
        return item;
      })
    );
  };

  // Handle click on an email row
  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    handleMarkRead(id);
  };

  // Interactive submit of Compose Dialog
  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmailTo) {
      triggerToast('Please specify a recipient.');
      return;
    }
    triggerToast(`Draft successfully processed by Vesper Intelligence and sent to ${newEmailTo}!`);
    setIsComposeOpen(false);
    setNewEmailTo('');
    setNewEmailSubject('');
    setNewEmailBody('');
  };

  // AI assist write preview helper
  const handleAIAssistSuggest = () => {
    setNewEmailSubject('Refining collaboration strategies');
    setNewEmailBody(
      'Hi!\n\nJust wanted to synchronize regarding our layout systems. Under Vesper\'s semantic routing, we decoupled secondary assets for optimized build pipelines. Let\'s schedule 10 minutes to verify integration.\n\nBest,\nUser'
    );
    triggerToast('Email drafted with Vesper AI.');
  };

  return (
    <div className="w-full relative">
      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-brand/90 backdrop-blur-md text-white text-xs px-5 py-2.5 flex items-center gap-2 shadow-lg border border-white/20 select-none font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer mock shell */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-3xl shadow-2xl flex flex-col w-full">
        {/* macOS Style Header Title Bar */}
        <div className="w-full bg-black/40 h-11 flex items-center justify-between px-4 border-b border-white/5 select-none shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dfa024] cursor-pointer hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1fa02e] cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
          <div className="text-xs text-white/50 font-medium font-mono">
            Vesper — {activeFolder} {selectedLabelFilter ? `(${selectedLabelFilter})` : ''}
          </div>
          <div className="w-14" /> {/* spacer for visual symmetry */}
        </div>

        {/* Outer Grid Body Layout */}
        <div className="grid grid-cols-12 h-[520px] divide-x divide-white/5 bg-[#090b0e]/70">
          
          {/* 1st Column: Sidebar (col-span-3) */}
          <div className="col-span-12 md:col-span-3 p-4 flex flex-col justify-between bg-black/25 shrink-0 hidden md:flex">
            <div>
              {/* Compose Command Bar Button */}
              <button
                onClick={() => setIsComposeOpen(true)}
                className="w-full group rounded-lg bg-white text-black text-xs font-semibold px-3 py-2.5 flex items-center justify-center gap-2 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer shadow-md select-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand animate-pulse" />
                <span>Compose with Vesper</span>
              </button>

              {/* Navigation folder items */}
              <nav className="mt-6 space-y-1">
                {[
                  { name: 'Inbox' as const, icon: Inbox, count: folderCounts.Inbox },
                  { name: 'Starred' as const, icon: Star, count: folderCounts.Starred },
                  { name: 'Sent' as const, icon: Send },
                  { name: 'Drafts' as const, icon: FileText, count: folderCounts.Drafts },
                  { name: 'Archive' as const, icon: Archive, count: folderCounts.Archive },
                  { name: 'Trash' as const, icon: Trash2, count: folderCounts.Trash }
                ].map(folder => {
                  const IconComp = folder.icon;
                  const isActive = activeFolder === folder.name;
                  return (
                    <button
                      key={folder.name}
                      onClick={() => {
                        setActiveFolder(folder.name);
                        // Autoselect first item in new folder view
                        setSelectedLabelFilter(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/10 text-white shadow-sm'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-brand' : 'text-white/40'}`} />
                        <span>{folder.name}</span>
                      </div>
                      {folder.count !== undefined && folder.count > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/5 text-white/50">
                          {folder.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Labels tag pills block */}
              <div className="mt-8">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold block px-3">
                  Labels
                </span>
                <div className="mt-2.5 space-y-1">
                  {[
                    { name: 'Work', color: '#00d2ff' },
                    { name: 'Personal', color: '#A4F4FD' },
                    { name: 'Travel', color: '#f59e0b' },
                    { name: 'Finance', color: '#10b981' }
                  ].map(lbl => {
                    const isFiltering = selectedLabelFilter === lbl.name;
                    return (
                      <button
                        key={lbl.name}
                        onClick={() => setSelectedLabelFilter(isFiltering ? null : lbl.name)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[11px] transition-all cursor-pointer ${
                          isFiltering
                            ? 'bg-brand/20 text-brand-active text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: lbl.color }}
                          />
                          <span>{lbl.name}</span>
                        </div>
                        {isFiltering && (
                          <span className="text-[10px] text-brand/80">Active</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick footer profile metadata */}
            <div className="border-t border-white/5 pt-3 flex items-center gap-2.5 select-none">
              <div className="w-6 h-6 rounded-full bg-brand/35 text-[10px] text-brand border border-brand/50 flex items-center justify-center font-bold">
                VE
              </div>
              <div>
                <p className="text-[10px] text-white/95 font-semibold leading-none">Vesper Workspace</p>
                <p className="text-[9px] text-white/40 font-mono mt-0.5 select-all">tuhinafroza07@gmail.com</p>
              </div>
            </div>
          </div>

          {/* 2nd Column: Message List (col-span-4) */}
          <div className="col-span-12 sm:col-span-5 md:col-span-4 flex flex-col h-full bg-[#090b0e]/30 select-none">
            {/* Search email header block */}
            <div className="p-3 border-b border-white/5 flex items-center gap-2 shrink-0">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search mail"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md bg-white/5 border border-white/5 py-1.5 pl-8 pr-3 text-xs text-white placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:border-brand/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Active filters display */}
            {(selectedLabelFilter || searchQuery) && (
              <div className="px-3 py-1.5 bg-brand/5 border-b border-white/5 flex items-center justify-between text-[10px] text-[#A4F4FD]">
                <div className="flex items-center gap-1">
                  <span>Filtered by:</span>
                  {selectedLabelFilter && (
                    <span className="bg-white/10 px-1 py-0.5 rounded">{selectedLabelFilter}</span>
                  )}
                  {searchQuery && (
                    <span className="bg-white/10 px-1 py-0.5 rounded truncate max-w-[80px]">"{searchQuery}"</span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedLabelFilter(null);
                    setSearchQuery('');
                  }}
                  className="text-white/40 hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Messages scrolling stack container */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {filteredEmails.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-xs text-white/40">No mail found</p>
                  <p className="text-[10px] text-white/20 mt-1">Try switching folders or clearing the filters.</p>
                </div>
              ) : (
                filteredEmails.map(email => {
                  const isActive = email.id === selectedEmailId;
                  return (
                    <div
                      key={email.id}
                      onClick={() => handleEmailClick(email.id)}
                      className={`p-3 cursor-pointer transition-all relative ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'hover:bg-white/5 text-white/80'
                      }`}
                    >
                      {/* Left side unread marker accent bar */}
                      {email.unread && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand" />
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{email.sender}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                          <span>{email.time}</span>
                          <button
                            onClick={(e) => handleToggleStar(email.id, e)}
                            className="hover:text-amber-400 transition"
                          >
                            <Star
                              className={`w-3 h-3 ${
                                email.starred ? 'fill-amber-400 text-amber-400' : 'text-white/20'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs font-medium text-white/90 truncate mt-0.5">
                        {email.subject}
                      </div>
                      <div className="text-[11px] text-white/45 line-clamp-1 mt-0.5 leading-snug">
                        {email.preview}
                      </div>

                      {/* Display colored category bullet */}
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              email.category === 'Work'
                                  ? '#00d2ff'
                                  : email.category === 'Personal'
                                  ? '#A4F4FD'
                                  : email.category === 'Travel'
                                  ? '#f59e0b'
                                  : '#10b981'
                          }}
                        />
                        <span className="text-[9px] text-white/30 lowercase uppercase font-mono tracking-wider mr-1">
                          {email.category}
                        </span>

                        {email.sentiment && (
                          <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                            email.sentiment === 'Positive'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                              : email.sentiment === 'Urgent'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15 animate-pulse'
                              : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/15'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${
                              email.sentiment === 'Positive' ? 'bg-emerald-400' : email.sentiment === 'Urgent' ? 'bg-rose-400' : 'bg-zinc-400'
                            }`} />
                            <span>{email.sentiment}</span>
                          </div>
                        )}

                        {email.attachment && (
                          <Paperclip className="w-2.5 h-2.5 text-white/25 ml-auto" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 3rd Column: Mail Reader Pane (col-span-5) */}
          <div className="col-span-12 sm:col-span-7 md:col-span-5 flex flex-col h-full bg-black/10">
            {currentEmail ? (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Actions Reader Header Toolbar */}
                <div className="p-2 border-b border-white/5 flex items-center justify-between bg-black/25 shrink-0 px-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => triggerToast('Replying is simulated in this mockup.')}
                      title="Reply"
                      className="w-7 h-7 rounded-md hover:bg-white/5 active:bg-white/10 transition inline-flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                    >
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => triggerToast('Forwarding is simulated in this mockup.')}
                      title="Forward"
                      className="w-7 h-7 rounded-md hover:bg-white/5 active:bg-white/10 transition inline-flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                    >
                      <Forward className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleArchive(currentEmail.id)}
                      title={currentEmail.archived ? 'Move to Inbox' : 'Archive'}
                      className={`w-7 h-7 rounded-md hover:bg-white/5 active:bg-white/10 transition inline-flex items-center justify-center cursor-pointer ${
                        currentEmail.archived ? 'text-brand' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleTrash(currentEmail.id)}
                      title={currentEmail.trashed ? 'Restore email' : 'Move to Trash'}
                      className={`w-7 h-7 rounded-md hover:bg-white/5 active:bg-white/10 transition inline-flex items-center justify-center cursor-pointer ${
                        currentEmail.trashed ? 'text-rose-500' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-px h-4 bg-white/10 mx-1 shrink-0" />
                    <button
                      onClick={() => setIsComposeOpen(true)}
                      title="Compose with Vesper"
                      className="px-2.5 py-1 rounded bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 text-[#A4F4FD] border border-[#00d2ff]/25 hover:border-[#00d2ff]/40 flex items-center gap-1.5 transition text-[10px] font-semibold uppercase tracking-wider cursor-pointer select-none"
                    >
                      <Sparkles className="w-3 h-3 animate-pulse text-cyan-200" />
                      <span>Compose</span>
                    </button>
                  </div>
                  <button className="w-7 h-7 rounded-md hover:bg-white/5 transition inline-flex items-center justify-center text-white/40 hover:text-white cursor-pointer">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Email Core Body & Metadata Scrolling container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 group">
                  {/* Sender & Subject details */}
                  <div className="flex items-start justify-between border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight leading-tight">
                        {currentEmail.subject}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-white/55">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${currentEmail.avatarGradient} flex items-center justify-center text-[9px] font-bold text-white uppercase select-none`}
                        >
                          {currentEmail.initials}
                        </div>
                        <span className="font-medium text-white/80">{currentEmail.sender}</span>
                        <span className="text-white/30 font-light">to me · {currentEmail.time}</span>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] uppercase font-mono tracking-wide text-white/40">
                        {currentEmail.category}
                      </span>
                    </div>
                  </div>

                  {/* Glassy sparkles smart AI summary block */}
                  <motion.div
                    key={`summary-${currentEmail.id}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm shadow-inner relative transition-all duration-300 group-hover:border-[#00d2ff]/30 group-hover:bg-[#00d2ff]/[0.02] hover:!border-[#00d2ff]/50 hover:!bg-[#00d2ff]/[0.06] hover:shadow-[0_0_15px_rgba(0,210,255,0.08)] cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-200 uppercase tracking-wide select-none">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse animate-duration-1000" />
                      <span>Summary by Vesper</span>
                    </div>
                    <p className="mt-2 text-xs text-cyan-50/90 leading-relaxed font-mono">
                      {currentEmail.summary}
                    </p>
                  </motion.div>

                  {/* Primary text body paragraphs */}
                  <div className="space-y-3.5 text-xs text-white/70 leading-relaxed font-light">
                    {currentEmail.body.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>

                  {/* Attachment card link mockup */}
                  {currentEmail.attachment && (
                    <div className="pt-2 select-none">
                      <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-[11px] text-white/80 hover:bg-white/5 cursor-pointer transition">
                        <Paperclip className="w-3 h-3 text-white/45" />
                        <span>{currentEmail.attachment}</span>
                        <span className="text-[9px] text-white/30">(4.2 MB)</span>
                      </div>
                    </div>
                  )}

                  {/* Collapsible Nested UI for Previous Messages */}
                  {currentEmail.history && currentEmail.history.length > 0 && (
                    <div className="mt-6 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">
                        <MessageSquare className="w-3 h-3 text-cyan-400" />
                        <span>Thread History ({currentEmail.history.length})</span>
                      </div>
                      <div className="space-y-2">
                        {currentEmail.history.map((hmsg) => {
                          const isExpanded = expandedMessageIds[hmsg.id] ?? false;
                          return (
                            <div
                              key={hmsg.id}
                              className="rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] overflow-hidden transition-all duration-200"
                            >
                              {/* Thread Header */}
                              <div
                                onClick={() => toggleMessageExpand(hmsg.id)}
                                className="p-3 flex items-center justify-between cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${hmsg.avatarGradient} flex items-center justify-center text-[8px] font-bold text-white uppercase`}
                                  >
                                    {hmsg.initials}
                                  </div>
                                  <div className="text-left">
                                    <span className="text-xs font-semibold text-white/80">{hmsg.sender}</span>
                                    {!isExpanded && (
                                      <span className="text-[10px] text-white/40 ml-2 line-clamp-1 inline md:inline-block max-w-[150px] truncate align-middle">
                                        — {hmsg.body[0]}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] text-white/30">{hmsg.time}</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5 text-white/40" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                                  )}
                                </div>
                              </div>

                              {/* Collapsible Body */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-3 pb-3 pt-1 border-t border-white/5 text-[11px] text-white/60 leading-relaxed space-y-2 font-light">
                                      {hmsg.body.map((p, pIdx) => (
                                        <p key={pIdx}>{p}</p>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="m-auto text-center p-6 text-white/35">
                <p className="text-xs">No email loaded.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Floating Compose Glass Dialog */}
      <AnimatePresence>
        {isComposeOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
              style={{ background: 'rgba(12, 12, 12, 0.92)' }}
              className="w-full max-w-lg rounded-2xl border border-white/15 shadow-2xl overflow-hidden"
            >
              <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Compose with Vesper Intelligence
                  </span>
                </div>
                <button
                  onClick={() => setIsComposeOpen(false)}
                  className="rounded-full w-6 h-6 hover:bg-white/10 transition flex items-center justify-center text-white/50 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleComposeSubmit} className="p-4 space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/45 uppercase tracking-wide">To:</label>
                  <input
                    type="email"
                    required
                    placeholder="teammate@agency.com"
                    value={newEmailTo}
                    onChange={(e) => setNewEmailTo(e.target.value)}
                    className="w-full rounded-md bg-white/[0.04] border border-white/10 py-1.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-brand/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/45 uppercase tracking-wide">Subject:</label>
                  <input
                    type="text"
                    placeholder="Weekly planning session"
                    value={newEmailSubject}
                    onChange={(e) => setNewEmailSubject(e.target.value)}
                    className="w-full rounded-md bg-white/[0.04] border border-white/10 py-1.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-brand/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-white/45 uppercase tracking-wide">Message:</label>
                    <button
                      type="button"
                      onClick={handleAIAssistSuggest}
                      className="text-[10px] px-2 py-0.5 rounded bg-brand/20 text-blue-200 border border-brand/40 hover:bg-brand/35 transition cursor-pointer flex items-center gap-1 leading-none"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-cyan-200" />
                      <span>Draft using AI</span>
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Type or click 'Draft using AI'..."
                    value={newEmailBody}
                    onChange={(e) => setNewEmailBody(e.target.value)}
                    className="w-full rounded-md bg-white/[0.04] border border-white/10 p-3 text-white placeholder-white/20 focus:outline-none focus:border-brand/40 resize-none font-mono"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="text-[10px] text-white/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    <span>Vesper Auto-Refiner Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsComposeOpen(false)}
                      className="px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-brand text-white font-medium hover:bg-brand/90 active:scale-95 transition shadow-md cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Route Email</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
