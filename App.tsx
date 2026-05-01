
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  ChevronLeft,
  BookOpen,
  LayoutGrid,
  MinusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  POR_PARA_DATA, 
  SENTENCE_ORDER_DATA, 
  NEGATION_DATA, 
  TIME_DATA,
  PorParaQuestion,
  SentenceOrderQuestion,
  NegationQuestion,
  TimeQuestion
} from './constants';

type GameMode = 'main' | 'por-para' | 'sentence' | 'negation' | 'time';

export default function App() {
  const [mode, setMode] = useState<GameMode>('main');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const resetGame = (newMode: GameMode) => {
    setMode(newMode);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setShowExplanation(false);
  };

  const handleNext = () => {
    setFeedback(null);
    setShowExplanation(false);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white w-6 h-6" />
             </div>
             <div>
               <h1 className="text-lg font-black italic uppercase tracking-tighter text-indigo-900 leading-none">Իսպաներեն</h1>
               <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">4-ը 1-ում ուսուցում</p>
             </div>
          </div>
          
          {mode !== 'main' && (
            <button 
              onClick={() => setMode('main')}
              className="flex items-center gap-1 text-xs font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeft size={16} /> Գլխավոր Մենյու
            </button>
          )}

          {mode !== 'main' && (
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
              <Trophy className="text-indigo-500" size={14} />
              <span className="text-sm font-black text-indigo-700">{score}</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-8">
        <AnimatePresence mode="wait">
          {mode === 'main' ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8"
            >
              <div className="md:col-span-2 mb-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900 leading-tight">
                  Ընտրիր <span className="text-indigo-600">վարժությունը</span>
                </h2>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-2 px-1">Զարգացրու քո գիտելիքները</p>
              </div>

              <MenuCard 
                icon={<ArrowRight />}
                title="Por vs Para"
                desc="15 հարց"
                color="bg-amber-500"
                onClick={() => resetGame('por-para')}
              />
              <MenuCard 
                icon={<LayoutGrid />}
                title="Կազմել նախադասություն"
                desc="10 հարց"
                color="bg-emerald-500"
                onClick={() => resetGame('sentence')}
              />
              <MenuCard 
                icon={<MinusCircle />}
                title="Ժխտումներ"
                desc="10 հարց"
                color="bg-rose-500"
                onClick={() => resetGame('negation')}
              />
              <MenuCard 
                icon={<Clock />}
                title="Ժամանակ"
                desc="15 հարց"
                color="bg-sky-500"
                onClick={() => resetGame('time')}
              />
            </motion.div>
          ) : (
            <div className="h-full">
              {mode === 'por-para' && (
                <PorParaGame 
                  index={currentIndex} 
                  onAnswer={(isCorrect) => {
                    if (isCorrect) setScore(s => s + 10);
                    setFeedback(isCorrect ? 'correct' : 'wrong');
                    setShowExplanation(true);
                  }}
                  feedback={feedback}
                  showExplanation={showExplanation}
                  onNext={handleNext}
                  onRestart={() => resetGame('por-para')}
                />
              )}
              {mode === 'sentence' && (
                <SentenceGame 
                  index={currentIndex}
                  onAnswer={(isCorrect) => {
                    if (isCorrect) setScore(s => s + 10);
                    setFeedback(isCorrect ? 'correct' : 'wrong');
                  }}
                  feedback={feedback}
                  onNext={handleNext}
                  onRestart={() => resetGame('sentence')}
                />
              )}
              {mode === 'negation' && (
                <NegationGame 
                  index={currentIndex}
                  onAnswer={(isCorrect) => {
                    if (isCorrect) setScore(s => s + 10);
                    setFeedback(isCorrect ? 'correct' : 'wrong');
                    setShowExplanation(true);
                  }}
                  feedback={feedback}
                  showExplanation={showExplanation}
                  onNext={handleNext}
                  onRestart={() => resetGame('negation')}
                />
              )}
              {mode === 'time' && (
                <TimeGame 
                  index={currentIndex}
                  onAnswer={(isCorrect) => {
                    if (isCorrect) setScore(s => s + 10);
                    setFeedback(isCorrect ? 'correct' : 'wrong');
                  }}
                  feedback={feedback}
                  onNext={handleNext}
                  onRestart={() => resetGame('time')}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 text-center text-slate-300 font-black italic uppercase tracking-[0.2em] text-[10px]">
        Spanish Learning Platform • 2026
      </footer>
    </div>
  );
}

function MenuCard({ icon, title, desc, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="group relative bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col items-start overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 rounded-bl-[100px] group-hover:scale-110 transition-transform`} />
      <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase italic text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{desc}</p>
    </button>
  );
}

// --- PorParaGame ---
function PorParaGame({ index, onAnswer, feedback, showExplanation, onNext, onRestart }: any) {
  const q = POR_PARA_DATA[index];
  if (!q) return <GameOver score={POR_PARA_DATA.length * 10} onRestart={onRestart} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-black text-indigo-500 uppercase tracking-widest">Ընտրիր ճիշտը ({index + 1}/{POR_PARA_DATA.length})</h3>
        <p className="text-4xl md:text-5xl font-black italic text-slate-800 tracking-tight">
          {q.sentence.split('____').map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i === 0 && <span className="text-indigo-600 mx-2">{feedback ? q.answer : '____'}</span>}
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
        <AnswerButton 
          label="POR" 
          active={feedback === 'correct' && q.answer === 'por'} 
          wrong={feedback === 'wrong' && q.answer !== 'por'}
          disabled={!!feedback}
          onClick={() => onAnswer(q.answer === 'por')} 
        />
        <AnswerButton 
          label="PARA" 
          active={feedback === 'correct' && q.answer === 'para'}
          wrong={feedback === 'wrong' && q.answer !== 'para'}
          disabled={!!feedback}
          onClick={() => onAnswer(q.answer === 'para')} 
        />
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 max-w-lg mx-auto">
            <div className="flex items-start gap-4">
              <Info className="text-indigo-500 shrink-0 mt-1" size={20} />
              <div>
                <p className="font-black text-indigo-900 uppercase italic">Բացատրություն:</p>
                <p className="text-indigo-700 font-medium">{q.explanation}</p>
                <button onClick={onNext} className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all">
                  Շարունակել <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- SentenceGame ---
function SentenceGame({ index, onAnswer, feedback, onNext, onRestart }: any) {
  const q = SENTENCE_ORDER_DATA[index];
  const [selected, setSelected] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);

  useEffect(() => {
    if (q) {
      setShuffled([...q.shuffledWords]);
      setSelected([]);
    }
  }, [q]);

  if (!q) return <GameOver score={SENTENCE_ORDER_DATA.length * 10} onRestart={onRestart} />;

  const handleWordClick = (word: string, isFromShuffled: boolean) => {
    if (feedback) return;
    if (isFromShuffled) {
      setSelected([...selected, word]);
      setShuffled(shuffled.filter((_, i) => i !== shuffled.indexOf(word)));
    } else {
      setShuffled([...shuffled, word]);
      setSelected(selected.filter((_, i) => i !== selected.lastIndexOf(word)));
    }
  };

  const checkSentence = () => {
    const isCorrect = JSON.stringify(selected) === JSON.stringify(q.correctWords);
    onAnswer(isCorrect);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
      <div className="text-center space-y-2">
        <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest">Դասավորիր բառերը ({index + 1}/{SENTENCE_ORDER_DATA.length})</h3>
        <p className="text-2xl font-bold text-slate-500 italic uppercase tracking-wider">{q.armenian}</p>
      </div>

      <div className="min-h-[100px] p-6 bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-wrap gap-2 items-center justify-center">
        {selected.map((w, i) => (
          <button key={i} onClick={() => handleWordClick(w, false)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-black italic uppercase shadow-sm">
            {w}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {shuffled.map((w, i) => (
          <button key={i} onClick={() => handleWordClick(w, true)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black italic uppercase transition-all">
            {w}
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        {!feedback ? (
          <button 
            disabled={selected.length === 0}
            onClick={checkSentence}
            className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-emerald-600 shadow-xl disabled:opacity-50 transition-all"
          >
            Ստուգել
          </button>
        ) : (
          <div className="text-center space-y-4">
            <div className={`p-4 rounded-xl flex items-center gap-3 ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {feedback === 'correct' ? <CheckCircle2 /> : <AlertCircle />}
              <span className="font-black italic uppercase text-sm">
                {feedback === 'correct' ? 'Ճիշտ է!' : `Սխալ է: ${q.correctWords.join(' ')}`}
              </span>
            </div>
            <button onClick={onNext} className="mx-auto flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl">
              Հաջորդը <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- NegationGame ---
function NegationGame({ index, onAnswer, feedback, showExplanation, onNext, onRestart }: any) {
  const q = NEGATION_DATA[index];
  if (!q) return <GameOver score={NEGATION_DATA.length * 10} onRestart={onRestart} />;

  const options = [q.negative, "No " + q.negative, q.sentence + " no"].sort(); // Simple fake options

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest">Դարձրու ժխտական ({index + 1}/{NEGATION_DATA.length})</h3>
        <p className="text-4xl md:text-5xl font-black italic text-slate-800 tracking-tight">{q.sentence}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
        {[q.negative, "No " + q.sentence, q.sentence.replace(' ', ' no ')].sort().map((opt, i) => (
          <button
            key={i}
            disabled={!!feedback}
            onClick={() => onAnswer(opt === q.negative)}
            className={`p-6 rounded-2xl font-black text-xl italic uppercase text-left transition-all border-2 ${
              feedback && opt === q.negative ? 'bg-emerald-500 text-white border-emerald-600' :
              feedback && opt !== q.negative ? 'bg-slate-100 text-slate-400 border-slate-200' :
              'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-rose-50 rounded-3xl border border-rose-100 max-w-xl mx-auto shadow-sm">
            <h4 className="text-rose-900 font-black italic uppercase mb-2">Ինչու՞:</h4>
            <p className="text-rose-700 font-medium leading-relaxed">{q.explanation}</p>
            <button onClick={onNext} className="mt-6 w-full flex items-center justify-center gap-2 bg-rose-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg">
              ՀԱՍԿԱՑԱ <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- TimeGame ---
function TimeGame({ index, onAnswer, feedback, onNext, onRestart }: any) {
  const q = TIME_DATA[index];
  if (!q) return <GameOver score={TIME_DATA.length * 10} onRestart={onRestart} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 py-10">
      <div className="flex flex-col items-center gap-8">
        <h3 className="text-sm font-black text-sky-500 uppercase tracking-widest">Ո՞ր ժամն է: ({index + 1}/{TIME_DATA.length})</h3>
        <div className="bg-white p-10 rounded-full shadow-2xl border-8 border-sky-100 w-64 h-64 flex items-center justify-center">
          <span className="text-6xl font-black italic text-sky-600 tracking-tighter">{q.timeStr}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {q.options.map((opt: string, i: number) => (
          <button
            key={i}
            disabled={!!feedback}
            onClick={() => onAnswer(opt === q.correct)}
            className={`p-8 rounded-3xl font-black text-lg italic uppercase text-center transition-all border-4 ${
              feedback && opt === q.correct ? 'bg-sky-500 text-white border-sky-600 scale-105' :
              feedback && opt !== q.correct ? 'bg-slate-100 text-slate-300 border-slate-200 opacity-50' :
              'bg-white text-slate-800 border-slate-100 shadow-xl hover:border-sky-300 hover:-translate-y-1'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <button onClick={onNext} className="bg-sky-600 text-white px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-[0.2em] hover:bg-sky-700 shadow-2xl transition-all">
            Շարունակել
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

function AnswerButton({ label, onClick, active, wrong, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-6 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 ${
        active ? 'bg-emerald-500 text-white scale-105' : 
        wrong ? 'bg-rose-500 text-white' : 
        'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function GameOver({ score, onRestart }: any) {
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 space-y-8">
      <div className="w-40 h-40 bg-yellow-400 rounded-[50px] rotate-12 flex items-center justify-center mx-auto shadow-2xl border-8 border-white">
        <Trophy size={80} className="text-white -rotate-12" />
      </div>
      <h2 className="text-5xl font-black italic uppercase text-slate-900 tracking-tighter">Վարժությունն Ավարտված է</h2>
      <div className="text-8xl font-black text-indigo-600 italic tracking-tighter">{score}</div>
      <p className="text-slate-400 font-bold uppercase tracking-[0.3em]">Միավոր</p>
      <button 
        onClick={onRestart}
        className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-indigo-700 shadow-2xl transition-all flex items-center justify-center gap-4 mx-auto"
      >
        <RotateCcw size={24} /> Նորից Փորձել
      </button>
    </motion.div>
  );
}
