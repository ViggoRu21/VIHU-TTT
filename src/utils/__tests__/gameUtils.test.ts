import { describe, it, expect } from 'vitest'
import { Sign, EMOJI }          from '../constants'
import {
  calculateWinner,
  checkDraw,
  getPlayerNameFromSign,
  getWhosTurnItIs,
} from '../gameUtils'

describe('gameUtils', () => {
  describe('calculateWinner()', () => {
    it('returns null when there is no winner', () => {
      const board: Array<Sign | string> = [
        Sign.X, Sign.O, '',
        '',   Sign.X, '',
        Sign.O, '',   '',
      ]
      expect(calculateWinner(board)).toBeNull()
    })

    it('detects a horizontal win (top row)', () => {
      const board: Array<Sign | string> = [
        Sign.X, Sign.X, Sign.X,
        '',   '',   '',
        '',   '',   '',
      ]
      expect(calculateWinner(board)).toBe(Sign.X)
    })

    it('detects a vertical win (first column)', () => {
      const board: Array<Sign | string> = [
        Sign.O, '',   '',
        Sign.O, '',   '',
        Sign.O, '',   '',
      ]
      expect(calculateWinner(board)).toBe(Sign.O)
    })

    it('detects a diagonal win (\\)', () => {
      const board: Array<Sign | string> = [
        Sign.X, '',   '',
        '',   Sign.X, '',
        '',   '',   Sign.X,
      ]
      expect(calculateWinner(board)).toBe(Sign.X)
    })
  })

  describe('checkDraw()', () => {
    it('returns the placeholder array ["meow"] when board is full & no winner', () => {
      const fullNoWin: Array<Sign | string> = [
        Sign.X, Sign.O, Sign.X,
        Sign.X, Sign.O, Sign.O,
        Sign.O, Sign.X, Sign.X,
      ]
      expect(checkDraw(fullNoWin)).toEqual(['meow'])
    })

    it('returns null when someone has won', () => {
      const winBoard: Array<Sign | string> = [
        Sign.X, Sign.X, Sign.X,
        '',   '',   '',
        '',   '',   '',
      ]
      expect(checkDraw(winBoard)).toBeNull()
    })

    it('returns null when board is not yet full', () => {
      const partial: Array<Sign | string> = [
        Sign.X, '',   '',
        '',   '',   '',
        '',   '',   '',
      ]
      expect(checkDraw(partial)).toBeNull()
    })
  })

  describe('getPlayerNameFromSign()', () => {
    const fakeGame = {
      player1_name: 'Meowser',
      player2_name: 'Bowser',
    } as any

    it('returns Meowser when sign is X', () => {
      expect(getPlayerNameFromSign(Sign.X, fakeGame))
        .toBe(`${EMOJI[Sign.X]} Meowser `)
    })

    it('returns Bowser when sign is O', () => {
      expect(getPlayerNameFromSign(Sign.O, fakeGame))
        .toBe(`${EMOJI[Sign.O]} Bowser `)
    })

    it('returns empty string for unknown sign', () => {
      expect(getPlayerNameFromSign('Z' as any, fakeGame)).toBe('')
    })
  })

  describe('getWhosTurnItIs()', () => {
    it('starts with X if no moves played', () => {
      const empty = Array(9).fill(null) as Array<Sign | string>
      expect(getWhosTurnItIs(empty)).toBe(Sign.X)
    })

    it('switches to O after X plays once', () => {
      const oneX = [Sign.X, '', '', '', '', '', '', '', '']
      expect(getWhosTurnItIs(oneX)).toBe(Sign.O)
    })

    it('switches back to X when X and O are tied', () => {
      const tied = [Sign.X, Sign.O, '', '', '', '', '', '', '']
      expect(getWhosTurnItIs(tied)).toBe(Sign.X)
    })
  })

})

