// selection sort

async function selection() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    if(display.innerHTML === "")alert("Add Elements First");
    for (let i = 0; i < arr.length; i++) {
        let si = i;
        for (let j = i+1; j < arr.length; j++) {
            if (arr[j] < arr[si]) {
                si = j;
            }
        }
        changeBars(i, si);
        await slp(50);
    }
}