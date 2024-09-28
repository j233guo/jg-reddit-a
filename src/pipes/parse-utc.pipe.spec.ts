import {ParseUTCPipe} from './parse-utc.pipe';

describe('ParseUTCPipe', () => {
    let pipe: ParseUTCPipe;

    beforeEach(() => {
        pipe = new ParseUTCPipe();
    })

    it('should handle the Unix Epoch (0 seconds from 1970-01-01 00:00:00 UTC)', () => {
        const timestamp = 0
        const result = pipe.transform(timestamp)
        expect(result).toBe(new Date(0).toLocaleString());
    });

    it('should handle null or undefined inputs', () => {
        expect(pipe.transform(null as unknown as number)).toBe('')
        expect(pipe.transform(undefined as unknown as number)).toBe('')
    })

    it('should handle non-numeric inputs', () => {
        expect(pipe.transform('Invalid Input' as unknown as number)).toBe('')
    })
})
