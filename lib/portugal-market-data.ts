// Portuguese Real Estate Market Data - 2024 Q4
// Based on Idealista, Confidencial Imobiliário, and INE data

export interface MarketData {
  // Price per square meter by municipality/district
  pricePerSqm: Record<string, number>;

  // Average property tax rates by region (IMI - Imposto Municipal sobre Imóveis)
  propertyTaxRates: Record<string, number>;

  // Average utilities costs by region (€/month)
  utilitiesCosts: Record<string, number>;

  // Rehab costs per m² by property type and condition
  rehabCosts: {
    basic: number;    // €/m² - cosmetic updates
    standard: number; // €/m² - full renovation
    luxury: number;   // €/m² - high-end renovation
  };

  // Financing assumptions
  financing: {
    hardMoneyRate: number; // Annual interest rate
    ltv: number;           // Loan-to-value ratio
    closingCostsPct: number; // % of purchase price
  };

  // Tax rates
  taxes: {
    capitalGainsTax: number; // Effective rate including solidarity surcharge
    stampDuty: number;       // IMT - Imposto Municipal sobre Transmissões
  };

  // Hold period assumptions
  holdPeriod: {
    months: number;
    averageMarketingTime: number; // Months to sell
  };
}

// Lisbon Metropolitan Area
const LISBON_DATA = {
  'Lisboa': 4200,      // Lisbon city center
  'Cascais': 3800,     // Coastal luxury area
  'Oeiras': 3200,      // Business district
  'Sintra': 2800,      // Mountain views
  'Amadora': 2400,     // Suburban
  'Loures': 2200,      // Industrial area
  'Odivelas': 2100,    // Residential
  'Vila Franca de Xira': 1900, // Rural-urban mix
  'Alcochete': 1800,   // Commuter town
  'Setúbal': 2000,     // Coastal city
  'Sesimbra': 2500,    // Beach area
  'Grândola': 1600,    // Rural
  'Alcácer do Sal': 1500, // Rural
  'Sines': 1400,
};

// Porto Metropolitan Area
const PORTO_DATA = {
  'Porto': 2800,       // Porto city center
  'Vila Nova de Gaia': 2400, // Across the river
  'Matosinhos': 2600,  // Coastal
  'Gondomar': 2000,    // Industrial
  'Maia': 2200,        // Residential
  'Leixões': 1800,     // Port area
  'Póvoa de Varzim': 2500, // Beach town
  'Vila do Conde': 2200, // Coastal
  'Trofa': 1900,       // Suburban
  'Santo Tirso': 1700, // Rural-urban
  'Felgueiras': 1500,  // Rural
  'Amarante': 1600,    // Wine region
  'Marco de Canaveses': 1400, // Rural
  'Cinfães': 1300,     // Rural
  'Castelo de Paiva': 1350, // Rural
};

// Algarve Region
const ALGARVE_DATA = {
  'Faro': 2200,        // Faro district capital
  'Albufeira': 2800,   // Tourist hotspot
  'Vilamoura': 3200,   // Luxury resort
  'Quarteira': 2600,   // Golf area
  'Loulé': 2400,       // Market town
  'Tavira': 2500,      // Historic town
  'Lagoa': 2300,       // Coastal
  'Silves': 2000,      // Historic capital
  'Portimão': 2400,    // Fishing town
  'Monchique': 1800,   // Mountain area

  'São Brás de Alportel': 1900, // Rural
  'Vila Real de Santo António': 2100, // Border town
};

// Coimbra Region
const COIMBRA_DATA = {
  'Coimbra': 1800,     // University city
  'Figueira da Foz': 2000, // Beach town
  'Cantanhede': 1600,  // Rural
  'Montemor-o-Velho': 1500, // Rural
  'Penacova': 1400,    // Rural
  'Vila Nova de Poiares': 1300, // Rural
  'Lousã': 1600,       // Mountain village
  'Góis': 1400,        // Rural
  'Pampilhosa da Serra': 1200, // Rural
  'Pedrógão Grande': 1300, // Rural
};

// Alentejo Region (Interior towns and cities)
const ALENTEJO_DATA = {
  'Évora': 2172,       // Regional capital, university city
  'Estremoz': 600,     // Interior town, conservative pricing
  'São Lourenço de Mamporção': 600, // Small interior town
  'Vila Viçosa': 800,  // Historic town
  'Borba': 700,        // Wine region
  'Redondo': 650,      // Rural
  'Monsaraz': 1200,    // Tourism area
  'Viana do Alentejo': 750, // Rural
  'Alvito': 700,       // Rural
  'Cuba': 650,         // Rural
  'Moura': 800,        // Rural
  'Barrancos': 600,    // Border town
  'Beja': 1100,        // District capital
  'Serra do Cercal': 700, // Rural
  'Vidigueira': 750,   // Rural
  'Almodôvar': 800,    // Rural
  'Ourique': 850,      // Rural
  'Castro Verde': 700, // Rural
};

