import {ElementRef, Component, ViewChild, OnDestroy, OnInit, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {DragulaService} from 'ng2-dragula/components/dragula.provider';

import {MetaService} from 'ng2-meta/src';

import {RoutingService} from "../routing/routing.service";
import {AuthService} from "../auth/auth.service";

import {AbstractComponent} from "../abstract.component";
import {ModalConfirmationComponent} from "../common/modal/modal.confirmation.component";

import {RouteConfiguration} from "../routing/route.configuration";

@Component({
    moduleId: module.id,
    selector: 'item-editor',
    templateUrl: 'item.editor.component.html',
    styleUrls: ['item.editor.component.css']
})
export class MenuItemEditorComponent extends AbstractComponent implements OnInit, OnDestroy {

    @ViewChild('deleteConfirmation')
    public deleteConfirmation: ModalConfirmationComponent;

    @Input()
    public item: RouteConfiguration;

    @Input()
    public parentLevel: RouteConfiguration;

    private bagEl: Element;

    constructor(private dragulaService: DragulaService,
                metaService: MetaService,
                authService: AuthService,
                routingService: RoutingService,
                router: Router,
                route: ActivatedRoute,
                el: ElementRef) {
        super(metaService, authService, routingService, router, route, el);
    }


    // Init/Destroy component
    public  ngOnInit(): void {
        this.setupDragAndDrop();
        this.el.classList.add(this.item.type);
    }

    public ngOnDestroy(): void {
        this.destroyDragAndDrop();
    }

    // Adding new items
    public addChild(): void {
        if (!this.item.routes) {
            this.item.routes = [];
        }
        this.item.routes.push({
            title: 'No name',
            url: '',
            type: 'unknown',
            config: {
                type: [this.guid(), this.guid()]
            }
        });
    }

    // Removal
    public confirmRemove(): void {
        this.deleteConfirmation.open();
    }

    public remove(): void {
        this.parentLevel.routes.splice(this.parentLevel.routes.indexOf(this.item), 1);
    }

    // URL changes
    public changedURL(newURL: string): void {
        if (this.parentLevel && this.parentLevel.redirect === this.item.url) {
            this.parentLevel.redirect = newURL;
        }
        this.item.url = newURL;
    }

    // Drag & Drop
    private setupDragAndDrop(): void {
        let dragIndex: number,
            dragElm: Element,
            domIndexOf = (child: Element, parent: Element) => {
                return Array.prototype.indexOf.call(parent.children, child);
            };

        // Make sure we destroy the old bag.
        this.destroyDragAndDrop();

        // Construct bagName
        this.item.bag = this.guid() + 'Bag';

        // Get the bag element
        this.bagEl = Array.prototype.slice.call(this.el.childNodes).find((child: Element) => {
            return child.className === 'dragulaBag';
        });

        // Add bag name as class to element so we know if we're in correct bag when starting to move element
        if (!this.bagEl.classList.contains(this.item.bag)) {
            this.bagEl.classList.add(this.item.bag);
        }

        // Add special class name for group bags
        if (this.item.type === 'group' && !this.bagEl.classList.contains('groupBag')) {
            this.bagEl.classList.add('groupBag');
        }
        // Setup dragula for the bag above
        this.dragulaService.setOptions(this.item.bag, {
            containers: [this.bagEl],
            revertOnSpill: true,
            direction: 'vertical',
            moves: (el: Element, container: Element, handle: Element) => {
                return handle.parentElement.className === 'handle'
                    && handle.parentElement.parentElement
                        .parentElement.parentElement.classList.contains(this.item.bag);
            },
            isContainer: (el: Element) => {
                return (!dragElm || !dragElm.classList.contains('group'))
                    && el.classList.contains('dragulaBag')
                    && el.classList.contains('groupBag');
            }
        });

        // Setup models for dragula (added support for distinct bags)
        this.dragulaService.find(this.item.bag).drake.on('remove', (el: Element, source: Element) => {
            let sourceModel = this.item.routes;
            sourceModel.splice(dragIndex, 1);
        });
        this.dragulaService.find(this.item.bag).drake.on('drag', (el: Element, source: Element) => {
            dragElm = el;
            dragIndex = domIndexOf(el, source);
        });
        this.dragulaService.find(this.item.bag).drake.on('drop', (dropElm: Element, target: Element, source: Element) => {
            let dropIndex: number = domIndexOf(dropElm, target),
                sourceModel: RouteConfiguration[] = this.item.routes,
                targetModel: RouteConfiguration[],
                dropElmModel: RouteConfiguration,
                notCopy: boolean;
            if (!target) {
                return;
            }
            // console.log('DROP');
            // console.log(sourceModel);
            if (target === source) {
                sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
            }
            else {
                notCopy = dragElm === dropElm;
                targetModel = this.getTargetModel(target);
                if (!targetModel) {
                    return;
                }
                dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));
                if (notCopy) {
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel.splice(dropIndex, 0, dropElmModel);
                target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
            }
        });
    }

    private getTargetModel(targetBag: Element): RouteConfiguration[] {
        let rootLevel = this.parentLevel, route: RouteConfiguration;
        if (rootLevel) {
            route = rootLevel.routes.find((group) => {
                return targetBag.classList.contains(group.bag);
            });

            if (route) {
                return route.routes;
            }
        }
        return null;
    }

    private destroyDragAndDrop(): void {
        // Destroy dragula
        if (this.item.bag && this.dragulaService.find(this.item.bag)) {
            this.dragulaService.destroy(this.item.bag);
        }
        delete this.item.bag;
    }

    // GUID generation
    private guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}