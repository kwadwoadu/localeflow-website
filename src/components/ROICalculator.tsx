import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  markets,
  scenarioMultipliers,
  calculateROI,
  formatCurrency,
  formatPercent,
  formatPaybackPeriod,
  type Scenario,
  LOCALEFLOW_MONTHLY_COST,
} from '@/lib/roi-calculations';

export function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(50000);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['germany', 'france', 'spain']);
  const [currentIntlTrafficPct, setCurrentIntlTrafficPct] = useState<number>(10);
  const [scenario, setScenario] = useState<Scenario>('moderate');
  const [showResults, setShowResults] = useState(false);
  const [showAllMarkets, setShowAllMarkets] = useState(false);

  const results = useMemo(() => {
    return calculateROI({
      monthlyRevenue,
      selectedMarkets,
      currentIntlTrafficPct,
      scenario,
    });
  }, [monthlyRevenue, selectedMarkets, currentIntlTrafficPct, scenario]);

  const toggleMarket = (marketId: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(marketId) ? prev.filter((id) => id !== marketId) : [...prev, marketId]
    );
  };

  const displayedMarkets = showAllMarkets ? markets : markets.slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Calculator Form */}
        <div className="p-8 space-y-8">
          {/* Monthly Revenue */}
          <div className="space-y-3">
            <Label htmlFor="revenue" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-500" />
              Monthly Revenue (USD)
            </Label>
            <Input
              id="revenue"
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value) || 0)}
              className="text-lg h-12"
              placeholder="50000"
            />
            <div className="flex gap-2">
              {[10000, 25000, 50000, 100000, 250000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setMonthlyRevenue(amount)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    monthlyRevenue === amount
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {formatCurrency(amount)}
                </button>
              ))}
            </div>
          </div>

          {/* Target Markets */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-500" />
              Target Markets
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {displayedMarkets.map((market) => (
                <button
                  key={market.id}
                  onClick={() => toggleMarket(market.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all ${
                    selectedMarkets.includes(market.id)
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                      : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:border-gray-200'
                  }`}
                >
                  <span className="text-xl">{market.flag}</span>
                  <span className="font-medium">{market.name}</span>
                </button>
              ))}
            </div>
            {markets.length > 6 && (
              <button
                onClick={() => setShowAllMarkets(!showAllMarkets)}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
              >
                {showAllMarkets ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show {markets.length - 6} more markets
                  </>
                )}
              </button>
            )}
          </div>

          {/* Current International Traffic */}
          <div className="space-y-3">
            <Label htmlFor="traffic" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Current International Traffic (%)
            </Label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="traffic"
                min="0"
                max="50"
                value={currentIntlTrafficPct}
                onChange={(e) => setCurrentIntlTrafficPct(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <span className="text-lg font-semibold text-gray-900 w-16 text-right">{currentIntlTrafficPct}%</span>
            </div>
            <p className="text-sm text-gray-500">How much of your current traffic comes from international visitors?</p>
          </div>

          {/* Scenario Toggle */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary-500" />
              Projection Scenario
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(scenarioMultipliers) as Scenario[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-4 py-3 rounded-xl text-center transition-all ${
                    scenario === s
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-semibold block">{scenarioMultipliers[s].label}</span>
                  <span className="text-xs opacity-75">{scenarioMultipliers[s].description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <Button size="lg" className="w-full" onClick={() => setShowResults(true)}>
            <Calculator className="w-5 h-5 mr-2" />
            Calculate My ROI
          </Button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="bg-gradient-to-b from-primary-50 to-orange-50 p-8 border-t border-primary-100">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 text-center">Your Projected Results</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Additional Revenue */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Additional Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(results.additionalMonthlyRevenue)}</p>
                <p className="text-sm text-gray-400 mt-1">{formatCurrency(results.additionalAnnualRevenue)}/year</p>
              </div>

              {/* Payback Period */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Payback Period</p>
                <p className="text-3xl font-bold text-blue-600">{formatPaybackPeriod(results.paybackMonths)}</p>
                <p className="text-sm text-gray-400 mt-1">at {formatCurrency(LOCALEFLOW_MONTHLY_COST)}/month</p>
              </div>

              {/* ROI */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Annual ROI</p>
                <p className="text-3xl font-bold text-primary-600">{formatPercent(Math.max(0, results.roiPercentage))}</p>
                <p className="text-sm text-gray-400 mt-1">return on investment</p>
              </div>
            </div>

            {/* Markets Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Selected Markets</h4>
              <div className="flex flex-wrap gap-2">
                {results.selectedMarketsData.map((market) => (
                  <span
                    key={market.id}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                  >
                    <span>{market.flag}</span>
                    <span>{market.name}</span>
                    <span className="text-primary-400">({market.revenuePotential}%)</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 text-center">
              * Projections based on industry benchmarks. Actual results may vary based on product type, market fit, and execution.
            </p>

            {/* CTA */}
            <div className="text-center mt-6">
              <Button size="lg" asChild>
                <a href="https://apps.shopify.com/localeflow" target="_blank" rel="noopener noreferrer">
                  Start Your Free Trial
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
