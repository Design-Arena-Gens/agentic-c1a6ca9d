"use client";

import { useState } from "react";
import {
  Target,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  DollarSign,
  Lightbulb,
  BarChart3,
  Send,
  Sparkles
} from "lucide-react";

interface GTMPlan {
  targetMarket: string;
  positioning: string;
  channels: string[];
  timeline: string;
  budget: string;
  keyMetrics: string[];
  contentStrategy: string;
  competitiveAdvantage: string;
}

export default function Home() {
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    targetAudience: "",
    problemSolved: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [gtmPlan, setGtmPlan] = useState<GTMPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'analysis' | 'execution'>('input');

  const generateGTMPlan = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-gtm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productInfo),
      });

      const data = await response.json();
      setGtmPlan(data.plan);
      setActiveTab('analysis');
    } catch (error) {
      console.error('Error generating GTM plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GTM AI Agent
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your AI-Powered Go-To-Market Partner
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'input'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Product Input</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'analysis'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            disabled={!gtmPlan}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>GTM Strategy</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('execution')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'execution'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            disabled={!gtmPlan}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Execution Plan</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'input' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Tell Us About Your Product
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Provide details about your AI agent product, and we'll create a comprehensive go-to-market strategy.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productInfo.name}
                    onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., AI Sales Assistant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Description
                  </label>
                  <textarea
                    value={productInfo.description}
                    onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what your AI agent does, its key features, and capabilities..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={productInfo.targetAudience}
                    onChange={(e) => setProductInfo({ ...productInfo, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., B2B SaaS companies, Enterprise sales teams"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Problem Solved
                  </label>
                  <textarea
                    value={productInfo.problemSolved}
                    onChange={(e) => setProductInfo({ ...productInfo, problemSolved: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What specific pain points does your AI agent solve?"
                  />
                </div>

                <button
                  onClick={generateGTMPlan}
                  disabled={isGenerating || !productInfo.name || !productInfo.description}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating GTM Strategy...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Generate GTM Strategy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && gtmPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Target Market</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{gtmPlan.targetMarket}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Positioning</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{gtmPlan.positioning}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Marketing Channels</h3>
              </div>
              <ul className="space-y-2">
                {gtmPlan.channels.map((channel, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>{channel}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Metrics</h3>
              </div>
              <ul className="space-y-2">
                {gtmPlan.keyMetrics.map((metric, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Content Strategy</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{gtmPlan.contentStrategy}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Budget Allocation</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{gtmPlan.budget}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Competitive Advantage</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{gtmPlan.competitiveAdvantage}</p>
            </div>
          </div>
        )}

        {activeTab === 'execution' && gtmPlan && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Execution Timeline</h2>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recommended Timeline</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{gtmPlan.timeline}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Implementation Phases</h3>

                  <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phase 1: Foundation (Weeks 1-2)</h4>
                    <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Set up analytics and tracking infrastructure</li>
                      <li>• Finalize brand messaging and positioning</li>
                      <li>• Create core content assets (website, pitch deck)</li>
                      <li>• Establish social media presence</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phase 2: Launch (Weeks 3-4)</h4>
                    <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Execute content marketing campaigns</li>
                      <li>• Begin outreach to target accounts</li>
                      <li>• Launch paid advertising campaigns</li>
                      <li>• Host webinar or product demo</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phase 3: Scale (Weeks 5-8)</h4>
                    <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Optimize channels based on performance data</li>
                      <li>• Scale successful campaigns</li>
                      <li>• Develop case studies and testimonials</li>
                      <li>• Expand partnership and integration opportunities</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phase 4: Optimize (Ongoing)</h4>
                    <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Regular performance reviews and adjustments</li>
                      <li>• A/B testing messaging and creative</li>
                      <li>• Customer feedback integration</li>
                      <li>• Market expansion planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
