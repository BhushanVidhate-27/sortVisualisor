// Core Visualizer Application Engine
class SortingVisualizer {
    constructor() {
        this.arr = [];
        this.originalArr = [];
        this.state = 'idle'; // 'idle', 'playing', 'paused', 'finished'
        this.currentAlgo = 'bubble';
        this.generator = null;
        
        // Settings
        this.size = 50;
        this.speed = 15; // default delay in ms
        
        // Telemetry Counters
        this.comparisons = 0;
        this.writes = 0;
        
        // DOM bindings
        this.display = document.querySelector(".graphArea");
        this.algoSelector = document.getElementById("algo-select");
        
        this.btnPlay = document.getElementById("btn-play");
        this.btnPause = document.getElementById("btn-pause");
        this.btnStep = document.getElementById("btn-step");
        this.btnReset = document.getElementById("btn-reset");
        this.btnGenerate = document.getElementById("btn-generate");
        this.btnShuffle = document.getElementById("btn-shuffle");
        
        this.sizeSlider = document.getElementById("size-slider");
        this.sizeVal = document.getElementById("size-val");
        this.customInput = document.getElementById("custom-array-input");
        this.btnCustomSubmit = document.getElementById("btn-custom-submit");
        
        this.compCountEl = document.getElementById("counter-comparisons");
        this.writeCountEl = document.getElementById("counter-writes");
        
        this.loggerEl = document.getElementById("terminal-logs");
        this.codeTracerEl = document.getElementById("code-tracer-content");
        
        this.infoTitle = document.getElementById("algo-info-title");
        this.infoDesc = document.getElementById("algo-info-desc");
        this.infoBest = document.getElementById("algo-info-best");
        this.infoAvg = document.getElementById("algo-info-avg");
        this.infoWorst = document.getElementById("algo-info-worst");
        this.infoSpace = document.getElementById("algo-info-space");
        this.infoStable = document.getElementById("algo-info-stable");
        this.infoInPlace = document.getElementById("algo-info-inplace");
        
        this.initEvents();
        this.setAlgorithm(this.currentAlgo);
        this.generateArray();
    }

    initEvents() {
        this.algoSelector.addEventListener("change", (e) => this.setAlgorithm(e.target.value));
        
        this.btnPlay.addEventListener("click", () => this.play());
        this.btnPause.addEventListener("click", () => this.pause());
        this.btnStep.addEventListener("click", () => this.stepForward());
        this.btnReset.addEventListener("click", () => this.reset());
        this.btnGenerate.addEventListener("click", () => this.generateArray());
        this.btnShuffle.addEventListener("click", () => this.shuffle());
        
        this.sizeSlider.addEventListener("input", (e) => {
            this.size = parseInt(e.target.value);
            this.sizeVal.innerText = this.size;
            this.generateArray();
        });
        
        this.btnCustomSubmit.addEventListener("click", () => this.handleCustomArraySubmit());
    }

    // Dynamic speed based on array size so small arrays are easy to watch, 
    // and large arrays finish in a reasonable time.
    updateDynamicSpeed() {
        const length = this.arr.length;
        this.speed = Math.max(1, Math.floor(600 / length)); 
    }

    setAlgorithm(algoKey) {
        if (this.state === 'playing') {
            this.pause();
        }
        
        this.currentAlgo = algoKey;
        const meta = window.SORT_ALGORITHMS[algoKey];
        if (!meta) return;
        
        // Update Info Panel
        this.infoTitle.innerText = meta.name;
        this.infoDesc.innerText = meta.description;
        this.infoBest.innerText = meta.bestTime;
        this.infoAvg.innerText = meta.avgTime;
        this.infoWorst.innerText = meta.worstTime;
        this.infoSpace.innerText = meta.space;
        this.infoStable.innerText = meta.stable;
        this.infoInPlace.innerText = meta.inPlace;
        
        // Update Code Tracer Panel
        this.populateCodeTracer(meta.code);
        
        // Reset generator and engine state
        this.generator = null;
        this.state = 'idle';
        this.resetStats();
        this.updateControlUI();
        
        this.logAction(`Switched algorithm to ${meta.name}.`);
    }

    populateCodeTracer(codeString) {
        const lines = codeString.split("\n");
        this.codeTracerEl.innerHTML = lines.map((line, idx) => {
            // Escape HTML
            const escaped = line
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
            return `<div class="code-line" id="line-${idx + 1}">
                <span class="line-num">${idx + 1}</span>
                <span class="line-code">${escaped}</span>
            </div>`;
        }).join("");
    }

