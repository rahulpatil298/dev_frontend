import { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { CodeReviewSettings } from '../types';

interface SettingsProps {
  settings: CodeReviewSettings;
  onSave: (settings: CodeReviewSettings) => void;
}

export function Settings({ settings, onSave }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSave(localSettings);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-700 rounded-full"
      >
        <SettingsIcon className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Default Language
                </label>
                <select
                  value={localSettings.language}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      language: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Security Level
                </label>
                <select
                  value={localSettings.securityLevel}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      securityLevel: e.target.value as 'low' | 'medium' | 'high',
                    })
                  }
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="strictMode"
                  checked={localSettings.strictMode}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      strictMode: e.target.checked,
                    })
                  }
                  className="rounded bg-gray-700"
                />
                <label htmlFor="strictMode" className="text-white">
                  Strict Mode
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="aiAssistant"
                  checked={localSettings.enableAIAssistant}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      enableAIAssistant: e.target.checked,
                    })
                  }
                  className="rounded bg-gray-700"
                />
                <label htmlFor="aiAssistant" className="text-white">
                  Enable AI Assistant
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}