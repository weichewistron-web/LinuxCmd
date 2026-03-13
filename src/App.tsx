import React, { useState } from 'react';
import { Search, Terminal, Book, Cpu, Network, FileText, Shield, Sparkles, Loader2, Copy, Check, ArrowLeft, Settings, Lightbulb, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from '@google/genai';
import { categories, localCommands } from './data';
import { CommandDetail } from './types';

const categoryIcons: Record<string, React.ElementType> = {
  all: Terminal,
  file: FileText,
  text: Book,
  system: Cpu,
  network: Network,
  permission: Shield,
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      title="複製指令"
    >
      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
    </button>
  );
}

function CommandDetailView({ command, onBack }: { command: CommandDetail, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors w-fit">
        <ArrowLeft size={16} /> 返回列表
      </button>
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-mono font-bold text-emerald-400">{command.name}</h1>
          {command.category === 'AI Generated' && (
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <Sparkles size={12} /> AI 產生
            </span>
          )}
        </div>
        <p className="text-xl text-zinc-300">{command.description}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Terminal size={20} className="text-emerald-500" /> 語法 (Syntax)
        </h2>
        <div className="relative group">
          <code className="block bg-black text-zinc-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            {command.syntax}
          </code>
          <CopyButton text={command.syntax} />
        </div>
      </div>

      {command.options && command.options.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Settings size={20} className="text-emerald-500" /> 常用選項 (Options)
          </h2>
          <div className="space-y-3">
            {command.options.map((opt, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                <code className="text-emerald-400 font-mono whitespace-nowrap bg-emerald-400/10 px-2 py-0.5 rounded">{opt.flag}</code>
                <span className="text-zinc-400">{opt.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {command.examples && command.examples.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb size={20} className="text-emerald-500" /> 範例 (Examples)
          </h2>
          <div className="space-y-6">
            {command.examples.map((ex, i) => (
              <div key={i} className="space-y-2">
                <p className="text-zinc-300">{ex.description}</p>
                <div className="relative group">
                  <code className="block bg-black text-emerald-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    {ex.code}
                  </code>
                  <CopyButton text={ex.code} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCommand, setSelectedCommand] = useState<CommandDetail | null>(null);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  const handleAISearch = async (query: string) => {
    setIsSearchingAI(true);
    setAiError('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user entered: "${query}". If this is a Linux command, explain it. If it is a task description, provide the best Linux command to achieve it. Respond entirely in Traditional Chinese (zh-TW).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "主要指令名稱 (例如 'find', 'tar')" },
              description: { type: Type.STRING, description: "指令或解決方案的簡短說明" },
              category: { type: Type.STRING, description: "固定填入 'AI Generated'" },
              syntax: { type: Type.STRING, description: "通用語法" },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    flag: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              },
              examples: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    code: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["name", "description", "category", "syntax", "options", "examples"]
          }
        }
      });
      
      const result = JSON.parse(response.text || '{}') as CommandDetail;
      setSelectedCommand(result);
    } catch (err) {
      console.error(err);
      setAiError('AI 產生指令時發生錯誤，請稍後再試。');
    } finally {
      setIsSearchingAI(false);
    }
  };

  const filteredCommands = localCommands.filter(cmd => {
    const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = searchQuery.trim() !== '' ? true : (selectedCategory === 'all' || cmd.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-emerald-500/30">
      {/* Header / Nav */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <Terminal size={24} />
            <span className="text-xl font-bold tracking-tight text-white">Linux<span className="text-emerald-400">Cmd</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        {!selectedCommand && (
          <aside className="w-full md:w-64 shrink-0">
            <h3 className="hidden md:block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">分類 (Categories)</h3>
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map(cat => {
                const Icon = categoryIcons[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 md:w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="whitespace-nowrap">{cat.name.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </aside>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {selectedCommand ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CommandDetailView command={selectedCommand} onBack={() => setSelectedCommand(null)} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Search Bar */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        handleAISearch(searchQuery);
                      }
                    }}
                    placeholder="搜尋指令，或輸入你想做什麼 (例如: 如何解壓縮 tar.gz)..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl pl-12 pr-32 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm"
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <button
                      onClick={() => searchQuery.trim() && handleAISearch(searchQuery)}
                      disabled={isSearchingAI || !searchQuery.trim()}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-colors"
                    >
                      {isSearchingAI ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                      <span className="hidden sm:inline">{isSearchingAI ? '思考中...' : 'AI 產生'}</span>
                    </button>
                  </div>
                </div>

                {aiError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3">
                    <AlertCircle size={18} />
                    <p>{aiError}</p>
                  </div>
                )}

                {/* Grid of Commands */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCommands.map(cmd => (
                    <button
                      key={cmd.name}
                      onClick={() => setSelectedCommand(cmd)}
                      className="text-left bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 p-5 rounded-xl transition-all group"
                    >
                      <h3 className="text-xl font-mono font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors mb-2">
                        {cmd.name}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {cmd.description}
                      </p>
                    </button>
                  ))}
                  {filteredCommands.length === 0 && !isSearchingAI && (
                    <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-2xl">
                      <Terminal size={48} className="mx-auto text-zinc-700 mb-4" />
                      <h3 className="text-lg font-medium text-zinc-300 mb-2">找不到相關指令</h3>
                      <p className="text-zinc-500 mb-4">試著點擊搜尋框右側的「AI 產生」來獲取解答！</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
