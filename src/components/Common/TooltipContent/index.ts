import {Component, Input} from "@angular/core";
import {animate, style, transition, trigger} from "@angular/animations";
import {ColorMode} from "../../../services/AppearanceService";

@Component({
    selector: 'tooltip-content',
    template: `
        <div @tooltipAnimation class="tooltip-content"
             [ngStyle]="{'background-color': colorMode === 'light' ? '#00000080' : '#F3F3F480'}">
            @if (text) {
                {{text}}
            } @else {
                <ng-content></ng-content>
            }
        </div>
    `,
    styles: [`
        .tooltip-content {
            border-radius: 5px;
            padding: 8px;
            color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
    `],
    animations: [
        trigger('tooltipAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scale(0)'}),
                animate('0.1s ease-out', style({opacity: 1, transform: 'scale(1)'}),)
            ]),
            transition(':leave', [
                animate('0.1s ease-in', style({opacity: 0, transform: 'scale(0)'}),)
            ])
        ])
    ]
})
export class TooltipContentComponent {
    @Input() colorMode: ColorMode
    @Input() text: string
}
