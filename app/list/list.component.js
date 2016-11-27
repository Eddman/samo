define(['module',
        'exports',
        '../abstract.component',
        './list.service'],
    function (module, exports, abstractComponent, listService) {
        'use strict';

        function ListComponent(listService) {
            abstractComponent.AbstractComponent.apply(this, Array.prototype.slice.call(arguments, 1));
            this.listService = listService;
        }

        abstractComponent.inherit(ListComponent, {
            ngOnChanges: function () {
                this.listService.getListItems({
                    type: this.route.configuration.type
                }).then(function (listItems) {
                    var desc;
                    this.listItems = listItems;

                    this.setSEODescription();
                    this.setSEOImage();

                    if (this.listItems && this.listItems.length) {
                        Object.keys(this.listItems).find(function (i) {
                            if (this.listItems[i].title) {
                                desc = this.listItems[i].title;
                            }

                            if (this.listItems[i].content) {
                                desc = this.getDescriptionFromContent(desc, this.listItems[i].content);
                            }
                            return desc && desc.length >= 250;
                        }.bind(this));

                        this.setSEODescription(desc);

                        Object.keys(this.listItems).find(function (i) {
                            var img;
                            if (this.listItems[i].content) {
                                img = this.getFirstImageFromContent(this.listItems[i].content);
                                if (img) {
                                    this.setSEOImage(img);
                                    return true;
                                }
                            }
                            return false;
                        }.bind(this));
                    }
                }.bind(this));
            }
        }, [listService.ListService]);

        exports.ListComponent = abstractComponent.viewComponent(ListComponent, module, 'list-view', 'list.component');
    });
