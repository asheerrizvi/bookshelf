// this isn't used in the solution. Only in the extra credit
import {server} from 'test/server'

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

afterEach(() => {
  server.resetHandlers()
})
