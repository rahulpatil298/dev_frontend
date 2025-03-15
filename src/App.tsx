import React, { useState } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { AnalysisSidebar } from './components/AnalysisSidebar';
import { ChatBot } from './components/ChatBot';
import { Settings } from './components/Settings';
import { CodeAnalysis, ChatMessage, CodeReviewSettings, CodeIssue } from './types';

const initialSettings: CodeReviewSettings = {
  language: 'javascript',
  strictMode: false,
  securityLevel: 'medium',
  enableAIAssistant: true,
};

const mockAnalysis: CodeAnalysis = {
  errors: [
    {
      type: 'error',
      message: 'Unexpected token: }',
      line: 10,
      column: 15,
      severity: 1,
      explanation: 'There is an extra closing brace that does not match any opening brace.',
      fix: 'Remove the extra closing brace',
    },
  ],
  warnings: [
    {
      type: 'warning',
      message: 'Variable "data" is declared but never used',
      line: 5,
      column: 7,
      severity: 2,
      explanation: 'Unused variables can indicate dead code or bugs.',
      fix: 'Remove the unused variable or use it in your code',
    },
  ],
  suggestions: [
    {
      type: 'suggestion',
      message: 'Consider using const instead of let',
      line: 3,
      column: 1,
      severity: 3,
      explanation: 'Using const for variables that are not reassigned helps prevent bugs and makes code more maintainable.',
      fix: 'Replace "let" with "const"',
      codeExample: 'const userData = fetchUserData();',
      reference: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const',
    },
  ],
  metrics: {
    complexity: 12,
    maintainability: 85,
    linesOfCode: 150,
    duplicateCode: 5,
    testCoverage: 75,
  },
};

function App() {
  const [settings, setSettings] = useState<CodeReviewSettings>(initialSettings);
  const [analysis, setAnalysis] = useState<CodeAnalysis>(mockAnalysis);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI code review assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const handleCodeChange = (code: string) => {
    console.log('Code changed:', code);
  };

  const handleAnalyze = async (code: string) => {
    // Simulate API call to analyze code
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real implementation, this would make an API call to analyze the code
    // and return real results. For now, we'll return mock data with some variations
    const newAnalysis: CodeAnalysis = {
      ...mockAnalysis,
      metrics: {
        ...mockAnalysis.metrics,
        complexity: Math.floor(Math.random() * 20) + 5,
        maintainability: Math.floor(Math.random() * 30) + 70,
        linesOfCode: code.split('\n').length,
        duplicateCode: Math.floor(Math.random() * 10),
      },
    };

    setAnalysis(newAnalysis);

    // Add an AI message about the analysis
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `I've analyzed your code. The main concerns are:
1. Code complexity score is ${newAnalysis.metrics.complexity} (recommended: <10)
2. ${newAnalysis.errors.length} errors and ${newAnalysis.warnings.length} warnings found
3. ${newAnalysis.metrics.duplicateCode}% duplicate code detected

Would you like me to explain any specific issues in detail?`,
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleIssueClick = (issue: CodeIssue) => {
    // Add an AI message explaining the issue in detail
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Let me explain this ${issue.type}:

${issue.explanation}

${issue.fix ? `To fix this, you can: ${issue.fix}` : ''}
${issue.codeExample ? `\nHere's an example:\n${issue.codeExample}` : ''}
${issue.reference ? `\nLearn more: ${issue.reference}` : ''}

Would you like me to help you implement this fix?`,
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSendMessage = async (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // API call to send the user prompt
    const responseDiv = document.createElement("div");
    responseDiv.innerHTML = "Loading..."; // Placeholder message
    document.body.appendChild(responseDiv);

    try {
      const response = await fetch("https://dev-backendvercel.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();

      // Handle the AI response here
      const aiResponse: ChatMessage = {
        id: Date.now().toString(),
        content: data.response || "No response received.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }  catch (error) {
      const aiErrorMessage: ChatMessage = {
          id: Date.now().toString(),
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          role: 'assistant',
          timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiErrorMessage]);
  }
  
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col">
        <div className="h-12 bg-gray-800 flex items-center justify-between px-4">
          <h1 className="text-xl font-bold">AI Code Review</h1>
          <Settings settings={settings} onSave={setSettings} />
        </div>
        <div className="flex-1">
          <CodeEditor
            onCodeChange={handleCodeChange}
            onAnalyze={handleAnalyze}
            analysis={analysis}
          />
        </div>
      </div>

      <div className="w-80 border-l border-gray-700">
        <AnalysisSidebar analysis={analysis} onIssueClick={handleIssueClick} />
      </div>

      <div className="w-96 border-l border-gray-700">
        <ChatBot messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
