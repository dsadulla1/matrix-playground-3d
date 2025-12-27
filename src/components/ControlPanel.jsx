import { useState } from 'react';
import { X, Menu, Layers, Eye, Play, Shapes, Info } from 'lucide-react';
import { useStore } from '../store';
import ModeSwitcher from './ModeSwitcher';
import MatrixInput from './MatrixInput';
import PresetButtons from './PresetButtons';
import VisualizationToggles from './VisualizationToggles';
import AnimationControls from './AnimationControls';
import ModelSelector from './ModelSelector';
import MatrixInfo from './MatrixInfo';
import clsx from 'clsx';

const tabs = [
  { id: 'presets', icon: Layers, label: 'Presets', component: PresetButtons },
  { id: 'shapes', icon: Shapes, label: 'Shapes', component: ModelSelector },
  { id: 'viz', icon: Eye, label: 'View', component: VisualizationToggles },
  { id: 'animate', icon: Play, label: 'Animate', component: AnimationControls },
  { id: 'info', icon: Info, label: 'Info', component: MatrixInfo },
];

export default function ControlPanel() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeTab, setActiveTab } = useStore();

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || PresetButtons;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-96 control-panel border-l h-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Math Playground
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Explore transformations, functions & calculus
          </p>
        </div>

        {/* Mode Switcher */}
        <ModeSwitcher />

        {/* Always visible matrix input */}
        <div className="p-6 border-b border-gray-800 bg-gray-900/50">
          <MatrixInput />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2',
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <ActiveComponent />
        </div>
      </div>

      {/* Mobile: Bottom drawer */}
      <div className="lg:hidden">
        {/* Floating menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-primary hover:bg-primary/90
                   shadow-lg shadow-primary/50 text-white transition-all active:scale-95"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Drawer */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer content */}
            <div className="fixed bottom-0 left-0 right-0 z-40 control-panel border-t
                          max-h-[85vh] rounded-t-2xl overflow-hidden animate-slide-up">
              {/* Handle bar */}
              <div className="flex justify-center p-2">
                <div className="w-12 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-4 pb-3 border-b border-gray-800">
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Math Playground
                </h2>
              </div>

              {/* Mode Switcher */}
              <ModeSwitcher />

              {/* Always visible matrix input */}
              <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                <MatrixInput />
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-gray-800">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      'flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium transition-colors border-b-2 whitespace-nowrap',
                      activeTab === tab.id
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-gray-400'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-4 max-h-[calc(85vh-220px)]">
                <ActiveComponent />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
