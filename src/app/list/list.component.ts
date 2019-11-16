import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first, shareReplay, takeUntil, tap} from 'rxjs/operators';
import {ErrorResponse} from '../abstract.http.service';
import {AbstractViewComponent} from '../abstract.view.component';
import {RoutingService} from '../routing/routing.service';
import {ListItem} from './list.item';
import {ListService} from './list.service';

@Component({
    selector           : 'sn-list-view',
    templateUrl        : 'list.component.html',
    styleUrls          : [
        'list.component.scss'
    ],
    host               : {
        '[class.sn-list-view]': 'true'
    },
    changeDetection    : ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class ListComponent extends AbstractViewComponent implements OnChanges {

    private _listItems: Observable<ListItem[]> | undefined;

    public constructor(private readonly listService: ListService,
                       metaService: Meta,
                       routingService: RoutingService,
                       private readonly changeDetectorRef: ChangeDetectorRef) {
        super(metaService, routingService);
    }

    public ngOnChanges(): void {
        if (this.route == null) {
            this._listItems = undefined;
            this.changeDetectorRef.markForCheck();
            return;
        }

        this._listItems = this.listService.getListItems(this.route.configuration.type).pipe(
            first(),
            takeUntil(this.destroyed),
            tap((listItems: ListItem[]) => {
                this.setSEODescription();
                this.setSEOImage();

                if (listItems && listItems.length) {
                    let desc: string | undefined;
                    listItems.some((item: ListItem) => {
                        if (item.title) {
                            desc = item.title;
                        }

                        if (item.content) {
                            desc = this.getDescriptionFromContent(desc, item.content);
                        }
                        return desc && desc.length >= 250;
                    });

                    this.setSEODescription(desc);

                    listItems.some((item: ListItem) => {
                        let img: string | undefined;
                        if (item.content) {
                            img = this.getFirstImageFromContent(item.content);
                            if (img) {
                                this.setSEOImage(img);
                                return true;
                            }
                        }
                        return false;
                    });
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

    public get listItems(): Observable<ListItem[]> | undefined {
        return this._listItems;
    }
}
