let lastScrollTop = 0;

// ALIAS for detecting upScroll or downScroll
const UP = false;
const DOWN = true;
const direction = { type: null };

document.addEventListener("scroll", function() {
    let scroll = window.pageYOffset;

    let initialPosition = document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY;

    if (initialPosition === "") initialPosition = "0px";
    // console.log({ scroll, initialPosition, lastScrollTop });

    if ((scroll - lastScrollTop) >= 5) {
        lastScrollTop = scroll;
        direction.type = DOWN;
    }

    if ((scroll - lastScrollTop) <= -5) {
        lastScrollTop = scroll;
        direction.type = UP;
    }

    if (direction.type !== null) {
        if (direction.type) {
            document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY = `${parseInt(initialPosition)-1}px`;
            direction.type = null;
        } else {
            document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY = `${parseInt(initialPosition)+1}px`;
            direction.type = null;
        }
    }
}, false);