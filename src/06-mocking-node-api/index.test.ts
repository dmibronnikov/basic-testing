import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

jest.mock('path');

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    (path.join as jest.Mock).mockImplementationOnce(() => 'mockpath');
    const filename = "filename";
    readFileAsynchronously(filename);

    expect(path.join).toHaveBeenCalledWith(__dirname, filename);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockImplementationOnce(() => false);
    
    const filename = "filename";    
    let result = await readFileAsynchronously(filename);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {   
    (fs.existsSync as jest.Mock).mockImplementationOnce(() => true);
    (path.join as jest.Mock).mockImplementationOnce(() => 'mockpath');
    (fsp.readFile as jest.Mock).mockResolvedValueOnce(Buffer.from('mock', 'utf-8'));

    const filename = "filename"; 
    let result = await readFileAsynchronously(filename);

    expect(result).toBe('mock');
  });
});
