// insertion sort
async function insertion() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;

    for (let i = 1; i < arr.length; i++) {
        let curr = arr[i];
        let currIdx = i;
        let prev = i - 1;
        while (prev >= 0 && arr[prev] > curr) {
            arr[prev + 1] = arr[prev];
            updateBar(prev+1, arr[prev]);
            await slp(10);
            prev--;
        }
        arr[prev + 1] = curr;
        updateBar(prev+1, curr);



    }
}