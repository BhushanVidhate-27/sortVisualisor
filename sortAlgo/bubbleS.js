//Bubble sort
async function Bubble() {
    if(display.innerHTML == "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                changeBars(j+1, j);
            }
            await slp(1);
        }
    }
}