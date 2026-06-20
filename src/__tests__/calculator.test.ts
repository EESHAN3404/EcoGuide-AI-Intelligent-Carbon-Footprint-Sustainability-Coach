import { calculateEcoScore } from '../lib/calculator';

describe('Carbon Calculator', () => {
  it('should assign Eco Champion for low emissions', () => {
    const result = calculateEcoScore(150);
    expect(result.level).toBe('Eco Champion');
    expect(result.score).toBe(95);
  });

  it('should assign High Impact User for very high emissions', () => {
    const result = calculateEcoScore(800);
    expect(result.level).toBe('High Impact User');
    expect(result.score).toBe(40);
  });
});
