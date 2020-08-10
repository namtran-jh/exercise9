// Variables of inner HTML
let cardScroller1 = "";
let cardScroller2 = "";

// Variables for interval
let cardMoveInterval;

// Variables of position drag
let tmpScrollLeft = 0;

card.forEach(val => {
    if (val.id === 7 || val.id <= 3)
        cardScroller1 += `
            <div id="cardCarousel${val.id}" class="cardScrollerMain-cardCarousel">
                <div class="cardCarousel">
                    <div class="cardCarousel-background">
                        <img class="cardCarousel-backgroundImage" src=${val.link} />
                        <div class="cardCarousel-backgroundReact">
                            <img src="./images/icon/flaticon/like24px.png" alt="love" />
                            <h4> 382 </h4>
                        </div>
                    </div>
                    <div class="cardCarousel-info">
                        <h2> ${val.name} </h2>
                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do aiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <div class="cardCarousel-option">
                        <div class="cardCarousel-optionComment">
                            <img src="./images/icon/flaticon/commentgrey24px.png" alt="comment" />
                            <h4> 374 comments </h4>
                        </div>
                        <div class="cardCarousel-optionButton">
                            <img src="./images/icon/flaticon/moreblack32px.png" alt="more" />
                        </div>
                    </div>
                </div>
            </div>
        `
    if (val.id >= 4)
        cardScroller2 += `
        <div id="cardCarousel${val.id}" class="cardScrollerMain-cardCarousel">
            <div class="cardCarousel">
                <div class="cardCarousel-background">
                    <img class="cardCarousel-backgroundImage" src=${val.link} />
                    <div class="cardCarousel-backgroundReact">
                        <img src="./images/icon/flaticon/like24px.png" alt="love" />
                        <h4> 382 </h4>
                    </div>
                </div>
                <div class="cardCarousel-info">
                    <h2> ${val.name} </h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do aiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </div>
                <div class="cardCarousel-option">
                    <div class="cardCarousel-optionComment">
                        <img src="./images/icon/flaticon/commentgrey24px.png" alt="comment" />
                        <h4> 374 comments </h4>
                    </div>
                    <div class="cardCarousel-optionButton">
                        <img src="./images/icon/flaticon/moreblack32px.png" alt="more" />
                    </div>
                </div>
            </div>
        </div>
        `
});

document.getElementById("cardScrollerList1").innerHTML = cardScroller1;
document.getElementById("cardScrollerList2").innerHTML = cardScroller2;

// handle move card by arrow
function cardMove(index) {
    let tmp = 1000;
    cardMoveInterval = setInterval(function() {
        if (tmp > 0) {
            document.getElementsByClassName("cardScrollerMain-list")[index - 1].scrollLeft -= 2;
            tmp -= 2;
        } else {
            clearInterval(cardMoveInterval);
        }
    }, 1)
}

// handle drag card by mouse
function dragCard(index) {
    const element = document.getElementsByClassName("cardScrollerMain-list")[index - 1];
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the card list's new position
        tmpScrollLeft = element.scrollLeft - pos1;
        element.scrollLeft = tmpScrollLeft;
    }

    function closeDragElement() {
        element.scrollLeft = tmpScrollLeft;

        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragCard(1);
dragCard(2);