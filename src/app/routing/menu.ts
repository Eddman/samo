export class MenuItem {

    public constructor(public title: string,
                       public routeLink: string,
                       public subItems?: MenuItem[],
                       public realURL?: string) {
    }
}
