export interface CodeAnalysis {
  errors: CodeIssue[];
  warnings: CodeIssue[];
  suggestions: CodeIssue[];
  metrics: CodeMetrics;
}

export interface CodeMetrics {
  complexity: number;
  maintainability: number;
  linesOfCode: number;
  duplicateCode: number;
  testCoverage?: number;
}

export interface CodeIssue {
  type: 'error' | 'warning' | 'suggestion';
  message: string;
  line: number;
  column: number;
  severity: number;
  fix?: string;
  explanation?: string;
  codeExample?: string;
  reference?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface CodeReviewSettings {
  language: string;
  strictMode: boolean;
  securityLevel: 'low' | 'medium' | 'high';
  enableAIAssistant: boolean;
}