import {Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {ConnectionPositionPair, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective {
    @Input('tooltipContent') content: TemplateRef<any>
    @Input('tooltipPlacement') placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom'
    @Input('tooltipOffset') offset: number = 5

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef
    ) {}

    @HostListener('mouseenter')
    show() {
        const positionStrategy = this.getPositionStrategy()
        this.overlayRef = this.overlay.create({
            positionStrategy,
            hasBackdrop: false
        })
        const tooltipPortal = new TemplatePortal(this.content, this.viewContainerRef)
        this.overlayRef.attach(tooltipPortal)
    }

    getPositionStrategy() {
        const positionMap: { [key: string]: ConnectionPositionPair[] } = {
            top: [{
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: this.offset
            }],
            bottom: [{
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetY: this.offset
            }],
            left: [{
                originX: 'start',
                originY: 'center',
                overlayX: 'end',
                overlayY: 'center',
                offsetY: this.offset
            }],
            right: [{
                originX: 'end',
                originY: 'center',
                overlayX: 'start',
                overlayY: 'center',
                offsetY: this.offset
            }]
        }
        return this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions(positionMap[this.placement])
    }

    @HostListener('mouseleave')
    hide() {
        if (this.overlayRef) {
            this.overlayRef.detach()
            this.overlayRef.dispose()
        }
    }
}
