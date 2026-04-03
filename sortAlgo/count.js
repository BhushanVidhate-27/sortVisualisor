//count sort 

let isSorting = false;

//main array -> arr
//count array -> arrCnt
//position array -> pos

async function countS() {
    if(display.innerHTML === "")alert("Add Elements First");
    if (isSorting) return;
    isSorting = true;
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) {
        isSorting = false;
        return;
    }
    const m = Math.max(...arr);
    let arrCnt = new Array(m+1).fill(0);
    for(let i=0; i<arr.length; i++) {
        arrCnt[arr[i]]++;
    }

    let pos = new Array(m+1).fill(0);
    pos[0] = arrCnt[0];
    for(let i=1; i<arrCnt.length; i++) {
        pos[i] = pos[i-1] + arrCnt[i];
    }
    let sorted = new Array(arr.length).fill(0);

    for(let i=arr.length-1; i>=0; i--) {
        let val = arr[i];
        pos[val]--;
        sorted[pos[val]] = val;
        // Only visualize position, do not change height during counting phase
        await updateBar(pos[val]);
        await slp(10);
    }
    for(let i=0; i<arr.length; i++) {
        arr[i] = sorted[i];
        await updateBar(i);
        await slp(20);
    }
    isSorting = false;
}
