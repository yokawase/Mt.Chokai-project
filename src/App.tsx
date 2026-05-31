import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bike,
  Compass,
  Heart,
  ShieldAlert,
  Award,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  ArrowDown,
  Navigation,
  ExternalLink,
  Users,
  CheckCircle2,
  MapPin,
  Trees
} from 'lucide-react';
import { DEMOGRAPHICS_HISTORY } from './data';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

import CourseSimulator from './components/CourseSimulator';
import HumanHospitalityMap from './components/HumanHospitalityMap';
import SafetyCharts from './components/SafetyCharts';
import CampaignBoard from './components/CampaignBoard';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const statsData = DEMOGRAPHICS_HISTORY;

  const faqs = [
    {
      q: 'ナショナルサイクルルート（NCR）とは何ですか？',
      a: '国土交通省が創設した、日本を代表し、世界に誇りうるサイクリングルートを国が認定する制度です。代表例として「つくば霞ヶ浦りんりんロード」や「ビワイチ（琵琶湖）」などがあり、鳥海山周辺もその水準に到達するための環境・サポート網の整備を推進しています。'
    },
    {
      q: '初心者でも走れる安全なルートは本当にありますか？',
      a: 'はい！「日本海あおば風街道コース」はほぼ平坦で、車道外側線の矢羽根表示や道の駅などの休憩スポットが非常に充実しています。ファミリーや初めて長距離を走る方に最適な設定です。'
    },
    {
      q: '万が一、山間部でクマに目撃情報が出た場合はどうなりますか？',
      a: '由利地域各市町村の鳥獣対策課とリアルタイムに連携し、当協議会のウェブサイトおよびSNS、まごころステーション各所の緊急掲示板にアラートを即時発信します。また、推進ルート上には危険度に応じた回避経路（エスケープルート）を策定しています。'
    },
    {
      q: '協議会を応援したい、あるいはステーションとして登録したい場合は？',
      a: 'ページの最下部にある「サポーター署名・応援メッセージ」へのご記入が、活動推進の直接的な力になります。また、水道水の提供や空気入れの設置などの「まごころステーション」新規ご協力についても随時募集しております。'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* 1. ナビゲーション */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-205 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between h-16 items-center">
            
            {/* ロゴエリア */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded flex items-center justify-center shadow-md">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-800 block leading-tight tracking-tight">
                  Mt.鳥海自転車活用推進協議会
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono block">
                  Mt. Chokai Bicycle Promotion Council
                </span>
              </div>
            </div>

            {/* デスクトップ用リンク */}
            <div className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-tight">
              <a href="#vision" className="text-slate-600 hover:text-blue-900 transition-colors">エコシステム</a>
              <a href="#simulator" className="text-slate-600 hover:text-blue-900 transition-colors">標高ライド体験</a>
              <a href="#hospitality" className="text-slate-600 hover:text-blue-900 transition-colors">おもてなしマップ</a>
              <a href="#safety" className="text-slate-600 hover:text-blue-900 transition-colors">安全・クマ対策</a>
              <a href="#community" className="text-slate-600 hover:text-blue-900 transition-colors">超広域連携</a>
              <a href="#campaign" className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition-all font-semibold shadow-sm">
                署名で応援する
              </a>
            </div>

            {/* モバイルメニューボタン */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2 focus:outline-none"
                id="menu-trigger-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* モバイル用ドロワーメニュー */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
              id="mobile-drawer"
            >
              <div className="px-5 pt-2 pb-6 space-y-2.5 font-bold text-xs text-slate-700">
                <a
                  href="#vision"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded hover:bg-slate-50 transition"
                >
                  エコシステムビジョン
                </a>
                <a
                  href="#simulator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded hover:bg-slate-50 transition"
                >
                  標高ライドシミュレータ
                </a>
                <a
                  href="#hospitality"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded hover:bg-slate-50 transition"
                >
                  おもてなし人情マップ
                </a>
                <a
                  href="#safety"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded hover:bg-slate-50 transition"
                >
                  野生鳥獣リスク・安全
                </a>
                <a
                  href="#community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded hover:bg-slate-50 transition"
                >
                  超広域連携ダッシュボード
                </a>
                <a
                  href="#campaign"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 text-center bg-blue-900 text-white rounded hover:bg-blue-800 transition"
                >
                  推進サポーターになる
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. ヒーローセクション */}
      <header className="relative bg-blue-900 pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        
        {/* Procedural Mountain backgrounds matching Professional Polish layout exactly */}
        <div className="absolute inset-x-0 bottom-0 top-12 opacity-35 z-0 pointer-events-none">
          <div className="mountain-layer-1 absolute bottom-0 left-0 w-full h-[65%] bg-blue-800"></div>
          <div className="mountain-layer-2 absolute bottom-0 left-0 w-full h-[45%] bg-blue-700"></div>
        </div>

        {/* Ambient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/35 to-transparent z-1 pointer-events-none"></div>

        {/* Circular vector emblem (Chokai crank) from Professional Polish theme */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent flex items-center justify-center z-1 pointer-events-none opacity-40 md:opacity-100">
          <div className="w-80 h-80 border-8 border-white/10 rounded-full flex items-center justify-center rotate-12">
            <div className="w-64 h-64 border-4 border-dashed border-white/15 rounded-full flex items-center justify-center">
              <div className="w-44 h-44 border border-white/10 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-white">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex mb-4"
          >
            <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 tracking-tighter uppercase rounded">
              Official Cycling Information
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight border-none"
          >
            鳥海の風を感じて、<br/>
            最高のヒルクライムを。
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mb-6 leading-relaxed"
          >
            出羽富士「鳥海山」の裾野に広がる日本海とブナ原生林。市町村の境界を越え、おばちゃんたちのお茶っこの温もりを背に受けて走る、心躍る長距離ラリーを。
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs text-slate-300 max-w-xl mb-8 leading-relaxed italic"
          >
            シャカシャカ、とチェーンが鳴る。にかほの潮風から、由利本荘の街道へ。<br/>
            持続可能な日本の未来を紡ぎ出す、一漕ぎのあたたかなアドベンチャーが始まります。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#simulator"
              className="bg-white text-blue-900 font-bold py-3 px-8 rounded shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Bike className="w-5 h-5 text-blue-900" /> 無料シミュレータを体験
            </a>
            
            <a
              href="#vision"
              className="border-2 border-white/90 text-white font-bold py-3 px-8 rounded hover:bg-white/10 transition flex items-center gap-1.5"
            >
              ビジョンとSDGsを探索 <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </header>

      {/* 3. ３大ビジョン・エコシステム */}
      <section id="vision" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest font-mono">
              OUR MISSION & PURPOSE
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
              サイクルツーリズムがもたらす「３つの幸福」
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
              排気ガスを出さないただの移動手段ではありません。サイクルエコシステムは、地域の歴史、過疎化へのレジリエンス、そしてペダルを漕ぐ楽しさを見事に結晶化した「真の地方創生」の形です。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* ビジョン1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl w-fit mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                観光資源と街道の再発見
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                自動車なら一瞬で通り過ぎてしまう、名物おばちゃんのいる定食屋さん、伏流水の湧き水、田んぼの青い匂い。不合理でゆっくりな移動だからこそ、みちのくの本当の美しさが浮かび上がります。
              </p>
              <div className="text-slate-400 text-xs font-serif italic">
                「通りすぎちゃもったいない。おばちゃんの手づくりおにぎり、冷たい水。全部僕らの宝物。」
              </div>
            </div>

            {/* ビジョン2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl w-fit mb-6">
                <Trees className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                SDGs・持続可能な街づくり
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                低炭素かつ環境負荷ゼロ。地球環境への貢献は一過性のイベントではなく、住民と来訪者が手を取り合い、一漕ぎずつ紡ぎ出す持続可能なサイクルルートの日常です。
              </p>
              <div className="text-slate-400 text-xs font-serif italic">
                「排気ガスゼロ。ブナ林の深い空気を肺いっぱいに吸い込んで、一歩ずつ前に進む。」
              </div>
            </div>

            {/* ビジョン3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="bg-orange-100 text-orange-850 p-4 rounded-2xl w-fit mb-6">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                ウェルビーイングへの貢献
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                適度な有酸素運動は体とメンタルを健康にします。都会の喧騒、日々の重圧を、鳥海高原の広大な風と、美味しいあきたこまちのエネルギーで、軽やかにデトックスします。
              </p>
              <div className="text-slate-400 text-xs font-serif italic">
                「ハァ、フゥ。汗のその先に、海が見える感動がある。生きている、という確かな手応え。」
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. インタラクティブ標高シミュレータ (セクション) */}
      <section id="simulator" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest font-mono">
              INTERACTIVE RIDE PLATFORM
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 tracking-tight">
              鳥海バーチャルペダリング
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-slate-500 text-xs mt-3 max-w-xl mx-auto">
              標高・距離プロファイルを可視化。実際にペダルをタップして踏み進み、その地点を通過する気分を味わいましょう。
            </p>
          </div>

          <CourseSimulator />
        </div>
      </section>

      {/* 5. おもてなし人情マップ (セクション) */}
      <section id="hospitality" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HumanHospitalityMap />
        </div>
      </section>

      {/* 6. 野生動物クマ安全管理 (セクション) */}
      <section id="safety" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SafetyCharts />
        </div>
      </section>

      {/* 7. 超広域連携＆人口統計ダッシュボード */}
      <section id="community" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* 左コラム：人口動態の危機管理と『課題先進』の考え方 (5/12) */}
            <div className="lg:col-span-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit mb-3">
                <Users className="w-3.5 h-3.5" /> 超広域市町村連携
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                「限界」の境界線を取り払い<br/>新しい地域の息吹を吹き込む
              </h3>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                由利本荘市・にかほ市を含む由利地域は、深刻な人口減少・少子化に直面しています。行政的な境界線に縛られ、単独で縮小するアタッチメント型の悲観論に終止符を打ちましょう。
              </p>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                私たちは指定過疎地域ではなく、世界の「課題先進地域」です。サイクルツーリズムは、市町村の垣根を軽やかに超え、同じ「鳥海山の伏流水を分け合うアライアンス」としてのポテンシャルを最大化します。
              </p>

              {/* ユーモラスでポジティブなバッジ */}
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl mt-6">
                <h5 className="font-bold text-emerald-900 text-sm flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> 特異な住民データ（鳥海一体化レシオ）
                </h5>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  総人口が減少しても、<strong>由利本荘・にかほ住民の「鳥海山と自転車への愛着比率」は、2011年の72%から2026年現在は92%へと急上昇。</strong>地域のアイデンティティは益々熱く一体化しています。
                </p>
              </div>
            </div>

            {/* 右コラム：Rechartsによる人口減少×一体化レシオグラフ (7/12) */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner">
              <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center justify-between">
                <span>📊 人口推移と地域の一体感パラメータの推移</span>
                <span className="text-[10px] text-slate-400 font-mono">（由利地域総計）</span>
              </h4>

              {/* Recharts の BarChart */}
              <div className="h-64 md:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statsData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="year"
                      stroke="#64748b"
                      fontSize={11}
                      fontFamily="JetBrains Mono"
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#ef4444"
                      fontSize={11}
                      fontFamily="JetBrains Mono"
                      tickFormatter={(v) => `${Math.round(v / 1000)}k人`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                      fontSize={11}
                      fontFamily="JetBrains Mono"
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        fontSize: '11px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar
                      yAxisId="left"
                      dataKey="population"
                      name="総人口推移"
                      fill="#cbd5e1"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="chokaiRatio"
                      name="鳥海山との一体感比率 (%)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[10px] text-slate-400 text-center mt-3 font-mono">
                ※ 総人口は減少を辿るものの、超広域連携ポテンシャル(鳥海レシオ)がそれを超えて地域活性度を担っていきます。
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. 署名推進キャンペーン・ボード (セクション) */}
      <section id="campaign" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CampaignBoard />
        </div>
      </section>

      {/* 9. FAQ セクション */}
      <section className="py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-mono">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              よくあるご質問 (FAQ)
            </h2>
            <div className="w-12 h-1 bg-green-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-bold text-slate-900 text-sm md:text-base flex justify-between items-center bg-white hover:bg-slate-50/50 transition-all focus:outline-none"
                    id={`faq-btn-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-slate-400 select-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 border-t border-slate-200 bg-slate-50 text-slate-600 text-xs md:text-sm leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. リアルタイムアナウンスメントTicker (Professional Polish) */}
      <div className="bg-slate-100 border-t border-b border-slate-200 py-4 shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">Update</span>
            <span className="font-mono text-slate-500">2026.05.31</span>
          </div>
          <p className="flex-grow hover:underline cursor-pointer">
            鳥海山ナショナルサイクルルート（NCR）指定へ向けた秋田・山形超広域サイクルスタンプラリー2026が始動しました。詳細マップ配布中です。
          </p>
          <div className="flex gap-2">
            <span className="bg-slate-200 px-3 py-1 rounded text-slate-600 uppercase text-[9px]">まごころ通信</span>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-950 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          
          <div className="grid md:grid-cols-4 gap-8 mb-12 text-xs">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center">
                  <Bike className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm text-white tracking-tight">
                  鳥海山サイクルエコシステム推進会議
                </span>
              </div>
              <p className="max-w-md text-slate-400 leading-relaxed text-[11px]">
                秋田県由利本荘市・にかほ市広域サイクルネットワークを推進し、持続可能な豊かな暮らしを自転車とともに築く民間・行政協働のチームです。
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                推進関連リンク
              </h5>
              <ul className="space-y-2 text-slate-400 font-medium">
                <li>
                  <a href="https://www.mlit.go.jp/road/bicycle_use/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    国土交通省 自転車活用推進 <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <span className="text-slate-500 flex items-center gap-1 cursor-not-allowed">
                    由利本荘市 自転車活用計画（準備中）
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                おことわり / 安全事項
              </h5>
              <p className="text-slate-500 leading-relaxed text-[10px]">
                鳥海山麓は自然が豊かであり、天候の急変や寒暖差、野生動物の急な飛び出しが起こる場合があります。安全装備、水分補給、安全ガイドランをご確認の上、万全の体調でライドをお楽しみください。
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-4 font-mono">
            <div>
              &copy; 2026 鳥海山サイクルエコシステム推進会議 / Mt.鳥海自転車活用推進協議会. All Rights Reserved.
            </div>
            <div className="flex gap-2">
              <span>秋田・由利地域・にかほ広域連携</span>
              <span>•</span>
              <span>令和8年5月31日告示</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