    highlightLine(lineNum) {
        document.querySelectorAll(".code-line").forEach(el => el.classList.remove("active"));
        const activeLine = document.getElementById(`line-${lineNum}`);
        if (activeLine) {
            activeLine.classList.add("active");
            activeLine.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    generateArray() {
        if (this.state === 'playing') this.pause();
        
        this.arr = [];
        for (let i = 1; i <= this.size; i++) {
            this.arr.push(i);
        }
        this.shuffle();
    }

    shuffle() {
        if (this.state === 'playing') this.pause();
        
        // Fisher-Yates shuffle
        for (let i = this.arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
        }
        
        this.originalArr = [...this.arr];
        this.generator = null;
        this.state = 'idle';
        
        this.updateDynamicSpeed();
        this.resetStats();
        this.updateControlUI();
        this.render();
        this.logAction("Generated and shuffled a new array.");
    }

    handleCustomArraySubmit() {
        const val = this.customInput.value.trim();
        if (!val) return;
        
        // Parse array of numbers
        const parts = val.split(",").map(x => x.trim());
        const parsed = [];
        for (let p of parts) {
            const num = Number(p);
            if (isNaN(num) || p === "") {
                alert("Invalid input! Please enter a comma-separated list of integers.");
                return;
            }
            if (num <= 0 || num > 500) {
                alert("Values must be positive integers between 1 and 500.");
                return;
            }
            parsed.push(num);
        }
        
        if (parsed.length < 3 || parsed.length > 200) {
            alert("Custom array size must be between 3 and 200 elements.");
            return;
        }
        
        if (this.state === 'playing') this.pause();
        
        this.arr = parsed;
        this.originalArr = [...this.arr];
        this.size = parsed.length;
        this.sizeSlider.value = this.size;
        this.sizeVal.innerText = this.size;
        
        this.generator = null;
        this.state = 'idle';
        
        this.updateDynamicSpeed();
        this.resetStats();
        this.updateControlUI();
        this.render();
        this.logAction(`Loaded custom array of size ${this.size}.`);
    }

    reset() {
        if (this.state === 'playing') this.pause();
        
        this.arr = [...this.originalArr];
        this.generator = null;
        this.state = 'idle';
        
        this.resetStats();
        this.updateControlUI();
        this.render();
        this.logAction("Reset array to original unsorted state.");
    }

    resetStats() {
        this.comparisons = 0;
        this.writes = 0;
        this.updateStats();
        
        // Clear highlighted code
        document.querySelectorAll(".code-line").forEach(el => el.classList.remove("active"));
        
        // Clear visual logs
        this.loggerEl.innerHTML = `<div class="log-entry system">[System] Ready to visualize. Press Play or Step.</div>`;
    }

    updateStats() {
        this.compCountEl.innerText = this.comparisons;
        this.writeCountEl.innerText = this.writes;
    }

    logAction(text, type = "info") {
        const entry = document.createElement("div");
        entry.className = `log-entry ${type}`;
        
        const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        entry.innerHTML = `<span class="log-time">[${timeStamp}]</span> ${text}`;
        
        this.loggerEl.appendChild(entry);
        this.loggerEl.scrollTop = this.loggerEl.scrollHeight;
    }

    play() {
        if (this.state === 'playing') return;
        
        // Initialize generator if idle or finished
        if (this.state === 'idle' || this.state === 'finished') {
            this.resetStats();
            const algoMeta = window.SORT_ALGORITHMS[this.currentAlgo];
            this.generator = algoMeta.generator([...this.arr]);
            this.logAction(`Started execution of ${algoMeta.name}.`, 'system');
        } else {
            this.logAction("Resumed execution.", 'system');
        }
        
        this.state = 'playing';
        this.updateControlUI();
        this.run();
    }

    pause() {
        if (this.state !== 'playing') return;
        this.state = 'paused';
        this.updateControlUI();
        this.logAction("Paused execution.", 'system');
    }

    stepForward() {
        if (this.state === 'playing') {
            this.pause();
        }
        
        if (this.state === 'idle' || this.state === 'finished') {
            this.resetStats();
            const algoMeta = window.SORT_ALGORITHMS[this.currentAlgo];
            this.generator = algoMeta.generator([...this.arr]);
            this.state = 'paused';
            this.logAction(`Starting single-step debug mode: ${algoMeta.name}`, 'system');
        }
        
        const next = this.generator.next();
        if (next.done) {
            this.state = 'finished';
            this.onFinished();
            return;
        }
        
        this.processStep(next.value);
    }

    processStep(step) {
        this.arr = step.arr;
        
        // Counter checks
        if (step.type === 'compare') {
            this.comparisons++;
        } else if (step.type === 'swap' || step.type === 'write') {
            this.writes++;
        }
        this.updateStats();
        
        // Highlighter code line
        if (step.line) {
            this.highlightLine(step.line);
        }
        
        // Console logger
        if (step.desc) {
            this.logAction(step.desc);
        }
        
        // Render scene
        this.render(step.indices, step.type);
    }

    async run() {
        if (this.state !== 'playing') return;
        
        const next = this.generator.next();
        if (next.done) {
            this.state = 'finished';
            this.onFinished();
            return;
        }
        
        this.processStep(next.value);
        
        setTimeout(() => {
            if (this.state === 'playing') {
                this.run();
            }
        }, this.speed);
    }

    async onFinished() {
        this.updateControlUI();
        this.logAction("Algorithm execution finished successfully!", 'success');
        
        // Victory wave sweep
        for (let i = 0; i < this.arr.length; i++) {
            this.render([i], 'sorted');
            const victoryDelay = Math.max(2, Math.floor(100 / this.arr.length));
            await new Promise(r => setTimeout(r, victoryDelay));
        }
        this.render();
    }

    updateControlUI() {
        if (this.state === 'playing') {
            this.btnPlay.disabled = true;
            this.btnPause.disabled = false;
            this.btnStep.disabled = true;
            
            this.sizeSlider.disabled = true;
            this.customInput.disabled = true;
            this.btnCustomSubmit.disabled = true;
            this.btnGenerate.disabled = true;
            this.btnShuffle.disabled = true;
            this.algoSelector.disabled = true;
        } else if (this.state === 'paused') {
            this.btnPlay.disabled = false;
            this.btnPause.disabled = true;
            this.btnStep.disabled = false;
            
            this.sizeSlider.disabled = true;
            this.customInput.disabled = true;
            this.btnCustomSubmit.disabled = true;
            this.btnGenerate.disabled = true;
            this.btnShuffle.disabled = true;
            this.algoSelector.disabled = true;
        } else {
            // Idle or finished
            this.btnPlay.disabled = false;
            this.btnPause.disabled = true;
            this.btnStep.disabled = false;
            
            this.sizeSlider.disabled = false;
            this.customInput.disabled = false;
            this.btnCustomSubmit.disabled = false;
            this.btnGenerate.disabled = false;
            this.btnShuffle.disabled = false;
            this.algoSelector.disabled = false;
        }
    }

    render(activeIndices = [], type = '') {
        this.display.innerHTML = "";
        const maxVal = Math.max(...this.arr, 1);
        
        // Calculate dynamic spacing and width
        const totalWidth = this.display.clientWidth;
        const gap = 2;
        const rawBarWidth = (totalWidth - (this.arr.length - 1) * gap) / this.arr.length;
        const barWidth = Math.max(1, rawBarWidth);
        
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < this.arr.length; i++) {
            const bar = document.createElement("div");
            bar.className = "visual-bar";
            
            // Set styles
            bar.style.width = `${barWidth}px`;
            const heightPercent = (this.arr[i] / maxVal) * 100;
            bar.style.height = `${Math.max(4, heightPercent)}%`;
            
            // Color states
            if (activeIndices.includes(i)) {
                if (type === 'compare') {
                    bar.classList.add("comparing");
                } else if (type === 'swap') {
                    bar.classList.add("swapping");
                } else if (type === 'pivot') {
                    bar.classList.add("pivot");
                } else if (type === 'write' || type === 'insert') {
                    bar.classList.add("writing");
                } else if (type === 'sorted') {
                    bar.classList.add("sorted-sweep");
                }
            } else if (this.state === 'finished') {
                bar.classList.add("sorted");
            }
            
            // For smaller arrays, show value numbers inside/above bars
            if (this.arr.length <= 25) {
                const label = document.createElement("span");
                label.className = "bar-label";
                label.innerText = this.arr[i];
                bar.appendChild(label);
            }
            
            fragment.appendChild(bar);
        }
        
        this.display.appendChild(fragment);
    }
}

// Initial initialization
document.addEventListener("DOMContentLoaded", () => {
    window.visualizer = new SortingVisualizer();
});