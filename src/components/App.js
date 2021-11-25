import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, filter, map, debounceTime, buffer } from "rxjs/operators";

export default function App() {

    var Status = "start" | "stop" | "wait";
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(Status);

    useEffect(() => {
        const subscribe$ = new Subject();
        interval(1000)
        .pipe(
            takeUntil(subscribe$)
        )
        .subscribe(() => {
            if (status === "start") {
                setTime(val => val + 1000);
            }
        });
        return () => {
            subscribe$.next();
            subscribe$.complete();
        };
    }, [status]);
 
    const start = () => {
        setStatus("start");
    };
 
    const stop = () => {
        setStatus("stop");
        setTime(0);
    };
 
    const reset = () => {
        setTime(0);
    };
 
    const wait = () => {

        const mouse$ = fromEvent(document, 'click')

        const buff$ = mouse$.pipe(
            debounceTime(300),
        )

        const click$ = mouse$.pipe(
            buffer(buff$),
            map(list => {
                return list.length;
            }),
            filter(x => x === 2),
        )

        click$.subscribe(() => {
            console.log('doubleclick')
            setStatus("wait")
        })

    };

    return (
        <div>
            <h1> Stopwatch </h1>
            <h2> {new Date(time).toISOString().slice(11, 19)} </h2>
            <button onClick={start}> Start </button>
            <button onClick={stop}> Stop </button>
            <button onClick={reset}> Reset </button>
            <button onClick={wait}> Wait </button>
        </div>
    );
}
