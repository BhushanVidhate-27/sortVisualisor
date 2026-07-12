// Centralized database and generator functions for 12 sorting algorithms
window.SORT_ALGORITHMS = {
    bubble: {
        name: "Bubble Sort",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        inPlace: "Yes",
        description: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        code: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare arr[j] and arr[j+1]
            if (arr[j] > arr[j+1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
        generator: function* (arr) {
            const n = arr.length;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Initializing array length parameter." };
            for (let i = 0; i < n; i++) {
                yield { type: 'line', line: 3, arr: [...arr], desc: `Starting pass ${i + 1} of Bubble Sort.` };
                for (let j = 0; j < n - i - 1; j++) {
                    yield { 
                        type: 'compare', 
                        indices: [j, j + 1], 
                        arr: [...arr], 
                        line: 5, 
                        desc: `Comparing elements at index ${j} (${arr[j]}) and index ${j+1} (${arr[j+1]})` 
                    };
                    if (arr[j] > arr[j + 1]) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        yield { 
                            type: 'swap', 
                            indices: [j, j + 1], 
                            arr: [...arr], 
                            line: 7, 
                            desc: `Swapped index ${j} and index ${j+1} (${arr[j]} ↔ ${arr[j+1]})` 
                        };
                    }
                }
            }
            yield { type: 'line', line: 11, arr: [...arr], desc: "Bubble sort completed." };
        }
    },

    selection: {
        name: "Selection Sort",
        bestTime: "O(n²)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "No",
        inPlace: "Yes",
        description: "Divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the smallest element in the unsorted sublist and moves it to the beginning of the unsorted sublist.",
        code: `function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
        generator: function* (arr) {
            const n = arr.length;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Reading array properties." };
            for (let i = 0; i < n - 1; i++) {
                let minIdx = i;
                yield { type: 'line', line: 4, indices: [minIdx], arr: [...arr], desc: `Assuming current index ${i} (${arr[i]}) is minimum.` };
                for (let j = i + 1; j < n; j++) {
                    yield { 
                        type: 'compare', 
                        indices: [j, minIdx], 
                        arr: [...arr], 
                        line: 6, 
                        desc: `Checking if element at index ${j} (${arr[j]}) is smaller than current minimum (${arr[minIdx]})` 
                    };
                    if (arr[j] < arr[minIdx]) {
                        minIdx = j;
                        yield { type: 'line', line: 7, indices: [minIdx], arr: [...arr], desc: `Found new minimum element (${arr[minIdx]}) at index ${minIdx}` };
                    }
                }
                if (minIdx !== i) {
                    let temp = arr[i];
                    arr[i] = arr[minIdx];
                    arr[minIdx] = temp;
                    yield { 
                        type: 'swap', 
                        indices: [i, minIdx], 
                        arr: [...arr], 
                        line: 11, 
                        desc: `Swapping element at index ${i} (${arr[i]}) with minimum element (${arr[minIdx]})` 
                    };
                }
            }
            yield { type: 'line', line: 15, arr: [...arr], desc: "Selection sort completed." };
        }
    },

    insertion: {
        name: "Insertion Sort",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        inPlace: "Yes",
        description: "Builds the final sorted array one item at a time. It takes each element from the unsorted part and inserts it into its correct position within the sorted part.",
        code: `function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        generator: function* (arr) {
            const n = arr.length;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Analyzing array length." };
            for (let i = 1; i < n; i++) {
                let key = arr[i];
                let j = i - 1;
                yield { type: 'line', line: 4, indices: [i], arr: [...arr], desc: `Selecting key ${key} at index ${i}.` };
                
                while (j >= 0) {
                    yield { 
                        type: 'compare', 
                        indices: [j, j+1], 
                        arr: [...arr], 
                        line: 6, 
                        desc: `Comparing element at index ${j} (${arr[j]}) with key (${key}).` 
                    };
                    if (arr[j] > key) {
                        arr[j + 1] = arr[j];
                        yield { 
                            type: 'swap', 
                            indices: [j, j + 1], 
                            arr: [...arr], 
                            line: 7, 
                            desc: `Shifting element at index ${j} (${arr[j]}) to index ${j + 1}` 
                        };
                        j--;
                    } else {
                        break;
                    }
                }
                arr[j + 1] = key;
                yield { 
                    type: 'write', 
                    indices: [j + 1], 
                    arr: [...arr], 
                    line: 10, 
                    desc: `Inserting key ${key} at correct position index ${j + 1}` 
                };
            }
            yield { type: 'line', line: 12, arr: [...arr], desc: "Insertion sort completed." };
        }
    },

    merge: {
        name: "Merge Sort",
        bestTime: "O(n log n)",
        avgTime: "O(n log n)",
        worstTime: "O(n log n)",
        space: "O(n)",
        stable: "Yes",
        inPlace: "No",
        description: "A divide-and-conquer algorithm. It recursively splits the array in half, sorts each half, and merges the sorted halves back together.",
        code: `function mergeSort(arr, start, end) {
    if (start >= end) return;
    let mid = Math.floor((start + end) / 2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
}
// Merge logic: merges two sorted halves`,
        generator: function* (arr) {
            yield* mergeSortHelper(0, arr.length - 1);

            function* mergeSortHelper(start, end) {
                yield { type: 'line', line: 2, indices: [start, end], arr: [...arr], desc: `Splitting segment from index ${start} to ${end}` };
                if (start >= end) return;

                let mid = Math.floor((start + end) / 2);
                yield { type: 'line', line: 3, indices: [mid], arr: [...arr], desc: `Midpoint located at index ${mid}` };
                yield* mergeSortHelper(start, mid);
                yield* mergeSortHelper(mid + 1, end);
                yield* merge(start, mid, end);
            }

            function* merge(start, mid, end) {
                let temp = [];
                let i = start;
                let j = mid + 1;

                yield { type: 'line', line: 6, indices: [start, mid, end], arr: [...arr], desc: `Merging subarrays: [${start}...${mid}] and [${mid+1}...${end}]` };

                while (i <= mid && j <= end) {
                    yield { 
                        type: 'compare', 
                        indices: [i, j], 
                        arr: [...arr], 
                        line: 6, 
                        desc: `Comparing left index ${i} (${arr[i]}) and right index ${j} (${arr[j]})` 
                    };
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

                for (let k = 0; k < temp.length; k++) {
                    arr[start + k] = temp[k];
                    yield { 
                        type: 'write', 
                        indices: [start + k], 
                        arr: [...arr], 
                        line: 6, 
                        desc: `Writing merged element ${temp[k]} back to array index ${start + k}` 
                    };
                }
            }
        }
    },

    quick: {
        name: "Quick Sort",
        bestTime: "O(n log n)",
        avgTime: "O(n log n)",
        worstTime: "O(n²)",
        space: "O(log n)",
        stable: "No",
        inPlace: "Yes",
        description: "A divide-and-conquer algorithm. It picks an element as a pivot and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.",
        code: `function quickSort(arr, start, end) {
    if (start >= end) return;
    let pivotIndex = partition(arr, start, end);
    quickSort(arr, start, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, end);
}
// Partition: swaps elements around pivot`,
        generator: function* (arr) {
            yield* quickSortHelper(0, arr.length - 1);

            function* quickSortHelper(start, end) {
                yield { type: 'line', line: 2, indices: [start, end], arr: [...arr], desc: `QuickSort partitioning bounds: [${start} to ${end}]` };
                if (start >= end) return;
                let pivotIndex = yield* partition(start, end);
                yield* quickSortHelper(start, pivotIndex - 1);
                yield* quickSortHelper(pivotIndex + 1, end);
            }

            function* partition(start, end) {
                let pivotValue = arr[end];
                let i = start - 1;
                yield { type: 'pivot', indices: [end], arr: [...arr], line: 3, desc: `Selected pivot ${pivotValue} at index ${end}` };

                for (let j = start; j < end; j++) {
                    yield { 
                        type: 'compare', 
                        indices: [j, end], 
                        arr: [...arr], 
                        line: 3, 
                        desc: `Comparing element at index ${j} (${arr[j]}) with pivot (${pivotValue})` 
                    };
                    if (arr[j] <= pivotValue) {
                        i++;
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                        yield { 
                            type: 'swap', 
                            indices: [i, j], 
                            arr: [...arr], 
                            line: 3, 
                            desc: `Swapping indices ${i} and ${j} to place element on left of pivot` 
                        };
                    }
                }
                let temp = arr[i + 1];
                arr[i + 1] = arr[end];
                arr[end] = temp;
                yield { 
                    type: 'swap', 
                    indices: [i + 1, end], 
                    arr: [...arr], 
                    line: 3, 
                    desc: `Moving pivot to its final sorted position at index ${i + 1}` 
                };
                return i + 1;
            }
        }
    },

    heap: {
        name: "Heap Sort",
        bestTime: "O(n log n)",
        avgTime: "O(n log n)",
        worstTime: "O(n log n)",
        space: "O(1)",
        stable: "No",
        inPlace: "Yes",
        description: "Visualizes the array as a binary tree. It first builds a max-heap, then repeatedly extracts the maximum element and restores the heap property.",
        code: `function heapSort(arr) {
    let n = arr.length;
    for (let i = Math.floor(n/2) - 1; i >= 0; i--)
        maxHeapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        maxHeapify(arr, i, 0);
    }
}`,
        generator: function* (arr) {
            let n = arr.length;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Beginning heap structure construction." };
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                yield* maxHeapify(n, i);
            }
            yield { type: 'line', line: 5, arr: [...arr], desc: "Max-heap constructed. Starting extraction phase." };
            for (let i = n - 1; i > 0; i--) {
                let temp = arr[0];
                arr[0] = arr[i];
                arr[i] = temp;
                yield { 
                    type: 'swap', 
                    indices: [0, i], 
                    arr: [...arr], 
                    line: 6, 
                    desc: `Swapped root (max value) to index ${i}` 
                };
                yield* maxHeapify(i, 0);
            }
            yield { type: 'line', line: 9, arr: [...arr], desc: "Heap sort completed." };

            function* maxHeapify(size, idx) {
                let largest = idx;
                let left = 2 * idx + 1;
                let right = 2 * idx + 2;

                if (left < size) {
                    yield { type: 'compare', indices: [left, largest], arr: [...arr], line: 4, desc: `Comparing left child (${arr[left]}) and parent (${arr[largest]})` };
                    if (arr[left] > arr[largest]) {
                        largest = left;
                    }
                }

                if (right < size) {
                    yield { type: 'compare', indices: [right, largest], arr: [...arr], line: 4, desc: `Comparing right child (${arr[right]}) and current largest (${arr[largest]})` };
                    if (arr[right] > arr[largest]) {
                        largest = right;
                    }
                }

                if (largest !== idx) {
                    let temp = arr[idx];
                    arr[idx] = arr[largest];
                    arr[largest] = temp;
                    yield { 
                        type: 'swap', 
                        indices: [idx, largest], 
                        arr: [...arr], 
                        line: 4, 
                        desc: `Heap structural violation found. Swapping index ${idx} ↔ ${largest}` 
                    };
                    yield* maxHeapify(size, largest);
                }
            }
        }
    },

    counting: {
        name: "Counting Sort",
        bestTime: "O(n+k)",
        avgTime: "O(n+k)",
        worstTime: "O(n+k)",
        space: "O(n+k)",
        stable: "Yes",
        inPlace: "No",
        description: "An integer sorting algorithm that counts the number of occurrences of each unique element. It uses these counts to calculate the position of each element in the output array.",
        code: `function countingSort(arr) {
    let max = Math.max(...arr);
    let count = new Array(max + 1).fill(0);
    for (let x of arr) count[x]++;
    for (let i = 1; i <= max; i++) 
        count[i] += count[i-1];
    let output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
}`,
        generator: function* (arr) {
            let n = arr.length;
            if (n === 0) return;
            let max = Math.max(...arr);
            yield { type: 'line', line: 2, arr: [...arr], desc: `Determining max value in array: ${max}` };
            
            let count = new Array(max + 1).fill(0);
            yield { type: 'line', line: 3, arr: [...arr], desc: "Initializing count buffer array." };

            for (let i = 0; i < n; i++) {
                count[arr[i]]++;
                yield { type: 'compare', indices: [i], arr: [...arr], line: 4, desc: `Incrementing frequency of element ${arr[i]}` };
            }

            for (let i = 1; i <= max; i++) {
                count[i] += count[i - 1];
            }
            yield { type: 'line', line: 5, arr: [...arr], desc: "Accumulating frequency prefix sums." };

            let output = new Array(n).fill(0);
            for (let i = n - 1; i >= 0; i--) {
                let val = arr[i];
                let pos = count[val] - 1;
                output[pos] = val;
                count[val]--;
                yield { type: 'compare', indices: [i], arr: [...arr], line: 9, desc: `Placing value ${val} at output index ${pos}` };
            }

            for (let i = 0; i < n; i++) {
                arr[i] = output[i];
                yield { type: 'write', indices: [i], arr: [...arr], line: 12, desc: `Copying index ${i} (${arr[i]}) from temporary output array` };
            }
        }
    },

    gnome: {
        name: "Gnome Sort",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        inPlace: "Yes",
        description: "Similar to Insertion Sort, but moves an element to its proper position by a series of swaps, much like a garden gnome sorting flower pots.",
        code: `function gnomeSort(arr) {
    let index = 0;
    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            swap(arr, index, index - 1);
            index--;
        }
    }
}`,
        generator: function* (arr) {
            let n = arr.length;
            let index = 0;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Gnome starts at index 0." };

            while (index < n) {
                if (index === 0) {
                    index++;
                    yield { type: 'line', line: 4, arr: [...arr], desc: "Boundary index 0, moving gnome forward to 1." };
                }
                yield { 
                    type: 'compare', 
                    indices: [index, index - 1], 
                    arr: [...arr], 
                    line: 4, 
                    desc: `Checking sorting order: is index ${index} (${arr[index]}) >= index ${index-1} (${arr[index-1]})?` 
                };
                if (arr[index] >= arr[index - 1]) {
                    index++;
                } else {
                    let temp = arr[index];
                    arr[index] = arr[index - 1];
                    arr[index - 1] = temp;
                    yield { 
                        type: 'swap', 
                        indices: [index, index - 1], 
                        arr: [...arr], 
                        line: 7, 
                        desc: `Out of order! Swapped gnome positions ${index} and ${index-1}` 
                    };
                    index--;
                }
            }
            yield { type: 'line', line: 11, arr: [...arr], desc: "Gnome sort completed." };
        }
    },

    oddeven: {
        name: "Odd-Even Sort",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        inPlace: "Yes",
        description: "A parallel sorting algorithm that operates by comparing all odd/even indexed adjacent pairs in the array.",
        code: `function oddEvenSort(arr) {
    let isSorted = false;
    while (!isSorted) {
        isSorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                isSorted = false;
            }
        }
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                isSorted = false;
            }
        }
    }
}`,
        generator: function* (arr) {
            let n = arr.length;
            let isSorted = false;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Initializing sorting state flag." };

            while (!isSorted) {
                isSorted = true;
                yield { type: 'line', line: 5, arr: [...arr], desc: "Starting Odd Phase comparisons..." };
                for (let i = 1; i < n - 1; i += 2) {
                    yield { 
                        type: 'compare', 
                        indices: [i, i + 1], 
                        arr: [...arr], 
                        line: 5, 
                        desc: `Odd Phase: Comparing index ${i} (${arr[i]}) and index ${i+1} (${arr[i+1]})` 
                    };
                    if (arr[i] > arr[i + 1]) {
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        yield { 
                            type: 'swap', 
                            indices: [i, i + 1], 
                            arr: [...arr], 
                            line: 6, 
                            desc: `Odd Phase: Swapped index ${i} and index ${i+1}` 
                        };
                        isSorted = false;
                    }
                }

                yield { type: 'line', line: 11, arr: [...arr], desc: "Starting Even Phase comparisons..." };
                for (let i = 0; i < n - 1; i += 2) {
                    yield { 
                        type: 'compare', 
                        indices: [i, i + 1], 
                        arr: [...arr], 
                        line: 11, 
                        desc: `Even Phase: Comparing index ${i} (${arr[i]}) and index ${i+1} (${arr[i+1]})` 
                    };
                    if (arr[i] > arr[i + 1]) {
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        yield { 
                            type: 'swap', 
                            indices: [i, i + 1], 
                            arr: [...arr], 
                            line: 12, 
                            desc: `Even Phase: Swapped index ${i} and index ${i+1}` 
                        };
                        isSorted = false;
                    }
                }
            }
            yield { type: 'line', line: 17, arr: [...arr], desc: "Odd-Even sort completed successfully." };
        }
    },

    pancake: {
        name: "Pancake Sort",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "No",
        inPlace: "Yes",
        description: "Sorts the array using a single operation: flipping the array prefix elements. It is named after sorting a stack of pancakes with a spatula.",
        code: `function pancakeSort(arr) {
    for (let size = arr.length; size > 1; size--) {
        let maxIdx = findMaxIdx(arr, size);
        if (maxIdx !== size - 1) {
            flip(arr, maxIdx);
            flip(arr, size - 1);
        }
    }
}`,
        generator: function* (arr) {
            let n = arr.length;
            yield { type: 'line', line: 2, arr: [...arr], desc: "Beginning Pancake Sort loop." };

            for (let currSize = n; currSize > 1; currSize--) {
                let maxIdx = 0;
                for (let i = 1; i < currSize; i++) {
                    yield { 
                        type: 'compare', 
                        indices: [i, maxIdx], 
                        arr: [...arr], 
                        line: 3, 
                        desc: `Finding max element: comparing index ${i} (${arr[i]}) and current max index ${maxIdx} (${arr[maxIdx]})` 
                    };
                    if (arr[i] > arr[maxIdx]) {
                        maxIdx = i;
                    }
                }
                
                if (maxIdx !== currSize - 1) {
                    yield { type: 'line', line: 5, indices: [maxIdx], arr: [...arr], desc: `Flipping max element at index ${maxIdx} to front` };
                    yield* flip(maxIdx);
                    yield { type: 'line', line: 6, indices: [currSize - 1], arr: [...arr], desc: `Flipping element to correct final position index ${currSize - 1}` };
                    yield* flip(currSize - 1);
                }
            }
            yield { type: 'line', line: 9, arr: [...arr], desc: "Pancake sort completed." };

            function* flip(k) {
                let start = 0;
                while (start < k) {
                    let temp = arr[start];
                    arr[start] = arr[k];
                    arr[k] = temp;
                    yield { 
                        type: 'swap', 
                        indices: [start, k], 
                        arr: [...arr], 
                        line: 5, 
                        desc: `Flipping: Swapped start index ${start} and flip pivot index ${k}` 
                    };
                    start++;
                    k--;
                }
            }
        }
    },

    radix: {
        name: "Radix Sort",
        bestTime: "O(nk)",
        avgTime: "O(nk)",
        worstTime: "O(nk)",
        space: "O(n+k)",
        stable: "Yes",
        inPlace: "No",
        description: "Sorts numbers digit by digit starting from the least significant digit (LSD) to the most significant digit (MSD) using Counting Sort as a subroutine.",
        code: `function radixSort(arr) {
    let max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}`,
        generator: function* (arr) {
            let max = Math.max(...arr);
            yield { type: 'line', line: 2, arr: [...arr], desc: `Identified maximum element: ${max} to calculate digit passes.` };

            for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
                yield { type: 'line', line: 3, arr: [...arr], desc: `Starting counting sort subroutine for digit place: 10^${Math.log10(exp)}.` };
                yield* countingSortForRadix(exp);
            }
            yield { type: 'line', line: 6, arr: [...arr], desc: "Radix sort completed." };

            function* countingSortForRadix(exponent) {
                let n = arr.length;
                let output = new Array(n).fill(0);
                let count = new Array(10).fill(0);

                for (let i = 0; i < n; i++) {
                    let digit = Math.floor(arr[i] / exponent) % 10;
                    count[digit]++;
                    yield { type: 'compare', indices: [i], arr: [...arr], line: 4, desc: `Radix: Analyzing digit at ${exponent}s place of ${arr[i]}` };
                }

                for (let i = 1; i < 10; i++) {
                    count[i] += count[i - 1];
                }

                for (let i = n - 1; i >= 0; i--) {
                    let digit = Math.floor(arr[i] / exponent) % 10;
                    let pos = count[digit] - 1;
                    output[pos] = arr[i];
                    count[digit]--;
                    yield { type: 'compare', indices: [i], arr: [...arr], line: 4, desc: `Placing element ${arr[i]} into digit slot index ${pos}` };
                }

                for (let i = 0; i < n; i++) {
                    arr[i] = output[i];
                    yield { type: 'write', indices: [i], arr: [...arr], line: 4, desc: `Copying sorted digit elements back: index ${i} (${arr[i]})` };
                }
            }
        }
    },

    shaker: {
        name: "Shaker (Cocktail) Sort",
        bestTime: "O(n)",
        avgTime: "O(n²)",
        worstTime: "O(n²)",
        space: "O(1)",
        stable: "Yes",
        inPlace: "Yes",
        description: "A variation of Bubble Sort that traverses the array in both directions alternately, bubble-sorting larger values to the end and smaller values to the start.",
        code: `function shakerSort(arr) {
    let start = 0, end = arr.length - 1;
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (let i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                swapped = true;
            }
        }
        start++;
    }
}`,
        generator: function* (arr) {
            let start = 0;
            let end = arr.length - 1;
            let swapped = true;
            yield { type: 'line', line: 2, arr: [...arr], desc: `Initializing bidirectional bounds: [${start} to ${end}]` };

            while (swapped) {
                swapped = false;
                yield { type: 'line', line: 5, arr: [...arr], desc: "Performing left-to-right pass..." };
                for (let i = start; i < end; i++) {
                    yield { 
                        type: 'compare', 
                        indices: [i, i + 1], 
                        arr: [...arr], 
                        line: 6, 
                        desc: `Forward Pass: Comparing index ${i} (${arr[i]}) and index ${i+1} (${arr[i+1]})` 
                    };
                    if (arr[i] > arr[i + 1]) {
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        yield { 
                            type: 'swap', 
                            indices: [i, i + 1], 
                            arr: [...arr], 
                            line: 7, 
                            desc: `Forward Pass: Swapped index ${i} and index ${i+1}` 
                        };
                        swapped = true;
                    }
                }

                if (!swapped) break;
                swapped = false;
                end--;
                yield { type: 'line', line: 12, arr: [...arr], desc: `Reduced end-bound to index ${end}. Performing right-to-left pass...` };

                for (let i = end - 1; i >= start; i--) {
                    yield { 
                        type: 'compare', 
                        indices: [i, i + 1], 
                        arr: [...arr], 
                        line: 14, 
                        desc: `Backward Pass: Comparing index ${i} (${arr[i]}) and index ${i+1} (${arr[i+1]})` 
                    };
                    if (arr[i] > arr[i + 1]) {
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        yield { 
                            type: 'swap', 
                            indices: [i, i + 1], 
                            arr: [...arr], 
                            line: 15, 
                            desc: `Backward Pass: Swapped index ${i} and index ${i+1}` 
                        };
                        swapped = true;
                    }
                }
                start++;
                yield { type: 'line', line: 19, arr: [...arr], desc: `Increased start-bound to index ${start}.` };
            }
            yield { type: 'line', line: 21, arr: [...arr], desc: "Shaker sort completed successfully." };
        }
    }
};
