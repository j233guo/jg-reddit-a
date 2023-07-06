import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "parseUTC"
})
export class ParseUTCPipe implements PipeTransform {
    transform(value: number): string {
        const date = new Date(0)
        date.setUTCSeconds(value)
        return date.toLocaleString()
    }
}