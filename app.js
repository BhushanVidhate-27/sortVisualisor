//show input value
let ipv = document.querySelector(".pINP");
let inp = document.querySelector(".rangeINP");
let display = document.querySelector(".graphArea");
inp.addEventListener("input" , (event)=> {
    ipv.innerText = inp.value;
});
let arr = [];
//genrate candles

async function slp(i) {
    return new Promise((res, rej)=>{setTimeout(res, i)});
}

function addCandle(i) {
    let candle = document.createElement("div");
    candle.style.backgroundColor = "white";
    candle.style.width = "5px";
    candle.style.height = `${arr[i]*5}px`;
    candle.style.margin = "1px";
    display.appendChild(candle);
}

function genrate() {
    arr = [];
    let s = inp.value;
    for(let i=0; i<s; i++) {
        arr.push(i+1);
    }
    render(arr);
}
async function render(arr) {
    
    display.innerHTML = "";
    for(let i=0; i<arr.length; i++) {
        addCandle(i);
        await slp(25);
    }
}

//suffle candles

async function sfl() {
    if(display.innerHTML === "")alert("Add Elements First");
    for(let i=0; i<arr.length; i++) {
        let rc = Math.floor(Math.random()*(i+1));
        [arr[i], arr[rc]] = [arr[rc], arr[i]];
        display.innerHTML = "";
        for(let j=0; j<arr.length; j++) {
            addCandle(j);
        }
        await slp(30);
    }
    
}

async function changeBars(a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
    //change arr[i] with arr[j] and rebuild display scene
    display.innerHTML = "";
    for(let j=0; j<arr.length; j++) {
        addCandle(j);
    }
    await slp(30);
}

async function updateBar(i, val) {
    if (val !== undefined) {
        arr[i] = val;
    }
    let bars = display.children;
    if (bars[i]) {
        bars[i].style.height = `${arr[i]*5}px`;
    }
    await slp(10);
}

//Bubble sort
async function Bubble() {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                await changeBars(j+1, j);
                await slp(30);
            }
        }
    }
}