/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

export function stringifyObject(obj: unknown): string {
  return JSON.stringify(obj);
}

export function deepCloneObject<T>(obj: T): T | null {
  try {
    return { ...obj };
  } catch (err) {
    console.log('operation error', err);
    return null;
  }
}

export function isEmptyString(value: unknown): boolean {
  try {
    if (typeof value !== 'string') {
      return true;
    }
    return value.trim() === '';
  } catch (err) {
    console.log('isEmptyString err', err);
    return true;
  }
}

export function isNullUndefined(item: unknown): boolean {
  try {
    return item === null || item === undefined;
  } catch (err) {
    console.log('isNullUndefined err', err);
    return true;
  }
}

export function isStringDatatype(item: unknown): boolean {
  try {
    if (typeof item === 'string') {
      return true;
    }
    return false;
  } catch (err) {
    console.log('isStringDatatype err', err);
    return false;
  }
}

export function isArrayDatatype(item: unknown): boolean {
  try {
    return !!Array.isArray(item);
  } catch (err: unknown) {
    console.log('isArrayDatatype err', err);
    return false;
  }
}

export function isObject(item: unknown): boolean {
  try {
    return item !== null && item !== undefined && typeof item === 'object';
  } catch (err) {
    console.log('isObject err', err);
    return false;
  }
}

export function objectKeyExists(obj: Record<string, unknown>, key: string): boolean {
  try {
    return Object.prototype.hasOwnProperty.call(obj, key);
  } catch (err) {
    console.log('objectKeyExists err', err);
    return false;
  }
}

export function isBoolean(item: unknown): boolean {
  try {
    return typeof item === 'boolean';
  } catch (err) {
    console.log('isBoolean err', err);
    return false;
  }
}

export function isEmptyArray(array: unknown): boolean {
  try {
    if (isNullUndefined(array)) {
      return true;
    } else {
      return !(array instanceof Array && array.length > 0);
    }
  } catch (err) {
    console.log('isEmptyArray err', err);
    return true;
  }
}

export function objectInstanceProvider<T>(obj: T): T {
  if (isArrayDatatype(obj)) return [...(obj as unknown as Array<unknown>)] as unknown as T;
  return deepCloneObject(obj) as T;
}

export function isFalse(item: unknown): boolean {
  return isBoolean(item) && !(item as boolean);
}

export function isTrue(item: unknown): boolean {
  return isBoolean(item) && (item as boolean);
}

export function objectAHasSameKeysAsObjectB(objA: Record<string, unknown>, objB: Record<string, unknown>): boolean {
  const allKeysMatch = true;
  const objA_keys = Object.keys(objA);
  const objB_keys = Object.keys(objB);

  if (objA_keys.length !== objB_keys.length) {
    return false;
  }

  for (const key in objA) {
    let keyInObjAExistsInObjB = true;

    if (!objectKeyExists(objB, key)) {
      keyInObjAExistsInObjB = false;
    }

    if (!keyInObjAExistsInObjB) {
      return false;
    }
  }

  return allKeysMatch;
}

export function storeItemToLocalStorage(key: string, item: string): void {
  localStorage.setItem(key, item);
}

export function storeObjectToLocalStorage(key: string, item: unknown): void {
  localStorage.setItem(key, stringifyObject(item));
}

export async function getItemFromLocalStorage(key: string): Promise<string | null> {
  const item = await localStorage.getItem(key);
  console.log('getItemFromLocalStorage item', item);
  return item;
}

export async function getObjectFromLocalStorage(key: string): Promise<unknown> {
  console.log('getObjectFromLocalStorage key', key);
  const item = await getItemFromLocalStorage(key);
  if (!isEmptyString(item)) {
    try {
      const jsonItem = JSON.parse(item as string);
      if (isObject(jsonItem)) {
        return jsonItem;
      }
      return null;
    } catch {
      return null;
    }
  }
  return item;
}

export function isEmptyObject(obj: Record<string, unknown>): boolean {
  try {
    return isEmptyArray(Object.keys(obj));
  } catch {
    return true;
  }
}

export function isVoid(item: unknown): boolean {
  try {
    if (isNaN(parseInt(item as string))) {
      return isNullUndefined(item) || isEmptyArray(item) || isEmptyString(item) || isFalse(item);
    }
    return false;
  } catch {
    return true;
  }
}

export function makeId(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

type ThreadWorkFunction = () => void;
type ThreadWorkSuccessFunction = () => boolean;
type ThreadCallback = () => void;

export function serviceWorkerThread(
  threadWork: ThreadWorkFunction,
  threadWorkRunSuccess: boolean | ThreadWorkSuccessFunction = false,
  onWorkSuccess: ThreadCallback,
  onWorkFail: ThreadCallback,
  threadRunTime = 5000,
  threadRunTimeCountdown = 1000,
  threadPool: number[] = [],
  startOrJoinThread: boolean | ThreadCallback = true,
  startOrJoinThreadCountdown = 1000,
): void {
  let countdown = threadRunTime;
  //because on push, length increases by one,
  // and interval is at former length value
  let threadIndex = threadPool.length;

  threadPool.push(
    window.setInterval(() => {
      const runThread = typeof startOrJoinThread === 'boolean' ? startOrJoinThread : startOrJoinThread.call(null);

      if (runThread) {
        //clear this top level thread
        clearInterval(threadPool[threadIndex]);

        //start thread work and
        threadWork.call(null);

        //next index for thread work
        threadIndex = threadPool.length;

        threadPool.push(
          window.setInterval(() => {
            const done =
              typeof threadWorkRunSuccess === 'boolean' ? threadWorkRunSuccess : threadWorkRunSuccess.call(null);
            console.log('Thread work at -> ', countdown, done);
            if (isTrue(done)) {
              clearInterval(threadPool[threadIndex]);
              onWorkSuccess.call(null);
            } else {
              //if out of time, terminate
              if (countdown <= 0) {
                clearInterval(threadPool[threadIndex]);
                onWorkFail.call(null);
              }
            }
            countdown -= threadRunTimeCountdown;
          }, threadRunTimeCountdown),
        );
      } else {
        //if out of time, terminate
        if (countdown <= 0) {
          clearInterval(threadPool[threadIndex]);
          //and report thread work failure
          onWorkFail.call(null);
        }
      }

      countdown -= startOrJoinThreadCountdown;
    }, startOrJoinThreadCountdown),
  );
}
