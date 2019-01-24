import { AfterViewInit, ChangeDetectorRef, ElementRef, Renderer2, TemplateRef } from '@angular/core';
export declare class NzStepComponent implements AfterViewInit {
    private erf;
    private _renderer;
    cdr: ChangeDetectorRef;
    _status: string;
    _ifCustomStatus: boolean;
    _totalCount: number;
    _currentIndex: number;
    _el: any;
    _last: boolean;
    _first: boolean;
    _processDot: boolean;
    _direction: string;
    _outStatus: string;
    index: number;
    stepStatusClass: any;
    nzIcon: TemplateRef<void>;
    _stepsTail: ElementRef;
    _stepsHead: ElementRef;
    _stepsMain: ElementRef;
    nzStatus: string;
    nzTitle: string;
    _description: string;
    _descriptionTpl: TemplateRef<void>;
    nzDescription: string | TemplateRef<void>;
    _current: number;
    initClassMap(): void;
    updateLastWidth(): void;
    constructor(erf: ElementRef, _renderer: Renderer2, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
}