# 🚀 AlgoLab - High-Fidelity Sorting Analytics Visualizer

**AlgoLab** is an interactive, premium-grade Single-Page Application (SPA) designed to visualize, debug, and synthesize auditory feedback for 12 classic sorting algorithms. 

Built using pure, zero-dependency, modern Vanilla Javascript and CSS, the visualizer leverages **Javascript Generator Functions** to implement an execution engine capable of real-time speed adjustments, pausing/resuming, and step-by-step debugger controls.

---

## 🎨 Premium Features

- **Glassmorphic UI**: High-end Obsidian dark theme with neon gradients, visual cues, and smooth responsive grid design.
- **Audio Sonification**: Utilizes the browser's native **Web Audio API** to generate real-time oscillator frequencies mapped to array values. Includes a volume toggle for pleasant ambient tones.
- **Interactive Execution Engine**:
  - ⏯️ **Play/Pause**: Interrupt execution at any point.
  - 🔄 **Real-Time Speed Tuning**: Seamlessly scale animation speed from standard ticks up to near-instant execution.
  - 🪜 **Step-by-Step Debugger Mode**: Single-step through the algorithms operation-by-operation to analyze sorting logic.
  - ✏️ **Custom Array Injector**: Validate and inject user-specified numeric arrays to test boundary conditions (e.g. `[12, 1, 99, 45]`).
- **Educational Instrumentation**:
  - ⏱️ **Live Telemetry Dashboard**: Monitors total execution time down to milliseconds, comparison counts, and array write counts.
  - 📊 **Algorithm Complexity Specs Card**: Direct access to Big-O time (best, average, worst) and space complexity analysis, stability flags, and in-place status.
  - 📝 **Active Code Tracer**: Live Javascript code display for the selected algorithm, highlighting the exact line of execution in real-time.
  - 📟 **Action Log Terminal**: A scrolling log terminal outputting readable trace info of comparisons, swaps, and splits.

---

## 📂 Project Architecture

```
sortVisualisor/
│── index.html        # Main Entry Point & Dashboard UI
│── style.css         # Glassmorphic Layout, Grid, and Color States
│── app.js            # Visualizer State-Machine & Web Audio Engine
│── algorithms.js     # Sorting Generators & Algorithm Metadata
│── readme.md         # Documentation
```

---

## 📊 Algorithms Included

1. **Bubble Sort**
2. **Selection Sort**
3. **Insertion Sort**
4. **Merge Sort** (Recursive using `yield*`)
5. **Quick Sort** (Recursive using `yield*`)
6. **Heap Sort** (Max-Heapify based)
7. **Counting Sort** (O(N+K) non-comparison sorting)
8. **Gnome Sort**
9. **Odd-Even Sort**
10. **Pancake Sort** (Spatula flipping sorting)
11. **Radix Sort** (Digit-by-digit LSD counting sort)
12. **Shaker Sort** (Bidirectional Cocktail sort)

---

## ⚙️ How to Run Locally

Since this project has **zero external build steps or dependencies**, you can run it directly:

1. Clone this repository:
   ```bash
   git clone https://github.com/BhushanVidhate-27/sortVisualisor.git
   ```
2. Open the directory:
   ```bash
   cd sortVisualisor
   ```
3. Open `index.html` directly in any web browser (`file:///...`) or serve it locally:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

---

## 🧠 System Architecture: Generators for Animation Control

A common challenge in visualizers is animating algorithms without freezing the browser's UI thread or losing control of execution loops (e.g., trying to pause an ongoing nested `for` loop). 

**AlgoLab** solves this by modeling every algorithm as a **Generator Function** (`function*`). Instead of directly moving bars, the algorithms `yield` descriptive state checkpoints:
```javascript
yield { 
    type: 'compare', 
    indices: [j, j + 1], 
    arr: [...arr], 
    line: 5, 
    desc: `Comparing element ${arr[j]} and ${arr[j+1]}` 
};
```
The central loop in `app.js` pulls these steps sequentially. This decouples the algorithm logic from the render loops, enabling:
- Real-time pausing.
- Step-by-step forward execution.
- Dynamically altering animation delay between iterations.
- Perfect audio synchronization.

---

## 👨‍💻 Author
**Bhushan Vidhate**