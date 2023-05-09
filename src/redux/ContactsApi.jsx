import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ContactsApi = createApi({
  reducerPath: 'contactsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6458dfa28badff578efd5261.mockapi.io/contacts/v1/',
  }),

  tagTypes: ['Contacts'],

  endpoints: builder => ({
    getContact: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),

    addContacts: builder.mutation({
      query: contact => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    deleteContacts: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
  use,
} = ContactsApi;
