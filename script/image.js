// Get natualWidth and offsetWidth of background image
const imgNatW = document.getElementById("masthead1Background").naturalWidth;
const imgOffW = document.getElementById("masthead1Background").offsetWidth;

// Decalre global variable for saving to local storage and compare with temporary state
const backgroundImage = {
    size: Math.round((imgOffW / imgNatW) * 100),
    sliderRange: parseInt(document.getElementById("sliderRange").value),
    top: 0,
    left: 0
}

// Declare temporary variables for saving size and slider range when modifying background image
let tmpSize = backgroundImage.size;
let tmpSliderRange = backgroundImage.sliderRange;
let tmpTop = backgroundImage.top;
let tmpLeft = backgroundImage.left;

// Declare interval for zoomIn/zoomOut background's effect
let zoomInInterval, zoomOutInterval, lefttopTimeout;

// Declare variable for catching event (switch state)
let draggableImage = false;

// Declare left top of background image
let containerW = document.getElementsByClassName("mastheadMain")[0].offsetWidth,
    containerH = document.getElementsByClassName("mastheadMain")[0].offsetHeight;
let imageW = containerW - document.getElementById("masthead1Background").offsetWidth;
let imageH = containerH - document.getElementById("masthead1Background").offsetHeight;

// Load data from local storage
(function loadData() {
    if (localStorage.getItem("backgroundImage")) {
        let data = JSON.parse(localStorage.getItem("backgroundImage"));
        backgroundImage.size = tmpSize = data.size;
        backgroundImage.sliderRange = tmpSliderRange = data.sliderRange;
        backgroundImage.top = tmpTop = data.top;
        backgroundImage.left = tmpLeft = data.left;
        document.getElementById("masthead1Background").style.width = `${data.size}%`;
        document.getElementById("sliderRange").value = data.sliderRange;
        document.getElementById("masthead1Background").style.top = `${data.top}px`;
        document.getElementById("masthead1Background").style.left = `${data.left}px`;
    }
})();

// window onresize
window.onresize = function() {
    if (containerW > document.getElementsByClassName("mastheadMain")[0].offsetWidth || containerH > document.getElementsByClassName("mastheadMain")[0].offsetHeight) {
        backgroundImage.top = document.getElementsByClassName("mastheadMain")[0].offsetHeight - document.getElementById("masthead1Background").offsetHeight;
        backgroundImage.left = document.getElementsByClassName("mastheadMain")[0].offsetWidth - document.getElementById("masthead1Background").offsetWidth;

        document.getElementById("masthead1Background").style.top = `${backgroundImage.top}px`;
        document.getElementById("masthead1Background").style.left = `${backgroundImage.left}px`;

        localStorage.setItem("backgroundImage", JSON.stringify(backgroundImage));
    }

    containerH = document.getElementsByClassName("mastheadMain")[0].offsetHeight;
    containerW = document.getElementsByClassName("mastheadMain")[0].offsetWidth;
    updateLeftTop();
}
updateLeftTop();

// Function update left top of background image
function updateLeftTop() {
    imageW = containerW - document.getElementById("masthead1Background").offsetWidth;
    imageH = containerH - document.getElementById("masthead1Background").offsetHeight;
}

// Function fade in target
function fadeIn(target, time) {
    const fadeInEffect = setInterval(function() {
        target.style.zIndex = "0";
        if (!target.style.opacity) {
            target.style.opacity = 0;
        }
        if (target.style.opacity < 1) {
            target.style.opacity = parseFloat(target.style.opacity) + 0.1;
        } else {
            clearInterval(fadeInEffect);
        }
    }, time)
}

// Function fade out target
function fadeOut(target, time) {
    const fadeOutEffect = setInterval(function() {
        if (!target.style.opacity) {
            target.style.opacity = 1;
        }
        if (target.style.opacity > 0) {
            target.style.opacity -= 0.1;
        } else {
            clearInterval(fadeOutEffect);
        }
    }, time);
}

