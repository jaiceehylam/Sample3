import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
export declare const TOOLTIP_CONTENT_TEMPLATE: string;
export declare class TooltipContentComponent {
    hostRef: ElementRef;
    cdRef: ChangeDetectorRef;
    tooltipRef: ElementRef;
    arrowOuterRef: ElementRef;
    arrowInnerRef: ElementRef;
    tooltipCls: string;
    tooltipStyle: Object;
    content: string;
    position: string;
    target: HTMLElement;
    parent: TooltipDirective;
    trackMouse: boolean;
    trackMouseX: number;
    trackMouseY: number;
    deltaX: number;
    deltaY: number;
    left: number;
    top: number;
    zIndex: number;
    closed: boolean;
    targetWidth: number;
    targetHeight: number;
    tipWidth: number;
    tipHeight: number;
    constructor(hostRef: ElementRef, cdRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    onMouseEnter(event: any): void;
    onMouseLeave(event: any): void;
    getPosition(pos?: string): {
        left: number;
        top: number;
    };
    reposition(): void;
    show(): void;
    hide(): void;
    static zIndex: number;
}
