import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderDTO, OrderResponseDTO } from './dtos/order.dto';
import { Instrument } from '../../domain/models/instrument';
import { Portfolio } from '../../domain/models/portfolio';
import { instrumentMapper } from './mappers/instrumentMapper';
import { portfolioMapper } from './mappers/portfolioMapper';

const API_URL = 'https://dummy-api-topaz.vercel.app';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getInstruments: builder.query<Instrument[], void>({
      query: () => '/instruments',
      transformResponse: instrumentMapper, 
    }),
    getPortfolio: builder.query<Portfolio[], void>({
      query: () => '/portfolio',
      transformResponse: portfolioMapper,
    }),
    searchInstruments: builder.query<Instrument[], string>({
      query: (query) => `/search?query=${query}`,
      transformResponse: instrumentMapper,
    }),
    createOrder: builder.mutation<OrderResponseDTO, OrderDTO>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const {
  useGetInstrumentsQuery,
  useGetPortfolioQuery,
  useSearchInstrumentsQuery,
  useCreateOrderMutation,
} = api;
