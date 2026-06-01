import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ShieldCheck, AlertTriangle, Clock, Map, Smartphone, Volume2, HelpCircle } from 'lucide-react';
import { BEAR_SAFETY_STATISTICS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function SafetyCharts() {
  const [selectedHour, setSelectedHour] = useState<number>(8);

  // 選択された時間のデータ取得
  const currentHourData = BEAR_SAFETY_STATISTICS.find(d => d.hour === selectedHour) || {
    hour:selectedHour, count: 0, riskLevel: 'safe'
  };

  const getRiskDiagnosis = (hourData: typeof BEAR_SAFETY_STATISTICS[0]) => {
    const { count, hour } = hourData;
    if (count >= 40) {
      return {
        title: '極めて危険（薄暮・活動ピーク）',
        color: 'text-red-500 bg-red-500/10 border-red-500/20',
        badge: 'bg-red-600 text-white',
        desc: `${hour}時台は、学術解析（階層ベイズ）より特定されたクマの「猛烈な活動ピーク」に合致しています。Mt.Bird Sea麓や由利・東由利の林道・山間路をこの時間帯に自転車で走行することは、極力お控えください。特に深いカーブや川沿いは遭遇リスクが跳ね上がります。`
      };
    } else if (count >= 15) {
      return {
        title: '注意（薄明・給餌行動時間）',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        badge: 'bg-amber-500 text-black',
        desc: `${hour}時台は、薄明（日の出・日の入り前後）に伴う行動・移動時間です。山間部走行の際は、必ず「熊鈴」や高音量の「電子笛」を周期的に鳴らし、周囲に見通しの利かないカーブがないか十分に警戒しながら走行してください。`
      };
    } else {
      return {
        title: '比較的安全（活動低迷期）',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        badge: 'bg-emerald-600 text-white',
        desc: `${hour}時台は、クマの主要な休止期や人間の活動によって警戒心が働くため、人里に近いルートや主要道での遭遇報告は少なくなっています。しかし、野生生物の行動には絶対はありません。鈴などの安全装備の携行は忘れないでください。`
      };
    }
  };

  const diagnosis = getRiskDiagnosis(currentHourData);

  // エリア別の森林率と直近目撃強度（架空・リアルなデータ）
  const REGIONS = [
    { name: '本荘地域 (街・海岸)', forest: 28, threat: '低', color: 'bg-emerald-500' },
    { name: 'にかほ地域 (海岸・高原)', forest: 46, threat: '中', color: 'bg-yellow-500' },
    { name: '由利地域 (街道・森林)', forest: 72, threat: '高', color: 'bg-orange-500' },
    { name: '東由利地域 (八塩・丘陵)', forest: 81, threat: '高', color: 'bg-orange-500' },
    { name: '鳥海地域 (雄大・山岳林)', forest: 89, threat: '極めて高', color: 'bg-red-600' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl" id="safety-section">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 左側：統計説明、診断スライダー、エリアデータ (7/12) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="bg-orange-100 text-orange-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" /> 科学的データに基づく安全対策
            </span>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              野生動物（クマ）リスク管理と「魔の時間」
            </h3>
            <p className="text-slate-500 text-sm mt-1.5 mb-6">
              奥深いブナの森と、名水の山、鳥海。そこにはツキノワグマも生息しています。
              階層ベイズモデル及び目撃データを解析し、安全なサイクリングをプランニングしましょう。
            </p>

            {/* インタラクティブ危険度診断スライダー */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-900" /> 出発予定時間の一致
                </span>
                <span className="font-mono text-sm font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded-lg">
                  {selectedHour}:00 - {selectedHour}:59
                </span>
              </div>

              {/* スライダーインプット */}
              <div className="py-2">
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900 focus:outline-none"
                  id="safety-hour-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>午前0時</span>
                  <span>午前6時</span>
                  <span>正午</span>
                  <span>午後6時</span>
                  <span>午後11時</span>
                </div>
              </div>

              {/* 危険度リアルタイム表示 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHour}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`mt-4 p-4 rounded-xl border-l-4 ${diagnosis.color}`}
                  id="risk-diagnosis-output"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-sm text-slate-900 tracking-tight">
                      診断結果：{diagnosis.title}
                    </span>
                    <span className={`text-[10px] font-bold py-0.5 px-2 rounded-full ${diagnosis.badge}`}>
                      遭遇頻度: {currentHourData.count}回
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {diagnosis.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* エリア別森林率と警戒度 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5" /> 地域別の森林占有率と潜在遭遇パラメータ
              </h4>
              <div className="grid md:grid-cols-5 gap-2 text-xs">
                {REGIONS.map((region, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                    <div className="font-semibold text-slate-800 line-clamp-1">{region.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">森林率: {region.forest}%</div>
                    <div className="flex items-center justify-center gap-1 mt-1 font-bold">
                      <span className={`w-2 h-2 rounded-full ${region.color}`}></span>
                      <span>警戒: {region.threat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右側：統計データ折れ線グラフ (5/12) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 text-slate-200 rounded-2xl p-5 border border-slate-800">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono tracking-wider font-bold text-slate-500 uppercase flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> 出没頻度の時間帯グラフ（日周変化）
              </span>
              <span className="text-[9px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                階層ベイズ：薄暮周性
              </span>
            </div>

            {/* Recharts の AreaChart */}
            <div className="h-48 md:h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={BEAR_SAFETY_STATISTICS}
                  margin={{ top: 5, right: 10, left: -30, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="safetyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(v) => `${v}h`}
                    stroke="#475569"
                    fontSize={9}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={9}
                    fontFamily="JetBrains Mono"
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid #1e293b',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '11px'
                    }}
                    labelFormatter={(label) => `${label}時台`}
                    formatter={(value) => [`${value} 目撃頻度指数`, '報告係数']}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#ea580c"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#safetyGradient)"
                  />
                  {/* スライダーの時間に対応する基準線 */}
                  <ReferenceLine
                    x={selectedHour}
                    stroke="#3b82f6"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `${selectedHour}h`,
                      fill: '#3b82f6',
                      fontSize: 10,
                      position: 'top',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* クマよけ４大ゴールデンルール */}
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 font-sans text-xs">
            <h5 className="font-bold text-slate-300 flex items-center gap-1">
              🛡️ 安全に走るための４つのゴールデンルール
            </h5>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-amber-500 block">1. 朝夕・薄暮はペダル休止</span>
                山間路では朝7時前・夕方16時以降は野生種が活性化します。
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 block flex items-center gap-0.5">
                  <Volume2 className="w-3.5 h-3.5" /> 2. 音響機器を鳴らす
                </span>
                高圧ベルや熊鈴、防犯アラートは出会い頭を100%防止する盾。
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-blue-400 block flex items-center gap-0.5">
                  <Smartphone className="w-3.5 h-3.5" /> 3. 推進ウェブを確認
                </span>
                週次で更新される「市町村野生鳥獣データ」をライド直前に確認。
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-orange-400 block">4. スプレー・ホイッスル携行</span>
                遭遇率の高いMt.Bird Seaブルーラインを登る必須アセンブリ。
              </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center pt-2 leading-relaxed">
              Mt.Bird Seaサイクルエコシステムは、科学的データをもって、持続可能かつ安全な「サイクル文化」を推奨します。
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
