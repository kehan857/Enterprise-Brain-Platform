export interface AlertRule {
  id: string;
  name: string;
  agentType: 'threshold' | 'anomaly' | 'trend';
  condition: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AlertRecord {
  id: string;
  ruleId: string;
  timestamp: string;
  content: string;
  severity: 'high' | 'medium' | 'low';
  status: 'unresolved' | 'acknowledged' | 'resolved';
  metadata: {
    source: string;
    targetId?: string;
    measurements?: Record<string, number>;
  };
  actions?: {
    type: string;
    timestamp: string;
    operator: string;
    comment?: string;
  }[];
}