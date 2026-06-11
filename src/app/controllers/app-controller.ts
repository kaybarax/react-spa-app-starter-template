/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { isNullUndefined, objectKeyExists } from '../util/util';

export function displayFieldExpectationSatisfied(
  key: string,
  model: unknown,
  expectationFunction: (value: unknown) => boolean,
): boolean {
  if (isNullUndefined(model)) return false;
  if (!objectKeyExists(model as Record<string, unknown>, key)) return false;
  return expectationFunction((model as Record<string, unknown>)[key]);
}
