// merge sort

async function merge(st, mid, end) {
    let temp = [];
    let i = st;
    let j = mid + 1;

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        } else {
            temp.push(arr[j]);
            j++;
        }
    }

    while (i <= mid) {
        temp.push(arr[i]);
        i++;
    }

    while (j <= end) {
        temp.push(arr[j]);
        j++;
    }

    for (let k = 0; k <= end - st; k++) {
        arr[st + k] = temp[k];
        await updateBar(st + k, temp[k]);
        await slp(20);
    }
}

async function d(st, end) {
    
    if (st >= end) return;

    let mid = Math.floor((st + end) / 2);

    await d(st, mid);
    await d(mid + 1, end);
    await merge(st, mid, end);
}
async function divide() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    await d(0, arr.length - 1);
}