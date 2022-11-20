import { rest } from 'msw';
import mockData from './mockData.json';

export const handler = [
  rest.get('', (req, res, ctx) => {
    return res(ctx(mockData));
  })
];
