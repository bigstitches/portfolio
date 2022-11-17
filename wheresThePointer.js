// global variables
const elements = document.getElementsByTagName("td");
const height = elements[1].getBoundingClientRect().height;
const width = elements[1].getBoundingClientRect().width;
const boxes = [];
var doOver = true;
var attempts = 0;
var consecutiveAnswers = [];
var counter = 0;


// establish location of each <td> element in the boxes array
for (let index = 0; index < elements.length; index++) {
    const xyPos = { xPos: elements[index].getBoundingClientRect().x, yPos: elements[index].getBoundingClientRect().y };
    boxes.push(xyPos);
    consecutiveAnswers.push(index);
}

// matches the mouse click x and y with the index of the boxes array
function correlated(inputX, inputY) {
    // loop through boxes to see which matches then return the index 
    for (let index = 0; index < boxes.length; index++) {
        if (((boxes[index].xPos <= inputX) && (inputX < boxes[index].xPos + height)) 
            && ((boxes[index].yPos <= inputY) && (inputY < boxes[index].yPos + width))) 
        {
            console.log(index);
            return index;
        }
    }
    // still here?
    return null;
}

function clickPos(e) {
    let cursorX = e.pageX;
    let cursorY = e.pageY;
    let index = correlated(cursorX, cursorY);

    if (index === null && doOver){
        document.getElementById("notinmybox").innerHTML = "You lose.  You clicked outside the boxes.";
        Array.from(elements).forEach(item => item.className = "ready");
        Array.from(elements).forEach(item => item.innerHTML= "");
        doOver = false;
        counter = 0;
    }
    else if (index === null && !doOver) {
        attempts++;
        document.getElementById("notinmybox").innerHTML = `Attempt: ${attempts}`;
        Array.from(elements).forEach(item => item.className = "ready");
        Array.from(elements).forEach(item => item.innerHTML= "");
        counter = 0;
    }
    else {
        elements[index].innerHTML = `${cursorX}, ${cursorY}`;
        elements[index].className = "clicked";
        if (consecutiveAnswers.includes(index)){
            // if you get the boxes correct consecutively 
            counter++
        }
    }

    if (counter === boxes.length) {
        document.getElementById("notinmybox").innerHTML = "You Win!";
    }
    
}

document.addEventListener("click", clickPos);


