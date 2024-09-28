import {SafeHtmlPipe} from './safe-html.pipe';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {TestBed} from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
    let pipe: SafeHtmlPipe
    let sanitizer: DomSanitizer

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DomSanitizer,
                    useValue: {
                        bypassSecurityTrustHtml: (html: string) => `sanitized ${html}` as unknown as SafeHtml
                    },
                },
            ],
        })
        sanitizer = TestBed.inject(DomSanitizer)
        pipe = new SafeHtmlPipe(sanitizer)
    })

    it('should sanitize and return safe HTML for valid HTML input', () => {
        const htmlInput = '<p>Hello, <strong>World!</strong></p>'
        const sanitizedResult = pipe.transform(htmlInput)
        expect(sanitizedResult).toEqual(sanitizer.bypassSecurityTrustHtml('Hello, World!'))
    })

    it('should return an empty string for empty input', () => {
        const result = pipe.transform('')
        expect(result).toBe('')
    })

    it('should sanitize potentially unsafe HTML input', () => {
        const unsafeHtml = '<img src="javascript:alert(\'XSS\')" alt="">'
        const sanitizedResult = pipe.transform(unsafeHtml)
        expect(sanitizedResult).toEqual(sanitizer.bypassSecurityTrustHtml(''))
    })

    it('should handle null or undefined input', () => {
        expect(pipe.transform(null as unknown as string)).toBe('')
        expect(pipe.transform(undefined as unknown as string)).toBe('')
    })

    it('should sanitize input with script tags', () => {
        const scriptHtml = '<script>alert("XSS")</script>'
        const sanitizedResult = pipe.transform(scriptHtml)
        expect(sanitizedResult).toEqual(sanitizer.bypassSecurityTrustHtml(''))
    });
})

