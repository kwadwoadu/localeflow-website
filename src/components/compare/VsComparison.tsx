import { Check, X, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Competitor } from '@/data/competitors';

interface VsComparisonProps {
  localeflow: Competitor;
  competitor: Competitor;
}

function FeatureRow({
  label,
  localeflowValue,
  competitorValue,
}: {
  label: string;
  localeflowValue: boolean | string | 'partial' | 'add-on';
  competitorValue: boolean | string | 'partial' | 'add-on';
}) {
  const renderValue = (value: boolean | string | 'partial' | 'add-on') => {
    if (value === true) {
      return (
        <span className="inline-flex items-center gap-1 text-green-600">
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">Yes</span>
        </span>
      );
    }
    if (value === false) {
      return (
        <span className="inline-flex items-center gap-1 text-red-500">
          <X className="w-5 h-5" />
          <span className="text-sm font-medium">No</span>
        </span>
      );
    }
    if (value === 'partial') {
      return (
        <span className="inline-flex items-center gap-1 text-yellow-600">
          <Minus className="w-5 h-5" />
          <span className="text-sm font-medium">Partial</span>
        </span>
      );
    }
    if (value === 'add-on') {
      return <span className="text-sm text-gray-500">Add-on ($)</span>;
    }
    return <span className="text-sm font-medium text-gray-700">{value}</span>;
  };

  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 px-4 text-gray-700 font-medium">{label}</td>
      <td className="py-4 px-4 text-center bg-primary-50/30">{renderValue(localeflowValue)}</td>
      <td className="py-4 px-4 text-center">{renderValue(competitorValue)}</td>
    </tr>
  );
}

export function VsComparison({ localeflow, competitor }: VsComparisonProps) {
  return (
    <div className="space-y-8">
      {/* Verdict Box */}
      <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-2xl p-6 border border-primary-100">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">Quick Verdict</h3>
        <p className="text-gray-700 leading-relaxed">{competitor.ourAngle}</p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700 w-1/3">Feature</th>
              <th className="text-center py-4 px-4 font-semibold text-primary-700 bg-primary-50 w-1/3">
                LocaleFlow
              </th>
              <th className="text-center py-4 px-4 font-semibold text-gray-700 w-1/3">{competitor.name}</th>
            </tr>
          </thead>
          <tbody>
            {/* Pricing */}
            <tr className="bg-gray-50/50">
              <td colSpan={3} className="py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Pricing
              </td>
            </tr>
            <FeatureRow label="Monthly Price" localeflowValue={localeflow.pricing.base} competitorValue={competitor.pricing.base} />
            <FeatureRow label="True Cost" localeflowValue={localeflow.pricing.trueCost} competitorValue={competitor.pricing.trueCost} />

            {/* Core Features */}
            <tr className="bg-gray-50/50">
              <td colSpan={3} className="py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Core Features
              </td>
            </tr>
            <FeatureRow label="Auto-Sync" localeflowValue={localeflow.features.autoSync} competitorValue={competitor.features.autoSync} />
            <FeatureRow label="AI Translation" localeflowValue={localeflow.features.aiTranslation} competitorValue={competitor.features.aiTranslation} />
            <FeatureRow label="Word Limit" localeflowValue={localeflow.features.wordLimit} competitorValue={competitor.features.wordLimit} />

            {/* Advanced Features */}
            <tr className="bg-gray-50/50">
              <td colSpan={3} className="py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Advanced Features
              </td>
            </tr>
            <FeatureRow label="Metaobjects" localeflowValue={localeflow.features.metaobjects} competitorValue={competitor.features.metaobjects} />
            <FeatureRow label="Metafields" localeflowValue={localeflow.features.metafields} competitorValue={competitor.features.metafields} />
            <FeatureRow label="Custom Prompts" localeflowValue={localeflow.features.customPrompts} competitorValue={competitor.features.customPrompts} />
            <FeatureRow label="Term Blacklist" localeflowValue={localeflow.features.termBlacklist} competitorValue={competitor.features.termBlacklist} />

            {/* Social Proof */}
            <tr className="bg-gray-50/50">
              <td colSpan={3} className="py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Social Proof
              </td>
            </tr>
            <FeatureRow
              label="Rating"
              localeflowValue={localeflow.rating ? `${localeflow.rating.toFixed(1)} stars` : 'N/A'}
              competitorValue={competitor.rating ? `${competitor.rating.toFixed(1)} stars` : 'N/A'}
            />
            <FeatureRow
              label="Reviews"
              localeflowValue={`${localeflow.reviews}+`}
              competitorValue={`${competitor.reviews.toLocaleString()}+`}
            />
          </tbody>
        </table>
      </div>

      {/* Who Should Choose */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
          <h4 className="font-display font-semibold text-gray-900 mb-3">Choose LocaleFlow if you...</h4>
          <ul className="space-y-2">
            {localeflow.strengths.slice(0, 4).map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                <Check className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-display font-semibold text-gray-900 mb-3">Choose {competitor.name} if you...</h4>
          <ul className="space-y-2">
            {competitor.strengths.slice(0, 4).map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="w-4 h-4 rounded-full bg-gray-300 mt-0.5 shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Button size="lg" asChild>
          <a href="https://apps.shopify.com/localeflow" target="_blank" rel="noopener noreferrer">
            Try LocaleFlow Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
        <p className="text-sm text-gray-500 mt-3">7-day free trial. No credit card required.</p>
      </div>
    </div>
  );
}
