import { Check, X, Minus } from 'lucide-react';
import type { Competitor } from '@/data/competitors';

interface ComparisonTableProps {
  competitors: Competitor[];
  localeflow: Competitor;
}

function FeatureCell({ value }: { value: boolean | string | 'partial' | 'add-on' }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
        <Check className="w-4 h-4" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500">
        <X className="w-4 h-4" />
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600">
        <Minus className="w-4 h-4" />
      </span>
    );
  }
  if (value === 'add-on') {
    return <span className="text-sm text-gray-500">Add-on</span>;
  }
  return <span className="text-sm text-gray-700">{value}</span>;
}

export function ComparisonTable({ competitors, localeflow }: ComparisonTableProps) {
  const allApps = [localeflow, ...competitors];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10 min-w-[160px]">
              Feature
            </th>
            {allApps.map((app, idx) => (
              <th
                key={app.id}
                className={`text-center py-4 px-4 font-semibold min-w-[140px] ${
                  idx === 0 ? 'bg-primary-50 text-primary-700' : 'bg-gray-50 text-gray-700'
                }`}
              >
                <span>{app.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Pricing Section */}
          <tr className="bg-gray-50">
            <td colSpan={allApps.length + 1} className="py-3 px-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
              Pricing
            </td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Base Price</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <span className="font-medium text-gray-900">{app.pricing.base}</span>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">True Cost</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <span className="text-sm text-gray-600">{app.pricing.trueCost}</span>
              </td>
            ))}
          </tr>

          {/* Features Section */}
          <tr className="bg-gray-50">
            <td colSpan={allApps.length + 1} className="py-3 px-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
              Features
            </td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Auto-Sync</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <FeatureCell value={app.features.autoSync} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">AI Translation</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <FeatureCell value={app.features.aiTranslation} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Word Limit</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <span className="text-sm text-gray-700">{app.features.wordLimit}</span>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Metaobjects</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <FeatureCell value={app.features.metaobjects} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Metafields</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <FeatureCell value={app.features.metafields} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Custom Prompts</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <FeatureCell value={app.features.customPrompts} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-4 text-gray-700 sticky left-0 bg-white">Term Blacklist</td>
            {allApps.map((app, idx) => (
              <td key={app.id} className={`text-center py-3 px-4 ${idx === 0 ? 'bg-primary-50/50' : ''}`}>
                <FeatureCell value={app.features.termBlacklist} />
              </td>
            ))}
          </tr>

        </tbody>
      </table>
    </div>
  );
}
