import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, MessageSquare, Users, Heart, Award } from 'lucide-react';
import { CampaignSupport } from '../types';
import { INITIAL_SUPPORTERS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function CampaignBoard() {
  const [supporters, setSupporters] = useState<CampaignSupport[]>([]);
  const [name, setName] = useState('');
  const [area, setArea] = useState('由利本荘市本荘');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ローカルストレージからサポーター情報の読み込み
  useEffect(() => {
    const saved = localStorage.getItem('chokai_supporters');
    if (saved) {
      try {
        setSupporters(JSON.parse(saved));
      } catch (e) {
        setSupporters(INITIAL_SUPPORTERS);
      }
    } else {
      setSupporters(INITIAL_SUPPORTERS);
      localStorage.setItem('chokai_supporters', JSON.stringify(INITIAL_SUPPORTERS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('お名前（ハンドルネーム可）をご記入ください。');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('応援メッセージをご記入ください。');
      return;
    }

    const newSupporter: CampaignSupport = {
      id: `supporter-${Date.now()}`,
      name: name.trim(),
      area: area,
      message: message.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newSupporter, ...supporters];
    setSupporters(updated);
    localStorage.setItem('chokai_supporters', JSON.stringify(updated));

    // フォームリセット
    setName('');
    setMessage('');
    setErrorMsg('');
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="campaign-box">
      {/* 背景の淡いグリッドグラフィック装飾 */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <div className="grid lg:grid-cols-12 gap-8 relative z-10">
        
        {/* 左側：署名＆応援フォーム (5/12) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit mb-3 border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" /> 参加型・超広域ラリー
            </span>
            <h3 className="text-3xl font-bold tracking-tight text-white">
              Mt.Bird Seaナショナルサイクルルート<br/>推進サポーター署名
            </h3>
            <p className="text-slate-400 text-sm mt-3 mb-6 leading-relaxed">
              Mt.Bird Seaサイクルエコシステムの推進、並びに山形・秋田広域連携による「ナショナルサイクルルート（NCR）」の指定認定を応援する推進署名です。あなたの応援の一言が、まちの未来へ動き出す力となります。
            </p>

            {/* カウンター */}
            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 w-full mb-6">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-slate-500 text-xs font-mono">現在の推進応援署名数</span>
                <p className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                  <span className="text-3xl text-emerald-400">{supporters.length}</span> 名突破
                </p>
              </div>
            </div>

            {/* 署名入力フォーム */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                  お名前 (または愛称)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：鳥海ポタリング派"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    ご所属 / 活動地域
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 text-ellipsis"
                  >
                    <option value="由利本荘市本荘">由利本荘市本荘</option>
                    <option value="由利本荘市矢島">由利本荘市矢島</option>
                    <option value="由利本荘市東由利">由利本荘市東由利</option>
                    <option value="にかほ市象潟">にかほ市象潟</option>
                    <option value="にかほ市平沢">にかほ市平沢</option>
                    <option value="秋田県外 / ファン">秋田県外 / 応援者</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    日付 (日本標準時)
                  </label>
                  <div className="bg-slate-950/50 border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-500 font-mono flex h-[46px] items-center">
                    2026-05-31 (今)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                  応援メッセージ (おばちゃんたちにも届きます！)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="例：過疎をチャンスに変える広域サイクルネットワーク、とてもワクワクします！美しいブナ林とにかほ高原を早くまた走りたいです。"
                  rows={3}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-red-400 text-xs font-semibold flex items-center gap-1">
                  ⚠️ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transform active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/10"
              >
                <Send className="w-4 h-4" /> 署名を送信してメッセージを掲出
              </button>
            </form>
          </div>

          {/* 送信サクセスモーダル */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-emerald-950/50 border border-emerald-500/30 rounded-2xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">署名送信完了！</p>
                  <p className="text-[10px] text-emerald-300">
                    メッセージをコホートボードの先頭に掲出しました。ご協力まことにありがとうございました！
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 右側：応援メッセージのタイムライン (7/12) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 flex flex-col h-full min-h-[420px] max-h-[510px]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5 font-mono">
              <MessageSquare className="w-4 h-4 text-emerald-500" /> サポーター推進応援ボード (新着順)
            </h4>

            {/* メッセージリスト */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <AnimatePresence initial={false}>
                {supporters.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-slate-900 border border-slate-850 rounded-xl relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start text-[11px] font-mono mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-100">{item.name}</span>
                        <span className="text-slate-500">（{item.area}）</span>
                      </div>
                      <span className="text-slate-600 font-semibold">{item.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {item.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-center text-slate-500 font-mono">
              Mt.Bird Seaサイクルアライアンス推進委員会 事務局 (平成28年〜令和8年継続中)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
