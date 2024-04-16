type DrawLineProps = Draw & {
    lineColor: string;
}

export const drawLine = ({ prevPos, currentPos, ctx, lineColor }: DrawLineProps) => {
    const { x: currX, y: currY } = currentPos;
    const lineWidth = 5;

    let startPoint = prevPos ?? currentPos;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    // from prev(if !null) to curr pos
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);

    // we don't want pixel points
    // we want stroke
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
}