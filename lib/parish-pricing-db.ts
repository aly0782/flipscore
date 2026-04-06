import { getMunicipality } from './portugal-complete-db';

export type ParishUrbanType = 'urban' | 'semi-urban' | 'rural';

export interface ParishPricingEntry {
  id: string;
  name: string;
  municipality: string;
  price: number;
  price_per_sqm: number;
  region: string;
  urban_type: ParishUrbanType;
}

export const PORTUGAL_PARISHES: Record<string, ParishPricingEntry> = {
  // Lisbon parishes
  'Santo António': {
    id: 'lisbon-santo-antonio',
    name: 'Santo António',
    municipality: 'Lisbon',
    price: 7289,
    price_per_sqm: 7289,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Chiado: {
    id: 'lisbon-chiado',
    name: 'Chiado',
    municipality: 'Lisbon',
    price: 7650,
    price_per_sqm: 7650,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Príncipe Real': {
    id: 'lisbon-principe-real',
    name: 'Príncipe Real',
    municipality: 'Lisbon',
    price: 7100,
    price_per_sqm: 7100,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Parque das Nações': {
    id: 'lisbon-parque-das-nacoes',
    name: 'Parque das Nações',
    municipality: 'Lisbon',
    price: 5840,
    price_per_sqm: 5840,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Campo de Ourique': {
    id: 'lisbon-campo-de-ourique',
    name: 'Campo de Ourique',
    municipality: 'Lisbon',
    price: 5528,
    price_per_sqm: 5528,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Estrela: {
    id: 'lisbon-estrela',
    name: 'Estrela',
    municipality: 'Lisbon',
    price: 5487,
    price_per_sqm: 5487,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Avenidas Novas': {
    id: 'lisbon-avenidas-novas',
    name: 'Avenidas Novas',
    municipality: 'Lisbon',
    price: 5200,
    price_per_sqm: 5200,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Misericórdia: {
    id: 'lisbon-misericordia',
    name: 'Misericórdia',
    municipality: 'Lisbon',
    price: 5340,
    price_per_sqm: 5340,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Arroios: {
    id: 'lisbon-arroios',
    name: 'Arroios',
    municipality: 'Lisbon',
    price: 4600,
    price_per_sqm: 4600,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Alcântara: {
    id: 'lisbon-alcantara',
    name: 'Alcântara',
    municipality: 'Lisbon',
    price: 4200,
    price_per_sqm: 4200,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Marvila: {
    id: 'lisbon-marvila',
    name: 'Marvila',
    municipality: 'Lisbon',
    price: 3500,
    price_per_sqm: 3500,
    region: 'Lisbon',
    urban_type: 'semi-urban',
  },
  Beato: {
    id: 'lisbon-beato',
    name: 'Beato',
    municipality: 'Lisbon',
    price: 4300,
    price_per_sqm: 4300,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Carnide: {
    id: 'lisbon-carnide',
    name: 'Carnide',
    municipality: 'Lisbon',
    price: 3900,
    price_per_sqm: 3900,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Penha de França': {
    id: 'lisbon-penha-de-franca',
    name: 'Penha de França',
    municipality: 'Lisbon',
    price: 3700,
    price_per_sqm: 3700,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Santa Clara': {
    id: 'lisbon-santa-clara',
    name: 'Santa Clara',
    municipality: 'Lisbon',
    price: 3800,
    price_per_sqm: 3800,
    region: 'Lisbon',
    urban_type: 'semi-urban',
  },
  Lumiar: {
    id: 'lisbon-lumiar',
    name: 'Lumiar',
    municipality: 'Lisbon',
    price: 3600,
    price_per_sqm: 3600,
    region: 'Lisbon',
    urban_type: 'semi-urban',
  },
  Graça: {
    id: 'lisbon-graca',
    name: 'Graça',
    municipality: 'Lisbon',
    price: 3550,
    price_per_sqm: 3550,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Olivais: {
    id: 'lisbon-olivais',
    name: 'Olivais',
    municipality: 'Lisbon',
    price: 3472,
    price_per_sqm: 3472,
    region: 'Lisbon',
    urban_type: 'semi-urban',
  },
  Alvalade: {
    id: 'lisbon-alvalade',
    name: 'Alvalade',
    municipality: 'Lisbon',
    price: 3650,
    price_per_sqm: 3650,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Belém: {
    id: 'lisbon-belem',
    name: 'Belém',
    municipality: 'Lisbon',
    price: 4100,
    price_per_sqm: 4100,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Ajuda: {
    id: 'lisbon-ajuda',
    name: 'Ajuda',
    municipality: 'Lisbon',
    price: 3800,
    price_per_sqm: 3800,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  'Santo Estêvão': {
    id: 'lisbon-santo-estevao',
    name: 'Santo Estêvão',
    municipality: 'Lisbon',
    price: 4050,
    price_per_sqm: 4050,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Pena: {
    id: 'lisbon-pena',
    name: 'Pena',
    municipality: 'Lisbon',
    price: 3500,
    price_per_sqm: 3500,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Madalena: {
    id: 'lisbon-madalena',
    name: 'Madalena',
    municipality: 'Lisbon',
    price: 3450,
    price_per_sqm: 3450,
    region: 'Lisbon',
    urban_type: 'urban',
  },

  // Porto parishes
  Cedofeita: {
    id: 'porto-cedofeita',
    name: 'Cedofeita',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  'Santo Ildefonso': {
    id: 'porto-santo-ildefonso',
    name: 'Santo Ildefonso',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  Sé: {
    id: 'porto-se',
    name: 'Sé',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  Miragaia: {
    id: 'porto-miragaia',
    name: 'Miragaia',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  'São Nicolau': {
    id: 'porto-sao-nicolau',
    name: 'São Nicolau',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  Vitória: {
    id: 'porto-vitoria',
    name: 'Vitória',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  Ribeira: {
    id: 'porto-ribeira',
    name: 'Ribeira',
    municipality: 'Porto',
    price: 5350,
    price_per_sqm: 5350,
    region: 'Porto',
    urban_type: 'urban',
  },
  Aldoar: {
    id: 'porto-aldoar',
    name: 'Aldoar',
    municipality: 'Porto',
    price: 4900,
    price_per_sqm: 4900,
    region: 'Porto',
    urban_type: 'urban',
  },
  'Foz do Douro': {
    id: 'porto-foz-do-douro',
    name: 'Foz do Douro',
    municipality: 'Porto',
    price: 4900,
    price_per_sqm: 4900,
    region: 'Porto',
    urban_type: 'urban',
  },
  Nevogilde: {
    id: 'porto-nevogilde',
    name: 'Nevogilde',
    municipality: 'Porto',
    price: 4900,
    price_per_sqm: 4900,
    region: 'Porto',
    urban_type: 'urban',
  },
  'Lordelo do Ouro': {
    id: 'porto-lordelo-do-ouro',
    name: 'Lordelo do Ouro',
    municipality: 'Porto',
    price: 4200,
    price_per_sqm: 4200,
    region: 'Porto',
    urban_type: 'urban',
  },
  Massarelos: {
    id: 'porto-massarelos',
    name: 'Massarelos',
    municipality: 'Porto',
    price: 4200,
    price_per_sqm: 4200,
    region: 'Porto',
    urban_type: 'urban',
  },
  Boavista: {
    id: 'porto-boavista',
    name: 'Boavista',
    municipality: 'Porto',
    price: 4100,
    price_per_sqm: 4100,
    region: 'Porto',
    urban_type: 'urban',
  },
  Bonfim: {
    id: 'porto-bonfim',
    name: 'Bonfim',
    municipality: 'Porto',
    price: 3800,
    price_per_sqm: 3800,
    region: 'Porto',
    urban_type: 'urban',
  },
  Paranhos: {
    id: 'porto-paranhos',
    name: 'Paranhos',
    municipality: 'Porto',
    price: 3500,
    price_per_sqm: 3500,
    region: 'Porto',
    urban_type: 'urban',
  },
  Ramalde: {
    id: 'porto-ramalde',
    name: 'Ramalde',
    municipality: 'Porto',
    price: 3300,
    price_per_sqm: 3300,
    region: 'Porto',
    urban_type: 'urban',
  },
  Campanhã: {
    id: 'porto-campanha',
    name: 'Campanhã',
    municipality: 'Porto',
    price: 3100,
    price_per_sqm: 3100,
    region: 'Porto',
    urban_type: 'urban',
  },

  // Cascais parishes
  Estoril: {
    id: 'cascais-estoril',
    name: 'Estoril',
    municipality: 'Cascais',
    price: 8559,
    price_per_sqm: 8559,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Cascais: {
    id: 'cascais-cascais',
    name: 'Cascais',
    municipality: 'Cascais',
    price: 4713,
    price_per_sqm: 4713,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Alcabideche: {
    id: 'cascais-alcabideche',
    name: 'Alcabideche',
    municipality: 'Cascais',
    price: 3400,
    price_per_sqm: 3400,
    region: 'Lisbon',
    urban_type: 'semi-urban',
  },
  Carcavelos: {
    id: 'cascais-carcavelos',
    name: 'Carcavelos',
    municipality: 'Cascais',
    price: 3800,
    price_per_sqm: 3800,
    region: 'Lisbon',
    urban_type: 'urban',
  },
  Parede: {
    id: 'cascais-parede',
    name: 'Parede',
    municipality: 'Cascais',
    price: 3500,
    price_per_sqm: 3500,
    region: 'Lisbon',
    urban_type: 'semi-urban',
  },

  // Braga
  'Braga (city)': {
    id: 'braga-city',
    name: 'Braga (city)',
    municipality: 'Braga',
    price: 1933,
    price_per_sqm: 1933,
    region: 'Norte',
    urban_type: 'urban',
  },
  'Braga (outskirts)': {
    id: 'braga-outskirts',
    name: 'Braga (outskirts)',
    municipality: 'Braga',
    price: 1500,
    price_per_sqm: 1500,
    region: 'Norte',
    urban_type: 'semi-urban',
  },

  // Coimbra
  'Coimbra (city)': {
    id: 'coimbra-city',
    name: 'Coimbra (city)',
    municipality: 'Coimbra',
    price: 1853,
    price_per_sqm: 1853,
    region: 'Centro',
    urban_type: 'urban',
  },
  'Coimbra (outskirts)': {
    id: 'coimbra-outskirts',
    name: 'Coimbra (outskirts)',
    municipality: 'Coimbra',
    price: 1400,
    price_per_sqm: 1400,
    region: 'Centro',
    urban_type: 'semi-urban',
  },

  // Funchal
  Funchal: {
    id: 'funchal-centro',
    name: 'Funchal',
    municipality: 'Funchal',
    price: 3355,
    price_per_sqm: 3355,
    region: 'Madeira',
    urban_type: 'urban',
  },

  // Vila Nova de Gaia
  'Vila Nova de Gaia (center)': {
    id: 'vila-nova-de-gaia-center',
    name: 'Vila Nova de Gaia (center)',
    municipality: 'Vila Nova de Gaia',
    price: 2900,
    price_per_sqm: 2900,
    region: 'Porto',
    urban_type: 'urban',
  },
  'Vila Nova de Gaia (outskirts)': {
    id: 'vila-nova-de-gaia-outskirts',
    name: 'Vila Nova de Gaia (outskirts)',
    municipality: 'Vila Nova de Gaia',
    price: 2200,
    price_per_sqm: 2200,
    region: 'Porto',
    urban_type: 'semi-urban',
  },

  // Alentejo
  'Estremoz (city center)': {
    id: 'estremoz-center',
    name: 'Estremoz (city center)',
    municipality: 'Estremoz',
    price: 1300,
    price_per_sqm: 1300,
    region: 'Alentejo',
    urban_type: 'urban',
  },
  'Estremoz (rural/outskirts)': {
    id: 'estremoz-rural',
    name: 'Estremoz (rural/outskirts)',
    municipality: 'Estremoz',
    price: 700,
    price_per_sqm: 700,
    region: 'Alentejo',
    urban_type: 'rural',
  },
  'Évora (center)': {
    id: 'evora-center',
    name: 'Évora (center)',
    municipality: 'Évora',
    price: 2172,
    price_per_sqm: 2172,
    region: 'Alentejo',
    urban_type: 'urban',
  },
  Portalegre: {
    id: 'portalegre',
    name: 'Portalegre',
    municipality: 'Portalegre',
    price: 813,
    price_per_sqm: 813,
    region: 'Alentejo',
    urban_type: 'semi-urban',
  },
  Beja: {
    id: 'beja',
    name: 'Beja',
    municipality: 'Beja',
    price: 925,
    price_per_sqm: 925,
    region: 'Alentejo',
    urban_type: 'semi-urban',
  },

  // North interior
  Bragança: {
    id: 'braganca',
    name: 'Bragança',
    municipality: 'Bragança',
    price: 966,
    price_per_sqm: 966,
    region: 'Norte',
    urban_type: 'semi-urban',
  },
  'Vila Real': {
    id: 'vila-real',
    name: 'Vila Real',
    municipality: 'Vila Real',
    price: 1284,
    price_per_sqm: 1284,
    region: 'Norte',
    urban_type: 'semi-urban',
  },
  Chaves: {
    id: 'chaves',
    name: 'Chaves',
    municipality: 'Chaves',
    price: 1100,
    price_per_sqm: 1100,
    region: 'Norte',
    urban_type: 'semi-urban',
  },
};

export function getParishPrice(parishName: string): number | null {
  const key = Object.keys(PORTUGAL_PARISHES).find(
    (k) => k.toLowerCase() === parishName.toLowerCase()
  );

  if (key) return PORTUGAL_PARISHES[key].price;
  return null;
}

export function getParishData(parishName: string): ParishPricingEntry | null {
  const key = Object.keys(PORTUGAL_PARISHES).find(
    (k) => k.toLowerCase() === parishName.toLowerCase()
  );

  return key ? PORTUGAL_PARISHES[key] : null;
}

export function resolveParishLocation(input: string): {
  municipality: string;
  parish?: string;
  display: string;
} {
  const cleanInput = input.trim();
  const segments = cleanInput
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => segment.replace(/[.]$/, '').trim());

  const candidates = [...segments].reverse();

  for (const candidate of candidates) {
    const parishData = getParishData(candidate);
    if (parishData) {
      const display = parishData.municipality === parishData.region
        ? parishData.municipality
        : `${parishData.municipality}, ${parishData.region}`;
      return {
        municipality: parishData.municipality,
        parish: parishData.name,
        display,
      };
    }
  }

  for (const candidate of candidates) {
    if (getMunicipality(candidate)) {
      return {
        municipality: candidate,
        display: candidate,
      };
    }
  }

  const fallback = segments[segments.length - 1] || cleanInput;
  return {
    municipality: fallback,
    display: fallback,
  };
}

export function getMunicipalityParishes(municipality: string): Record<string, number> {
  const result: Record<string, number> = {};
  Object.entries(PORTUGAL_PARISHES).forEach(([name, data]) => {
    if (data.municipality.toLowerCase() === municipality.toLowerCase()) {
      result[name] = data.price;
    }
  });
  return result;
}
