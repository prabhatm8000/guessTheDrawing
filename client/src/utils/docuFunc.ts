import { secToMin } from "./time";

export function getCurrentWord(): string {
    const wordDiv = document.querySelector("#word");
    return wordDiv ? wordDiv.innerHTML : "";
}

export function updateTimer(n: number, text: string = "") {
    const timerDiv = document.getElementById("timer");
    if (timerDiv) timerDiv.innerText = text + secToMin(n);
}
