import React, { useState } from 'react';
import { Search, FileText, Scale, /*BookOpen*/ Send, Loader2, AlertCircle, CheckCircle, MessageSquare, Book, Gavel, Menu, X, Plus, Home, Settings, HelpCircle, Moon, Sun, Sparkles, Briefcase, ArrowLeft /*Users*/ } from 'lucide-react';


const legalDatabase = {
  ipcSections: {
    '420': {
      title: 'Cheating and dishonestly inducing delivery of property',
      description: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to consent that any person shall retain any property, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
      punishment: 'Up to 7 years imprisonment and fine',
      relatedCases: ['State of Maharashtra v. Balakrishna', 'Hridaya Ranjan Prasad Verma v. State of Bihar']
    },
    '302': {
      title: 'Punishment for murder',
      description: 'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.',
      punishment: 'Death or life imprisonment and fine',
      relatedCases: ['Bachan Singh v. State of Punjab', 'Machhi Singh v. State of Punjab']
    },
    '376': {
      title: 'Punishment for rape',
      description: 'Whoever commits rape shall be punished with rigorous imprisonment for a term which shall not be less than ten years but may extend to imprisonment for life, and shall also be liable to fine.',
      punishment: 'Minimum 10 years to life imprisonment and fine',
      relatedCases: ['Mukesh v. State of NCT Delhi', 'State of Punjab v. Gurmit Singh']
    }
  },
  cases: [
    {
      id: 1,
      title: 'Kesavananda Bharati v. State of Kerala',
      year: 1973,
      court: 'Supreme Court',
      citation: 'AIR 1973 SC 1461',
      principle: 'Basic Structure Doctrine - Parliament cannot alter the basic structure of the Constitution',
      category: 'Constitutional Law'
    },
    {
      id: 2,
      title: 'Vishaka v. State of Rajasthan',
      year: 1997,
      court: 'Supreme Court',
      citation: 'AIR 1997 SC 3011',
      principle: 'Guidelines for prevention of sexual harassment at workplace',
      category: 'Labour Law'
    },
    {
      id: 3,
      title: 'DK Basu v. State of West Bengal',
      year: 1997,
      court: 'Supreme Court',
      citation: 'AIR 1997 SC 610',
      principle: 'Guidelines for arrest and detention to prevent custodial violence',
      category: 'Criminal Law'
    }
  ],
  legalConcepts: {
    'bail': 'Bail is the temporary release of an accused person awaiting trial, on condition that a sum of money is lodged to guarantee their appearance in court. It is governed by CrPC Sections 436-450.',
    'anticipatory bail': 'Anticipatory bail is a direction to release a person on bail, issued even before the person is arrested. It is granted under Section 438 of CrPC when there is apprehension of arrest.',
    'writ': 'A writ is a formal written order issued by a court. The Constitution provides for five types of writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.',
    'injunction': 'An injunction is a court order requiring a person to do or cease doing a specific action. It can be temporary or permanent.'
  }
};

