import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first, shareReplay, takeUntil, tap} from 'rxjs/operators';
import {ErrorResponse} from '../abstract.http.service';
import {AbstractViewComponent} from '../abstract.view.component';
import {RoutingService} from '../routing/routing.service';
import {Detail} from './detail';
import {DetailService} from './detail.service';

@Component({
    selector           : 'sn-detail-view',
    templateUrl        : 'detail.component.html',
    styleUrls          : [
        'detail.component.scss'
    ],
    host               : {
        '[class.sn-detail-view]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class DetailComponent extends AbstractViewComponent implements OnChanges {

    private _detail: Observable<Detail> | undefined;

    public constructor(private readonly detailService: DetailService,
                       metaService: Meta,
                       routingService: RoutingService,
                       private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnChanges(): void {
        if (this.route == null) {
            this._detail = undefined;
            this.changeDetectorRef.markForCheck();
            return;
        }

        this._detail = this.detailService.getDetail(this.route.configuration.type, this.route.parameters).pipe(
            first(),
            takeUntil(this.destroyed),
            tap((detail: Detail) => {
                this.setSEODescription();
                this.setSEOImage();

                if (detail) {
                    let desc: string | undefined;
                    if (detail.title) {
                        desc = detail.title;
                    }
                    if (detail.header) {
                        if (desc) {
                            desc += ', ';
                        } else {
                            desc = '';
                        }
                        desc += detail.header.pageTitle;
                        desc += ', ';
                        desc += detail.header.content.replace(new RegExp('\n', 'g'), ', ');
                    }

                    if (detail.content) {
                        desc = this.getDescriptionFromContent(desc, detail.content);
                    }

                    this.setSEODescription(desc);
                    this.setSEOImage(this.getFirstImageFromContent(detail.content));
                    this.headerChange.emit(detail.header);
                }
            }),
            shareReplay({
                bufferSize: 1,
                refCount  : true
            }),
            // Display error if there is some problem
            catchError((err: ErrorResponse) => {
                this.error = err.message;
                this.changeDetectorRef.markForCheck();
                return EMPTY;
            })
        );

        this.changeDetectorRef.markForCheck();
    }

    public get detail(): Observable<Detail> | undefined {
        return this._detail;
    }
}
