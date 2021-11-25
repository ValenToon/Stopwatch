import React, { Fragment, useState, useEffect } from "react";
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});
console.log('just after subscribe');

useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
});

function ControlButtons() {
    return (
        <Fragment>
            <button>Start</button>
            <button>Stop</button>
            <button>Wait</button>
            <button>Reset</button>
        </Fragment>
    )
}

export default ControlButtons;