const LegalAssistantRefined = () => {
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('chat');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentText, setDocumentText] = useState('');
  const [caseSearch, setCaseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [conversations] = useState([
    { id: 1, title: 'Contract Review Question', time: '2 hours ago' },
    { id: 2, title: 'Employment Law Inquiry', time: 'Yesterday' },
    { id: 3, title: 'Tenant Rights Question', time: '2 days ago' }
  ]);

  const generateResponse = (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();
    
    const ipcMatch = lowerQuery.match(/section\s*(\d+)|ipc\s*(\d+)|(\d{3})\s*ipc/);
    if (ipcMatch) {
      const section = ipcMatch[1] || ipcMatch[2] || ipcMatch[3];
      const ipcData = legalDatabase.ipcSections[section];
      
      if (ipcData) {
        return {
          type: 'ipc',
          content: `**🔍 Section ${section} IPC: ${ipcData.title}**\n\n**📋 Description:**\n${ipcData.description}\n\n**⚖️ Punishment:**\n${ipcData.punishment}\n\n**📚 Related Landmark Cases:**\n${ipcData.relatedCases.map(c => `• ${c}`).join('\n')}\n\n**💡 Legal Tip:** This section is frequently invoked in cases involving fraud and deception. Documentation and evidence are crucial for establishing intent.`,
          confidence: 'high'
        };
      }
    }

    for (const [concept, definition] of Object.entries(legalDatabase.legalConcepts)) {
      if (lowerQuery.includes(concept)) {
        return {
          type: 'concept',
          content: `**📖 ${concept.charAt(0).toUpperCase() + concept.slice(1)}**\n\n${definition}\n\n**⚡ Quick Facts:**\n• This is a fundamental concept in Indian legal system\n• Governed by specific provisions in CrPC/IPC\n• Courts have established clear precedents on this matter\n\n💡 **Practical Tip:** If you need specific guidance on ${concept}, consult with a qualified lawyer for your particular situation.`,
          confidence: 'high'
        };
      }
    }

    if (lowerQuery.includes('landlord') || lowerQuery.includes('evict') || lowerQuery.includes('rent') || lowerQuery.includes('tenant')) {
      return {
        type: 'guidance',
        content: `**🏠 Tenant Rights Against Unlawful Eviction**\n\nUnder the Transfer of Property Act and various State Rent Control Acts:\n\n**✅ Your Rights:**\n• Landlord must provide proper notice (usually 15-30 days depending on state)\n• Cannot forcibly evict without court order\n• Must follow due process of law\n• Right to fair hearing before eviction\n\n**⚖️ Legal Remedies:**\n1. File suit for injunction to prevent eviction\n2. Lodge police complaint for illegal eviction (Section 441 IPC)\n3. Claim damages for illegal eviction\n4. Approach Rent Control Authority\n\n**📋 Relevant Laws:**\n• Transfer of Property Act, 1882\n• State-specific Rent Control Acts\n• Section 441 IPC (Criminal Trespass)\n\n📞 If facing unlawful eviction, consult a local lawyer immediately.`,
        confidence: 'high'
      };
    }

    if (lowerQuery.includes('contract') || lowerQuery.includes('agreement')) {
      return {
        type: 'guidance',
        content: `**📝 Contract Law in India**\n\nGoverned by the Indian Contract Act, 1872:\n\n**✅ Essential Elements:**\n• Offer and Acceptance\n• Consideration\n• Capacity to contract\n• Free consent\n• Lawful object\n\n**⚖️ Breach of Contract Remedies:**\n1. Damages - Monetary compensation\n2. Specific Performance - Court order to fulfill\n3. Injunction - Prevent breach\n4. Quantum Meruit - Payment for work done\n\n**📋 Key Sections:**\n• Section 10 - What agreements are contracts\n• Section 73 - Compensation for breach\n• Section 74 - Liquidated damages\n\n💡 Always get contracts in writing and read all clauses carefully.`,
        confidence: 'high'
      };
    }

    if (lowerQuery.includes('employment') || lowerQuery.includes('job') || lowerQuery.includes('salary') || lowerQuery.includes('workplace')) {
      return {
        type: 'guidance',
        content: `**👔 Employment Law in India**\n\n**🔑 Key Rights:**\n• Right to fair wages (Minimum Wages Act, 1948)\n• Right to safe working conditions\n• Protection against discrimination\n• Right to form unions\n• Maternity benefits\n\n**⚖️ Important Acts:**\n• Industrial Disputes Act, 1947\n• Payment of Wages Act, 1936\n• Employees State Insurance Act, 1948\n\n**📋 Common Issues:**\n• Wrongful Termination: File with Labour Commissioner\n• Unpaid Wages: Approach Labour Court\n• Harassment: Internal Complaints Committee\n\n💡 Document everything for future reference.`,
        confidence: 'high'
      };
    }

    return {
      type: 'general',
      content: `**🤔 Understanding Your Query**\n\nI see you're asking about: "${userQuery}"\n\n**To provide accurate information, I need:**\n\n• More specific details about your situation\n• The area of law (Criminal, Civil, Constitutional)\n• Relevant dates, documents, or parties\n• Your location (state matters for local laws)\n\n**🎯 I Can Help With:**\n\n**Criminal Law:** IPC Sections, Bail, FIR procedures\n**Civil Law:** Property disputes, Contract enforcement\n**Constitutional Law:** Fundamental rights, Writ petitions\n**Labour Law:** Wrongful termination, Workplace rights\n\n**💡 Try Asking:**\n• "What is Section 420 IPC?"\n• "My landlord is evicting me without notice"\n• "What are the elements of a valid contract?"\n\n⚠️ **Disclaimer:** This is legal information, not advice. Consult a qualified lawyer for specific guidance.`,
      confidence: 'low'
    };
  };

  const handleSendMessage = () => {
    if (!query.trim()) return;

    const userMessage = {
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    const currentQuery = query;
    setQuery('');

    setTimeout(() => {
      const response = generateResponse(currentQuery);
      const botMessage = {
        type: 'bot',
        ...response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleCaseSearch = () => {
    if (!caseSearch.trim()) return;
    
    const results = legalDatabase.cases.filter(c => 
      c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.principle.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(caseSearch.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const analyzeDocument = () => {
    if (!documentText.trim()) return;

    alert('Document Analysis:\n\nSummary: This document appears to be a legal agreement containing standard clauses.\n\nKey Terms: Party A, Party B, Consideration, Terms, Termination\n\nPotential Risks:\n• Ensure all parties have signing authority\n• Verify consideration clause is clear\n• Check jurisdiction clauses\n\nRecommendations:\n• Have document reviewed by a lawyer\n• Ensure all blank spaces are filled\n• Keep signed copies for records');
  };

  const PopularTopicCard = ({ icon: Icon, title, description, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-start gap-4 p-6 rounded-2xl border transition-all text-left w-full group ${
        darkMode 
          ? 'bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-750' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
    >
      <div className={`p-3 rounded-xl transition-colors ${
        darkMode 
          ? 'bg-blue-900/30 group-hover:bg-blue-900/50' 
          : 'bg-blue-50 group-hover:bg-blue-100'
      }`}>
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    </button>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-900 text-white'}
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-slate-800' : 'border-slate-800'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Legal Assistant</h1>
              <p className="text-xs text-slate-400">AI-Powered Legal Help</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              setMessages([]);
              setActiveView('chat');
              setSidebarOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <Plus className="h-5 w-5" />
            New Conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Recent Conversations
          </h2>
          <div className="space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-left group"
              >
                <MessageSquare className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-blue-300">
                    {conv.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{conv.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`border-t p-4 space-y-1 ${darkMode ? 'border-slate-800' : 'border-slate-800'}`}>
          <button
            onClick={() => {
              setActiveView('document');
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Documents</span>
          </button>

          <button
            onClick={() => {
              setActiveView('cases');
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            <Book className="h-5 w-5" />
            <span className="text-sm font-medium">Resources</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`border-b px-4 lg:px-8 py-4 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${
                  darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
                }`}
              >
                <Menu className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              </button>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activeView === 'chat' && 'Legal Assistant'}
                  {activeView === 'cases' && 'Case Law Search'}
                  {activeView === 'document' && 'Document Analysis'}
                </h2>
                <p className={`text-sm hidden sm:block ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activeView === 'chat' && 'Ask any legal question'}
                  {activeView === 'cases' && 'Search Indian case law database'}
                  {activeView === 'document' && 'Analyze legal documents'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full ${
                darkMode ? 'bg-blue-900/30' : 'bg-green-50'
              }`}>
                <Sparkles className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-green-600'} animate-pulse`} />
                <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-green-700'}`}>
                  AI-Powered
                </span>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div
                className="relative"
                onMouseEnter={() => setShowInfoTooltip(true)}
                onMouseLeave={() => setShowInfoTooltip(false)}
                onTouchStart={() => setShowInfoTooltip(true)}
                onTouchEnd={() => setTimeout(() => setShowInfoTooltip(false), 1500)}
              >
                <button
                  onClick={() => setActiveView('info')}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                    ? 'hover:bg-slate-800 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                </button>

                {showInfoTooltip && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg">
                    Help
                  </div>
                )}
              </div>

            </div>
          </div>
        </header>

        <div className={`border-b px-4 lg:px-8 overflow-x-auto ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex gap-1 min-w-max">
            <button
              onClick={() => setActiveView('chat')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                activeView === 'chat'
                  ? darkMode 
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-blue-600 border-b-2 border-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="hidden sm:inline">Legal Query</span>
              <span className="sm:hidden">Chat</span>
            </button>
            <button
              onClick={() => setActiveView('cases')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                activeView === 'cases'
                  ? darkMode 
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-blue-600 border-b-2 border-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Gavel className="h-5 w-5" />
              <span className="hidden sm:inline">Case Law</span>
              <span className="sm:hidden">Cases</span>
            </button>
            <button
              onClick={() => setActiveView('document')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all whitespace-nowrap ${
                activeView === 'document'
                  ? darkMode 
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-blue-600 border-b-2 border-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="hidden sm:inline">Documents</span>
              <span className="sm:hidden">Docs</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeView === 'chat' && (
            <div className="h-full flex flex-col">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                  <div className="max-w-4xl w-full">
                    <div className="text-center mb-8">
                      <div className={`inline-flex p-4 rounded-3xl mb-6 ${
                        darkMode ? 'bg-slate-800' : 'bg-slate-900'
                      }`}>
                        <Scale className="h-12 w-12 text-white" />
                      </div>
                      <h1 className={`text-3xl lg:text-4xl font-bold mb-3 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Welcome to Legal Assistant
                      </h1>
                      <p className={`text-lg max-w-2xl mx-auto ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Get instant answers to your legal questions. Ask about contracts, tenant rights, employment law, and more.
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className={`relative max-w-3xl mx-auto rounded-2xl shadow-2xl ${
                        darkMode ? 'bg-slate-800' : 'bg-white'
                      }`}>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                          <Search className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Ask about IPC sections, legal rights, case law..."
                          className={`w-full pl-14 pr-24 py-5 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                              ? 'bg-slate-800 text-white placeholder-gray-500 border border-slate-700' 
                              : 'bg-white text-gray-900 placeholder-gray-400 border border-gray-200'
                          }`}
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={loading || !query.trim()}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
                        >
                          <Send className="h-4 w-4" />
                          <span className="hidden sm:inline">Ask</span>
                        </button>
                      </div>
                    </div>

                    <div className={`mb-8 rounded-2xl p-4 border ${
                      darkMode 
                        ? 'bg-amber-900/20 border-amber-800/50' 
                        : 'bg-amber-50 border-amber-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          darkMode ? 'text-amber-400' : 'text-amber-600'
                        }`} />
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-amber-200' : 'text-amber-900'}`}>
                            <strong>Legal Disclaimer:</strong> This provides legal information, not advice. 
                            For specific legal advice, consult a qualified lawyer.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className={`text-sm font-semibold uppercase tracking-wider mb-6 text-center ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Popular topics to get you started
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <PopularTopicCard
                          icon={FileText}
                          title="Contract Review"
                          description="What should I look for when reviewing a contract?"
                          onClick={() => setQuery('What should I look for when reviewing a contract?')}
                        />
                        <PopularTopicCard
                          icon={Home}
                          title="Tenant Rights"
                          description="What are my rights as a tenant in India?"
                          onClick={() => setQuery('What are my rights as a tenant in India?')}
                        />
                        <PopularTopicCard
                          icon={Briefcase}
                          title="Employment Law"
                          description="What are my rights as an employee?"
                          onClick={() => setQuery('What are my rights as an employee in India?')}
                        />
                        <PopularTopicCard
                          icon={Scale}
                          title="IPC Sections"
                          description="Learn about Indian Penal Code sections"
                          onClick={() => setQuery('What is Section 420 IPC?')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-4 lg:p-8 space-y-6 max-w-4xl mx-auto w-full">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-2xl rounded-2xl px-4 py-3 ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : darkMode
                              ? 'bg-slate-800 border border-slate-700'
                              : 'bg-white border border-gray-200 shadow-sm'
                        }`}
                      >
                        {msg.type === 'bot' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Scale className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-600 uppercase">Legal Assistant</span>
                            {msg.confidence === 'high' && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        )}
                        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.type === 'bot' && darkMode ? 'text-gray-200' : ''
                        }`}>
                          {msg.content.split('\n').map((line, i) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <div key={i} className="font-bold mt-2 mb-1">{line.replace(/\*\*/g, '')}</div>;
                            }
                            if (line.startsWith('• ')) {
                              return <div key={i} className="ml-4">{line}</div>;
                            }
                            return <div key={i}>{line}</div>;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {loading && (
                    <div className="flex justify-start">
                      <div className={`rounded-2xl px-4 py-3 ${
                        darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200 shadow-sm'
                      }`}>
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className={`border-t p-4 lg:p-6 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
              }`}>
                <div className="max-w-4xl mx-auto">
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about IPC sections, legal rights, case law..."
                      className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                        darkMode 
                          ? 'bg-slate-800 text-white placeholder-gray-500 border-slate-700' 
                          : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                      }`}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={loading || !query.trim()}
                      className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
                    >
                      <Send className="h-5 w-5" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'cases' && (
            <div className="p-4 lg:p-8 max-w-6xl mx-auto w-full">
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={caseSearch}
                    onChange={(e) => setCaseSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCaseSearch()}
                    placeholder="Search by case name, legal principle, or topic..."
                    className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-slate-800 text-white placeholder-gray-500 border-slate-700' 
                        : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                    }`}
                  />
                  <button
                    onClick={handleCaseSearch}
                    className="bg-blue-600 text-white px-4 sm:px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`font-semibold text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {searchResults.length > 0 ? 'Search Results' : 'Landmark Cases Database'}
                </h3>
                
                {(searchResults.length > 0 ? searchResults : legalDatabase.cases).map((caseItem) => (
                  <div key={caseItem.id} className={`border rounded-2xl p-6 hover:shadow-lg transition-shadow ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {caseItem.title}
                        </h3>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {caseItem.citation}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium w-fit">
                        {caseItem.category}
                      </span>
                    </div>
                    <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Legal Principle:</strong> {caseItem.principle}
                    </p>
                    <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>📅 {caseItem.year}</span>
                      <span>⚖️ {caseItem.court}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'document' && (
            <div className="p-4 lg:p-8 max-w-4xl mx-auto w-full">
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Paste your legal document text below
                </label>
                <textarea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Paste contract, agreement, legal notice, or any legal document here..."
                  className={`w-full h-64 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-slate-800 text-white placeholder-gray-500 border-slate-700' 
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                  }`}
                />
              </div>

              <button
                onClick={analyzeDocument}
                disabled={!documentText.trim()}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
              >
                <Search className="h-5 w-5" />
                Analyze Document
              </button>

              <div className={`mt-6 p-6 rounded-2xl border ${
                darkMode ? 'bg-blue-900/20 border-blue-800/50' : 'bg-blue-50 border-blue-200'
              }`}>
                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  Analysis Features:
                </h3>
                <ul className={`text-sm space-y-2 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Document summarization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Key clause identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Risk flag detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Legal terminology explanation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Relevant case law references</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {/* Info Page Overlay */}
          {activeView === 'info' && (
            <div className={`p-6 lg:p-12 max-w-3xl mx-auto ${
              darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
            }`}>
              <button
                onClick={() => setActiveView('chat')}
                className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>

              <h1 className="text-3xl font-bold mb-4">Help (About Legal Assistant)</h1>
              <p className="mb-4">
                This AI-powered assistant helps users understand Indian legal principles, IPC sections, case law, and more.
                It provides <strong>legal information</strong>, not legal advice.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Instant answers to legal queries</li>
                <li>Case law and IPC section lookup</li>
                <li>Smart document analysis</li>
                <li>Dark/light theme support</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
              <p>
                The information provided here is for educational purposes only and does not constitute legal advice.
                For personalized legal guidance, please consult a qualified lawyer.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default LegalAssistantRefined;
