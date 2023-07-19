import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ 
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform  {

    constructor(
        private sanitized: DomSanitizer
    ) {}

    transform(value) {
        const parsedHTMLString = new DOMParser().parseFromString(value, "text/html")
        const parsedHTML = parsedHTMLString.documentElement.textContent ?? ""
        return value ? this.sanitized.bypassSecurityTrustHtml(parsedHTML) : ""
    }
}