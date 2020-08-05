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

// Declare interval for zoomIn/zoomOut background's effect
let zoomInInterval, zoomOutInterval;

// Declare left top of background image
const containerW = document.getElementsByClassName("mastheadMain")[0].offsetWidth,
    containerH = document.getElementsByClassName("mastheadMain")[0].offsetHeight;
let imageW = containerW - document.getElementById("masthead1Background").offsetWidth;
let imageH = containerH - document.getElementById("masthead1Background").offsetHeight;

// Load data from local storage
(function loadData() {
    if (localStorage.getItem("backgroundImage")) {
        let data = JSON.parse(localStorage.getItem("backgroundImage"));
        backgroundImage.size = tmpSize = data.size;
        document.getElementById("sliderRange").value = backgroundImage.sliderRange = tmpSliderRange = data.sliderRange;
        backgroundImage.top = data.top;
        backgroundImage.left = data.left;
        document.getElementById("masthead1Background").style.width = `${data.size}%`;
    }
})();

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
    }, 1000);
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
    document.getElementById("sliderRange").value = 0;
    changeSliderRange();
}

// handle change slider range by moving dot
function changeSliderRange() {
    const sliderRange = document.getElementById("sliderRange").value;
    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");

    if (sliderRange == 100) {
        resize(document.getElementById("masthead1Background"), sliderRange);
        tmpSliderRange = 100;
        zoomIn.style.opacity = "1.0";
        updateLeftTop();
        return;
    } else { zoomIn.style.opacity = ".5" };
    if (sliderRange == 1) {
        resize(document.getElementById("masthead1Background"), sliderRange);
        tmpSliderRange = 1;
        zoomOut.style.opacity = "1.0";
        updateLeftTop();
        return;
    } else { zoomOut.style.opacity = ".5" };

    zoomImage(parseInt(backgroundImage.size), parseInt(sliderRange));
    updateLeftTop();
}

// handle zoom image
function zoomImage(size, sliderRange) {
    tmpSliderRange = sliderRange;
    tmpSize = 99 + sliderRange;
    document.getElementById("masthead1Background").style.width = `${tmpSize}%`;
}

// handle drag picture (top/bottom/left/right)
function dragPicture() {

}

// handle save changes
function saveReposition() {
    // close reposition with fade effect
    fadeClosingEffect();

    // set values: set value of slider; size and position of background image
    backgroundImage.sliderRange = tmpSliderRange;
    backgroundImage.size = tmpSize;
    document.getElementById("sliderRange").value = backgroundImage.sliderRange;
    document.getElementById("masthead1Background").style.width = `${backgroundImage.size}%`;

    // alert notification
    showNotification("success");

    // save to local storage
    localStorage.setItem("backgroundImage", JSON.stringify(backgroundImage));
}

// handle close this function
function closeReposition() {
    // close reposition with fade effect
    fadeClosingEffect();

    // reset values: set value of slider; size and position of background image
    tmpSliderRange = backgroundImage.sliderRange;
    document.getElementById("sliderRange").value = backgroundImage.sliderRange;
    resize(document.getElementById("masthead1Background"));

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
function resize(target, point) {
    const resize = setInterval(function() {
        if (point) {
            if (point == 1) {
                clearInterval(zoomInInterval);
                clearInterval(zoomOutInterval);
                zoomOutInterval = setInterval(zoomOut, 10);
            }
            if (point == 100) {
                clearInterval(zoomInInterval);
                clearInterval(zoomOutInterval);
                zoomInInterval = setInterval(zoomIn, 10);
            }
            clearInterval(resize);
        } else {
            if (tmpSize > backgroundImage.size) {
                tmpSize--;
                target.style.width = `${tmpSize}%`;
            } else if (tmpSize < backgroundImage.size) {
                tmpSize++;
                target.style.width = `${tmpSize}%`;
            } else {
                clearInterval(resize);
            }
        }
    }, 10)

    function zoomOut() {
        if (tmpSize > 99) {
            tmpSize--;
            target.style.width = `${tmpSize}%`;
        } else {
            clearInterval(zoomOutInterval);
        }
    }

    function zoomIn() {
        if (tmpSize < 200) {
            tmpSize++;
            target.style.width = `${tmpSize}%`;
        } else {
            clearInterval(zoomInInterval);
        }
    }
}

document.getElementById("dragButton").addEventListener('click', function() {
    fadeOpeningEffect();
    dragElement(document.getElementById("masthead1Background"));
});

/*
document.getElementById("masthead1Background").addEventListener('mousemove', function() {
    console.log("now");
});

document.getElementById("masthead1Background").addEventListener('mouseup', function() {
    dragPicture();
});
*/

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    document.getElementById("masthead1Background").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if (parseInt(elmnt.style.top) < parseInt(imageH)) {
            elmnt.style.top = imageH + "px";
        } else if (parseInt(elmnt.style.top) > 0) {
            elmnt.style.top = "0px";
        } else { elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; }
        if (parseInt(elmnt.style.left) < parseInt(imageW)) {
            elmnt.style.left = imageW + "px";
        } else if (parseInt(elmnt.style.left) > 0) {
            elmnt.style.left = "0px";
        } else { elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; }
        console.log({ top: elmnt.style.top, left: elmnt.style.left })
            // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// use a variable catch event to switch state on of draggable
// catch event mousedown, mousemove (drag), mouseup