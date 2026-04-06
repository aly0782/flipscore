export interface Municipality {
  name: string;
  price_per_sqm: number;
  region: string;
  district: string;
  tier: 'TIER1_PRIME' | 'TIER1_PREMIUM' | 'TIER2' | 'TIER3' | 'TIER4_AFFORDABLE';
  appreciation_rate: number;
  rental_yield: number;
  population_tier: 'metro' | 'large' | 'medium' | 'small' | 'rural';
}

export const PORTUGAL_ALL_MUNICIPALITIES: Record<string, Municipality> = {
  'Lisbon': { name: 'Lisbon', price_per_sqm: 5900, region: 'Lisbon Metropolitan Area', district: 'Lisbon', tier: 'TIER1_PRIME', appreciation_rate: 0.08, rental_yield: 0.038, population_tier: 'metro' },
  'Cascais': { name: 'Cascais', price_per_sqm: 4713, region: 'Lisbon Metropolitan Area', district: 'Cascais', tier: 'TIER1_PRIME', appreciation_rate: 0.085, rental_yield: 0.04, population_tier: 'large' },
  'Oeiras': { name: 'Oeiras', price_per_sqm: 4361, region: 'Lisbon Metropolitan Area', district: 'Oeiras', tier: 'TIER1_PREMIUM', appreciation_rate: 0.075, rental_yield: 0.042, population_tier: 'large' },
  'Porto': { name: 'Porto', price_per_sqm: 3908, region: 'Porto Metropolitan Area', district: 'Porto', tier: 'TIER1_PREMIUM', appreciation_rate: 0.072, rental_yield: 0.045, population_tier: 'metro' },
  'Faro': { name: 'Faro', price_per_sqm: 2956, region: 'Algarve', district: 'Faro', tier: 'TIER2', appreciation_rate: 0.068, rental_yield: 0.058, population_tier: 'large' },
  'Aveiro': { name: 'Aveiro', price_per_sqm: 2516, region: 'Central', district: 'Aveiro', tier: 'TIER2', appreciation_rate: 0.062, rental_yield: 0.052, population_tier: 'medium' },
  'Setúbal': { name: 'Setúbal', price_per_sqm: 2358, region: 'Setúbal', district: 'Setúbal', tier: 'TIER2', appreciation_rate: 0.065, rental_yield: 0.051, population_tier: 'large' },
  'Évora': { name: 'Évora', price_per_sqm: 2172, region: 'Alentejo', district: 'Évora', tier: 'TIER2', appreciation_rate: 0.06, rental_yield: 0.065, population_tier: 'medium' },
  'Coimbra': { name: 'Coimbra', price_per_sqm: 1853, region: 'Central', district: 'Coimbra', tier: 'TIER2', appreciation_rate: 0.065, rental_yield: 0.068, population_tier: 'large' },
  'Braga': { name: 'Braga', price_per_sqm: 1933, region: 'North', district: 'Braga', tier: 'TIER2', appreciation_rate: 0.068, rental_yield: 0.065, population_tier: 'large' },
  'Leiria': { name: 'Leiria', price_per_sqm: 1547, region: 'Central', district: 'Leiria', tier: 'TIER3', appreciation_rate: 0.054, rental_yield: 0.072, population_tier: 'medium' },
  'Viseu': { name: 'Viseu', price_per_sqm: 1547, region: 'Central', district: 'Viseu', tier: 'TIER3', appreciation_rate: 0.054, rental_yield: 0.072, population_tier: 'small' },
  'Viana do Castelo': { name: 'Viana do Castelo', price_per_sqm: 1934, region: 'North Coast', district: 'Viana do Castelo', tier: 'TIER3', appreciation_rate: 0.055, rental_yield: 0.068, population_tier: 'medium' },
  'Santarém': { name: 'Santarém', price_per_sqm: 1220, region: 'Central East', district: 'Santarém', tier: 'TIER3', appreciation_rate: 0.048, rental_yield: 0.078, population_tier: 'medium' },
  'Guimarães': { name: 'Guimarães', price_per_sqm: 1650, region: 'North', district: 'Guimarães', tier: 'TIER3', appreciation_rate: 0.058, rental_yield: 0.07, population_tier: 'medium' },
  'Funchal': { name: 'Funchal', price_per_sqm: 3355, region: 'Madeira', district: 'Madeira', tier: 'TIER2', appreciation_rate: 0.065, rental_yield: 0.055, population_tier: 'medium' },
  'Ponta Delgada': { name: 'Ponta Delgada', price_per_sqm: 1823, region: 'Azores', district: 'Azores', tier: 'TIER2', appreciation_rate: 0.052, rental_yield: 0.065, population_tier: 'medium' },
  'Estremoz': { name: 'Estremoz', price_per_sqm: 700, region: 'Alentejo', district: 'Estremoz', tier: 'TIER4_AFFORDABLE', appreciation_rate: 0.035, rental_yield: 0.095, population_tier: 'small' },
  'Beja': { name: 'Beja', price_per_sqm: 925, region: 'Alentejo', district: 'Beja', tier: 'TIER4_AFFORDABLE', appreciation_rate: 0.038, rental_yield: 0.088, population_tier: 'small' },
  'Bragança': { name: 'Bragança', price_per_sqm: 966, region: 'North Interior', district: 'Bragança', tier: 'TIER4_AFFORDABLE', appreciation_rate: 0.038, rental_yield: 0.088, population_tier: 'small' },
  'Portalegre': { name: 'Portalegre', price_per_sqm: 813, region: 'Alentejo', district: 'Portalegre', tier: 'TIER4_AFFORDABLE', appreciation_rate: 0.036, rental_yield: 0.09, population_tier: 'small' },
};

export function getMunicipality(name: string): Municipality | null {
  if (!name) return null;
  const key = Object.keys(PORTUGAL_ALL_MUNICIPALITIES).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? PORTUGAL_ALL_MUNICIPALITIES[key] : null;
}