import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import cssUnitConverter from 'css-unit-converter';

let rootStyle: CSSStyleDeclaration | undefined;

let evalSupport;

function defaultTo(value: number | undefined | null, callback: () => number): number {
  if (isNil(value)) {
    return callback();
  }
  return value;
}

function isEvalSupport(): boolean {
  if (evalSupport === undefined) {
    try {
      /* eslint-disable-next-line no-eval */
      eval('');
      evalSupport = true;
    } catch (e) {
      evalSupport = false;
    }
  }
  return evalSupport;
}

function getRootFontSize(): number {
  if (!rootStyle) {
    rootStyle = window.getComputedStyle(document.documentElement);
  }
  return defaultTo(toPx(rootStyle.fontSize), () => 100);
}

function calculate(n1: number | undefined, n2: number | undefined, operation: string): number | undefined {
  if (n1 !== undefined && n2 !== undefined) {
    switch (operation.trim()) {
      case '+':
        return n1 + n2;
      case '-':
        return n1 - n2;
      case '*':
        return n1 * n2;
      case '/':
        return n1 / n2;
      case '%':
        return n1 % n2;
      default: {
        if (isEvalSupport()) {
          /* eslint-disable-next-line no-eval */
          return eval(`${n1}${operation}${n2}`);
        }
      }
    }
  }
}

export function pxToRem(num?: number | string | null): string | undefined {
  if (num !== undefined && num !== null) {
    if (num === 0) {
      return '0';
    }
    if (isNumber(num)) {
      return `${num / getRootFontSize()}rem`;
    }
    return num;
  }
}

const builtInHeight = [
  'auto',
  'fit-content',
  'max-content',
  'min-content',
  'inherit',
  'initial',
  'unset',
  'revert',
  'available',
  '-webkit-fit-content',
  '-moz-max-content',
  '-moz-min-content',
  '-moz-initial',
];

const calcReg = /^calc\(([^()]*)\)$/;
const unitReg = /^([+-]?[\d]+(?:[.][\d]+)?(?:[Ee][+-]?[\d]+)?)([^\d.+-]+)$/;

export function isCalcSize(num: string): RegExpMatchArray | null {
  return num.match(calcReg);
}

export function isPercentSize(num: string): boolean {
  return num.indexOf('%') !== -1;
}

export function toPx(num?: number | string | null, getRelationSize?: (unit: 'vh' | 'vw' | '%' | 'em') => number | undefined): number | undefined {
  if (num !== undefined && num !== null) {
    if (isNumber(num)) {
      return num;
    }
    if (isString(num) && !builtInHeight.includes(num)) {
      const calcMatches = isCalcSize(num);
      if (calcMatches) {
        try {
          const list = calcMatches[1].split(' ');
          return list.slice(1).reduce<number | undefined>((result, calc, index, array) => {
            if (index % 2 === 1) {
              return calculate(result, toPx(calc, getRelationSize), array[index - 1]);
            }
            return result;
          }, toPx(list[0], getRelationSize));
        } catch (e) {
          console.error(`Invalid property value in "${num}".`);
          return undefined;
        }
      }
      const unitMatches = num.match(unitReg);
      if (unitMatches) {
        const [, n, u] = unitMatches;
        if (n) {
          const number = Number(n);
          if (u && u !== 'px') {
            switch (u) {
              case '%': {
                const parentPx = getRelationSize && getRelationSize('%');
                if (parentPx !== undefined) {
                  return parentPx * number / 100;
                }
                return undefined;
              }
              case 'vh': {
                const viewHeight = defaultTo(getRelationSize && getRelationSize('vh'), () => document.documentElement.clientHeight);
                return viewHeight * number / 100;
              }
              case 'vw': {
                const viewWidth = defaultTo(getRelationSize && getRelationSize('vw'), () => document.documentElement.clientWidth);
                return viewWidth * number / 100;
              }
              case 'rem':
                return number * getRootFontSize();
              case 'em':
                return number * defaultTo(getRelationSize && getRelationSize('em'), () => defaultTo(toPx(window.getComputedStyle(document.body).fontSize), () => 12));
              default:
                try {
                  return cssUnitConverter(number, u, 'px');
                } catch (e) {
                  return undefined;
                }
            }
          }
          return number;
        }
      }
    }
  }
}
