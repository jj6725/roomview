// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, temp) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.w = BLOCK_SIZE;
    this.h = BLOCK_SIZE;
    this.value = temp;
    const hotColor = color(255, 51, 0)
    const coldColor = color(0, 136, 255)
    this.color = colorMap(temp)
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update(temp) {
    if(temp) {
      this.value = temp
      const hotColor = color(255, 51, 0)
      const coldColor = color(0, 136, 255)
      this.color = colorMap(temp)
    }

    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    fill(this.color);
    // Different fill based on state
    if (this.dragging || this.rollover) {
      stroke(255);
      strokeWeight(2);
    } else {
      stroke(0);
    }
    circle(this.x+10, this.y+10, 20);
    fill(0)
    noStroke();
    text(parseFloat(this.value).toFixed(1), this.x, this.y)
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}