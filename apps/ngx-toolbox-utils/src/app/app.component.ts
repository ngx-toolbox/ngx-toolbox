import { Component, OnInit } from '@angular/core';
import { WindowResizeObserver } from '@ngx-toolbox/util';

@Component({
    selector: 'ngx-toolbox-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'ngx-toolbox-utils';

    public constructor(
        private windowResizeObserver: WindowResizeObserver
    ) {}

    public ngOnInit() {

        this.windowResizeObserver
            .onChange()
            .subscribe(() => {
                console.log("window resized");
            });
    }
}
