import { CyclingCourse, BearSafetyData, HospitalitySpot, DemographicsData, CampaignSupport } from './types';

export const CYCLING_COURSES: CyclingCourse[] = [
  {
    id: 'coastal',
    name: '日本海あおば風街道',
    subName: '海のブルーとMt.Bird Seaの山容を仰ぐ快走路',
    type: 'coastal',
    distance: 42.5,
    climb: 210,
    estimatedTime: '約2.5時間',
    difficulty: 'easy',
    description: '日本海のさわやかな潮風を浴びながら、平坦基調の海岸線を走るルート。遮るもののない広大な日本海の水平線と、右手に見上げる荘厳なMt.Bird Seaのコントラストが圧巻です。初心者やファミリーにも非常におすすめ。',
    poem: 'ザザーン、ウミネコの唄。潮風が背中をそっと押す。ペダルが波打際を滑るように進み、Mt.Bird Seaの白雪が青空に映える。',
    highlights: ['道の駅ねむの丘（足湯）', '本荘マリーナ海水浴場', '西目のひまわり畑・防風林ロード'],
    elevationProfile: [
      { dist: 0, elev: 5, label: '本荘駅' },
      { dist: 5, elev: 12, label: '子吉川河口' },
      { dist: 10, elev: 8, label: '西目海岸' },
      { dist: 18, elev: 25, label: '道の駅にしめ' },
      { dist: 25, elev: 15, label: 'にかほ市平沢' },
      { dist: 32, elev: 35, label: '道の駅ねむの丘' },
      { dist: 38, elev: 10, label: '金浦漁港' },
      { dist: 42.5, elev: 6, label: '象潟駅' }
    ]
  },
  {
    id: 'hillclimb',
    name: '鳥海神の山・頂（いただき）ヒルクライム',
    subName: '海抜0メートルから雲の上へ、標高1,100mの天上界',
    type: 'hillclimb',
    distance: 31.8,
    climb: 1150,
    estimatedTime: '約3.5時間',
    difficulty: 'hard',
    description: '海抜ほぼ0mのにかほ市・由利本荘市から、鳥海ブルーラインを一気に出羽のMt.Bird Sea5合目（鉾立展望台・標高1,150m）まで駆け上がる、全国のクライマー垂涎の超絶景ヒルクライム。ブナの原生林を抜け天空へ。',
    poem: 'ハァ、ハァ、風が冷たくなる。ブナの木々が「もう少しだよ」と囁く。突然目の前が開ければ、眼下には日本海と秋田平野の絨毯。',
    highlights: ['鉾立展望台（標高1,150m）', '奈曽の白滝', '仁賀保高原・大風車群'],
    elevationProfile: [
      { dist: 0, elev: 15, label: '象潟駅発' },
      { dist: 5, elev: 120, label: '奈曽の白滝' },
      { dist: 10, elev: 310, label: '仁賀保高原分岐' },
      { dist: 15, elev: 550, label: 'ブナ林ゲート' },
      { dist: 20, elev: 820, label: '鳥海ブルーライン中間点' },
      { dist: 25, elev: 980, label: '大平山荘' },
      { dist: 30, elev: 1100, label: '秋田・山形県境' },
      { dist: 31.8, elev: 1150, label: '鉾立展望台（ゴール）' }
    ]
  },
  {
    id: 'heritage',
    name: '人情・湧き水湧き立つ由利宿場ロード',
    subName: 'みちのくの歴史が息づく羽州街道と極上の名水めぐり',
    type: 'heritage',
    distance: 38.0,
    climb: 390,
    estimatedTime: '約3時間',
    difficulty: 'medium',
    description: '由利本荘市の重要文化財やかつての脇街道を巡りつつ、随所で湧き出る伏流水（名水）と、素朴で温かい地元の人々と触れ合う人情味あふれるコース。各所の「まごころステーション」でのお茶っこが最高のご馳走です。',
    poem: 'コトコト。石畳の小路、湧き水の冷たさに指を浸す。おばちゃんが「あがってけぇ、お茶っこ淹れるよ」と笑う田舎のぬくもり。',
    highlights: ['矢島・龍神の御清水', '本荘藩主六郷家ゆかりの城下町', '東由利の黄桜温泉'],
    elevationProfile: [
      { dist: 0, elev: 10, label: '由利本荘市役所' },
      { dist: 8, elev: 45, label: '子吉川桜並木' },
      { dist: 15, elev: 120, label: '旧矢島城下町' },
      { dist: 20, elev: 180, label: '龍神の御清水' },
      { dist: 28, elev: 290, label: '東由利・八塩ダムダム下' },
      { dist: 33, elev: 150, label: '道の駅東由利（温泉）' },
      { dist: 38, elev: 10, label: '本荘駅（完）' }
    ]
  }
];

