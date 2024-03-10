describe('Slug Util', () => {
	describe('createSlug()', () => {
		it('should return a string');
		it('should return a different string for the same input');
		it('should throw an error if input is empty');
	});

	describe('isSlug()', () => {
		it('should return true if string is slug-like');
		it('should return false if string is not slug-like');
	});
});