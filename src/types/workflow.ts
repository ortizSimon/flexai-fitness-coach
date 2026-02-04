// n8n Webhook Types

export interface N8nRequest {
  sessionId: string;
  message: string;
}

export interface N8nResponse {
  output: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WorkoutStat {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
}
