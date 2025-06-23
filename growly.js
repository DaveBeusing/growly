/**
 * Copyright (c) 2025 Dave Beusing <david.beusing@gmail.com>
 *
 * MIT License - https://opensource.org/license/mit/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
class Growly {
	constructor(options = {}) {
		this.duration = options.duration || 4000;
		this.containerId = options.containerId || "growly-container";
		this.position = options.position || "bottom-left";
		this.init();
	}
	init() {
		if (document.getElementById(this.containerId)) return;
		this.container = document.createElement("div");
		this.container.id = this.containerId;
		Object.assign(this.container.style, {
			position: "fixed",
			display: "flex",
			flexDirection: "column-reverse",
			alignItems: "flex-start",
			zIndex: "9999",
			pointerEvents: "none",
			gap: "8px",
			bottom: this.position.includes("bottom") ? "80px" : "auto",
			top: this.position.includes("top") ? "20px" : "auto",
			left: this.position.includes("left") ? "65px" : "auto",
			right: this.position.includes("right") ? "20px" : "auto"
		});
		document.body.appendChild(this.container);
		if (!document.getElementById("growly-style")) {
			const style = document.createElement("style");
			style.id = "growly-style";
			style.textContent = `
				@keyframes growlyBounceIn {
					0% { opacity: 0; transform: translateY(100%) scale(0.8); }
					60% { opacity: 1; transform: translateY(-10px) scale(1.02); }
					80% { transform: translateY(3px) scale(0.98); }
					100% { transform: translateY(0) scale(1); }
				}
			`;
			document.head.appendChild(style);
		}
	}
	notify(message, type = "info", ms = this.duration) {
		const el = document.createElement("div");
		Object.assign(el.style, {
			background: type === "error" ? "#c0392b" : type === "success" ? "#27ae60" : "#2c3e50",
			color: "#fff",
			padding: "10px 14px",
			borderRadius: "8px",
			boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
			fontSize: "14px",
			maxWidth: "300px",
			animation: "growlyBounceIn 600ms ease",
			pointerEvents: "auto",
			opacity: "1",
			transition: "opacity 0.5s ease",
			cursor: "pointer"
		});
		el.textContent = message;
		this.container.appendChild(el);
		const remove = () => {
			el.style.opacity = "0";
			setTimeout(() => el.remove(), 500);
		};
		el.addEventListener("click", remove);
		setTimeout(remove, ms);
	}
}
