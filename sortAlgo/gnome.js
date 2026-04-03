async function gnome() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] > arr[i+1]) {
            await changeBars(i, i+1);
            await slp(20);
            i--;
            i--;
        }
    }
    
}