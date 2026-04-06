import {
  PORTUGAL_MARKET_DATA,
  getPricePerSqm,
  getPropertyTaxRate,
  getUtilitiesCost
} from './portugal-market-data';
import { getMunicipality, type Municipality } from './portugal-complete-db';
import { getParishPrice, getMunicipalityParishes } from './parish-pricing-db';

// Regional fallback mapping for municipalities not in our database
const REGIONAL_FALLBACKS: Record<string, string[]> = {
  'Lisboa': ['Lisboa', 'Cascais', 'Oeiras', 'Sintra'],
  'Porto': ['Porto', 'Vila Nova de Gaia', 'Matosinhos'],
  'Algarve': ['Faro', 'Albufeira', 'Vilamoura', 'Loulé'],
  'Alentejo': ['Évora', 'Beja', 'Grândola'],
  'Coimbra': ['Coimbra', 'Figueira da Foz'],
  'Madeira': ['Funchal', 'Calheta'],
  'Azores': ['Ponta Delgada', 'Angra do Heroísmo'],
};

// Get regional average price per sqm for municipalities not in our database
function getRegionalAveragePrice(location: string): number {
  // First try to find the municipality directly
  const directPrice = PORTUGAL_MARKET_DATA.pricePerSqm[location];
  if (directPrice) return directPrice;

  // Try to find a regional fallback
  for (const municipalities of Object.values(REGIONAL_FALLBACKS)) {
    if (municipalities.some(muni => location.toLowerCase().includes(muni.toLowerCase()))) {
      const regionalPrices = municipalities
        .map(muni => PORTUGAL_MARKET_DATA.pricePerSqm[muni])
        .filter(price => price !== undefined);
      
      if (regionalPrices.length > 0) {
        return Math.round(regionalPrices.reduce((sum, price) => sum + price, 0) / regionalPrices.length);
      }
    }
  }

  // Final fallback to national average
  return PORTUGAL_MARKET_DATA.pricePerSqm['default'] || 2500;
}

// Get municipality region for display
function getMunicipalityRegion(location: string): string {
  // Check if it's a known municipality
  if (PORTUGAL_MARKET_DATA.pricePerSqm[location]) {
    // Find which region it belongs to
    for (const [region, municipalities] of Object.entries(REGIONAL_FALLBACKS)) {
      if (municipalities.includes(location)) {
        return region;
      }
    }
  }

  // Try regional matching
  for (const [region, municipalities] of Object.entries(REGIONAL_FALLBACKS)) {
    if (municipalities.some(muni => location.toLowerCase().includes(muni.toLowerCase()))) {
      return region;
    }
  }

  return 'Portugal';
}

function getMarketPricePerSqm(municipality: string, parish?: string): number {
  if (parish) {
    const parishPrice = getParishPrice(parish);
    if (parishPrice) return parishPrice;
  }

  const parishPrices = getMunicipalityParishes(municipality);
  if (Object.keys(parishPrices).length > 0) {
    const values = Object.values(parishPrices);
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }

  return 2111;
}

export interface PropertyAnalysis {
  // Input data
  offerPrice: number;
  estimatedSize: number;
  rehabCost: number;
  location: string;

  // Municipality data
  municipalityData: {
    municipality: Municipality | null;
    pricePerSqm: number;
    region: string;
    isExactMatch: boolean;
    tier: string;
    appreciationRate: number;
    rentalYield: number;
  };

  // Calculations
  arv: number;
  holdMonths: number;
  holdCost: number;
  closingCosts: number;
  grossProfit: number;
  capitalGainsTax: number;
  netProfit: number;
  roiPercent: number;

  // Breakdown
  propertyTax: number;
  utilities: number;
  financeCharges: number;
}

export function calculateAnalysis(
  offerPrice: number,
  estimatedSize: number,
  rehabCost: number,
  municipalityName: string,
  parishName?: string
): PropertyAnalysis {
  // Get municipality data from comprehensive database
  const municipality = getMunicipality(municipalityName);
  const isExactMatch = !!municipality;

  // Use parish price when available, otherwise municipality-average price
  const pricePerSqm = getMarketPricePerSqm(municipalityName, parishName);
  const region = municipality ? municipality.region : getMunicipalityRegion(municipalityName);
  const tier = municipality ? municipality.tier : 'TIER3';
  const appreciationRate = municipality ? municipality.appreciation_rate : 0.05;
  const rentalYield = municipality ? municipality.rental_yield : 0.06;

  // Step 1: Calculate ARV (After Repair Value) using real market data
  const arv = estimatedSize * pricePerSqm;

  // Step 2: Calculate Hold Costs using location-specific data
  const annualPropertyTax = offerPrice * getPropertyTaxRate(municipalityName);
  const propertyTax = (annualPropertyTax / 12) * PORTUGAL_MARKET_DATA.holdPeriod.months;

  const utilities = getUtilitiesCost(municipalityName) * PORTUGAL_MARKET_DATA.holdPeriod.months;

  const loanAmount = offerPrice * PORTUGAL_MARKET_DATA.financing.ltv;
  const annualFinanceCharges = loanAmount * PORTUGAL_MARKET_DATA.financing.hardMoneyRate;
  const financeCharges = (annualFinanceCharges / 12) * PORTUGAL_MARKET_DATA.holdPeriod.months;

  const holdCost = propertyTax + utilities + financeCharges;

  // Step 3: Calculate Closing Costs using Portuguese rates
  const closingCosts = offerPrice * PORTUGAL_MARKET_DATA.financing.closingCostsPct;

  // Step 4: Calculate All-in Cost
  const totalInvestment = offerPrice + rehabCost + holdCost + closingCosts;

  // Step 5: Calculate Gross Profit
  const grossProfit = arv - totalInvestment;

  // Step 6: Calculate Capital Gains Tax using Portuguese rates
  const capitalGainsTax = grossProfit * PORTUGAL_MARKET_DATA.taxes.capitalGainsTax;

  // Step 7: Calculate Net Profit
  const netProfit = grossProfit - capitalGainsTax;

  // Step 8: Calculate ROI
  const roiPercent = (netProfit / totalInvestment) * 100;

  return {
    offerPrice,
    estimatedSize,
    rehabCost,
    location: municipalityName,
    municipalityData: {
      municipality,
      pricePerSqm,
      region,
      isExactMatch,
      tier,
      appreciationRate,
      rentalYield,
    },
    arv: Math.round(arv),
    holdMonths: PORTUGAL_MARKET_DATA.holdPeriod.months,
    holdCost: Math.round(holdCost),
    closingCosts: Math.round(closingCosts),
    grossProfit: Math.round(grossProfit),
    capitalGainsTax: Math.round(capitalGainsTax),
    netProfit: Math.round(netProfit),
    roiPercent: parseFloat(roiPercent.toFixed(2)),
    propertyTax: Math.round(propertyTax),
    utilities: Math.round(utilities),
    financeCharges: Math.round(financeCharges),
  };
}

// Helper to format currency
export function formatCurrency(value: number): string {
  return `€${value.toLocaleString('pt-PT')}`;
}

// Export market data for use in other components
export { PORTUGAL_MARKET_DATA, getPricePerSqm, getPropertyTaxRate, getUtilitiesCost, getRegionalAveragePrice, getMunicipalityRegion };
export { getMunicipality, type Municipality } from './portugal-complete-db';