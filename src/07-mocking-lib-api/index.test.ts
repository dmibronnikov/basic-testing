import axios from 'axios';
// import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn(fn => fn)
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockImplementation(() => axios);
    (axios.get as jest.Mock).mockResolvedValue({ data: 'mock data' });
  });

  test('should create instance with provided base url', async () => {
    throttledGetDataFromApi('mock');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi('mock');

    expect(axios.get).toHaveBeenCalledWith('mock');
  });

  test('should return response data', async () => {
    let result = await throttledGetDataFromApi('mock')
    expect(result).toBe('mock data');
  });
});
