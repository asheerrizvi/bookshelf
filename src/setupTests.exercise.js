import '@testing-library/jest-dom'
import * as auth from 'auth-provider'
import {queryCache} from 'react-query/dist/react-query.development'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import * as usersDB from 'test/data/users'
import {server} from 'test/server'

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

afterEach(async () => {
  queryCache.clear()
  await Promise.all([
    await auth.logout(),
    await usersDB.reset(),
    await booksDB.reset(),
    await listItemsDB.reset(),
  ])
})
