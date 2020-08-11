// Variables of inner HTML
let cardScroller1 = "";
let cardScroller2 = "";
let card1200pxScroller = "";

// Variables for interval
let cardMoveInterval, card1200pxInterval;

// Variables of position drag mode (if true it's not moving, can drag)
let cardMoving = true;

// Variables for getting width of each card in card list
let widthChange = parseInt(getComputedStyle(document.getElementsByClassName("cardScrollerMain-cardCarousel")[0]).width) + 20;

// Load cards to inner HTML (UI)
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

    card1200pxScroller += `
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
document.getElementById("cardScrollerList1-1200px").innerHTML = card1200pxScroller;
document.getElementById("cardScrollerList2-1200px").innerHTML = card1200pxScroller;

// switch card moving mode
function switchCardMoving() {
    cardMoving = !cardMoving;
}

// handle move card by arrow
function cardMove(index) {
    if (cardMoving) {
        switchCardMoving();

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
}

// handle move card by arrow
async function card1200pxMove(index, reverse) {
    if (cardMoving) {
        switchCardMoving();

        const target = document.getElementById(`cardScrollerList${index}-1200px`);
        const firstChildren = target.children[0];
        const lastChildren = target.children[target.children.length - 1];
        let interval;

        if (!reverse) {
            interval = 0;
            target.scrollLeft = 0;
            await new Promise(resolve => {
                card1200pxInterval = setInterval(function() {
                    if (interval < widthChange) {
                        interval += 2;
                        target.scrollLeft += 2;
                    } else {
                        clearInterval(card1200pxInterval);
                        resolve("done");
                    }
                }, (1000 / (widthChange / 2)))
            })

            target.scrollLeft = 0;
            target.removeChild(target.childNodes[0]);
            target.appendChild(firstChildren);

            switchCardMoving();
        } else {
            interval = widthChange;
            target.scrollLeft = widthChange;
            target.insertBefore(lastChildren, target.firstChild);

            await new Promise(resolve => {
                card1200pxInterval = setInterval(function() {
                    if (interval > 0) {
                        interval -= 2;
                        target.scrollLeft -= 2;
                    } else {
                        clearInterval(card1200pxInterval);
                        resolve("done");
                    }
                }, (1000 / (widthChange / 2)))
            })

            target.scrollLeft = 0;

            switchCardMoving();
        }
    }
}

// handle drag card by mouse
function dragCard(index) {
    if (cardMoving) {
        switchCardMoving();

        const element = document.getElementById(`cardScrollerList${index}-1200px`);
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        let posFinal = false;

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
            // set the image's new position
            if (pos1 > 0) posFinal = true;
        }

        function closeDragElement() {
            if (posFinal) card1200pxMove(index);
            else card1200pxMove(index, true);
            posFinal = false;

            // stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }

        switchCardMoving();
    }
}

dragCard(1);
dragCard(2);