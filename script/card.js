let cardScroller1 = "";
let cardScroller2 = "";

let cardMoveInterval;

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
    let tmp = 100;
    cardMoveInterval = setInterval(function() {
        if (tmp > 0) {
            document.getElementsByClassName("cardScrollerMain-list")[index - 1].scrollLeft -= 1;
            tmp--;
        } else {
            clearInterval(cardMoveInterval);
        }
    }, 1)
}