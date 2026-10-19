import { BadRequestException, Injectable } from '@nestjs/common';

export interface EquationAnalysis {
  elements: string[];
  left: Record<string, number>;
  right: Record<string, number>;
  balanced: boolean;
  lowestTerms: boolean;
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

@Injectable()
export class EquationsService {
  /** Counts atoms in a formula such as "Pb(NO3)2". */
  countAtoms(formula: string): Record<string, number> {
    const invalid = () => new BadRequestException(`Invalid formula: ${formula}`);
    if (!/^[A-Za-z0-9()]+$/.test(formula)) throw invalid();

    const stack: Record<string, number>[] = [{}];
    const add = (target: Record<string, number>, el: string, n: number) => {
      target[el] = (target[el] ?? 0) + n;
    };

    let consumed = 0;
    for (const m of formula.matchAll(/([A-Z][a-z]?)(\d*)|(\()|(\))(\d*)/g)) {
      if (m.index !== consumed) throw invalid();
      consumed += m[0].length;

      if (m[1]) {
        add(stack[stack.length - 1], m[1], m[2] ? Number(m[2]) : 1);
      } else if (m[3]) {
        stack.push({});
      } else {
        if (stack.length < 2) throw invalid();
        const group = stack.pop()!;
        const multiplier = m[5] ? Number(m[5]) : 1;
        for (const [el, n] of Object.entries(group)) add(stack[stack.length - 1], el, n * multiplier);
      }
    }
    if (consumed !== formula.length || stack.length !== 1) throw invalid();
    return stack[0];
  }

  analyze(reactants: string[], products: string[], coefficients: number[]): EquationAnalysis {
    if (coefficients.length !== reactants.length + products.length) {
      throw new BadRequestException('One coefficient is required per formula.');
    }

    const total = (formulas: string[], coefs: number[]) => {
      const sum: Record<string, number> = {};
      formulas.forEach((formula, i) => {
        for (const [el, n] of Object.entries(this.countAtoms(formula))) sum[el] = (sum[el] ?? 0) + n * coefs[i];
      });
      return sum;
    };

    const left = total(reactants, coefficients.slice(0, reactants.length));
    const right = total(products, coefficients.slice(reactants.length));
    const elements = [...new Set([...Object.keys(left), ...Object.keys(right)])];

    return {
      elements,
      left,
      right,
      balanced: elements.every((el) => (left[el] ?? 0) === (right[el] ?? 0)),
      lowestTerms: coefficients.reduce(gcd, 0) === 1,
    };
  }
}