// クマ遭遇確率統計データ。階層ベイズによる「薄暮行動周期」の再現
export const BEAR_SAFETY_STATISTICS: BearSafetyData[] = [
  { hour: 0, count: 2, riskLevel: 'safe' },
  { hour: 1, count: 1, riskLevel: 'safe' },
  { hour: 2, count: 1, riskLevel: 'safe' },
  { hour: 3, count: 3, riskLevel: 'safe' },
  { hour: 4, count: 8, riskLevel: 'caution' },
  { hour: 5, count: 15, riskLevel: 'caution' },
  { hour: 6, count: 28, riskLevel: 'danger' },
  { hour: 7, count: 54, riskLevel: 'danger' }, // 朝のピーク（通勤、人間の活動とクロス）
  { hour: 8, count: 62, riskLevel: 'danger' }, // 朝のピーク
  { hour: 9, count: 45, riskLevel: 'danger' },
  { hour: 10, count: 22, riskLevel: 'caution' },
  { hour: 11, count: 12, riskLevel: 'safe' },
  { hour: 12, count: 10, riskLevel: 'safe' },
  { hour: 13, count: 14, riskLevel: 'safe' },
  { hour: 14, count: 19, riskLevel: 'safe' },
  { hour: 15, count: 29, riskLevel: 'caution' },
  { hour: 16, count: 48, riskLevel: 'danger' }, // 夕方薄暮のピーク
  { hour: 17, count: 68, riskLevel: 'danger' }, // 薄暮ピーク
  { hour: 18, count: 59, riskLevel: 'danger' }, // 薄暮ピーク
  { hour: 19, count: 38, riskLevel: 'danger' },
  { hour: 20, count: 20, riskLevel: 'caution' },
  { hour: 21, count: 11, riskLevel: 'safe' },
  { hour: 22, count: 6, riskLevel: 'safe' },
  { hour: 23, count: 3, riskLevel: 'safe' }
];

