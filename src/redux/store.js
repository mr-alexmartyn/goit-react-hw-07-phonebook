import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FilterSlice } from './FilterSlice';
import { ContactsApi } from './ContactsApi';

export const store = configureStore({
  reducer: {
    filter: FilterSlice.reducer,
    [ContactsApi.reducerPath]: ContactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    ContactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
