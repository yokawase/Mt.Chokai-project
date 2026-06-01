export interface CyclingCourse {
  id: string;
  name: string;
  subName: string;
  type: 'coastal' | 'hillclimb' | 'heritage';
  distance: number; // km
  climb: number; // m
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  poem: string; // 文学的なオノマトペ、詩的な表現
  highlights: string[];
  elevationProfile: { dist: number; elev: number; label: string }[];
}

export interface BearSafetyData {
  hour: number;
  count: number;
  riskLevel: 'safe' | 'caution' | 'danger';
}

export interface HospitalitySpot {
  id: string;
  name: string;
  category: 'water' | 'food' | 'cycle' | 'onsen';
  area: 'honjo' | 'chokai' | 'yuri' | 'nikaho' | 'higashiyuri';
  description: string;
  hospitality: string; // 温かい人情コメント
  address: string;
  latLng: [number, number]; // 簡易座標（シミュレータ上の配置などに使用）
}

export interface CampaignSupport {
  id: string;
  name: string;
  area: string;
  message: string;
  createdAt: string;
}

export interface DemographicsData {
  year: number;
  population: number;
  chokaiRatio: number; // Mt.Bird Seaとの一体感比率（架空・ユーモラスな指標）
  growthRate: number;
}
