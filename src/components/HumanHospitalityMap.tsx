import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Droplet, Coffee, Wrench, Flame, Heart, Sparkles, Smile, ArrowRight } from 'lucide-react';
import { HOSPITALITY_SPOTS } from '../data';
import { HospitalitySpot } from '../types';

export default function HumanHospitalityMap() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpot, setSelectedSpot] = useState<HospitalitySpot>(HOSPITALITY_SPOTS[0]);

  // カテゴリ別のスポット抽出
  const filteredSpots = selectedCategory === 'all'
    ? HOSPITALITY_SPOTS
    : HOSPITALITY_SPOTS.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'water': return <Droplet className="w-4 h-4 text-blue-500" />;
      case 'food': return <Coffee className="w-4 h-4 text-amber-600" />;
      case 'cycle': return <Wrench className="w-4 h-4 text-emerald-600" />;
      case 'onsen': return <Flame className="w-4 h-4 text-orange-500" />;
      default: return <MapPin className="w-4 h-4 text-slate-500" />;
    }
  };

  const getCategoryImage = (cat: string) => {
    switch (cat) {
      case 'water': return '💧 湧き水名水';
      case 'food': return '🍙 お茶っこ・おにぎり';
      case 'cycle': return '🔧 サイクル工具';
      case 'onsen': return '♨️ 筋肉ほぐし温泉';
      default: return '📍 スポット';
    }
  };

  return (
    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm" id="hospitality-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> 鳥海まごころネットワーク
          </span>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            人のつながり、おもてなし人情マップ
          </h3>
          <p className="text-slate-500 text-sm mt-1.5 max-w-2xl">
            「AIがルートを冷徹に最適化しても、温めるのは人間。」由利本荘・にかほの住民たちが、温かいお茶と笑顔を携えて、サイクリストをお待ちしています。
          </p>
        </div>

        {/* フィルターボタン */}
        <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setSelectedCategory('water')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              selectedCategory === 'water'
                ? 'bg-blue-500 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Droplet className="w-3 h-3" /> 湧き水
          </button>
          <button
            onClick={() => setSelectedCategory('food')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              selectedCategory === 'food'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Coffee className="w-3 h-3" /> おにぎり
          </button>
          <button
            onClick={() => setSelectedCategory('cycle')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              selectedCategory === 'cycle'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Wrench className="w-3 h-3" /> レスキュー
          </button>
          <button
            onClick={() => setSelectedCategory('onsen')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              selectedCategory === 'onsen'
                ? 'bg-orange-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3 h-3" /> 温泉
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* スポットリスト (2/5) */}
        <div className="lg:col-span-2 space-y-3 max-h-[460px] overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {filteredSpots.map((spot) => {
              const isSelected = selectedSpot.id === spot.id;
              return (
                <motion.div
                  layout
                  key={spot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedSpot(spot)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3 bg-white ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-md transform scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                  id={`spot-card-${spot.id}`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    spot.category === 'water' ? 'bg-blue-50 text-blue-600' :
                    spot.category === 'food' ? 'bg-amber-50 text-amber-700' :
                    spot.category === 'cycle' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {getCategoryIcon(spot.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 capitalize font-mono">
                        {spot.area === 'chokai' ? '鳥海・由利' : spot.area === 'nikaho' ? 'にかほ' : spot.area === 'higashiyuri' ? '東由利' : '本荘'}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {getCategoryImage(spot.category).split(' ')[1]}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1 truncate">
                      {spot.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {spot.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 人情フォーカスカード (3/5) */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-lg relative overflow-hidden flex-1 flex flex-col justify-between"
              id="focussed-spot-box"
            >
              {/* 背景の装飾テクスチャ */}
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 pointer-events-none">
                <Heart className="w-80 h-80 fill-rose-500" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-4">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedSpot.address}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h4 className="text-2xl font-bold text-slate-900">
                    {selectedSpot.name}
                  </h4>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold py-1 px-3 rounded-full">
                    {getCategoryImage(selectedSpot.category)}
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedSpot.description}
                </p>

                {/* おばちゃんの温かいおもてなしの言葉（手書き風フレーム） */}
                <div className="bg-yellow-50/50 border-2 border-dashed border-amber-300 rounded-2xl p-6 relative my-4">
                  <div className="absolute -top-3.5 left-5 bg-amber-400 text-amber-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-sm">
                    <Smile className="w-3.5 h-3.5" /> 地元のまごころメッセージ
                  </div>
                  
                  <p className="font-sans text-amber-950 font-medium italic text-base md:text-lg leading-relaxed pt-2">
                    {selectedSpot.hospitality}
                  </p>

                  <div className="flex justify-end gap-1 items-center text-xs text-amber-800 font-bold mt-4">
                    <span>— 由利のまちで待ってるよ 👵👴</span>
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
                  </div>
                </div>
              </div>

              {/* 特典・アクションへの誘客 */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  <span>※ サイクルラックと空気入れ、工具の貸出は全て無料で行っております。</span>
                </div>
                
                <a
                  href="#campaign-box"
                  className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all transform active:scale-95"
                >
                  地元を応援しに行く <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
