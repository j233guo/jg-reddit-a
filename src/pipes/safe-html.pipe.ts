import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform  {

    constructor(
        private sanitized: DomSanitizer
    ) {}

    /**
     * This function transforms an HTML string into a sanitized format that can be safely used in application views.
     * It uses the DOMParser API to parse the input string into an HTML Document object.
     * Then it extracts the text content from this document.
     * If the input string is not empty, it sanitizes it using the 'bypassSecurityTrustHtml' method from
     * Angular DomSanitizer service.
     * @param value The HTML string to be transformed.
     * @returns A SafeHtml object if the input was not empty, otherwise an empty string.
     */
    transform(value: string) {
        const parsedHTMLString = new DOMParser().parseFromString(value, "text/html")
        const parsedHTML = parsedHTMLString.documentElement.textContent ?? ""
        return value ? this.sanitized.bypassSecurityTrustHtml(parsedHTML) : ""
    }
}
