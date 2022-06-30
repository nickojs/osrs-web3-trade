import 'whatwg-fetch';
import { rest } from 'msw';
import { categories } from './data';

export const handlers = [
  rest.get('http://localhost:7000/items/categories', (req, res, ctx) => {
    console.log(res);
    return res(
      ctx.json(categories)
    );
  })
];
