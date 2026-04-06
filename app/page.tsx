'use client';

import { useState, useEffect } from 'react';
import { calculateAnalysis, formatCurrency, type PropertyAnalysis } from '@/lib/calculations';
import { getMunicipality, PORTUGAL_ALL_MUNICIPALITIES } from '@/lib/portugal-complete-db';
import { getParishData, getParishPrice } from '@/lib/parish-pricing-db';

interface PropertyData {
  idealista_id: string;
  title: string;
  price: number | null;
  size: number | null;
  year_built: number | null;
  address: string;
  location: string;
  municipality?: string;
  parish?: string;
  photos: string[];
  url: string;
  error?: string;
}

// Premium design system
const COLORS = {
  primary: '#07101F',
  accent: '#C9A84C',
  success: '#16A34A',
  danger: '#DC2626',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#07101F',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};

const TYPOGRAPHY = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

const SPACING = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

const COMPONENT_STYLES = {
  card: {
    backgroundColor: COLORS.card,
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: `1px solid ${COLORS.border}`,
  },
  button: {
    borderRadius: '8px',
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    transition: 'all 0.2s ease-in-out',
  },
  input: {
    borderRadius: '8px',
    border: `1px solid ${COLORS.border}`,
    fontSize: TYPOGRAPHY.fontSize.base,
    padding: SPACING.sm,
    transition: 'border-color 0.2s ease-in-out',
  },
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [error, setError] = useState('');

  // Analysis inputs
  const [offerPrice, setOfferPrice] = useState('');
  const [estimatedSize, setEstimatedSize] = useState('');
  const [rehabCost, setRehabCost] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [municipalitySearch, setMunicipalitySearch] = useState('');
  const [showMunicipalityDropdown, setShowMunicipalityDropdown] = useState(false);
  const [analysis, setAnalysis] = useState<PropertyAnalysis | null>(null);
  const [analysisLocation, setAnalysisLocation] = useState('');
  const [analysisParish, setAnalysisParish] = useState<string | undefined>(undefined);

  // Auto-fill size when property is scraped
  useEffect(() => {
    if (property?.size) {
      setEstimatedSize(property.size.toString());
    }
  }, [property]);

  const handleScrape = async () => {
    setLoading(true);
    setError('');
    setProperty(null);
    setAnalysis(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setProperty(data);
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateSize = (size: string): boolean => {
    const numSize = parseFloat(size);
    return !isNaN(numSize) && numSize >= 1 && numSize <= 10000;
  };

  const handleAnalyze = () => {
    if (!property || !offerPrice || !estimatedSize || !rehabCost) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateSize(estimatedSize)) {
      setError('Property size must be between 1 and 10,000 m²');
      return;
    }

    const size = parseFloat(estimatedSize);
    const locationInput =
      selectedMunicipality || property.municipality || property.location;
    const parsedLocation = parseLocationInput(locationInput);

    setAnalysisLocation(parsedLocation.display);
    setAnalysisParish(parsedLocation.parish);

    const result = calculateAnalysis(
      parseInt(offerPrice),
      size,
      parseInt(rehabCost),
      parsedLocation.municipality,
      parsedLocation.parish
    );

    setAnalysis(result);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScrape();
    }
  };

  function getPriceTierColor(price: number): string {
    if (price >= 5000) return COLORS.danger;
    if (price >= 2500) return '#F59E0B';
    return COLORS.success;
  }

  function parseLocationInput(input: string): { municipality: string; parish?: string; display: string } {
    const clean = input.trim();
    if (!clean) {
      return { municipality: '', display: '' };
    }

    const candidates = clean
      .split(',')
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => segment.replace(/[.]$/, '').trim());

    const reversedCandidates = [...candidates].reverse();

    for (const candidate of reversedCandidates) {
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

    for (const candidate of reversedCandidates) {
      if (getMunicipality(candidate)) {
        return { municipality: candidate, display: candidate };
      }
    }

    const fallback = candidates[candidates.length - 1] || clean;
    return { municipality: fallback, display: fallback };
  }

  // Filter municipalities for dropdown
  const filteredMunicipalities = Object.values(PORTUGAL_ALL_MUNICIPALITIES)
    .filter(muni =>
      muni.name.toLowerCase().includes(municipalitySearch.toLowerCase())
    )
    .slice(0, 10); // Limit to 10 results

  const selectedMuniData = selectedMunicipality ? getMunicipality(selectedMunicipality) : null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.background,
      fontFamily: TYPOGRAPHY.fontFamily,
      color: COLORS.text,
      padding: SPACING.lg,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          color: COLORS.primary,
          marginBottom: SPACING.xs,
          fontSize: TYPOGRAPHY.fontSize['3xl'],
          fontWeight: TYPOGRAPHY.fontWeight.bold,
        }}>
          🔍 FlipScore
        </h1>
        <p style={{
          color: COLORS.textSecondary,
          marginBottom: SPACING['2xl'],
          fontSize: TYPOGRAPHY.fontSize.lg,
        }}>
          Idealista Property Investment Analyzer
        </p>

        {/* SCRAPER SECTION */}
        <div style={{
          ...COMPONENT_STYLES.card,
          padding: SPACING.xl,
          marginBottom: SPACING.xl,
        }}>
          <h2 style={{
            margin: `0 0 ${SPACING.md} 0`,
            color: COLORS.primary,
            fontSize: TYPOGRAPHY.fontSize.xl,
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
          }}>
            Step 1: Scrape Property
          </h2>
          <label style={{
            display: 'block',
            marginBottom: SPACING.xs,
            color: COLORS.primary,
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
            fontSize: TYPOGRAPHY.fontSize.sm,
          }}>
            Paste Idealista URL:
          </label>
          <input
            type="text"
            placeholder="e.g., https://www.idealista.pt/imovel/34512638/"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            style={{
              ...COMPONENT_STYLES.input,
              width: '100%',
              marginBottom: SPACING.sm,
              fontSize: TYPOGRAPHY.fontSize.base,
            }}
          />
          <button
            onClick={handleScrape}
            disabled={loading || !url}
            style={{
              ...COMPONENT_STYLES.button,
              padding: `${SPACING.sm} ${SPACING.lg}`,
              background: loading ? '#ccc' : COLORS.accent,
              color: COLORS.primary,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: TYPOGRAPHY.fontSize.sm,
            }}
          >
            {loading ? '⏳ Scraping...' : '✓ Scrape Property'}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div style={{
            padding: SPACING.md,
            background: '#fef2f2',
            border: `1px solid ${COLORS.danger}`,
            borderRadius: '8px',
            color: COLORS.danger,
            marginBottom: SPACING.xl,
            fontSize: TYPOGRAPHY.fontSize.sm,
          }}>
            ❌ {error}
          </div>
        )}

        {/* ANALYSIS INPUTS */}
        {property && !property.error && (
          <div style={{
            ...COMPONENT_STYLES.card,
            padding: SPACING.xl,
            marginBottom: SPACING.xl,
          }}>
            <h2 style={{
              margin: `0 0 ${SPACING.md} 0`,
              color: COLORS.primary,
              fontSize: TYPOGRAPHY.fontSize.xl,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
            }}>
              Step 2: Enter Your Numbers
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: SPACING.md,
              marginBottom: SPACING.lg,
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: SPACING.xs,
                  color: COLORS.textSecondary,
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  textTransform: 'uppercase',
                }}>
                  Your Offer Price (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 185000"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  style={{
                    ...COMPONENT_STYLES.input,
                    width: '100%',
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: SPACING.xs,
                  color: COLORS.textSecondary,
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  textTransform: 'uppercase',
                }}>
                  Property Size (m²)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 85"
                  value={estimatedSize}
                  onChange={(e) => setEstimatedSize(e.target.value)}
                  min="1"
                  max="10000"
                  style={{
                    ...COMPONENT_STYLES.input,
                    width: '100%',
                  }}
                />
                <p style={{
                  margin: `${SPACING.xs} 0 0 0`,
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  color: COLORS.textSecondary,
                }}>
                  Auto-filled from scraper • 1-10,000 m²
                </p>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: SPACING.xs,
                  color: COLORS.textSecondary,
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  textTransform: 'uppercase',
                }}>
                  Estimated Rehab Cost (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 45000"
                  value={rehabCost}
                  onChange={(e) => setRehabCost(e.target.value)}
                  style={{
                    ...COMPONENT_STYLES.input,
                    width: '100%',
                  }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: SPACING.xs,
                  color: COLORS.textSecondary,
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  textTransform: 'uppercase',
                }}>
                  Municipality
                </label>
                <input
                  type="text"
                  placeholder="Search municipalities..."
                  value={municipalitySearch}
                  onChange={(e) => {
                    setMunicipalitySearch(e.target.value);
                    setShowMunicipalityDropdown(true);
                  }}
                  onFocus={() => setShowMunicipalityDropdown(true)}
                  style={{
                    ...COMPONENT_STYLES.input,
                    width: '100%',
                  }}
                />
                {showMunicipalityDropdown && municipalitySearch && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}>
                    {filteredMunicipalities.map((muni) => (
                      <div
                        key={muni.name}
                        onClick={() => {
                          setSelectedMunicipality(muni.name);
                          setMunicipalitySearch(muni.name);
                          setShowMunicipalityDropdown(false);
                        }}
                        style={{
                          padding: SPACING.sm,
                          cursor: 'pointer',
                          borderBottom: `1px solid ${COLORS.border}`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = COLORS.background;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div style={{
                          fontWeight: TYPOGRAPHY.fontWeight.semibold,
                          color: COLORS.primary,
                        }}>
                          {muni.name}
                        </div>
                        <div style={{
                          fontSize: TYPOGRAPHY.fontSize.sm,
                          color: COLORS.textSecondary,
                        }}>
                          €{muni.price_per_sqm.toLocaleString('pt-PT')}/m² • {muni.region}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {selectedMuniData && (
                  <div style={{
                    marginTop: SPACING.xs,
                    padding: SPACING.xs,
                    backgroundColor: COLORS.background,
                    borderRadius: '6px',
                    fontSize: TYPOGRAPHY.fontSize.sm,
                    color: COLORS.textSecondary,
                  }}>
                    📍 {selectedMuniData.name} • {selectedMuniData.region}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!offerPrice || !estimatedSize || !rehabCost}
              style={{
                ...COMPONENT_STYLES.button,
                padding: `${SPACING.sm} ${SPACING.xl}`,
                background: (!offerPrice || !estimatedSize || !rehabCost) ? '#ccc' : COLORS.primary,
                color: '#fff',
                border: 'none',
                cursor: (!offerPrice || !estimatedSize || !rehabCost) ? 'not-allowed' : 'pointer',
                fontSize: TYPOGRAPHY.fontSize.base,
              }}
            >
              📊 Calculate FlipScore
            </button>
          </div>
        )}

        {/* ANALYSIS RESULTS */}
        {analysis && (
          <div style={{
            ...COMPONENT_STYLES.card,
            padding: SPACING.xl,
            animation: 'fadeIn 0.5s ease-in-out',
          }}>
            <h2 style={{
              margin: `0 0 ${SPACING.sm} 0`,
              color: COLORS.primary,
              fontSize: TYPOGRAPHY.fontSize['2xl'],
              fontWeight: TYPOGRAPHY.fontWeight.bold,
            }}>
              {property?.title}
            </h2>

            <div style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              padding: SPACING.lg,
              marginBottom: SPACING['2xl'],
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.fontSize.sm,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: COLORS.textSecondary,
                marginBottom: SPACING.xs,
              }}>
                LOCATION
              </div>
              <div style={{
                fontSize: TYPOGRAPHY.fontSize['2xl'],
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.primary,
              }}>
                {analysisLocation}
              </div>
              <div style={{
                marginTop: SPACING.sm,
                fontSize: TYPOGRAPHY.fontSize.sm,
                color: COLORS.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                MARKET PRICE
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: SPACING.xs,
                marginTop: SPACING.xs,
                fontSize: TYPOGRAPHY.fontSize['3xl'],
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                color: getPriceTierColor(analysis?.municipalityData.pricePerSqm ?? 0),
              }}>
                {analysis ? formatCurrency(analysis.municipalityData.pricePerSqm) : '€0'}/m²
              </div>
              <div style={{
                marginTop: SPACING.xs,
                fontSize: TYPOGRAPHY.fontSize.sm,
                color: COLORS.textSecondary,
              }}>
                Updated: Q4 2025
              </div>
            </div>

            {/* PREMIUM RESULTS CARDS - 2x2 GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: SPACING.lg,
              marginBottom: SPACING['2xl'],
            }}>
              {/* NET PROFIT - GOLD NAVY */}
              <div style={{
                backgroundColor: COLORS.primary,
                color: 'white',
                padding: SPACING.xl,
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  opacity: 0.8,
                  marginBottom: SPACING.xs,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  NET PROFIT
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize['4xl'],
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.accent,
                  fontFamily: 'monospace',
                  lineHeight: '1',
                }}>
                  {formatCurrency(analysis.netProfit)}
                </div>
              </div>

              {/* ROI - GREEN OR RED */}
              <div style={{
                backgroundColor: analysis.roiPercent >= 0 ? COLORS.success : COLORS.danger,
                color: 'white',
                padding: SPACING.xl,
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  opacity: 0.8,
                  marginBottom: SPACING.xs,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  ROI %
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize['4xl'],
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  fontFamily: 'monospace',
                  lineHeight: '1',
                }}>
                  {analysis.roiPercent.toFixed(1)}%
                </div>
              </div>

              {/* ARV - BLUE */}
              <div style={{
                backgroundColor: '#1976D2',
                color: 'white',
                padding: SPACING.xl,
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  opacity: 0.8,
                  marginBottom: SPACING.xs,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  ARV
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize['4xl'],
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  fontFamily: 'monospace',
                  lineHeight: '1',
                }}>
                  {formatCurrency(analysis.arv)}
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  opacity: 0.8,
                  marginTop: SPACING.xs,
                }}>
                  Estimated Sell Price
                </div>
              </div>

              {/* TOTAL COST - GRAY */}
              <div style={{
                backgroundColor: '#6B7280',
                color: 'white',
                padding: SPACING.xl,
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.sm,
                  opacity: 0.8,
                  marginBottom: SPACING.xs,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  TOTAL COST
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize['4xl'],
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  fontFamily: 'monospace',
                  lineHeight: '1',
                }}>
                  {formatCurrency(analysis.offerPrice + analysis.rehabCost + analysis.holdCost + analysis.closingCosts)}
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  opacity: 0.8,
                  marginTop: SPACING.xs,
                }}>
                  All-in Investment
                </div>
              </div>
            </div>

            {/* COST BREAKDOWN TABLE */}
            <div style={{ marginBottom: SPACING.xl }}>
              <h3 style={{
                margin: `0 0 ${SPACING.md} 0`,
                color: COLORS.primary,
                fontSize: TYPOGRAPHY.fontSize.lg,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
              }}>
                Cost Breakdown
              </h3>
              <div style={{
                backgroundColor: COLORS.background,
                borderRadius: '8px',
                overflow: 'hidden',
                border: `1px solid ${COLORS.border}`,
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Purchase Price</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, borderBottom: `1px solid ${COLORS.border}` }}>{formatCurrency(analysis.offerPrice)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Renovation Costs</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, borderBottom: `1px solid ${COLORS.border}` }}>{formatCurrency(analysis.rehabCost)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Closing Costs</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, borderBottom: `1px solid ${COLORS.border}` }}>{formatCurrency(analysis.closingCosts)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Hold Costs ({analysis.holdMonths}mo)</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, borderBottom: `1px solid ${COLORS.border}` }}>{formatCurrency(analysis.holdCost)}</td>
                    </tr>
                    <tr style={{ backgroundColor: COLORS.card, borderBottom: `2px solid ${COLORS.primary}` }}>
                      <td style={{ padding: SPACING.md, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>Total Investment</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary }}>
                        {formatCurrency(analysis.offerPrice + analysis.rehabCost + analysis.holdCost + analysis.closingCosts)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Estimated ARV</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.success, borderBottom: `1px solid ${COLORS.border}` }}>
                        {formatCurrency(analysis.arv)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Gross Profit</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, borderBottom: `1px solid ${COLORS.border}` }}>{formatCurrency(analysis.grossProfit)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: SPACING.md, color: COLORS.textSecondary, borderBottom: `1px solid ${COLORS.border}` }}>Capital Gains Tax (28%)</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.danger, borderBottom: `1px solid ${COLORS.border}` }}>
                        -{formatCurrency(analysis.capitalGainsTax)}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                      <td style={{ padding: SPACING.md, fontWeight: TYPOGRAPHY.fontWeight.bold }}>NET PROFIT</td>
                      <td style={{ padding: SPACING.md, textAlign: 'right', fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.accent, fontSize: TYPOGRAPHY.fontSize.xl }}>
                        {formatCurrency(analysis.netProfit)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
