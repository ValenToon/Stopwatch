import React from "react";

const hours = 0, minets = 0, seconds = 0;

if (seconds === 60) {
    seconds = 0;
    minets = minets + 1;
}
if (minets === 60) {
    minets = 0;
    hours = hours + 1;
}

function Timer() {
    return (
        <p>{hours}:{minets}:{seconds}</p>
    )
}

export default Timer;