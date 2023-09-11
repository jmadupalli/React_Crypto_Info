import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';


export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers: apiHeaders }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count${count}`
        })
    })
})

export const {
    useGetCryptoNewsQuery,
} = newsApi;