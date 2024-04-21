export const secToMin = (sec: number): string => {
    return `${Math.floor(sec / 60)}:${sec % 60}`;
};
