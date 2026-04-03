
// Odd-Even Sort (Brick Sort)
async function oddEvenSort() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    let n = arr.length;
    let sorted = false;

    while (!sorted) {
        sorted = true;

        // Odd phase
        for (let i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                await changeBars(i, i + 1);
                sorted = false;
            }
        }

        // Even phase
        for (let i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                await changeBars(i, i + 1);
                sorted = false;
            }
        }
    }
}
