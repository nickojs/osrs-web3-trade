import 'whatwg-fetch';
import { rest } from 'msw';
import { categories } from './data';

export const handlers = [
  rest.get('http://localhost:7000/items/categories', (req, res, ctx) => res(
      ctx.json(categories)
    )),
  rest.post('http://localhost:7000/auth/login', (req, res, ctx) => res(
      ctx.json({ token: 'mock token' })
    )),
  rest.post('http://localhost:7000/user/', (req, res, ctx) => res(
      ctx.json({ message: 'successfuly created user' })
    ))

];
