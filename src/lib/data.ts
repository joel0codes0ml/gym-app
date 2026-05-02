export interface UserProfile {
  id: string;
  fullName: string;
  avatarUrl: string;
  age: number;
  weightKg: number;
  heightCm: number;
  goal: 'muscle_gain' | 'fat_loss' | 'endurance' | 'general';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  planId: string;
  subscriptionTier: 'free' | 'pro' | 'elite';
  streakDays: number;
  createdAt: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  date: string;
  planName: string;
  durationMinutes: number;
  exercises: Exercise[];
  completed: boolean;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  waterGlasses: number;
  meals: Meal[];
}

export interface Meal {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: string;
  weightKg: number;
  bodyFatPct: number;
  benchKg: number;
  squatKg: number;
  deadliftKg: number;
  notes: string;
}

export const MOCK_USER: UserProfile = {
  id: 'user_1',
  fullName: 'Alex Johnson',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  age: 28,
  weightKg: 78,
  heightCm: 180,
  goal: 'muscle_gain',
  fitnessLevel: 'intermediate',
  planId: 'ppl_1',
  subscriptionTier: 'pro',
  streakDays: 7,
  createdAt: new Date().toISOString(),
};

export const MOCK_WORKOUTS: WorkoutLog[] = [
  {
    id: 'w1',
    userId: 'user_1',
    date: new Date().toISOString(),
    planName: 'Push Session',
    durationMinutes: 65,
    completed: true,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, weight: 80, completed: true },
      { name: 'Shoulder Press', sets: 3, reps: 10, weight: 45, completed: true },
      { name: 'Tricep Pushdowns', sets: 3, reps: 12, weight: 25, completed: true },
    ],
  },
];
