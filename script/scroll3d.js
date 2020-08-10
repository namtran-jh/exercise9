let lastScrollTop = 0;

// ALIAS for detecting upScroll or downScroll
const UP = false;
const DOWN = true;
const direction = { type: null };

// variables for clientHeight and offsetHeight of document
const limit = document.getElementById("masthead1").offsetHeight + document.getElementById("cardScroller1").offsetHeight;

if (window.pageYOffset > limit) document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY = `-500px`;

if (document.documentElement.clientWidth > 1200) {
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
}