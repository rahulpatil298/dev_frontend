import { CodeAnalysis, CodeIssue } from '../types';
import { AlertTriangle, AlertCircle, Lightbulb, BarChart2, Code2, GitBranch } from 'lucide-react';

interface AnalysisSidebarProps {
  analysis: CodeAnalysis;
  onIssueClick: (issue: CodeIssue) => void;
}

export function AnalysisSidebar({ analysis, onIssueClick }: AnalysisSidebarProps) {
  return (
    <div className="w-80 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
        <h3 className="flex items-center gap-2 text-blue-400 font-medium mb-3">
          <BarChart2 size={18} />
          Code Metrics
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Complexity:</span>
            <span className="font-mono">{analysis.metrics.complexity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Maintainability:</span>
            <span className="font-mono">{analysis.metrics.maintainability}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lines of Code:</span>
            <span className="font-mono">{analysis.metrics.linesOfCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Duplicate Code:</span>
            <span className="font-mono">{analysis.metrics.duplicateCode}%</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <section>
          <h3 className="flex items-center gap-2 text-red-400 font-medium">
            <AlertCircle size={18} />
            Errors ({analysis.errors.length})
          </h3>
          <ul className="mt-2 space-y-2">
            {analysis.errors.map((error, index) => (
              <li
                key={index}
                onClick={() => onIssueClick(error)}
                className="p-3 bg-red-900/30 rounded-lg cursor-pointer hover:bg-red-900/50"
              >
                <p className="text-sm mb-1">{error.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Line {error.line}</span>
                  {error.fix && (
                    <button className="px-2 py-1 bg-red-700/50 rounded hover:bg-red-700/70">
                      Quick Fix
                    </button>
                  )}
                </div>
                {error.explanation && (
                  <p className="mt-2 text-xs text-gray-400">{error.explanation}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-yellow-400 font-medium">
            <AlertTriangle size={18} />
            Warnings ({analysis.warnings.length})
          </h3>
          <ul className="mt-2 space-y-2">
            {analysis.warnings.map((warning, index) => (
              <li
                key={index}
                onClick={() => onIssueClick(warning)}
                className="p-3 bg-yellow-900/30 rounded-lg cursor-pointer hover:bg-yellow-900/50"
              >
                <p className="text-sm mb-1">{warning.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Line {warning.line}</span>
                  {warning.fix && (
                    <button className="px-2 py-1 bg-yellow-700/50 rounded hover:bg-yellow-700/70">
                      Quick Fix
                    </button>
                  )}
                </div>
                {warning.explanation && (
                  <p className="mt-2 text-xs text-gray-400">{warning.explanation}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-blue-400 font-medium">
            <Lightbulb size={18} />
            Suggestions ({analysis.suggestions.length})
          </h3>
          <ul className="mt-2 space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => onIssueClick(suggestion)}
                className="p-3 bg-blue-900/30 rounded-lg cursor-pointer hover:bg-blue-900/50"
              >
                <p className="text-sm mb-1">{suggestion.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Line {suggestion.line}</span>
                  {suggestion.fix && (
                    <button className="px-2 py-1 bg-blue-700/50 rounded hover:bg-blue-700/70">
                      Apply Suggestion
                    </button>
                  )}
                </div>
                {suggestion.explanation && (
                  <p className="mt-2 text-xs text-gray-400">{suggestion.explanation}</p>
                )}
                {suggestion.codeExample && (
                  <div className="mt-2 p-2 bg-gray-900/50 rounded">
                    <pre className="text-xs overflow-x-auto">
                      <code>{suggestion.codeExample}</code>
                    </pre>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}