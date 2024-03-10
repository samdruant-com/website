import { expect } from 'chai';
import { setToken, getToken, hashPassword, comparePasswords } from "./crypto";

const JWT_SECRET = "secret";

describe('Crypto Util', () => {

	before(() => {
		process.env.JWT_SECRET = JWT_SECRET;
	});
	
	describe('setToken()', () => {

		function _extractExpiration(token: string): number {
			const result = token.split('.')[1];
			const decoded = Buffer.from(result, 'base64').toString('utf-8');
			return JSON.parse(decoded).exp;
		}
		
		it('should return a string', () => {
			const token = setToken('sample');
			expect(token).to.be.a('string');
		});

		it('token should expire in 24 hours by default', () => {
			const token = setToken('sample');
			const expiresIn = _extractExpiration(token);
			const now = Math.floor(Date.now() / 1000);
			const difference = expiresIn - now;
			expect(difference).to.equal(60 * 60 * 24);
		});
    
		it('token should expire in 1 hour if expiresIn is set to 1h', () => {
			const token = setToken('sample', { expiresIn: '1h' });
			const expiresIn = _extractExpiration(token);
			const now = Math.floor(Date.now() / 1000);
			const difference = expiresIn - now;
			expect(difference).to.equal(60 * 60);
		});
	});

	describe('getToken()', () => {
		const sample: string = 'sample';
		const token: string = setToken(sample);

		it('should return a string if token is valid', () => {
			const result = getToken(token);
			expect(result).to.be.a('string');
		});

		it('should return the same string that was used to create the token', () => {
			const result = getToken(token);
			expect(result).to.equal(sample);
		});
    
		it('should return null if token is invalid', () => {
			const result = getToken('invalid token');
			expect(result).to.be.null;
		});
	});

	describe('hashPassword()', () => {
		it('should return a string', () => {
			const hash = hashPassword('password');
			expect(hash).to.be.a('string');
		});

		it('should return a different string for the same input', () => {
			const sample = 'password';
			const hash1 = hashPassword(sample);
			const hash2 = hashPassword(sample);

			expect(hash1).to.not.equal(hash2);
		});
	});

	describe('comparePasswords()', () => {
		it('should return true if password matches hash', () => {
			const sample = 'password';
			const hash = hashPassword(sample);
			const result = comparePasswords(sample, hash);
			expect(result).to.be.true;
		});

		it('should return false if password does not match hash', () => {
			const sample = 'password';
			const hash = hashPassword(sample);
			const result = comparePasswords('wrong password', hash);
			expect(result).to.be.false;
		});
	});
});