// Function change zIndex when fade out
function changeZIndex(array) {
    const zIndex = setTimeout(function() {
        array.forEach(val => document.getElementById(val).style.zIndex = "-1");
        clearTimeout(zIndex);
    }, 500);
}

// btn fade content above on background img and appear all reposition-btn
function fadeOpeningEffect() {
    // fadeOut
    fadeOut(document.getElementById("masthead1Button"), 10); // masthead1Button disappear
    fadeOut(document.getElementById("masthead1Title"), 20); // masthead1Title disappear
    fadeOut(document.getElementById("masthead1Detail"), 30); // masthead1Detail disappear 

    // fadeIn
    fadeIn(document.getElementById("masthead1Zoom"), 100); // masthead1Zoom appear
    fadeIn(document.getElementById("masthead1SaveClose"), 100); // masthead1Save appear

    // change zIndex
    changeZIndex(["masthead1Button", "masthead1Title", "masthead1Detail"]);
}

// btn fade reposition-btn and appear all content above on background img
function fadeClosingEffect() {
    // fadeOut
    fadeOut(document.getElementById("masthead1Zoom"), 10); // masthead1Zoom disappear
    fadeOut(document.getElementById("masthead1SaveClose"), 10); // masthead1Save disappear

    // fadeIn
    fadeIn(document.getElementById("masthead1Button"), 30); // masthead1Button appear
    fadeIn(document.getElementById("masthead1Title"), 40); // masthead1Title appear
    fadeIn(document.getElementById("masthead1Detail"), 50); // masthead1Detail appear 

    // change zIndex
    changeZIndex(["masthead1Zoom", "masthead1SaveClose"]);
}

// btn zoomIn effect
function zoomInEffect() {
    document.getElementById("sliderRange").value = 100;
    changeSliderRange();
}

// btn zoomOut effect
function zoomOutEffect() {
    document.getElementById("sliderRange").value = 1;
    changeSliderRange();
}

// handle change slider range by moving dot
async function changeSliderRange() {
    // lock drag button
    draggableImage = true;
    switchDragMode();

    const sliderRange = document.getElementById("sliderRange").value;
    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");

    if (sliderRange == 100) {
        tmpSliderRange = 100;
        await resize(document.getElementById("masthead1Background"), sliderRange);
        console.log("1");
        zoomIn.style.opacity = "1.0";
        updateLeftTop();
        switchDragMode();
        return;
    } else { zoomIn.style.opacity = ".5" };
    if (sliderRange == 1) {
        tmpSliderRange = 1;
        await reposition(document.getElementById("masthead1Background"), sliderRange);
        console.log("1");
        await resize(document.getElementById("masthead1Background"), sliderRange);
        console.log("2");
        zoomOut.style.opacity = "1.0";
        updateLeftTop();
        switchDragMode();
        return;
    } else { zoomOut.style.opacity = ".5" };

    zoomImage(parseInt(backgroundImage.size), parseInt(sliderRange));
    updateLeftTop();
    switchDragMode();
    setImagePosition(document.getElementById("masthead1Background"));
    setUIPosition(document.getElementById("masthead1Background"));
}

// handle zoom image
function zoomImage(size, sliderRange) {
    tmpSliderRange = sliderRange;
    tmpSize = 99 + sliderRange;
    document.getElementById("masthead1Background").style.width = `${tmpSize}%`;
}

// handle save changes
async function saveReposition() {
    // switch draggable mode
    draggableImage = true;
    switchDragMode();

    setUIPosition(document.getElementById("masthead1Background"));
    // set values: set value of slider; size and position of background image
    backgroundImage.sliderRange = tmpSliderRange;
    backgroundImage.size = tmpSize;
    backgroundImage.top = tmpTop;
    backgroundImage.left = tmpLeft;
    document.getElementById("sliderRange").value = backgroundImage.sliderRange;
    document.getElementById("masthead1Background").style.width = `${backgroundImage.size}%`;
    document.getElementById("masthead1Background").style.top = `${backgroundImage.top}px`;
    document.getElementById("masthead1Background").style.left = `${backgroundImage.left}px`;

    // close reposition with fade effect and update imageW, imageH
    updateLeftTop();
    fadeClosingEffect();

    // alert notification
    showNotification("success");

    // save to local storage
    localStorage.setItem("backgroundImage", JSON.stringify(backgroundImage));
}

