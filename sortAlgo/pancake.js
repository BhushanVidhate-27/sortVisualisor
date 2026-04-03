


function findMax(n) {
    let mi = 0;
    for (let i = 1; i < n; i++) {
        if (arr[i] > arr[mi]) {
            mi = i;
        }
    }
    return mi;
}

async function flip(k) {
    let i = 0;
    while (i < k) {
        await changeBars(i, k);
        i++;
        k--;
    }
}

async function pancakeSort() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    for (let curr = arr.length; curr > 1; curr--) {
        let mi = findMax(curr);

        if (mi !== curr - 1) {
            // bring max to front
            await flip(mi);
            // move max to end
            await flip(curr - 1);
        }
    }
}