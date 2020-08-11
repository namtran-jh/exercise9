let lastScrollTop = 0;

// ALIAS for detecting upScroll or downScroll
const UP = false;
const DOWN = true;
const direction = { type: null };

// variables for clientHeight and offsetHeight of document
const masthead2 = document.getElementById("masthead1").offsetHeight + document.getElementById("cardScroller1").offsetHeight;
const creditImage = masthead2 + document.getElementById("masthead2").offsetHeight + document.getElementsByClassName("info1")[0].offsetHeight + document.getElementById("cardScroller2").offsetHeight + document.getElementsByClassName("info2")[0].offsetHeight;

if (document.documentElement.clientWidth > 1200) {
    if (window.pageYOffset > masthead2) document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY = `-500px`;
    // if (window.pageYOffset < creditImage) document.getElementsByClassName("creditImage")[0].style.backgroundPositionY = `0px`;

    document.addEventListener("scroll", function() {
        let scroll = window.pageYOffset;

        let initialPositionMasthead = document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY;
        let initialPositionCreditImage = document.getElementsByClassName("creditImage")[0].style.backgroundPositionY;

        if (initialPositionMasthead === "") initialPositionMasthead = "0px";
        if (initialPositionCreditImage === "") initialPositionCreditImage = "0px";
        // console.log({ scroll, initialPosition, lastScrollTop });

        if ((scroll - lastScrollTop) >= 2) {
            lastScrollTop = scroll;
            direction.type = DOWN;
        }

        if ((scroll - lastScrollTop) <= -2) {
            lastScrollTop = scroll;
            direction.type = UP;
        }

        if (direction.type !== null) {
            if (direction.type) {
                document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY = `${parseInt(initialPositionMasthead)-1}px`;
                document.getElementsByClassName("creditImage")[0].style.backgroundPositionY = `${parseInt(initialPositionMasthead)-1}px`;
                direction.type = null;
            } else {
                document.getElementsByClassName("masthead2Main")[0].style.backgroundPositionY = `${parseInt(initialPositionMasthead)+1}px`;
                document.getElementsByClassName("creditImage")[0].style.backgroundPositionY = `${parseInt(initialPositionMasthead)+1}px`;
                direction.type = null;
            }
        }
    }, false);
}