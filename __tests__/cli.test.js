const { exec } = require('child_process')

const mockData = require('./mockdata.json')

// test challenge one and challenge two

describe('test cli commands', () => {
	test('Test cost command', () => {
		exec(mockData.costCliCommand, (error, stdout) => {
			expect(error).toBe(null)
			expect(stdout).toEqual('PKG1 0 175\nPKG2 0 275\nPKG3 35 665\n')
		})
	})
	test('test time command', () => {
		exec(mockData.timeCommand, (error, stdout) => {
			expect(error).toBe(null)
			expect(stdout).toEqual('PKG1 0 175 0.07\nPKG2 0 275 0.07\nPKG3 35 665 1.43\n')
		})
	})
})
