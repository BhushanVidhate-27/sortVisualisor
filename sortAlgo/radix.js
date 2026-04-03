async function radix() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    let m = Math.max(...arr);
    let md = String(m).length;

    for (let i = 1; Math.floor(m / i) > 0; i *= 10) {
        let bin = Array.from({ length: 10 }, () => []);
        for (let j = 0; j < arr.length; j++) {
            let ele = Math.floor(arr[j] / i) % 10 || 0;
            bin[ele].push(arr[j]);
        }
        let p = 0;
        for(let x=0; x<bin.length; x++) {
            for(let y=0; y<bin[x].length; y++) {
                arr[p] = bin[x][y];
                await updateBar(p, bin[x][y]);
                p++;
            }
        }
        await slp(50);
    }
}