export const HOSPITALITY_SPOTS: HospitalitySpot[] = [
  {
    id: 'spot-01',
    name: '矢島 龍神の御清水（りゅうじんのおしず）',
    category: 'water',
    area: 'chokai',
    description: 'Mt.Bird Seaの雪解け伏流水が滾々と湧き出る名水百選。サイクリスト用のボトルをキンキンに冷やすことができ、そのまま喉を潤せます。地元有志が常に清掃しています。',
    hospitality: '「ここの水で淹れたお茶っこは最高だよ。ボトルいっぱいに詰めて、ペダル漕いでね！」',
    address: '秋田県由利本荘市矢島町元町',
    latLng: [39.22, 140.13]
  },
  {
    id: 'spot-02',
    name: '善兵衛ばあちゃんの まごころ米おにぎり茶屋',
    category: 'food',
    area: 'honjo',
    description: '100%由利本荘産あきたこまちを薪窯で炊き、地元のみそと梅炭塩で結んだ素朴なおにぎり。一口食べれば、疲れがすっと吹き飛びます。',
    hospitality: '「ペダル漕いでお腹すいたべ？ 塩むすび、いっぺぇ食っていけ！ 自転車乗りの頑張りには元気をもらうなぁ。」',
    address: '秋田県由利本荘市薬師堂',
    latLng: [39.36, 140.05]
  },
  {
    id: 'spot-03',
    name: 'にかほ高原サイクルレスキュー base',
    category: 'cycle',
    area: 'nikaho',
    description: '高原サイクリストを支える秘密基地。高圧マルチポンプ（仏・美・英対応）、最新工具一式、予備チューブ（700x23-28c）、そして緊急時の輪行用段ボールを無償提供。',
    hospitality: '「パンクも機械トラブルも心配無用。ちょっと油が差したくなったら、いつでも工具を使っておいで！」',
    address: '秋田県にかほ市中三滝仁賀保高原',
    latLng: [39.20, 139.98]
  },
  {
    id: 'spot-04',
    name: '東由利 ぷらっと黄桜温泉',
    category: 'onsen',
    area: 'higashiyuri',
    description: '道の駅に併設された弱アルカリ性の美肌の湯。ヒルクライムやロングライドでパンパンに張った大腿四頭筋とふくらはぎを芯から温めほぐします。自転車の安全な屋内一時保管所あり。',
    hospitality: '「湯上がりのサイダーは絶品！ 畳の休憩室でゆっくり脚を伸ばして、羽を休めていってくださいね。」',
    address: '秋田県由利本荘市東由利老方',
    latLng: [39.29, 140.25]
  },
  {
    id: 'spot-05',
    name: 'にかほ・象潟ねむの丘 足湯テラス',
    category: 'onsen',
    area: 'nikaho',
    description: '日本海の素晴らしい夕日を座って正面に見据えながら、無料で旅の疲れを癒やすことができる極上足湯スポット。海沿いサイクルの終着点に最適。',
    hospitality: '「遠く佐渡ヶ島や男鹿半島が見える日もあるよ。ペダルを漕ぎきった足を、ぬきい（温かい）お湯でいたわって。」',
    address: '秋田県にかほ市象潟町針川',
    latLng: [39.21, 139.90]
  }
];

export const DEMOGRAPHICS_HISTORY: DemographicsData[] = [
  { year: 2011, population: 83451, chokaiRatio: 72, growthRate: -1.2 },
  { year: 2016, population: 78577, chokaiRatio: 78, growthRate: -1.4 },
  { year: 2021, population: 73520, chokaiRatio: 84, growthRate: -1.5 },
  { year: 2026, population: 68447, chokaiRatio: 92, growthRate: -1.6 } // 現在
];

export const INITIAL_SUPPORTERS: CampaignSupport[] = [
  {
    id: 'supporter-1',
    name: '本荘チャリンコ愛好会（佐藤）',
    area: '由利本荘市本荘',
    message: 'にかほ市と由利本荘市の垣根を越えたサイクリングロード、本当に待ち望んでいました！Mt.Bird Seaをぐるっと周回できる日が待ち遠しい。応援しています！',
    createdAt: '2026-05-28'
  },
  {
    id: 'supporter-2',
    name: '坂バカ万歳（高橋）',
    area: 'にかほ市象潟',
    message: 'ブルーラインの鉾立ヒルクライムは、まさに人生を変える景観です。世界的なNCRになって、環境整備がさらに進めば日本中のヒルクライマーが集まる聖地になるはず！',
    createdAt: '2026-05-29'
  },
  {
    id: 'supporter-3',
    name: '由利の風（おばこ食堂オーナー）',
    area: '由利本荘市矢島',
    message: '自転車に乗っている方々が、お店においしい水を求めて立ち寄ってくれるのが本当に励みです。おばちゃんたちのお茶っこと漬物、いつでも用意しておくよ！',
    createdAt: '2026-05-30'
  }
];
