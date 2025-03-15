import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { CodeAnalysis } from '../types';
import { Play, RefreshCw } from 'lucide-react';

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  onAnalyze: (code: string) => void;
  analysis: CodeAnalysis;
}

export function CodeEditor({ onCodeChange, onAnalyze, analysis }: CodeEditorProps) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      onCodeChange(value);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await onAnalyze(code);
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded-md"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <RefreshCw className="animate-spin" size={16} />
          ) : (
            <Play size={16} />
          )}
          Analyze Code
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80],
            wordWrap: 'on',
            suggest: {
              showMethods: true,
              showFunctions: true,
              showConstructors: true,
              showDeprecated: false,
              showFields: true,
              showVariables: true,
              showClasses: true,
              showStructs: true,
              showInterfaces: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showKeywords: true,
              showWords: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showSnippets: true,
            },
          }}
        />
      </div>
    </div>
  );
}