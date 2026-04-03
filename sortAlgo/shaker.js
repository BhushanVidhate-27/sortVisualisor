


// Shaker Sort (Cocktail Sort) implementation compatible with visualizer
async function shakerSort() {
    if(display.innerHTML === "")alert("Add Elements First");
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return;
    let n = arr.length;
    let start = 0;
    let end = n - 1;
    let swapped = true;

    while (swapped) {
        swapped = false;

        // left to right
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                await changeBars(i, i + 1);
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        // right to left
        for (let i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                await changeBars(i, i + 1);
                swapped = true;
            }
        }

        start++;
    }
}