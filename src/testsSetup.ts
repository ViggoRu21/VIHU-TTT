import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { handlers } from './__tests__/mocks/handlers'
// ✅ explicitly import Vitest’s globals so TS knows about them:
import { beforeAll, afterEach, afterAll } from 'vitest'

const server = setupServer(...handlers)

// Start MSW before all tests
beforeAll(() => server.listen())

// Reset any request handlers added during individual tests
afterEach(() => server.resetHandlers())

// Clean up once the test suite is done
afterAll(() => server.close())
