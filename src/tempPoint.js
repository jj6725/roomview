class TempPoint {
    constructor(x, y, temp) {
        this.x = x
        this.y = y
        this.value = temp
        this.shouldDraw = true
        this.color = colorMap(temp)
    }

    update(temp) {
        if (this.value === temp) {
            this.shouldDraw = false
        } else {
            this.value = temp
            this.shouldDraw = true
            const hotColor = color(255, 51, 0)
            const coldColor = color(0, 136, 255)
            this.color = colorMap(temp)
        }
    }

    draw() {
        fill(this.color)
        noStroke()
        square(this.x+BLOCK_SIZE/2, this.y+BLOCK_SIZE/2, BLOCK_SIZE)
        fill(0)
        text(parseFloat(this.value).toFixed(1), this.x+BLOCK_SIZE/2, this.y+BLOCK_SIZE/2)
    }
}