import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Bike, Compass, Flame, Play, RotateCcw, Trophy, Sparkles, Navigation } from 'lucide-react';
import { CYCLING_COURSES } from '../data';
import { CyclingCourse } from '../types';

export default function CourseSimulator() {
  const [selectedCourse, setSelectedCourse] = useState<CyclingCourse>(CYCLING_COURSES[0]);
  const [progressDist, setProgressDist] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState<string>('');

  // コースが変更されたらシミュレータをリセット
  useEffect(() => {
    setProgressDist(0);
    setIsPlaying(false);
    setCaloriesBurned(0);
    setActiveHighlight(selectedCourse.highlights[0]);
  }, [selectedCourse]);

  // オートプレイ（自動で走る）
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressDist((prev) => {
          const next = prev + 0.8;
          if (next >= selectedCourse.distance) {
            setIsPlaying(false);
            return selectedCourse.distance;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying, selectedCourse]);

  // カロリーおよび現在地点ハイライトの動的算出
  useEffect(() => {
    // 1km あたり約25kcal消費
    setCaloriesBurned(Math.round(progressDist * 28));

    // 現在の進捗距離に対応するハイライトを切り替え
    const totalHighlights = selectedCourse.highlights.length;
    const highlightIndex = Math.min(
      Math.floor((progressDist / selectedCourse.distance) * totalHighlights),
      totalHighlights - 1
    );
    if (selectedCourse.highlights[highlightIndex]) {
      setActiveHighlight(selectedCourse.highlights[highlightIndex]);
    }
  }, [progressDist, selectedCourse]);

  // 現在位置の標高をプロファイルから線形補間
  const getCurrentElevation = () => {
    const profile = selectedCourse.elevationProfile;
    if (progressDist <= 0) return profile[0].elev;
    if (progressDist >= selectedCourse.distance) return profile[profile.length - 1].elev;

    // 線形補間
    for (let i = 0; i < profile.length - 1; i++) {
      const p1 = profile[i];
      const p2 = profile[i + 1];
      if (progressDist >= p1.dist && progressDist <= p2.dist) {
        const ratio = (progressDist - p1.dist) / (p2.dist - p1.dist);
        return Math.round(p1.elev + ratio * (p2.elev - p1.elev));
      }
    }
    return profile[0].elev;
  };

  const currentElevation = getCurrentElevation();

  // 手動で1漕ぎ
  const handlePedal = () => {
    if (progressDist >= selectedCourse.distance) {
      setProgressDist(0);
    }
    setProgressDist((prev) => {
      const next = prev + 1.5;
      return next >= selectedCourse.distance ? selectedCourse.distance : next;
    });
  };

  const resetRide = () => {
    setProgressDist(0);
    setIsPlaying(false);
    setCaloriesBurned(0);
  };

  const isCompleted = progressDist >= selectedCourse.distance;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8" id="course-simulator-box">
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* コース選択＆ステータス (左側) */}
        <div className="xl:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> リアル標高シミュレータ
              </span>
              <span className="text-slate-400 text-xs font-mono">Ver. 2.6 (令和8年)</span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              鳥海ロードを体感する
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              コースを選んで「ペダルを漕ぐ」ボタンを押そう。Mt.Bird Seaのダイナミックな高低差と、その地元の風があなたの胸に届きます。
            </p>

            {/* コース切り替えタブ */}
            <div className="space-y-2 mb-6" id="course-tabs-nav">
              {CYCLING_COURSES.map((course) => {
                const isActive = selectedCourse.id === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-900 border-blue-900 text-white shadow-md shadow-blue-900/15 scale-[1.01]'
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100/70 text-slate-700'
                    }`}
                    id={`btn-course-${course.id}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-base">{course.name}</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-500 text-white'
                          : course.difficulty === 'hard'
                          ? 'bg-red-100 text-red-800'
                          : course.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {course.difficulty === 'hard' ? '上級 (山)' : course.difficulty === 'medium' ? '中級' : '初級'}
                      </span>
                    </div>
                    <p className={`text-xs line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      {course.subName}
                    </p>
                    <div className="flex gap-4 mt-2.5 text-xs font-mono">
                      <span>距離: {course.distance} km</span>
                      <span>最大標高差: {course.climb} m</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ライド進捗＆データ盤 */}
          <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-800 relative overflow-hidden shadow-inner">
            <div className="absolute right-[-10px] top-[-10px] text-slate-900 opacity-20 transform rotate-12">
              <Bike className="w-40 h-40" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10 font-mono">
              <div>
                <p className="text-slate-500 text-xs">走行距離</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {progressDist.toFixed(1)} <span className="text-xs text-white">/ {selectedCourse.distance} km</span>
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">現在の標高</p>
                <p className="text-2xl font-bold text-blue-400">
                  {currentElevation} <span className="text-xs text-white">m</span>
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">推定消費エネルギー</p>
                <p className="text-2xl font-bold text-orange-400 flex items-center gap-1">
                  <Flame className="w-5 h-5 inline text-orange-500" /> {caloriesBurned} <span className="text-xs text-white">kcal</span>
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">現在のアラート</p>
                <p className="text-sm font-bold text-slate-300 flex items-center gap-1 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> 安全走行中
                </p>
              </div>
            </div>

            {/* 現在見えている景色（詩）の表示 */}
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 font-sans italic leading-relaxed">
              <AnimatePresence mode="wait">
                <motion.p
                  key={progressDist === 0 ? 'start' : isCompleted ? 'goal' : activeHighlight}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <span className="text-yellow-400 font-bold flex items-center gap-1 not-italic">
                      <Trophy className="w-4 h-4" /> おめでとうございます！無事完走しました。鳥海の自然が拍手を送っています。
                    </span>
                  ) : progressDist === 0 ? (
                    <span>ペダルを踏み出して、みちのくの風の歌を聴きましょう。</span>
                  ) : (
                    <span>
                      <strong>【{activeHighlight} 付近】</strong> <br />
                      {selectedCourse.poem}
                    </span>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 標高グラフ＆ペダリング操作 (右側) */}
        <div className="xl:w-3/5 flex flex-col justify-between bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-blue-700" /> 高低差プロファイルと現在位置
              </h4>
              <span className="text-xs bg-white text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                縦横比は視覚化のために強調されています
              </span>
            </div>

            {/* Recharts のグラフ */}
            <div className="h-64 md:h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={selectedCourse.elevationProfile}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="elevGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="dist"
                    tickFormatter={(v) => `${v}k`}
                    stroke="#94a3b8"
                    fontSize={11}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tickFormatter={(v) => `${v}m`}
                    fontSize={11}
                    fontFamily="JetBrains Mono"
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} m`,
                      name === 'elev' ? '標高' : name
                    ]}
                    labelFormatter={(label) => `距離: ${label} km`}
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="elev"
                    stroke="#1d4ed8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#elevGradient)"
                  />
                  
                  {/* 現在位置マーク */}
                  <ReferenceDot
                    x={progressDist}
                    y={currentElevation}
                    r={7}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* 進行度目安線のオバーレイ */}
              <div
                className="absolute left-0 bottom-0 top-0 w-0.5 bg-emerald-500/20 pointer-events-none"
                style={{
                  left: `${Math.min((progressDist / selectedCourse.distance) * 100, 100)}%`,
                  transition: 'left 0.1s linear'
                }}
              />
              
              {/* 自転車進捗の浮かぶスプライト */}
              <div
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{
                  bottom: `${Math.min((currentElevation / selectedCourse.climb) * 60 + 10, 80)}%`,
                  left: `${Math.min((progressDist / selectedCourse.distance) * 88 + 8, 96)}%`,
                  transition: 'left 0.1s linear, bottom 0.1s linear'
                }}
              >
                <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg ring-4 ring-emerald-500/20">
                  <Bike className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            </div>

            {/* 標高マイルストーンタグ */}
            <div className="flex justify-between gap-1 overflow-x-auto pt-2 pb-1 text-[10px] text-slate-400 border-t border-slate-100 font-mono">
              {selectedCourse.elevationProfile.map((point, index) => (
                <div key={index} className="text-center shrink-0 min-w-16">
                  <div className="font-semibold text-slate-600 line-clamp-1">{point.label}</div>
                  <div>{point.dist}km / {point.elev}m</div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作ボタン */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex gap-2">
              <button
                onClick={handlePedal}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 transform active:scale-95 transition-all shadow-md shadow-emerald-500/20"
                id="btn-manual-pedal"
              >
                <Bike className="w-5 h-5" /> ペダルを漕ぐ (+1.5km)
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`py-3.5 px-5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm ${
                  isPlaying
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                id="btn-auto-ride"
              >
                <Play className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
                {isPlaying ? '一時停止' : 'オートライド'}
              </button>
            </div>

            <button
              onClick={resetRide}
              className="text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 py-3.5 px-4 rounded-xl font-bold flex items-center gap-1.5 active:scale-95 transition-all"
              id="btn-reset-ride"
            >
              <RotateCcw className="w-4 h-4" /> リセット
            </button>
          </div>

          {/* 完走時のちょっとしたオファリング */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">👏</div>
                  <div>
                    <h5 className="font-bold text-amber-900 text-sm flex items-center gap-1">
                      完全制覇！ <Sparkles className="w-4 h-4 text-amber-500" />
                    </h5>
                    <p className="text-xs text-amber-700">
                      「{selectedCourse.name}」を見事走破。由利本荘の湧き水ステーションで名水を汲んだ気分で、次はぜひ現地に走りに行きましょう！
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
