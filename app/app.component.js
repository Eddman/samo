define(['module', 'exports',
        '@angular/core',
        '@angular/router',
        './abstract.component'],
    function (module, exports, ngCore, ngRouter, abstractComponent) {
        'use strict';

        function AppComponent() {
            abstractComponent.AbstractComponent.apply(this, arguments);
        }

        abstractComponent.inherit(AppComponent, {
            ngOnInit: function () {
                this.active = true;
            },
            deactivateRouter: function (deactivate) {
                var resolved;

                if (this.active !== deactivate) {
                    return;
                }

                this.active = !deactivate;

                if (deactivate) {
                    this.previousRoute = this.routerOutlet.activatedRoute;
                    this.routerOutlet.deactivate();
                } else if (this.previousRoute) {
                    resolved = [
                        {
                            provide: ngRouter.ActivatedRoute,
                            useValue: this.previousRoute
                        },
                        {
                            provide: ngRouter.RouterOutletMap,
                            useValue: this.routerOutlet.outletMap
                        }
                    ];
                    this.routerOutlet.activate(this.previousRoute, this.routerOutlet.resolver,
                        this.routerOutlet.locationInjector, ngCore.ReflectiveInjector.resolve(resolved),
                        this.routerOutlet.outletMap);
                }
            }
        }, []);

        abstractComponent.simpleComponent(AppComponent, module, 'samuel-netocny', 'app.component');
        exports.AppComponent = abstractComponent.addQueries(AppComponent, {
            'routerOutlet': new ngCore.ViewChild(ngRouter.RouterOutlet)
        });
    });