// handle close this function
async function closeReposition() {
    // switch draggable mode
    draggableImage = true;
    switchDragMode();

    // reset values: set value of slider; size and position of background image
    tmpSliderRange = backgroundImage.sliderRange;
    document.getElementById("sliderRange").value = backgroundImage.sliderRange;
    await reposition(document.getElementById("masthead1Background"));
    await resize(document.getElementById("masthead1Background"));

    // close reposition with fade effect and update imageW, imageH
    updateLeftTop();
    fadeClosingEffect();

    // alert notification
    showNotification("warning");
}

// show notification
function showNotification(id) {
    document.getElementById(id).style.display = "flex";
    document.getElementById(id).style.opacity = "1.0";
    setTimeout(function() {
        fadeOut(document.getElementById(id), 50);
        setTimeout(function() {
            document.getElementById(id).style.display = "none";
            clearTimeout();
        }, 1000)
        clearTimeout();
    }, 2000)
}

// resize background image
function zoomOut(target) {
    return new Promise(resolve => {
        const zoomOutInterval = setInterval(function() {
            if (tmpSize > 99) {
                tmpSize--;
                target.style.width = `${tmpSize}%`;
            } else {
                clearInterval(zoomOutInterval);
                resolve("done");
            }
        }, 5)
    })
}

function zoomIn(target) {
    return new Promise(resolve => {
        const zoomInInterval = setInterval(function() {
            if (tmpSize < 200) {
                tmpSize++;
                target.style.width = `${tmpSize}%`;
            } else {
                clearInterval(zoomInInterval);
                resolve("done");
            }
        }, 5)
    })
}

function resize(target, point) {
    // console.log("d");
    return new Promise(resolve => {
        // console.log("e");
        const resize = setInterval(async function() {
            // console.log("f");
            if (point) {
                if (point == 1) {
                    clearInterval(zoomInInterval);
                    clearInterval(zoomOutInterval);
                    await zoomOut(target);
                }
                if (point == 100) {
                    clearInterval(zoomInInterval);
                    clearInterval(zoomOutInterval);
                    await zoomIn(target);
                }
                clearInterval(resize);
                resolve("done");
            } else {
                if (tmpSize > backgroundImage.size) {
                    tmpSize--;
                    target.style.width = `${tmpSize}%`;
                } else if (tmpSize < backgroundImage.size) {
                    tmpSize++;
                    target.style.width = `${tmpSize}%`;
                } else {
                    clearInterval(resize);
                    resolve("done");
                }
            }
        }, 5)
    })


}

