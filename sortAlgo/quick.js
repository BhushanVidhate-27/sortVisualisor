// quick sort algo

async function partition(st, end) {
    let piv = arr[end];
    let i = st-1;
    for(let j=st; j<end; j++) {
        if(arr[j] <= piv) {
            i++;
            await changeBars(i, j);
            await slp(40);
        }
    }
    await changeBars(i+1, end);
    await slp(30);
    return i+1;
}
async function q(st, end) {
    if(st >= end) return;
    let pvtIdx = await partition(st, end);
    await q(st, pvtIdx - 1);
    await q(pvtIdx + 1, end);
}
async function qs() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    await q(0, arr.length - 1);
}