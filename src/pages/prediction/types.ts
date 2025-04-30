export interface PredictionTask {
  id: string;
  name: string;
  agentType: 'failure' | 'demand' | 'quality';
  target: string;
  timeRange: {
    start: string;
    end: string;
  };
  schedule: 'manual' | 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'inactive';
  parameters?: {
    confidenceLevel?: number;
    modelType?: string;
    features?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface PredictionResult {
  id: string;
  taskId: string;
  taskName: string;
  timestamp: string;
  result: {
    value: number | string;
    probability?: number;
    range?: {
      min: number;
      max: number;
    };
  };
  confidence: number;
  status: 'success' | 'failed';
  metadata: {
    modelVersion?: string;
    featureImportance?: Record<string, number>;
    metrics?: {
      accuracy?: number;
      precision?: number;
      recall?: number;
    };
  };
  createdAt: string;
}