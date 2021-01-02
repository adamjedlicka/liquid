import { queryObjectToString, queryStringToObject } from './UrlUtils'

describe('UrlUtils', () => {
  describe('queryStringToObject', () => {
    test('transforms query string to object', () => {
      expect(queryStringToObject('c=1&d=2')).toEqual({ c: '1', d: '2' })
    })

    test('returns empty object when missing', () => {
      expect(queryStringToObject()).toEqual({})
    })

    test('returns empty object when empty string', () => {
      expect(queryStringToObject('')).toEqual({})
    })
  })

  describe('queryObjectToString', () => {
    test('transforms query object to string', () => {
      expect(queryObjectToString({ c: 1, d: 2 })).toEqual('c=1&d=2')
    })

    test('returns emptry string when missing', () => {
      expect(queryObjectToString()).toEqual('')
    })

    test('returns emptry string when empty object', () => {
      expect(queryObjectToString({})).toEqual('')
    })
  })
})
