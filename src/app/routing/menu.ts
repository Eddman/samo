export class MenuItem {

    constructor(public title: string, public routeLink: string, public subItems?: MenuItem[], public realURL?: string) {
    }
}