// reposition background image
function reposition(target, point) {
    // console.log("a")
    return new Promise(resolve => {
        // console.log("b");
        const reposition = setInterval(function() {
            // console.log("c");
            if (point) {
                if (tmpTop < 0) {
                    if (tmpTop < -10 && tmpTop % 2 === 0) tmpTop += 10;
                    else if (tmpTop < -10 && tmpTop % 2 !== 0) tmpTop += 11;
                    else tmpTop++;
                    target.style.top = `${tmpTop}px`;
                }
                if (tmpLeft < 0) {
                    if (tmpLeft < -10 && tmpLeft % 2 === 0) tmpLeft += 10;
                    else if (tmpLeft < -10 && tmpLeft % 2 !== 0) tmpLeft += 11;
                    else tmpLeft++;
                    target.style.left = `${tmpLeft}px`;
                }
                if (tmpTop === 0 && tmpLeft === 0) {
                    clearInterval(reposition);
                    resolve("done");
                }
            } else {
                if (tmpTop > backgroundImage.top) {
                    if (tmpTop > backgroundImage.top + 10 && tmpTop % 2 === 0) tmpTop -= 10;
                    else if (tmpTop > backgroundImage.top + 10 && tmpTop % 2 !== 0) tmpTop -= 11;
                    else tmpTop--;
                    target.style.top = `${tmpTop}px`;
                } else if (tmpTop < backgroundImage.top) {
                    if (tmpTop < backgroundImage.top - 10 && tmpTop % 2 === 0) tmpTop += 10;
                    else if (tmpTop < backgroundImage.top - 10 && tmpTop % 2 !== 0) tmpTop += 11;
                    else tmpTop++;
                    target.style.top = `${tmpTop}px`;
                }
                if (tmpLeft > backgroundImage.left) {
                    if (tmpLeft > backgroundImage.left + 10 && tmpLeft % 2 === 0) tmpLeft -= 10;
                    else if (tmpLeft > backgroundImage.left + 10 && tmpLeft % 2 !== 0) tmpLeft -= 11;
                    else tmpLeft--;
                    target.style.left = `${tmpLeft}px`;
                } else if (tmpLeft < backgroundImage.left) {
                    if (tmpLeft < backgroundImage.left - 10 && tmpLeft % 2 === 0) tmpLeft += 10;
                    else if (tmpLeft < backgroundImage.left - 10 && tmpLeft % 2 !== 0) tmpLeft += 11;
                    else tmpLeft++;
                    target.style.left = `${tmpLeft}px`;
                }
                if (tmpTop === backgroundImage.top && tmpLeft === backgroundImage.left) {
                    clearInterval(reposition);
                    resolve("done");
                }
            }
        }, 1)
    })
}

// set new position for image
function setImagePosition(element, pos1, pos2) {
    if (!pos1) pos1 = 0;
    if (!pos2) pos2 = 0;

    /* if (parseInt(element.style.top) < parseInt(imageH)) {
        element.style.top = `${imageH}px`;
        tmpTop = imageH;
    } else if (parseInt(element.style.top) > 0) {
        element.style.top = "0px";
        tmpTop = 0;
    } else {
        element.style.top = `${element.offsetTop - pos2}px`;
        tmpTop = element.offsetTop - pos2;
    } */

    tmpTop = element.offsetTop - pos2;
    element.style.top = `${element.offsetTop - pos2}px`;

    /* if (parseInt(element.style.left) < parseInt(imageW)) {
        element.style.left = `${imageW}px`;
        tmpLeft = imageW;
    } else if (parseInt(element.style.left) > 0) {
        element.style.left = "0px";
        tmpLeft = 0;
    } else {
        element.style.left = `${element.offsetLeft - pos1}px`;
        tmpLeft = element.offsetLeft - pos1;
    } */

    tmpLeft = element.offsetLeft - pos1;
    element.style.left = `${element.offsetLeft - pos1}px`;
}

// set UI Position
function setUIPosition(element) {
    if (tmpTop > 0) {
        tmpTop = 0;
        element.style.top = `0px`;
    } else {
        if (tmpTop < parseInt(imageH)) {
            tmpTop = parseInt(imageH);
            element.style.top = `${imageH}px`;
        } else element.style.top = `${tmpTop}px`;
    }

    if (tmpLeft > 0) {
        tmpLeft = 0;
        element.style.left = `0px`;
    } else {
        if (tmpLeft < parseInt(imageW)) {
            tmpLeft = parseInt(imageW);
            element.style.left = `${imageW}px`;
        } else element.style.left = `${tmpLeft}px`;
    }
}

// switch draggableImage to the others
function switchDragMode() {
    draggableImage = !draggableImage;
    if (draggableImage) document.getElementById("masthead1Background").style.cursor = "move";
    else document.getElementById("masthead1Background").style.cursor = "default";
}

// handle drag image (top/bottom/left/right)
function dragPicture() {
    const element = document.getElementById("masthead1Background");
    let pos1 = 0,
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
        if (draggableImage === true) document.onmousemove = elementDrag;
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
        setImagePosition(element, pos1, pos2);
    }

    function closeDragElement() {
        setUIPosition(element);

        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// GAME START
document.getElementById("dragButton").addEventListener('click', function() {
    fadeOpeningEffect(); // zoom
    switchDragMode(); // move
    dragPicture(); // move
});