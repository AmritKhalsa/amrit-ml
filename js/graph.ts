export class graph {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private gap: number;
    private start: number;
    private scaleX: number;
    private scaleY: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, gap: number, scale: number, scaleX: number = 1, scaleY: number = 1) { 
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.scaleX = scale* scaleX;
        this.scaleY = scale* scaleY;
        this.start = (this.width) / (2*this.gap*this.scaleX);
    }
    drawFunction(fx: (x: number) => number, resolution: number, fill = "black") {
        let x, y;
        this.ctx.beginPath();

        this.ctx.strokeStyle = fill;
        if (this.start < 1/5) {
            this.start = 1;
        }
        resolution = resolution/this.start;
        ({ x, y } = this.pointToPX(-1 * (this.start), fx(-1 * (this.start))));
        this.ctx.moveTo(x, y);
        for (let i = -1 * (this.start * resolution); i <= (this.start * resolution); i++) {
            ({ x, y } = this.pointToPX(i / resolution, fx(i / resolution)));
            this.ctx.lineTo(x, y)
        }

        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.ctx.strokeStyle = "black";
    }
    createPoints(points: [number, number][], color: string) {
        for (let [x, y] of points) {
            this.createPoint(x, y, 15, color);
        }
    }

    createPoint(x:number, y:number, size:number, fill: string, scaleX: number = this.scaleX, scaleY: number = this.scaleY) {
        let { x: px, y: py } = this.pointToPX(x, y, scaleX, scaleY);
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(px - size / 2, py - size / 2, size, size);
    }

    pointToPX(x:number, y:number, scaleX: number = this.scaleX, scaleY: number = this.scaleY) {
        console.log(scaleX, scaleY);
        return {
            x: this.width / 2 + (this.gap * x) * scaleX,
            y: this.height / 2 - (this.gap * y) * scaleY
        };
    }

    drawGrid() {
        
        let x, y;
        this.ctx.font = "15px Arial";
        
        this.ctx.beginPath();
        for (let i = 0; this.width / 2 - this.gap * i >= 0; i++) {
            this.createPoint(i, 0, 12, "black", 1, 1);
            this.createPoint(-i, 0, 12, "black", 1, 1);

            ({ x, y } = this.pointToPX(i, 0, 1, 1));
            this.ctx.fillText((i / this.scaleX).toExponential(), x + 5, y + 15);
            ({ x, y } = this.pointToPX(-i, 0, 1, 1));
            this.ctx.fillText((-i / this.scaleX).toExponential(), x + 5, y + 15);


            this.ctx.moveTo(this.width / 2 + this.gap * i, 0);
            this.ctx.lineTo(this.width / 2 + this.gap * i, this.height);
            this.ctx.stroke();
            this.ctx.moveTo(this.width / 2 - this.gap * i, 0);
            this.ctx.lineTo(this.width / 2 - this.gap * i, this.height);
            this.ctx.stroke();
        }


        for (let i = 0; this.height / 2 - this.gap * i >= 0; i++) {
            this.createPoint(0, i, 12, "black", 1, 1);
            this.createPoint(0, -i, 12, "black", 1, 1);

            ({ x, y } = this.pointToPX(0, i, 1, 1));
            this.ctx.fillText((i / this.scaleY).toExponential(), x + 5, y + 15);
            ({ x, y } = this.pointToPX(0, -i, 1, 1));
            this.ctx.fillText((-i / this.scaleY).toExponential(), x + 5, y + 15);


            this.ctx.moveTo(0, this.height / 2 + this.gap * i);
            this.ctx.lineTo(this.width, this.height / 2 + this.gap * i);
            this.ctx.stroke();
            this.ctx.moveTo(0, this.height / 2 - this.gap * i);
            this.ctx.lineTo(this.width, this.height / 2 - this.gap * i);
            this.ctx.stroke();
        }
    }
}