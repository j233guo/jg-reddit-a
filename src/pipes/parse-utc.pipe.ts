import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "parseUTC"
})
export class ParseUTCPipe implements PipeTransform {

    constructor() {}
    
    /**
     * This function transforms a numeric input into a locale-specific string representation of a date.
     * The input value is interpreted as the number of seconds from 1970-01-01 00:00:00 UTC (Unix Epoch).
     * @param value The number of seconds from the Unix Epoch.
     * @returns A string representing a date in a format specific to the user's locale.
     */
    transform(value: number): string {
        const date = new Date(0)
        date.setUTCSeconds(value)
        return date.toLocaleString()
    }
}