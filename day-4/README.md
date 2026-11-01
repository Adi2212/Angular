# Day 4: Directives & Pipes Deep Dive

Day 4 contains two Angular 18 standalone projects focusing on Angular's template transformation and DOM manipulation primitives:

1. **`p1/` — Directives Showcase (Port 4200)**: Built-in attribute & structural directives (`[ngClass]`, `[ngStyle]`, `*ngIf`, `*ngFor`, `*ngSwitch`), custom attribute directives (`a[appSafeLink]`, `[appHighlight]`, `[appTooltip]`, `[appCopyClipboard]`), and custom structural directives (`*appAuth`, `*appRepeat`).
2. **`p2/` — Pipes Showcase (Port 4300)**: Built-in formatting pipes (`DatePipe`, `CurrencyPipe`, `DecimalPipe`, `PercentPipe`, `SlicePipe`, `KeyValuePipe`, `JsonPipe`), custom utility pipes (`| temperature`, `| fileSize`, `| timeAgo`, `| filterBy`), Pure vs. Impure change detection lab, and reactive stream handling with `AsyncPipe`.

---

## 🚀 Projects Quick Reference

| Project | Folder | Focus | Port | Start Command |
| :--- | :--- | :--- | :---: | :--- |
| **Directives Showcase** | [`p1/`](./p1) | Directives Deep Dive, ViewContainerRef, SafeLink, Tooltip, Role Auth | **4200** | `cd p1 && npm start` |
| **Pipes Showcase** | [`p2/`](./p2) | Pipes Deep Dive, Pure vs. Impure Detection, Custom Transformers, AsyncPipe | **4300** | `cd p2 && npm start` |
