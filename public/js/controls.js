document.addEventListener("keydown", KeyDownHandler);

let onAxisChange = new Event("onAxisChange");

let lastAxis = {
    horizontal: 1,
    vertical: 0,
};

let axis = {
    horizontal: 1,
    vertical: 0,
};

function KeyDownHandler(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    let { horizontal, vertical } = axis;

    const keyPressed = event.keyCode;
    const goingUp = vertical === -1;
    const goingDown = vertical === 1;
    const goingRight = horizontal === 1;
    const goingLeft = horizontal === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        horizontal = -1;
        vertical = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        horizontal = 0;
        vertical = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        horizontal = 1;
        vertical = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        horizontal = 0;
        vertical = 1;
    }

    axis = { horizontal, vertical };

    if (axisChange()) {
        Object.assign(lastAxis, axis);
        document.dispatchEvent(onAxisChange);
    }
}

export { axis };

function axisChange() {
    return (
        axis.vertical != lastAxis.vertical || axis.horizontal != lastAxis.horizontal
    );
}