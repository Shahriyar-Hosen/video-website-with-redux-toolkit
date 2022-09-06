# Video Website With Redux Toolkit

## RTK Query Configuration ⚜ ⬇⬇⬇

### API Slice creation & Store configuration

1. Create Api Slice -

   ```sh
   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

      export const apiSlice = createApi({
         reducerPath: "api",
         baseQuery: fetchBaseQuery({
            baseUrl: "http://localhost:9000",
         }),
         endpoints: (builder) => ({

      }),
   });

   ```

2. Store configuration
   ```sh
   import { configureStore } from "@reduxjs/toolkit";
   import { apiSlice } from "../features/api/apiSlice";

   export const store = configureStore({
      reducer: {
         [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddlewares) =>
         getDefaultMiddlewares().concat(apiSlice.middleware),
   });

   ```