// Madeira Autonomous Region
const MADEIRA_DATA = {
  'Funchal': 2200,     // Capital city
  'Calheta': 2000,     // Coastal
  'Ponta do Sol': 2100, // Sunny south
  'Ribeira Brava': 1900, // North coast
  'Santa Cruz': 2000,  // East coast
  'Machico': 1900,     // East coast
  'Santana': 1800,     // Laurel forest
  'Porto Moniz': 1700, // North coast
};

// Azores Autonomous Region
const AZORES_DATA = {
  'Ponta Delgada': 1800, // São Miguel capital
  'Angra do Heroísmo': 1700, // Terceira capital
  'Horta': 1600,       // Faial capital
  'Praia da Vitória': 1650, // Terceira
  'Ribeira Grande': 1550, // São Miguel
  'Lagoa': 1600,       // São Miguel
  'Vila Franca do Campo': 1500, // São Miguel
  'Nordeste': 1400,    // São Miguel
  'Vila do Porto': 1450, // Santa Maria
  'Velas': 1500,       // São Jorge
};

// Property tax rates by municipality (IMI rates vary by location)
const PROPERTY_TAX_RATES: Record<string, number> = {
  // Lisbon area - higher rates
  'Lisboa': 0.0045,
  'Cascais': 0.0042,
  'Oeiras': 0.0043,
  'Sintra': 0.0040,
  'Amadora': 0.0041,

  // Porto area
  'Porto': 0.0042,
  'Vila Nova de Gaia': 0.0040,
  'Matosinhos': 0.0041,

  // Algarve - tourist areas have higher rates
  'Albufeira': 0.0045,
  'Vilamoura': 0.0048,
  'Faro': 0.0042,

  // Alentejo - generally lower rates
  'Évora': 0.0038,
  'Beja': 0.0036,
  'Estremoz': 0.0035,
  'São Lourenço de Mamporção': 0.0035,

  // Default for other areas
  'default': 0.0035, // National average is around 0.35%
};

// Utilities costs by region (€/month for average property)
const UTILITIES_COSTS: Record<string, number> = {
  // Lisbon metropolitan area - higher costs
  'Lisboa': 180,
  'Cascais': 200,
  'Oeiras': 175,
  'Sintra': 160,
  'Amadora': 155,

  // Porto area
  'Porto': 150,
  'Vila Nova de Gaia': 145,
  'Matosinhos': 155,

  // Algarve - higher in tourist areas
  'Albufeira': 190,
  'Vilamoura': 220,
  'Faro': 170,

  // Madeira - island costs
  'Funchal': 165,

  // Alentejo - lower costs in rural areas
  'Évora': 135,
  'Beja': 130,
  'Estremoz': 125,
  'São Lourenço de Mamporção': 125,

  // Default
  'default': 140,
};

// Main market data export
export const PORTUGAL_MARKET_DATA: MarketData = {
  pricePerSqm: {
    ...LISBON_DATA,
    ...PORTO_DATA,
    ...ALGARVE_DATA,
    ...COIMBRA_DATA,
    ...ALENTEJO_DATA,
    ...MADEIRA_DATA,
    ...AZORES_DATA,
  },

  propertyTaxRates: PROPERTY_TAX_RATES,

  utilitiesCosts: UTILITIES_COSTS,

  rehabCosts: {
    basic: 200,     // €/m² - painting, flooring, basic updates
    standard: 400,  // €/m² - kitchen, bathrooms, electrical
    luxury: 800,    // €/m² - high-end finishes, structural work
  },

  financing: {
    hardMoneyRate: 0.055, // 5.5% annual (slightly lower than generic 6%)
    ltv: 0.75,            // 75% LTV (more conservative than generic 80%)
    closingCostsPct: 0.025, // 2.5% (includes notary, registration, etc.)
  },

  taxes: {
    capitalGainsTax: 0.28, // 28% effective rate (includes solidarity surcharge)
    stampDuty: 0.08,       // 8% IMT for investment properties
  },

  holdPeriod: {
    months: 8,             // 8 months (6 months rehab + 2 months marketing)
    averageMarketingTime: 2, // Months to sell after completion
  },
};

// Helper functions
export function getPricePerSqm(location: string): number {
  return PORTUGAL_MARKET_DATA.pricePerSqm[location] ||
         PORTUGAL_MARKET_DATA.pricePerSqm['default'] ||
         2500; // Fallback
}

export function getPropertyTaxRate(location: string): number {
  return PORTUGAL_MARKET_DATA.propertyTaxRates[location] ||
         PORTUGAL_MARKET_DATA.propertyTaxRates['default'];
}

export function getUtilitiesCost(location: string): number {
  return PORTUGAL_MARKET_DATA.utilitiesCosts[location] ||
         PORTUGAL_MARKET_DATA.utilitiesCosts['default'];
}

export function getRehabCostByType(type: 'basic' | 'standard' | 'luxury' = 'standard'): number {
  return PORTUGAL_MARKET_DATA.rehabCosts[type];
}

// Market trend data (for future expansion)
export const MARKET_TRENDS = {
  annualGrowth: 0.03,      // 3% annual price growth
  rentalYield: 0.045,      // 4.5% gross rental yield
  vacancyRate: 0.08,       // 8% average vacancy
  transactionCosts: 0.10,  // 10% total transaction costs
};