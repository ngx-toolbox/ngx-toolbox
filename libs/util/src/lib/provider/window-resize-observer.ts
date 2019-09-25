import { Injectable } from "@angular/core";
import { Observable, Subject, fromEvent, OperatorFunction } from "rxjs";
import { takeWhile } from "rxjs/operators";

/**
 *
 */
@Injectable({providedIn: "root"})
export class WindowResizeObserver {

    /**
     * window resize event stream
     */
    private windowResize$: Observable<Event>;

    /**
     * shared stream which one is registered on windowResize Stream
     * all others will subscribe to shared stream so we can ensure
     * only one window resize event exists
     */
    private shared$: Subject<void>;

    /**
     * current subscriber count on shared stream, the first subscriber
     * will trigger shared stream registration on window resize stream
     * if subscriber unsubsubscribe and no subscribers left we unsubscribe 
     * from windowResize$
     */
    private subscriberCount = 0;

    constructor() {
        this.windowResize$ = fromEvent(window, "resize");
        this.shared$ = new Subject();
    }

    /**
     * create shared event stream and register to this
     */
    public onChange(): Observable<void> {

        // subscribe
        return new Observable(observer => {
            this.subscriberCount++;
            const event$ = this.shared$.subscribe(observer);

            if (this.subscriberCount === 1) {
                this.subscribeToWindowResizeEvent();
            }

            // unsubscribe
            return () => {
                event$.unsubscribe();
                this.subscriberCount--;
            };
        });
    }

    /**
     * register to window resize events
     */
    private subscribeToWindowResizeEvent(): void {
        this.windowResize$
            .pipe(
                takeWhile(_ => this.subscriberCount > 0),
                debounceAnimationFrame()
            )
            .subscribe(() => this.shared$.next());
    }
}

/** rxJs debounce animation frame operator */
function debounceAnimationFrame<T>(): OperatorFunction<T, T> {

    return (source$: Observable<T>): Observable<T> => {

        let resizeFired = false;
        let drawing = false;

        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

        const obs = new Observable<T>((observer) => {
            function drawResize(): void {
                if (resizeFired === true) {
                    resizeFired = false;
                    requestAnimationFrame(() => {
                        observer.next();
                        drawResize();
                    });
                } else {
                    drawing = false;
                }
            }

            source$.subscribe(() => {
                if (drawing === false) {
                    resizeFired = true;
                    drawResize();
                }
            });
        });
        return obs;
    };
}
