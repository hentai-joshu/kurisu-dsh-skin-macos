window.__ModuleLoader__.load({
	id: "dsh-skin-kurisu",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const React = require("react");

		const SG_NIXIE_JS = __SG_NIXIE_JS__;
		const SKIN_ID = "dsh-skin-kurisu";
		const STORAGE_KEY = "dsh-skin-kurisu:wallpaper";
		const POLISH_KEY = "dsh-skin-kurisu:polish";
		const GLASS_KEY = "dsh-skin-kurisu:glass";
		const DENSITY_KEY = "{{SECRET_hjp4bq2n}}density";
		// One image per wallpaper, shared by the dark and light variants. Naming
		// each data URI once (instead of writing it into both `dark` and `light`)
		// keeps the built bundle about half a megabyte smaller — the same base64
		// was being inlined twice per wallpaper.
		const ART_NIGHT = "{{WALL_NIGHT}}";
		const ART_DAY = "{{WALL_DAY}}";
		const ART_DUSK = "{{WALL_DUSK}}";
		const ART_LIBRARY = "{{WALL_LIBRARY}}";
		const WALLPAPERS = {
			night: {
				label: "夜行列车",
				hint: "深夜巴士 · 雨与霓虹",
				dark: ART_NIGHT,
				light: ART_NIGHT,
				thumb: "{{THUMB_NIGHT}}",
				pos: "76% 42%"
			},
			day: {
				label: "白昼窗边",
				hint: "Dr Pepper · 午后阳光",
				dark: ART_DAY,
				light: ART_DAY,
				thumb: "{{THUMB_DAY}}",
				pos: "72% 38%"
			},
			dusk: {
				label: "薄暮荒原",
				hint: "灰色天光 · 雨后街道",
				dark: ART_DUSK,
				light: ART_DUSK,
				thumb: "{{THUMB_DUSK}}",
				pos: "70% 44%"
			},
			library: {
				label: "星夜图书馆",
				hint: "暖光书架 · 助手与真由理",
				dark: ART_LIBRARY,
				light: ART_LIBRARY,
				thumb: "{{THUMB_LIBRARY}}",
				pos: "62% 42%"
			}
		};
		const ORDER = ["night", "day", "dusk", "library"];
		const DEFAULT_WALLPAPER = "night";

		// ---------------------------------------------------------------- palette
		// Amadeus / Kurisu: deep night blue, warm lab-coat white, tie crimson,
		// Kurisu crimson as the secondary "business" accent (no CRT teal left).
		const TOKENS = {
			"--dsw-alias-bg-base": { light: "rgba(250,246,241,0.40)", dark: "rgba(7,10,18,0.46)" },
			"--dsw-alias-bg-layer-1": { light: "rgba(255,252,248,0.56)", dark: "rgba(14,19,30,0.50)" },
			"--dsw-alias-bg-layer-2": { light: "rgba(255,253,250,0.64)", dark: "rgba(19,25,38,0.58)" },
			"--dsw-alias-bg-layer-3": { light: "rgba(252,248,243,0.70)", dark: "rgba(24,31,48,0.64)" },
			"--dsw-alias-bg-overlay": { light: "rgba(255,253,250,0.97)", dark: "rgba(13,17,27,0.95)" },
			"--dsw-alias-bg-module-platform": { light: "rgba(248,242,236,0.62)", dark: "rgba(16,21,33,0.56)" },
			"--dsw-alias-bg-multi-select": { light: "rgba(246,239,233,0.66)", dark: "rgba(25,32,49,0.62)" },
			"--dsw-alias-bg-document-preview": { light: "rgba(252,248,243,0.70)", dark: "rgba(12,16,26,0.58)" },
			"--dsw-alias-bg-document-selection": {
				light: "color-mix(in srgb, #a63b48 22%, transparent)",
				dark: "color-mix(in srgb, #d5838f 30%, transparent)"
			},
			"--dsw-alias-bg-mask-1": { light: "rgba(30,22,24,0.30)", dark: "rgba(2,4,9,0.58)" },
			"--dsw-alias-bg-mask-2": { light: "rgba(30,22,24,0.16)", dark: "rgba(2,4,9,0.38)" },
			"--dsw-alias-bg-mask-3": { light: "rgba(30,22,24,0.50)", dark: "rgba(2,4,9,0.72)" },
			"--dsw-alias-bg-mask-drop": { light: "rgba(255,252,248,0.72)", dark: "rgba(10,14,23,0.76)" },
			"--dsw-alias-bg-mask-photo": { light: "rgba(16,12,14,0.82)", dark: "rgba(2,4,9,0.90)" },
			"--dsw-alias-bg-skeleton": { light: "rgba(120,80,80,0.08)", dark: "rgba(255,255,255,0.06)" },
			"--dsw-alias-border-l1": { light: "rgba(94,54,58,0.12)", dark: "rgba(150,178,212,0.13)" },
			"--dsw-alias-border-l2": { light: "rgba(94,54,58,0.22)", dark: "rgba(156,184,218,0.22)" },
			"--dsw-alias-border-l2-darkmode-thin": { light: "rgba(94,54,58,0.16)", dark: "rgba(156,184,218,0.16)" },
			"--dsw-alias-border-l3": { light: "rgba(94,54,58,0.32)", dark: "rgba(160,190,225,0.32)" },
			"--dsw-alias-border-l4": { light: "rgba(94,54,58,0.42)", dark: "rgba(170,200,235,0.42)" },
			"--dsw-alias-border-inverted": { light: "rgba(255,255,255,0.50)", dark: "rgba(255,255,255,0.10)" },
			"--dsw-alias-border-inverted2": { light: "rgba(255,255,255,0.60)", dark: "rgba(255,255,255,0.16)" },
			"--dsw-alias-brand-primary": { light: "#9c3140", dark: "#e0919c" },
			"--dsw-alias-brand-primary-invert": { light: "#f7eff0", dark: "#7c2635" },
			"--dsw-alias-brand-primary-new-colorprimary-new-color": { light: "#a63b48", dark: "#d67c8a" },
			"--dsw-alias-brand-text": { light: "#9c3140", dark: "#f6ecee" },
			"--dsw-alias-label-primary": { light: "#2b2023", dark: "#f3ede9" },
			"--dsw-alias-label-secondary": { light: "#4b4044", dark: "#ccd4e0" },
			"--dsw-alias-label-tertiary": { light: "#635559", dark: "#a9b5c6" },
		"--dsw-alias-label-caption": { light: "#6b5c60", dark: "#b3bdcc" },
		"--dsw-alias-label-dimmed": { light: "#584c50", dark: "#bfc8d6" },
		"--dsw-alias-label-primary-dimmed": { light: "#554a4d", dark: "#c6ceda" },
			"--dsw-alias-label-caption": { light: "#8b7c7f", dark: "#8792a5" },
			"--dsw-alias-label-dimmed": { light: "#c9bdbd", dark: "#4f5a6d" },
			"--dsw-alias-label-primary-dimmed": { light: "#3a2c2f", dark: "#d9d2cd" },
			"--dsw-alias-label-primary-bluish": { light: "#243a55", dark: "#e2ebf7" },
			"--dsw-alias-label-primary-foreground": { light: "#fdfaf7", dark: "#0a0d15" },
			"--dsw-alias-label-primary-inverted": { light: "#fdfaf7", dark: "#1a2234" },
			"--dsw-alias-label-shimmer": {
				light: "color-mix(in srgb, #2b2023 26%, transparent)",
				dark: "color-mix(in srgb, #f3ede9 38%, transparent)"
			},
			"--dsw-alias-label-document-preview": { light: "#6b5b5e", dark: "#b8c2d2" },
			"--dsw-alias-label-deep-diving": {
				light: "color-mix(in srgb, #9c3140 72%, #2b2023)",
				dark: "#d8a3ad"
			},
			"--dsw-alias-label-deep-diving-shimmer": {
				light: "color-mix(in srgb, #b95b67 55%, #ffffff)",
				dark: "#e7c0c7"
			},
			"--dsw-alias-link": { light: "#9c3140", dark: "#e5a2ad" },
			"--dsw-alias-menu-icon": { light: "#443537", dark: "#d7dee9" },
			"--dsw-menu-surface-fill": { light: "rgba(255,252,248,0.90)", dark: "rgba(17,22,34,0.90)" },
			"--dsw-alias-menu-group-header-fill": { light: "rgba(252,247,242,0.96)", dark: "rgba(14,18,29,0.94)" },
			"--dsw-specific-menu": { light: "rgba(255,252,248,0.94)", dark: "rgba(17,22,34,0.94)" },
			"--dsw-specific-sidebar-fill": { light: "rgba(246,240,234,0.50)", dark: "rgba(8,11,19,0.44)" },
			"--dsw-specific-sidebar-nav-item-active": { light: "rgba(156,49,64,0.12)", dark: "rgba(224,145,156,0.16)" },
			"--dsw-specific-sidebar-nav-item-active-accent": { light: "rgba(156,49,64,0.18)", dark: "rgba(224,145,156,0.24)" },
			"--dsw-specific-sidebar-nav-item-hover": { light: "rgba(94,54,58,0.08)", dark: "rgba(150,178,212,0.10)" },
			"--dsw-specific-selector": { light: "rgba(250,244,238,0.88)", dark: "rgba(24,31,48,0.86)" },
			"--dsw-specific-tip": { light: "rgba(246,239,233,0.86)", dark: "rgba(20,26,40,0.82)" },
			"--dsw-specific-input-major": { light: "rgba(255,252,248,0.60)", dark: "rgba(12,17,27,0.54)" },
			"--dsw-specific-login-input": { light: "rgba(255,252,248,0.90)", dark: "rgba(12,17,27,0.78)" },
			"--dsw-specific-bubble": { light: "rgba(255,238,236,0.62)", dark: "rgba(44,36,50,0.58)" },
			"--dsw-specific-bubble-highlight": { light: "rgba(239,208,208,0.66)", dark: "rgba(214,124,138,0.24)" },
			"--dsw-alias-interactive-bg-hover": { light: "rgba(94,54,58,0.06)", dark: "rgba(255,255,255,0.06)" },
			"--dsw-alias-interactive-bg-active": { light: "rgba(94,54,58,0.10)", dark: "rgba(255,255,255,0.10)" },
			"--dsw-alias-interactive-bg-hover-solid": { light: "rgba(250,244,238,0.90)", dark: "rgba(30,38,56,0.90)" },
			"--dsw-alias-interactive-bg-hover-accent": { light: "rgba(156,49,64,0.10)", dark: "rgba(214,124,138,0.16)" },
			"--dsw-alias-interactive-bg-hover-danger": { light: "rgba(236,19,19,0.08)", dark: "rgba(242,90,90,0.16)" },
			"--dsw-alias-button-primary-fill": { light: "#9c3140", dark: "#c85e6d" },
			"--dsw-alias-button-primary-hover": { light: "#b03c4c", dark: "#d97c89" },
			"--dsw-alias-button-primary-dimmed": { light: "rgba(156,49,64,0.40)", dark: "rgba(200,94,109,0.38)" },
			"--dsw-alias-button-contrast-fill": { light: "#2b2023", dark: "#f0e9e6" },
			"--dsw-alias-button-elevated-fill": { light: "rgba(255,252,248,0.94)", dark: "rgba(28,35,52,0.92)" },
			"--dsw-alias-button-floating-fill": { light: "rgba(255,252,248,0.92)", dark: "rgba(22,28,43,0.92)" },
			"--dsw-alias-button-floating-hover": { light: "rgba(248,240,234,0.96)", dark: "rgba(32,40,58,0.96)" },
			"--dsw-alias-button-ghost-active-border": { light: "rgba(156,49,64,0.45)", dark: "rgba(224,145,156,0.45)" },
			"--dsw-alias-button-ghost-active-fill": { light: "rgba(156,49,64,0.10)", dark: "rgba(224,145,156,0.12)" },
			"--dsw-alias-button-ghost-active-hover": { light: "rgba(156,49,64,0.16)", dark: "rgba(224,145,156,0.18)" },
			"--dsw-alias-button-info-fill": { light: "#9c3140", dark: "#b03a49" },
			"--dsw-alias-button-info-hover": { light: "#b03a49", dark: "#c2505f" },
			"--dsw-alias-button-tool-bar-fill": { light: "rgba(94,54,58,0.40)", dark: "rgba(20,26,40,0.55)" },
			"--dsw-alias-button-tool-bar-hover": { light: "rgba(94,54,58,0.55)", dark: "rgba(26,33,50,0.72)" },
			"--dsw-alias-button-tool-bar-fill-invisible": { light: "rgba(94,54,58,0.25)", dark: "rgba(14,19,30,0.35)" },
			"--dsw-alias-state-business-primary": { light: "#9c3140", dark: "#e0919c" },
			"--dsw-alias-state-business-tertiary": { light: "rgba(156,49,64,0.14)", dark: "rgba(224,145,156,0.16)" },
			"--dsw-alias-state-error-primary": { light: "#c62f3c", dark: "#f27a86" },
			"--dsw-alias-state-error-secondary": { light: "#d95a65", dark: "#f6a0a8" },
			"--dsw-alias-state-success-primary": { light: "#2f9e6f", dark: "#5cc9a7" },
			"--dsw-alias-state-success-secondary": { light: "#48b585", dark: "#79d6b6" },
			"--dsw-alias-state-success-tertiary": { light: "rgba(47,158,111,0.12)", dark: "rgba(92,201,167,0.16)" },
			"--dsw-alias-state-warn-primary": { light: "#b7791f", dark: "#e6b163" },
			"--dsw-alias-state-warn-secondary": { light: "#c98a2e", dark: "#eec27f" },
			"--dsw-alias-state-warn-tertiary": { light: "rgba(183,121,31,0.12)", dark: "rgba(230,177,99,0.16)" },
			"--dsw-alias-state-warn-label": { light: "#a46a18", dark: "#e6b163" },
			"--dsw-alias-state-idle-primary": { light: "#c3b6b6", dark: "#5f6b80" },
			"--dsw-alias-switch-thumb": { light: "#ffffff", dark: "#e9dfdc" },
			"--dsw-alias-toast-bg": { light: "rgba(43,32,35,0.94)", dark: "rgba(24,31,47,0.96)" },
			"--dsw-alias-toast-label": { light: "#fdfaf7", dark: "#f3ede9" },
			"--dsw-alias-tooltip-bg": { light: "rgba(43,32,35,0.94)", dark: "rgba(14,19,30,0.96)" },
			"--dsw-alias-tooltip-key-bg": { light: "rgba(255,255,255,0.14)", dark: "rgba(255,255,255,0.12)" },
			"--dsw-alias-turn-trigger-bg": { light: "rgba(250,244,238,0.85)", dark: "rgba(18,24,37,0.82)" },
			"--dsw-alias-turn-trigger-bg-hover": { light: "rgba(246,237,231,0.90)", dark: "rgba(26,33,50,0.88)" },
			"--dsw-alias-scrollbar-bg-l1": { light: "rgba(94,54,58,0.18)", dark: "rgba(150,178,212,0.22)" },
			"--dsw-alias-scrollbar-bg-l2": { light: "rgba(94,54,58,0.24)", dark: "rgba(150,178,212,0.28)" },
			"--dsw-alias-scrollbar-hover-l1": { light: "rgba(94,54,58,0.34)", dark: "rgba(180,205,235,0.38)" },
			"--dsw-alias-scrollbar-hover-l2": { light: "rgba(94,54,58,0.40)", dark: "rgba(180,205,235,0.46)" },
			"--dsw-alias-markdown-code-block": { light: "rgba(246,240,234,0.54)", dark: "rgba(10,14,24,0.48)" },
			"--dsw-alias-markdown-code-block-banner": { light: "rgba(240,232,226,0.60)", dark: "rgba(14,19,30,0.56)" },
			"--dsw-alias-markdown-code-segment-selected": { light: "rgba(255,252,248,0.72)", dark: "rgba(28,36,54,0.66)" },
			"--dsw-alias-markdown-code-segment-unselected": { light: "rgba(242,234,228,0.58)", dark: "rgba(12,17,27,0.52)" },
			"--dsw-alias-markdown-inline-code": { light: "rgba(156,49,64,0.08)", dark: "rgba(255,255,255,0.07)" },
			"--dsw-alias-markdown-citation": { light: "rgba(240,232,226,0.94)", dark: "rgba(24,31,47,0.86)" },
			"--dsw-alias-markdown-placeholder": { light: "rgba(94,54,58,0.05)", dark: "rgba(255,255,255,0.05)" },
			"--dsw-alias-markdown-tag": { light: "rgba(94,54,58,0.07)", dark: "rgba(255,255,255,0.08)" },
			"--dsw-alias-file-diff-added-bg": { light: "#e8f4ec", dark: "#1c2b25" },
			"--dsw-alias-file-diff-added-gutter": { light: "#eff8f2", dark: "#16241d" },
			"--dsw-alias-file-diff-added-marker": { light: "#2f9e6f", dark: "#41c977" },
			"--dsw-alias-file-diff-deleted-bg": { light: "#fbeae6", dark: "#31201d" },
			"--dsw-alias-file-diff-deleted-gutter": { light: "#fdf1ee", dark: "#251614" },
			"--dsw-alias-file-diff-deleted-marker": { light: "#c62f3c", dark: "#fa6a64" },
			"--dsw-alias-code-diff-added": { light: "rgba(47,158,111,0.08)", dark: "rgba(65,201,119,0.12)" },
			"--dsw-alias-code-diff-deleted": { light: "rgba(198,47,60,0.08)", dark: "rgba(250,66,62,0.12)" },
			"--dsw-alias-settings-card-fill": { light: "rgba(255,252,248,0.86)", dark: "rgba(20,26,40,0.82)" },
			"--dsw-alias-settings-card-stroke": { light: "rgba(94,54,58,0.18)", dark: "rgba(150,178,212,0.18)" },
			"--dsw-alias-onboarding-accent": { light: "#9c3140", dark: "#e0919c" },
			"--dsw-alias-onboarding-card-fill": { light: "rgba(255,252,248,0.86)", dark: "rgba(22,28,43,0.84)" },
			"--dsw-alias-onboarding-secondary-fill": { light: "rgba(250,244,238,0.92)", dark: "rgba(30,38,56,0.9)" },
			"--dsw-alias-onboarding-checkbox-border": { light: "rgba(43,32,35,0.22)", dark: "rgba(180,205,235,0.28)" },
			"--dsw-menu-backdrop-filter": { light: "blur(30px) saturate(150%)", dark: "blur(30px) saturate(135%)" },
			"--dsw-mask-blur": { light: "blur(10px)", dark: "blur(10px)" },
			"--dsw-shadow-lv1": { light: "0 2px 6px 0 rgba(60,30,34,0.10)", dark: "0 2px 8px 0 rgba(0,0,0,0.45)" },
			"--dsw-shadow-lv2": {
				light: "0 6px 18px 0 rgba(60,30,34,0.10), 0 2px 8px 0 rgba(60,30,34,0.06)",
				dark: "0 6px 18px 0 rgba(0,0,0,0.50), 0 2px 8px 0 rgba(0,0,0,0.32)"
			},
			"--dsw-shadow-lv3": {
				light: "0 0 1px 0 rgba(60,30,34,0.24), 0 16px 40px 0 rgba(60,30,34,0.16)",
				dark: "0 0 1px 0 rgba(0,0,0,0.70), 0 18px 46px 0 rgba(0,0,0,0.55)"
			},
			"--dsw-elevation-stroke-color": { light: "rgba(94,54,58,0.20)", dark: "rgba(150,178,212,0.20)" }
		};

		const flatten = (scheme) => {
			const out = {};
			for (const name of Object.keys(TOKENS)) out[name] = TOKENS[name][scheme];
			return out;
		};

		// ---------------------------------------------------------------- css
		const CSS = `
/* ===== dsh-skin-kurisu ===== */
html { background-color: #06080f; }
body:not([data-ds-dark-theme]) { background-color: #f1eae2; }
body[data-ds-dark-theme] { background-color: #06080f; }

/* The wallpaper layers are generated into a second, plugin-owned <style>
   (see buildWallCss) because each theme image is inline base64. Keeping the
   URL out of inherited custom properties avoids handing a ~500 KB string to
   every element in the tree. */

/* keep translucent chrome legible over the art */
html[data-ks-wall="on"] ::selection {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 34%, transparent);
}

/* settings row */
.ks-row { display: flex; flex-direction: column; gap: 10px; width: 100%; min-width: 0; }
.ks-head { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.ks-title { font-size: 13px; line-height: 20px; font-weight: 600; color: var(--dsw-alias-label-primary); white-space: nowrap; }
.ks-sub { font-size: 11px; line-height: 16px; color: var(--dsw-alias-label-tertiary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ks-thumbs { display: flex; gap: 8px; flex-wrap: wrap; }
.ks-thumb {
  position: relative;
  width: 104px;
  height: 60px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--dsw-alias-bg-layer-2);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  font: inherit;
  transition: border-color 140ms var(--ds-ease-in-out, ease), box-shadow 140ms var(--ds-ease-in-out, ease), transform 140ms var(--ds-ease-in-out, ease);
}
.ks-thumb:hover { border-color: var(--dsw-alias-border-l4); transform: translateY(-1px); }
.ks-thumb:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.ks-thumb[data-active="true"] {
  border-color: var(--dsw-alias-brand-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 34%, transparent);
}
.ks-thumb > span {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 8px 7px 4px;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
  text-align: left;
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
  background: linear-gradient(transparent, rgba(0,0,0,.74));
}
.ks-none {
  display: flex; align-items: center; justify-content: center;
  background-image: none;
  background:
    repeating-linear-gradient(135deg, transparent 0 6px, color-mix(in srgb, var(--dsw-alias-label-tertiary) 14%, transparent) 6px 7px),
    var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
}
.ks-none > span { position: static; background: none; text-shadow: none; color: var(--dsw-alias-label-secondary); padding: 0; }
.ks-hint { font-size: 11px; line-height: 16px; color: var(--dsw-alias-label-tertiary); margin: 0; }
.ks-glassRow { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.ks-glassLabel { font-size: 12px; color: var(--dsw-alias-label-secondary); }

@media (prefers-reduced-motion: reduce) {
  .ks-thumb { transition: none; }
}

/* -- glass: keep text legible while the panes turn translucent ------------- */
/* The four big surfaces (sidebar, panel layers, composer, code blocks) were
   made substantially more transparent in the token layer. A backdrop blur puts
   the wallpaper detail out of focus behind them, so contrast survives without
   adding more fill. Only active while a wallpaper is on — with no wallpaper
   there is nothing to blur and this would just cost compositing. */
html[data-ks-wall="on"] div[class*="_sidebarCol"],
html[data-ks-wall="on"] #root > div > div[class*="_sidebarCol"] {
  -webkit-backdrop-filter: blur(26px) saturate(118%);
  backdrop-filter: blur(26px) saturate(118%);
}
html[data-ks-wall="on"] div[data-composer-card] {
  -webkit-backdrop-filter: blur(20px) saturate(115%);
  backdrop-filter: blur(20px) saturate(115%);
}
/* Code blocks and message bubbles deliberately get no backdrop-filter: their
   count grows with the conversation, each one forces its own compositing layer,
   and blurring a surface that already paints an opaque-enough token buys very
   little. Only the two long-lived chrome surfaces (sidebar, composer) blur. */
@media (prefers-reduced-transparency: reduce) {
  html[data-ks-wall="on"] div[class*="_sidebarCol"],
  html[data-ks-wall="on"] div[data-composer-card] {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

/* -- glass levels --------------------------------------------------------- */
/* The four big surfaces — left nav, panel layers, composer, code blocks —
   each paint a token that the theme presenter writes inline on <body>. A
   stylesheet declaration carrying !important outranks that inline style, so a
   level can switch at runtime without tearing down the token layer.
   "mid" needs no block: it is exactly what the base tokens already say. */
html[data-ks-glass="solid"] body {
  --dsw-specific-sidebar-fill: rgba(246,240,234,.86) !important;
  --dsw-alias-bg-layer-1: rgba(255,252,248,.86) !important;
  --dsw-alias-bg-layer-2: rgba(255,253,250,.90) !important;
  --dsw-specific-input-major: rgba(255,252,248,.88) !important;
  --dsw-alias-markdown-code-block: rgba(246,240,234,.92) !important;
  --dsw-alias-markdown-code-block-banner: rgba(240,232,226,.95) !important;
  --dsw-specific-bubble: rgba(255,238,236,.88) !important;
}
html[data-ks-glass="solid"] body[data-ds-dark-theme] {
  --dsw-specific-sidebar-fill: rgba(8,11,19,.86) !important;
  --dsw-alias-bg-layer-1: rgba(14,19,30,.84) !important;
  --dsw-alias-bg-layer-2: rgba(19,25,38,.90) !important;
  --dsw-specific-input-major: rgba(12,17,27,.86) !important;
  --dsw-alias-markdown-code-block: rgba(10,14,24,.88) !important;
  --dsw-alias-markdown-code-block-banner: rgba(14,19,30,.92) !important;
  --dsw-specific-bubble: rgba(44,36,50,.86) !important;
}
html[data-ks-glass="clear"] body {
  --dsw-specific-sidebar-fill: rgba(246,240,234,.28) !important;
  --dsw-alias-bg-layer-1: rgba(255,252,248,.34) !important;
  --dsw-alias-bg-layer-2: rgba(255,253,250,.42) !important;
  --dsw-specific-input-major: rgba(255,252,248,.38) !important;
  --dsw-alias-markdown-code-block: rgba(246,240,234,.32) !important;
  --dsw-alias-markdown-code-block-banner: rgba(240,232,226,.40) !important;
  --dsw-specific-bubble: rgba(255,238,236,.40) !important;
}
html[data-ks-glass="clear"] body[data-ds-dark-theme] {
  --dsw-specific-sidebar-fill: rgba(8,11,19,.26) !important;
  --dsw-alias-bg-layer-1: rgba(14,19,30,.30) !important;
  --dsw-alias-bg-layer-2: rgba(19,25,38,.38) !important;
  --dsw-specific-input-major: rgba(12,17,27,.34) !important;
  --dsw-alias-markdown-code-block: rgba(10,14,24,.28) !important;
  --dsw-alias-markdown-code-block-banner: rgba(14,19,30,.36) !important;
  --dsw-specific-bubble: rgba(44,36,50,.34) !important;
}

/* -- wallpaper density ---------------------------------------------------- */
/* One knob for "how strongly the wallpaper shows", because that is the only
   question the user actually has: the four panel surfaces already have their
   own glass level, and a separate wash on the conversation column just fought
   with it. --ks-veil / --ks-veil-light is one flat layer stacked above the
   image and above every gradient that shapes it: raising its alpha fades the
   whole picture out without touching the hand-tuned gradient work. The
   conversation column's own wash (--ks-wash / --ks-wash-light) rides the same
   ladder, so the slab of cream that sits behind the text and around the input
   card lightens and darkens with the wallpaper instead of staying fixed. The
   two are separate properties only because the column needs a little more
   opacity at the light end to keep body text legible. "vivid" is nearly
   transparent, i.e. close to the artwork as tuned; every other step only ever
   makes the picture fainter. All of these are plain custom properties, so a
   step change repaints without rebuilding the sheet. */
html[data-ks-density="faint"] body {
  --ks-veil: rgba(6,8,15,.58);
  --ks-veil-light: rgba(252,249,245,.55);
  --ks-wash: rgba(7,10,18,.58);
  --ks-wash-light: rgba(250,246,241,.55);
}
html[data-ks-density="soft"] body {
  --ks-veil: rgba(6,8,15,.42);
  --ks-veil-light: rgba(252,249,245,.40);
  --ks-wash: rgba(7,10,18,.42);
  --ks-wash-light: rgba(250,246,241,.40);
}
html[data-ks-density="mid"] body {
  --ks-veil: rgba(6,8,15,.26);
  --ks-veil-light: rgba(252,249,245,.25);
  --ks-wash: rgba(7,10,18,.30);
  --ks-wash-light: rgba(250,246,241,.28);
}
html[data-ks-density="strong"] body {
  --ks-veil: rgba(6,8,15,.12);
  --ks-veil-light: rgba(252,249,245,.12);
  --ks-wash: rgba(7,10,18,.14);
  --ks-wash-light: rgba(250,246,241,.12);
}
html[data-ks-density="vivid"] body {
  --ks-veil: rgba(6,8,15,0);
  --ks-veil-light: rgba(252,249,245,0);
  --ks-wash: rgba(7,10,18,.06);
  --ks-wash-light: rgba(250,246,241,.05);
}




.ks-seg { display: inline-flex; align-items: center; gap: 2px; padding: 2px; border-radius: 8px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); }
.ks-seg > button {
  appearance: none; border: 0; cursor: pointer; padding: 3px 10px; border-radius: 6px;
  font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary);
  background: transparent; transition: background .16s ease, color .16s ease;
}
.ks-seg > button[data-on="true"] {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
  color: var(--dsw-alias-label-primary);
  font-weight: 600;
}
.ks-seg > button:hover { color: var(--dsw-alias-label-primary); }
.ks-seg > button:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px;
}

/* ===== nixie tubes (v4) ================================================== */
/* Tube rendering is the v4 Web Component from steins-gate-nixie-assets
   (src/sg-nixie.inline.js). build.mjs slices this section out by these two
   markers so the host-side boot injection can ship the identical stylesheet;
   the compact sidebar meter that used to live here is gone, so what remains is
   only the full-size board sizing used by the splash / boot / load screens. */
.ks-splash-row sg-nixie,
.ks-boot-board sg-nixie,
#ks-loadscreen .ks-load-row sg-nixie { --nx-span: min(560px, 78vw); --nx-gr: .12; }
.ks-boot-row sg-nixie { --nx-span: min(720px, 86vw); --nx-gr: .12; }
.ks-splash-row sg-nixie::part(panel),
.ks-boot-row sg-nixie::part(panel),
#ks-loadscreen .ks-load-row sg-nixie::part(panel) {
  padding: 12px 16px 8px;
  border-radius: 10px;
}

/* ===== product splash (the very first screen, pre-plugins) =============== */
/* The web shell builds this before any plugin runs: [data-dsh-boot] root,
   [data-dsh-boot-spinner] ring, and a --dsh-boot-arc custom property carrying
   real load progress. Restyling it makes the skin start at first paint instead
   of only after the app mounts. */
[data-dsh-boot] {
  background:
    radial-gradient(130% 96% at 50% 42%, #101728 0%, #080b14 52%, #03050a 100%) !important;
}
[data-dsh-boot] [class*="_card"] { gap: 13px !important; }
[data-ks-boot="true"] [class*="_card"] { gap: 13px !important; }
.ks-boot-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
}
.ks-boot-brand svg.ks-mark {
  width: 18px;
  height: 18px;
  flex: none;
}
[data-ks-boot="true"] [class*="_wordmark"] {
  color: #ffd0a4 !important;
  font-family: "Cascadia Code", Consolas, monospace !important;
  letter-spacing: .34em !important;
  font-size: 13px !important;
  text-shadow: 0 0 10px rgba(255,150,60,.55), 0 0 26px rgba(255,104,20,.32);
}
[data-ks-boot="true"] [class*="_hint"] {
  color: rgba(255,178,113,.62) !important;
  letter-spacing: .16em;
  font-family: "Cascadia Code", Consolas, monospace !important;
  font-size: 10px !important;
}
[data-ks-boot="true"] [data-dsh-boot-spinner] { display: none !important; }
/* ===== themed load screen (our own layer, above the shell splash) ======== */
/* The shell's splash card is only hidden; the board itself is a separate
   fixed layer appended to <body>, so React clearing #root cannot take it. */
.ks-splash {
  position: fixed;
  inset: 0;
  z-index: 2147483500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: radial-gradient(130% 96% at 50% 42%, #101728 0%, #080b14 52%, #03050a 100%);
  font-family: "Cascadia Code", Consolas, monospace;
  opacity: 1;
  transition: opacity .4s ease;
  pointer-events: none;
}
.ks-splash[data-out="true"] { opacity: 0; }
.ks-splash-brand {
  display: flex;
  align-items: center;
  gap: 9px;
}
.ks-splash-brand svg.ks-mark {
  width: 18px;
  height: 18px;
  flex: none;
}
.ks-splash-word {
  color: #ffd0a4;
  font-size: 13px;
  letter-spacing: .34em;
  text-shadow: 0 0 10px rgba(255, 150, 60, .55), 0 0 26px rgba(255, 104, 20, .32);
}
.ks-splash-cap {
  font-size: 9px;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: rgba(255, 178, 113, .42);
}
.ks-splash-row {
  display: flex;
  align-items: flex-end;
  gap: 5px;
}
.ks-splash-val {
  font-size: 11px;
  letter-spacing: .18em;
  color: rgba(255, 178, 113, .74);
}
.ks-splash-bar {
  width: min(360px, 56vw);
  height: 2px;
  background: rgba(255, 178, 113, .14);
  overflow: hidden;
}
.ks-splash-bar > i {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff5f12, #ffc27f);
  box-shadow: 0 0 12px rgba(255, 116, 30, .9);
}
.ks-splash-hint {
  font-size: 9px;
  letter-spacing: .18em;
  color: rgba(255, 178, 113, .3);
}
/* the shell's own card goes invisible while our board owns the screen */
[data-ks-boot="true"] [class*="_card"] { visibility: hidden !important; }
.ks-boot-cap2 {
  font-size: 9px;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: rgba(255,178,113,.42);
  font-family: "Cascadia Code", Consolas, monospace;
  margin-top: 2px;
}
.ks-boot-board {
  display: flex;
  align-items: flex-end;
  gap: 5px;
}
/* ===== boot screen ======================================================= */
.ks-boot {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  background:
    radial-gradient(130% 92% at 50% 42%, #0b0f17 0%, #06080d 58%, #020305 100%);
  font-family: "Cascadia Code", Consolas, monospace;
  color: #ffb271;
  opacity: 1;
  transition: opacity .55s ease;
}
.ks-boot[data-out="true"] { opacity: 0; pointer-events: none; }
.ks-boot-row { display: flex; align-items: flex-end; gap: 8px; }
.ks-boot-cap {
  font-size: 10px;
  letter-spacing: .34em;
  text-transform: uppercase;
  color: rgba(255,178,113,.5);
}
.ks-boot-val {
  font-size: 13px;
  letter-spacing: .22em;
  color: rgba(255,178,113,.86);
  min-height: 18px;
}
.ks-boot-bar {
  width: min(440px, 62vw);
  height: 2px;
  background: rgba(255,178,113,.14);
  overflow: hidden;
}
.ks-boot-bar > i {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff5f12, #ffc27f);
  box-shadow: 0 0 12px rgba(255,116,30,.9);
}
.ks-boot-hint {
  font-size: 10px;
  letter-spacing: .18em;
  color: rgba(255,178,113,.32);
}

/* ===== brand row / collapse toggle clearance ============================= */
/* ===== v1.7 polish ======================================================= */

/* 1) Sidebar collapse toggle: pin it to the window's top-left row.
   Shipped it is position:fixed; left:12px; top:centered in the whole title
   band, and that band is taller than one row on Windows, so the button ended
   up floating between the menu row and the logo row. Anchoring it to the top
   of the band puts it in the corner and lets the logo row sit at the normal
   left inset again. */
/* The collapse toggle must share the first window row with 应用 / 编辑.
   It cannot be moved with CSS: the sidebar column carries backdrop-filter, which
   makes it the containing block for position:fixed (measured from y=40), and
   both it and logoRow clip with overflow:hidden. So the real button stays in
   React's tree (hidden), and a mirror is mounted on document.body where fixed
   resolves against the viewport. */
/* macOS keeps the stock position: the toggle already sits at the top-right of
   the sidebar's own strip, and the traffic lights own the top-left corner. Only
   the Windows build needs the mirror, because there the button is fixed to a
   title bar that is taller than one row. */
html:not([data-platform="darwin"])[data-ks-wall="on"] [class*="_toggle"].ks-toggle-source {
  visibility: hidden !important;
}
html[data-platform="darwin"] .ks-toggle-mirror { display: none !important; }

/* Traffic lights are drawn at x16..76, y6..30 by the window, above the page.
   The 40px rail starts at the window's top edge, so without this clearance the
   Amadeus mark lands straight on top of them. */
html[data-platform="darwin"] div[class*="_sidebarCol"] div[class*="_root"][class*="_collapsed"] {
  padding-top: 46px !important;
}

.ks-toggle-mirror {
  position: fixed !important;
  top: 6px !important;
  left: 12px !important;
  width: 28px !important;
  height: 28px !important;
  z-index: 2147483000 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-secondary, #6b5c60);
  cursor: pointer;
  -webkit-app-region: no-drag;
}
.ks-toggle-mirror:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(90, 60, 50, .1)); }
.ks-toggle-mirror svg { width: 16px; height: 16px; }

/* The sidebar collapse toggle: ship position, untouched.
   Two attempts to move it are reverted on purpose:
     - top:5px  -> landed at y=45, because its fixed containing block is the
                   second content row, not the viewport
     - top:-35px -> clipped away by that row, the button disappeared entirely
   The user asked for "its original position", so the shipped rule stays. */

/* 2) File-edit dock card + scroll-to-bottom button: let the wallpaper through.
   The card paints itself from --dsw-specific-menu, the round button from
   --dsw-alias-button-floating-fill; both are scoped here so no other menu or
   floating button changes. */
/* The changed-files card is a CSS-module class ending in _card; its visible
   surface is the header, which paints from --changes-fill. Both are softened
   here, scoped to that card only (the code-block card ends in a line hash and
   is not matched by [class$="_card"]). */
/* File / deliverable attachment card. Its fill comes from --deliverable-fill
   (dsw-static-neutral-50: near-opaque white) while every other surface in this skin
   is glass, so that card reads as a solid block. Repoint the variable to the same
   glass formula the rest of the skin uses; the hover fill follows it. */
[data-ks-wall="on"] [class$="_file"] {
  --deliverable-fill: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #fff) 52%, transparent);
  --deliverable-hover: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #fff) 66%, transparent);
  backdrop-filter: blur(14px) saturate(1.06);
}

[data-ks-wall="on"] [class$="_card"] {
  --changes-fill: transparent;
  --changes-hover: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #fff) 42%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #fff) 52%, transparent) !important;
  backdrop-filter: blur(16px) saturate(1.06);
}
[data-ks-wall="on"] [class*="_toBottom"] {
  --dsw-alias-button-floating-fill: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #fff) 56%, transparent);
  --dsw-alias-button-floating-hover: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #fff) 72%, transparent);
  --dsw-elevation-panel: 0 2px 10px -4px rgba(0, 0, 0, .45);
  backdrop-filter: blur(12px) saturate(1.05);
}

/* ds-bot paints its own blue from --bt-accent / --bt-ink-deepseek (#4d6bfe),
   which is why no filter on a class ever matched: the colour is a variable, not
   a class. Re-point the bot's palette at the Amadeus one so its chip, panel and
   agent rows all join the skin instead of sitting on it. */
html[data-ks-wall="on"] body {
  --bt-accent: #ffa028 !important;
  --bt-ink-deepseek: #ff8a1f !important;
  --bt-green: #41c7b9 !important;
  --bt-danger: #e5484d !important;
}
/* The bot chip in the sidebar footer keeps the stock DeepSeek-blue whale and no
   class hook identifies it, so the plugin tags the chip at runtime (tagBotChip)
   and this rule tints exactly that element. */
/* The bot avatar is ds-bot's own stable .bt-mark span, and its whale is
   filled by an SVG gradient (url(#bt-mark-N)), so it follows neither the theme
   tokens nor --bt-accent. A filter is the only handle that works on a gradient
   fill; applied to the mark span so every bot avatar joins the palette. */
[data-ks-wall="on"] .bt-mark,
[data-ks-wall="on"] .bt-mark svg {
  filter: grayscale(.55) sepia(.5) saturate(2.1) hue-rotate(-14deg) brightness(1.04);
}

[data-ks-wall="on"] .ks-bot-chip,
[data-ks-wall="on"] .ks-bot-chip svg,
[data-ks-wall="on"] .ks-bot-chip img {
  filter: grayscale(.6) sepia(.5) saturate(2) hue-rotate(-12deg) brightness(1.03);
}

/* 3) Agent-team / bot glyph (blue + orange + cyan quadrants, shipped with fixed
   hex fills) warmed into the Amadeus palette. Matched by the icon's own exact
   path fills so no unrelated icon is touched. */
[data-ks-wall="on"] svg:has(> path[fill="#F2AF63"]),
[data-ks-wall="on"] svg:has(> path[fill="#7CB7FF"]) {
  filter: grayscale(.7) sepia(.55) saturate(2.1) hue-rotate(-12deg) brightness(1.03)
    drop-shadow(0 1px 2px rgba(120, 60, 30, .18));
}

/* Agent rows carry data-agent-id on the row itself, which is a stable semantic
   hook (the avatar classes are plugin-local). Tint only the glyph inside those
   rows: the stock blue bot avatar joins the Amadeus palette without touching any
   other icon. */
[data-ks-wall="on"] [data-agent-id] svg,
[data-ks-wall="on"] [data-agent-id] img {
  filter: grayscale(.55) sepia(.45) saturate(1.9) hue-rotate(-10deg) brightness(1.04)
    drop-shadow(0 1px 2px rgba(120, 60, 30, .18));
}
div[class*="_brandMark"] {
  flex: none;
}
div[class*="_brandMark"] > .ks-mark {
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
}
/* the rail (collapsed) variant is a 40px square; keep the badge centred there */
html[data-sidebar-collapsed="true"] div[class*="_brandMark"] > .ks-mark {
  width: 22px;
  height: 22px;
  max-width: 22px;
  max-height: 22px;
}

`;

		// ---------------------------------------------------------------- polish
		// Icons, buttons, focus rings, scrollbars and Amadeus-flavoured motion.
		// Everything here is additive: no shipped selector is replaced, so the
		// skin cannot break layout if a hashed class name changes between builds.
		const POLISH_CSS = `
/* ===== dsh-skin-kurisu / icon + motion polish ===== */

/* Amadeus CRT palette, exposed as helpers for the rules below.
   IMPORTANT: these must be declared on <body>, not <html>. The theme presenter
   writes the --dsw-* tokens inline on document.body, and a custom property
   resolves var() on the element it is DECLARED on. Declaring this block on html
   made every var(--dsw-*) lookup miss (they live one level down on body), so
   --ks-glow computed to the guaranteed-invalid value and every rule
   using them silently produced nothing — the meter LED stayed transparent and
   the glow shadows never rendered. Fallbacks keep it usable even before the
   theme layer lands. */
body {
  --ks-rose: color-mix(in srgb, var(--dsw-alias-brand-primary, #9c3140) 88%, white);
  --ks-glow: color-mix(in srgb, var(--dsw-alias-brand-primary, #9c3140) 42%, transparent);
  --ks-glow-soft: color-mix(in srgb, var(--dsw-alias-brand-primary, #9c3140) 18%, transparent);
  --ks-ease: var(--ds-ease-in-out, cubic-bezier(.4,0,.2,1));
  --ks-fast: var(--ds-transition-duration-fast, 120ms);
  --ks-med: var(--ds-transition-duration, 200ms);
  --ks-slow: var(--ds-transition-duration-slow, 320ms);
}

/* -- icons ---------------------------------------------------------------- */
/* Verified from shipped source (dsh-client-ui-primitives/lib/index.js:75-98):
   DSH icons are NOT lucide-react. They are first-party inline SVG artwork with
   width/height = size, viewBox "0 0 16 16", fill="none", aria-hidden="true",
   stroke="currentColor" (FishLogo and the send arrow use fill="currentColor"),
   and NO per-icon data attribute and NO default class. So the only reliable
   handle is the parent control + "> svg".
   Scope is limited to the app frame's interactive chrome so SVGs inside chat
   content are never touched. */
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(button, [role="button"], a, [tabindex]) > svg,
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) span[class*="iconButton"] > svg,
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) span[class*="panelIcon"] > svg {
  transition: filter var(--ks-med) var(--ks-ease), transform var(--ks-med) var(--ks-ease);
}
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(button, [role="button"], a):hover > svg,
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(button, [role="button"], a):focus-visible > svg {
  filter: drop-shadow(0 0 5px var(--ks-glow));
  transform: scale(1.07);
}
/* icons in selected / active rows get a rose wash */
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where([data-active="true"], [aria-current="page"], [aria-selected="true"], [data-selected="true"]) > svg {
  color: var(--ks-rose);
  filter: drop-shadow(0 0 4px var(--ks-glow-soft));
}

/* -- buttons -------------------------------------------------------------- */
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(button, [role="button"]) {
  transition:
    transform var(--ks-fast) var(--ks-ease),
    box-shadow var(--ks-med) var(--ks-ease),
    border-color var(--ks-med) var(--ks-ease),
    background-color var(--ks-med) var(--ks-ease),
    color var(--ks-med) var(--ks-ease);
}
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(button, [role="button"]):hover:not(:disabled):not([aria-disabled="true"]) {
  box-shadow: 0 0 0 1px var(--ks-glow-soft), 0 4px 14px -6px var(--ks-glow);
}
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(button, [role="button"]):active:not(:disabled):not([aria-disabled="true"]) {
  transform: scale(.965);
}

/* primary / CTA surfaces: a restrained rose→plum gradient + breathing ring.
   The send/stop key is the 34x34 round button inside data-composer-card whose
   class ends in _primary (background: var(--dsw-alias-button-info-fill)) — the
   info fill is what the stock UI paints it with, so this is where the Kurisu
   red lives. Scoped to the composer so a settings/models _primary button keeps
   its own colour. */
html[data-ks-polish="on"] [data-composer-card] button[class*="_primary"],
html[data-ks-polish="on"] :where(button, [role="button"])[data-variant="primary"]:not(:disabled),
html[data-ks-polish="on"] :where(button, [role="button"])[aria-label*="发送"]:not(:disabled) {
  background-image: linear-gradient(135deg,
    color-mix(in srgb, var(--dsw-alias-brand-primary) 94%, white) 0%,
    var(--dsw-alias-brand-primary) 52%,
    color-mix(in srgb, var(--dsw-alias-brand-primary) 72%, #2a1020) 100%) !important;
  background-color: var(--dsw-alias-brand-primary) !important;
  color: #fff;
  box-shadow: 0 4px 18px -8px var(--ks-glow), inset 0 1px 0 rgba(255,255,255,.22);
  transition: transform var(--ks-fast) var(--ks-ease), box-shadow var(--ks-med) var(--ks-ease), background-color var(--ks-med) var(--ks-ease);
}
html[data-ks-polish="on"] [data-composer-card] button[class*="_primary"]:hover:not(:disabled),
html[data-ks-polish="on"] :where(button, [role="button"])[data-variant="primary"]:not(:disabled):hover {
  background-image: linear-gradient(135deg,
    color-mix(in srgb, var(--dsw-alias-brand-primary) 88%, white) 0%,
    color-mix(in srgb, var(--dsw-alias-brand-primary) 96%, white) 48%,
    var(--dsw-alias-brand-primary) 100%) !important;
  box-shadow: 0 6px 22px -8px var(--ks-glow), 0 0 0 3px var(--ks-glow-soft), inset 0 1px 0 rgba(255,255,255,.26);
}

/* the composer "+" round button */
html[data-ks-polish="on"] [data-composer-card] button[class*="_add"] {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 24%, transparent);
  transition: transform var(--ks-fast) var(--ks-ease), box-shadow var(--ks-med) var(--ks-ease);
}
html[data-ks-polish="on"] [data-composer-card] button[class*="_add"]:hover:not(:disabled) {
  box-shadow: 0 0 0 2px var(--ks-glow-soft), 0 0 16px -4px var(--ks-glow);
}

/* composer toolbar chips (primitives Pill) */
html[data-ks-polish="on"] [data-composer-card] [class*="_row"] [class*="pill"] {
  border: 1px solid transparent;
  transition: border-color var(--ks-med) var(--ks-ease), background-color var(--ks-med) var(--ks-ease), box-shadow var(--ks-med) var(--ks-ease);
}
html[data-ks-polish="on"] [data-composer-card] [class*="_row"] [class*="pill"]:hover {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);
  box-shadow: 0 0 12px -6px var(--ks-glow);
}

/* user bubble: a thin crimson edge instead of a flat panel */
html[data-ks-polish="on"] div[class*="bubble"] {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);
}

/* -- focus ring ----------------------------------------------------------- */
/* Shipped convention: :focus-visible{outline:var(--dsw-focus-ring-width) solid
   var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
   outline-offset:-2px}. We keep the geometry and only recolor it crimson, so
   no layout shifts. */
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: -2px;
}
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(input, textarea, [contenteditable="true"]):focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ks-glow), inset 0 0 0 1px var(--ks-glow-soft);
}

/* -- composer / cards ----------------------------------------------------- */
/* The composer panel ships a stable hook, data-composer-card, so this skin
   never has to name its CSS-module class. The module hash changes on every
   upstream build (VERcba_ -> JZLxKW_ was one such flip) and every rule written
   against the old hash silently stops matching. Toolbar row = the child that
   carries the primary/add buttons, reached by [class*="_row"]. */
html[data-ks-polish="on"] div[data-composer-card],
html[data-ks-polish="on"] :where([class*="composer"], [class*="inputBox"], [class*="chatInput"]) {
  position: relative;
  isolation: isolate;
}

/* -- scrollbar ------------------------------------------------------------ */
/* Shipped tokens: --dsw-alias-scrollbar-bg-l1/-l2 and
   --dsw-alias-scrollbar-hover-l1/-l2 (already overridden by this skin's token
   layer). The composer card reads --dsh-scrollbar-thumb instead, so both
   channels are themed. */
html[data-ks-polish="on"] ::-webkit-scrollbar { width: 10px; height: 10px; }
html[data-ks-polish="on"] ::-webkit-scrollbar-track { background: transparent; }
html[data-ks-polish="on"] ::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 999px;
  background-clip: content-box;
  background-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, var(--dsw-alias-scrollbar-bg-l1));
}
html[data-ks-polish="on"] ::-webkit-scrollbar-thumb:hover {
  background-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 70%, transparent);
}
html[data-ks-polish="on"] div[data-composer-card] {
  --dsh-scrollbar-thumb: color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, var(--dsw-alias-scrollbar-bg-l2));
  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);
}

/* -- code / quotes: lab terminal ------------------------------------------ */
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(code, pre) {
  font-family: "Cascadia Code", "JetBrains Mono", Consolas, "SF Mono", monospace;
}
html[data-ks-polish="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]) :where(blockquote) {
  border-left: 2px solid var(--dsw-alias-brand-primary);
  background: var(--ks-glow-soft);
}


/* -- brand mark ------------------------------------------------------------ */
.ks-mark {
  display: block;
  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--dsw-alias-brand-primary) 70%, transparent));
}

/* The shipped brand mark is the Amadeus badge: a square webp, not a stroked
   glyph. A crimson halo around an orange badge reads as mud, and the breathe
   keyframes were tuned for a thin outline, so the image variant opts out of
   both and gets its own corner radius to match the app icon. */
.ks-mark.ks-amadeus {
  border-radius: 22%;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, .45));
  animation: none;
}
html[data-ks-polish="off"] .ks-mark { filter: none; animation: none; }

/* -- live glow: always-on motion ----------------------------------------- */
/* Hover-only highlights are invisible until you point at them, which is why a
   "dynamic" skin can still look completely static. Everything below moves on
   its own. All of it stays gated by html[data-ks-polish="on"] and by
   prefers-reduced-motion. */

/* send key: a radar ping so the primary action reads as live.
   The halo lives on a pseudo-element and animates only transform + opacity, so
   the compositor can run it without repainting the button every frame. Animating
   box-shadow spread (the first version) repainted the whole control 60x/s. */
html[data-ks-polish="on"] [data-composer-card] button[class*="_primary"] {
  position: relative;
  isolation: isolate;
}
html[data-ks-polish="on"] [data-composer-card] button[class*="_primary"]::after {
  content: "";
  position: absolute;
  inset: 0;
  /* z-index 0, not -1: a negative index puts the halo behind the button's own
     opaque background, and the spread was never visible. */
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 58%, transparent);
  animation: ks-ping 3.2s cubic-bezier(.22, .61, .36, 1) infinite;
}
@keyframes ks-ping {
  0% { transform: scale(1); opacity: .58; }
  60% { transform: scale(1.55); opacity: 0; }
  100% { transform: scale(1.55); opacity: 0; }
}

/* composer: a light running around the border (conic ring masked to 1px) */
@property --ks-ring {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
html[data-ks-polish="on"] div[data-composer-card]::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: 2;
  padding: 2px;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(from var(--ks-ring),
    transparent 0deg 185deg,
    color-mix(in srgb, var(--dsw-alias-brand-primary) 78%, transparent) 248deg,
    color-mix(in srgb, var(--dsw-alias-state-business-primary) 60%, transparent) 300deg,
    transparent 352deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: .9;
  /* Animating a registered <angle> repaints the whole composer every frame.
     Idle it does nothing for the reader, so the ring only runs while the
     composer is focused or hovered. */
  animation: ks-ring 7s linear infinite;
  animation-play-state: paused;
}
html[data-ks-polish="on"] div[data-composer-card]:hover::before,
html[data-ks-polish="on"] div[data-composer-card]:focus-within::before {
  animation-play-state: running;
}
@keyframes ks-ring { to { --ks-ring: 360deg; } }
html[data-ks-polish="on"] div[data-composer-card]:focus-within::before {
  opacity: 1;
  animation-duration: 2.4s;
}
html[data-ks-polish="on"] div[data-composer-card]:focus-within {
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 42%, transparent),
              0 0 26px -8px var(--ks-glow);
}

/* -- settings toggle ------------------------------------------------------- */
.ks-toggle {
  display: inline-flex; align-items: center; gap: 8px;
  width: fit-content; padding: 6px 10px 6px 7px; margin-top: 2px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 11px; line-height: 16px;
  cursor: pointer;
}
.ks-toggle:hover { border-color: var(--dsw-alias-brand-primary); }
.ks-toggle-knob {
  position: relative; width: 26px; height: 14px; flex: none;
  border-radius: 999px; background: var(--dsw-alias-border-l4);
  transition: background-color var(--ks-med) var(--ks-ease);
}
.ks-toggle-knob::after {
  content: ""; position: absolute; top: 2px; left: 2px;
  width: 10px; height: 10px; border-radius: 50%;
  background: #fff;
  transition: transform var(--ks-med) var(--ks-ease);
}
.ks-toggle[data-on="true"] .ks-toggle-knob { background: var(--dsw-alias-brand-primary); }
.ks-toggle[data-on="true"] .ks-toggle-knob::after { transform: translateX(12px); }
.ks-toggle-state { color: var(--dsw-alias-label-tertiary); min-width: 12px; }

/* -- keyframes ------------------------------------------------------------ */
/* -- accessibility -------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  html[data-ks-polish="on"] *,
  html[data-ks-polish="on"] *::before,
  html[data-ks-polish="on"] *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
}
`;

		// ---------------------------------------------------------------- helpers
		const readSaved = () => {
			try {
				const value = window.localStorage.getItem(STORAGE_KEY);
				if (value === "none") return "none";
				if (value === "custom") return "custom";
				if (value && Object.prototype.hasOwnProperty.call(WALLPAPERS, value)) return value;
			} catch (error) {
				/* localStorage may be unavailable */
			}
			return DEFAULT_WALLPAPER;
		};

		const save = (id) => {
			try {
				window.localStorage.setItem(STORAGE_KEY, id);
			} catch (error) {
				/* ignore */
			}
		};

		const readPolish = () => {
			try {
				return window.localStorage.getItem(POLISH_KEY) !== "off";
			} catch (error) {
				return true;
			}
		};

		const savePolish = (on) => {
			try {
				window.localStorage.setItem(POLISH_KEY, on ? "on" : "off");
			} catch (error) {
				/* ignore */
			}
		};

		const applyPolish = (on) => {
			document.documentElement.setAttribute("data-ks-polish", on ? "on" : "off");
		};

		// Transparency of the four big surfaces: left nav, panel layers,
		// composer and code blocks. Values live in CSS (see the glass-level
		// block) so switching is a single attribute flip.
		const GLASS_LEVELS = ["solid", "mid", "clear"];
		const GLASS_LABELS = { solid: "偏实", mid: "标准", clear: "通透" };

		const readGlass = () => {
			try {
				const v = window.localStorage.getItem(GLASS_KEY);
				return GLASS_LEVELS.indexOf(v) >= 0 ? v : "mid";
			} catch (error) {
				return "mid";
			}
		};

		const saveGlass = (level) => {
			try {
				window.localStorage.setItem(GLASS_KEY, level);
			} catch (error) {
				/* ignore */
			}
		};

		const applyGlass = (level) => {
			const next = GLASS_LEVELS.indexOf(level) >= 0 ? level : "mid";
			document.documentElement.setAttribute("data-ks-glass", next);
			return next;
		};

		// How strongly the wallpaper shows. Five steps, scaled in CSS through
		// --ks-veil / --ks-wash, so switching a step never rebuilds the sheet.
		const DENSITY_LEVELS = ["faint", "soft", "mid", "strong", "vivid"];
		const DENSITY_LABELS = { faint: "最淡", soft: "淡", mid: "标准", strong: "浓", vivid: "最浓" };

		const readDensity = () => {
			try {
				const v = window.localStorage.getItem(DENSITY_KEY);
				return DENSITY_LEVELS.indexOf(v) >= 0 ? v : "mid";
			} catch (error) {
				return "mid";
			}
		};

		const saveDensity = (level) => {
			try {
				window.localStorage.setItem(DENSITY_KEY, level);
			} catch (error) {
				/* ignore */
			}
		};

		const applyDensity = (level) => {
			const next = DENSITY_LEVELS.indexOf(level) >= 0 ? level : "mid";
			// Every step sets the attribute, "mid" included: the stylesheet ladder
			// then owns all five values, so the default cannot drift away from what
			// buildWallCss() falls back to before this attribute is written.
			document.documentElement.setAttribute("data-ks-density", next);
			return next;
		};

		let wallStyleEl = null;

		// The wallpaper CSS is regenerated only when the selection changes. Each
		// image is inline base64, so it lives in this dedicated stylesheet rather
		// than in inherited custom properties.
		//
		// Verified from shipped source (dsh-client-ui-layout/lib/client.js:72-91):
		//   div[class*="_frame"]:has(> div[class*="_sidebarCol"])  — AppFrame, the grid root; the common React parent of
		//                     sidebarCol + centerCol. It paints its own opaque
		//                     background (--dsw-alias-bg-base, or
		//                     --dsw-specific-sidebar-fill under the Windows
		//                     title bar), so a body-level wallpaper is hidden.
		//   div[class*="_centerCol"] — paints --dsw-alias-bg-base on Windows/macOS.
		// Both are matched by class *substring*, not by the full CSS-module name:
		// the hash prefix is generated per build (it was MnhYfG_ in one release and
		// PIRFFq_ in the next), so a literal name silently stops matching.
		// Both are addressed here; `#root > div` is the stable fallback for the
		// same element when the CSS-module hash changes between builds.
		const buildWallCss = (wp) => `
/* The right panel in its fullscreen presentation is a 100vw box anchored to the
   frame's right edge, and its own box paints nothing — so the conversation
   column underneath reads straight through the glass. Painting the same
   wallpaper stack on it gives it the wallpaper instead: the image layer is
   viewport-fixed, exactly like the frame's, so the two copies line up and the
   seam is invisible. Without this, fullscreen turns the panel into a window
   onto the text behind it. */
html[data-ks-wall="on"] body,
html[data-ks-wall="on"] #root > div,
html[data-ks-wall="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]),
html[data-ks-wall="on"] [data-sidebar-right-panel="fullscreen"] {
  background-color: #06080f !important;
  background-image:
    linear-gradient(var(--ks-veil, rgba(6,8,15,.34)), var(--ks-veil, rgba(6,8,15,.34))),
    radial-gradient(120% 92% at 52% 42%, transparent 54%, rgba(2,4,8,.42) 100%),
    linear-gradient(101deg, rgba(4,6,12,.94) 0%, rgba(6,9,16,.88) 30%, rgba(8,11,20,.70) 52%, rgba(10,13,22,.30) 74%, rgba(7,10,17,.52) 100%),
    radial-gradient(78rem 48rem at 84% 38%, rgba(133,48,64,.24), transparent 62%),
    url("${wp.dark}") !important;
  background-size: cover, cover, cover, cover, cover;
  background-position: center, center, center, center, ${wp.pos};
  background-repeat: no-repeat;
  background-attachment: scroll, scroll, scroll, scroll, fixed;
}
/* The theme presenter toggles data-ds-dark-theme on <body>, so the light
   variant is selected with body:not([data-ds-dark-theme]). */
html[data-ks-wall="on"] body:not([data-ds-dark-theme]),
html[data-ks-wall="on"] body:not([data-ds-dark-theme]) #root > div,
html[data-ks-wall="on"] body:not([data-ds-dark-theme]) div[class*="_frame"]:has(> div[class*="_sidebarCol"]),
html[data-ks-wall="on"] body:not([data-ds-dark-theme]) [data-sidebar-right-panel="fullscreen"] {
  background-color: #f4eee6 !important;
  background-image:
    linear-gradient(var(--ks-veil-light, rgba(252,249,245,.30)), var(--ks-veil-light, rgba(252,249,245,.30))),
    radial-gradient(120% 92% at 52% 42%, transparent 70%, rgba(120,86,74,.08) 100%),
    linear-gradient(101deg, rgba(253,250,246,.52) 0%, rgba(252,248,243,.42) 30%, rgba(250,245,239,.24) 52%, rgba(250,245,239,.06) 74%, rgba(252,248,243,.20) 100%),
    radial-gradient(70rem 44rem at 86% 36%, rgba(196,110,104,.14), transparent 60%),
    url("${wp.light}") !important;
}
/* The conversation chain paints --dsw-alias-bg-base on several nested layers
   (centerCol -> conversation root -> body). With a translucent token those
   stack into a nearly opaque cream wash, so every intermediate layer is
   cleared and exactly one scrim is kept on the center column. The
   conversation root's stable hook is its data-phase attribute; its CSS-module
   hash differs per build. */
html[data-ks-wall="on"] div[class*="_centerCol"],
html[data-ks-wall="on"] #root > div > div[class*="_centerCol"] {
  background-color: var(--ks-wash, rgba(7,10,18,.38)) !important;
  background-image: none !important;
}
html[data-ks-wall="on"] body:not([data-ds-dark-theme]) div[class*="_centerCol"],
html[data-ks-wall="on"] body:not([data-ds-dark-theme]) #root > div > div[class*="_centerCol"] {
  background-color: var(--ks-wash-light, rgba(250,246,241,.24)) !important;
}
html[data-ks-wall="on"] div[data-phase],
html[data-ks-wall="on"] div[class*="_bottomRow"] {
  background-color: transparent !important;
  background-image: none !important;
}
/* The composer seat is the box that holds the input card: absolutely positioned,
   stretched across the conversation column, and given a vertical gradient from
   transparent to --dsw-alias-bg-base by ConversationRoot.module.css. With an
   opaque token that gradient reads as a solid slab the height of the input box,
   sitting on top of the wallpaper. The gradient only exists to fade out text
   scrolling underneath, so with the wallpaper on it is dropped entirely: the
   card carries its own background and the column keeps a single wash. */
html[data-ks-wall="on"] [data-composer-seat],
html[data-ks-wall="on"] [class*="_composerSeat"] {
  background: none !important;
}
/* The card itself is the last cream slab left. Any alpha above zero still
   reads as a panel laid over the picture, because the thing behind it is the
   column wash, not the artwork. So with the wallpaper on the card paints
   nothing at all and simply inherits the same wash as the body text around it
   -- which is what 正文遮罩 promises -- and a hairline border keeps the input
   area legible as a target. The host keeps its own elevation shadow. */
html[data-ks-wall="on"] [data-composer-card] {
  background-color: transparent !important;
  border: 1px solid var(--dsw-alias-border-l2) !important;
}
/* The queue dock sits directly above the input card and shares its geometry.
   Its panel paints --dsw-specific-menu (0.94 alpha) on a ::before behind a 30px
   menu blur, which with a wallpaper on reads as the one opaque slab left in the
   column. Thinning that same token to ~36% over the blur keeps every row legible
   while letting the picture through, so the dock matches the now-transparent
   card below it instead of capping the column with a lid. */
html[data-ks-wall="on"] [data-queue-dock] > div::before {
  background: color-mix(in srgb, var(--dsw-specific-menu) 38%, transparent) !important;
  -webkit-backdrop-filter: blur(22px) saturate(120%) !important;
  backdrop-filter: blur(22px) saturate(120%) !important;
}
html[data-ks-wall="off"] body,
html[data-ks-wall="off"] #root > div,
html[data-ks-wall="off"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]),
html[data-ks-wall="off"] div[class*="_centerCol"],
html[data-ks-wall="off"] [data-sidebar-right-panel="fullscreen"] { background-image: none !important; }

@media (max-width: 900px) {
  html[data-ks-wall="on"] body,
  html[data-ks-wall="on"] #root > div,
  html[data-ks-wall="on"] div[class*="_frame"]:has(> div[class*="_sidebarCol"]),
  html[data-ks-wall="on"] [data-sidebar-right-panel="fullscreen"] { background-position: center, center, center, 68% 38%, center; }
}
`;

		// ------------------------------------------------------- custom wallpaper
		// A user-picked image lives in IndexedDB as a Blob (localStorage would hit
		// its ~5MB string quota with one 4K JPEG) and is served to CSS through an
		// object URL. The image is re-encoded to WebP at a sane resolution first:
		// the originals in the wallpaper folder are 6000x3375 / 31MB, and CSS only
		// ever paints one screen of it.
		const CUSTOM_ID = "custom";
		const CUSTOM_MAX_EDGE = 3840;
		let customWall = null;      // { dark, light, thumb, pos, label, hint }
		let customUrlLive = null;   // object URL to revoke on replace

		const idbOpen = () => new Promise((resolve, reject) => {
			if (!window.indexedDB) { reject(new Error("indexedDB unavailable")); return; }
			const req = window.indexedDB.open("dsh-skin-kurisu", 1);
			req.onupgradeneeded = () => {
				const db = req.result;
				if (!db.objectStoreNames.contains("walls")) db.createObjectStore("walls");
			};
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});

		const idbRun = async (mode, fn) => {
			const db = await idbOpen();
			try {
				return await new Promise((resolve, reject) => {
					const tx = db.transaction("walls", mode);
					const req = fn(tx.objectStore("walls"));
					req.onsuccess = () => resolve(req.result);
					req.onerror = () => reject(req.error);
				});
			} finally {
				db.close();
			}
		};

		const encodeForWallpaper = async (file) => {
			const bitmap = await createImageBitmap(file);
			const scale = Math.min(1, CUSTOM_MAX_EDGE / Math.max(bitmap.width, bitmap.height));
			const w = Math.max(1, Math.round(bitmap.width * scale));
			const h = Math.max(1, Math.round(bitmap.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
			if (bitmap.close) bitmap.close();
			const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.9));
			return blob || file;
		};

		const installCustomWallpaper = async (file) => {
			const blob = await encodeForWallpaper(file);
			await idbRun("readwrite", (store) => store.put(blob, CUSTOM_ID));
			const url = URL.createObjectURL(blob);
			if (customUrlLive) URL.revokeObjectURL(customUrlLive);
			customUrlLive = url;
			customWall = { dark: url, light: url, thumb: url, pos: "center", label: "自定义", hint: "你说的算" };
			save(CUSTOM_ID);
			applyWallpaper(CUSTOM_ID);
		};

		const dropCustomWallpaper = async () => {
			try { await idbRun("readwrite", (store) => store.delete(CUSTOM_ID)); } catch (error) {}
			if (customUrlLive) { URL.revokeObjectURL(customUrlLive); customUrlLive = null; }
			customWall = null;
		};

		// Resolves lazily: the very first paint after a restart has no Blob in
		// memory yet, so applyWallpaper() kicks this off and re-applies.
		const ensureCustomWall = async () => {
			if (customWall) return customWall;
			let blob = null;
			try { blob = await idbRun("readonly", (store) => store.get(CUSTOM_ID)); } catch (error) { blob = null; }
			if (!blob) return null;
			const url = URL.createObjectURL(blob);
			customUrlLive = url;
			customWall = { dark: url, light: url, thumb: url, pos: "center", label: "自定义", hint: "你说的算" };
			return customWall;
		};

		const applyWallpaper = (id) => {
			const root = document.documentElement;
			if (!root) return;
			if (id === "none") {
				root.setAttribute("data-ks-wall", "off");
				if (wallStyleEl) wallStyleEl.textContent = "";
				return;
			}
			if (id === CUSTOM_ID) {
				root.setAttribute("data-ks-wall", "on");
				if (customWall) {
					if (wallStyleEl) wallStyleEl.textContent = buildWallCss(customWall);
					return;
				}
				// Cold start: the blob is still in IndexedDB. Show nothing rather
				// than a flash of the default wallpaper, then apply when it loads.
				ensureCustomWall().then((wp) => {
					if (wp && readSaved() === CUSTOM_ID && wallStyleEl) {
						wallStyleEl.textContent = buildWallCss(wp);
					}
				});
				return;
			}
			const wp = WALLPAPERS[id] || WALLPAPERS[DEFAULT_WALLPAPER];
			root.setAttribute("data-ks-wall", "on");
			if (wallStyleEl) wallStyleEl.textContent = buildWallCss(wp);
		};

		const clearWallpaper = () => {
			const root = document.documentElement;
			if (root) root.removeAttribute("data-ks-wall");
			if (wallStyleEl) {
				wallStyleEl.remove();
				wallStyleEl = null;
			}
		};

		const controller = {
			apply: applyWallpaper,
			save,
			polish: { read: readPolish, save: savePolish, apply: applyPolish },
			glass: { read: readGlass, save: saveGlass, apply: applyGlass },
			density: { read: readDensity, save: saveDensity, apply: applyDensity },
			custom: { install: installCustomWallpaper, drop: dropCustomWallpaper, ensure: ensureCustomWall }
		};

		// ---------------------------------------------------------- amadeus mark
		// The brand mark slot renders a single occupant. Rather than draw an SVG by
		// hand, the skin ships the Amadeus app badge itself: a 256px WebP inlined
		// as a data URI so the mark needs no second network request and no file
		// path that could break when the profile is reinstalled.
		const AMADEUS_MARK = "data:image/webp;base64,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";

		// ---------------------------------------------------------------- brand
		// "sidebar.brand.mark" is a documented *single* extension point with
		// props { size }. Registering here makes us its sole occupant (both the
		// collapsed rail and expanded brand row render this component), which is
		// exactly the icon adaptation a skin is for. We respect props.size.
		let markSeq = 0;

		function KurisuMark(props) {
			const size = (props && props.size) || 24;
			const cls = "ks-mark ks-amadeus" + (props && props.className ? " " + props.className : "");
			return React.createElement("img", {
				className: cls,
				src: AMADEUS_MARK,
				width: size,
				height: size,
				alt: "",
				"aria-hidden": "true",
				draggable: "false"
			});
		}

		// ---------------------------------------------------------------- ui
		function KurisuRow(props) {
			const [active, setActive] = React.useState(readSaved);
			const [polishOn, setPolishOn] = React.useState(readPolish);
			const [glass, setGlass] = React.useState(readGlass);
			const [density, setDensity] = React.useState(readDensity);
			const [customThumb, setCustomThumb] = React.useState(null);
			const ctrl = props.controller || controller;
			const fileRef = React.useRef(null);

			// A saved custom wallpaper lives in IndexedDB, so its thumbnail only
			// exists once the blob resolves. Read it after mount, and again when a
			// new file is picked.
			React.useEffect(() => {
				let alive = true;
				ctrl.custom.ensure().then((wp) => {
					if (alive && wp) setCustomThumb(wp.thumb);
				}).catch(() => {});
				return () => { alive = false; };
			}, []);

			const choose = (id) => {
				setActive(id);
				ctrl.save(id);
				ctrl.apply(id);
			};
			const pickFile = () => { if (fileRef.current) fileRef.current.click(); };
			const onFile = async (event) => {
				const file = event.target.files && event.target.files[0];
				event.target.value = "";
				if (!file) return;
				await ctrl.custom.install(file);
				const wp = await ctrl.custom.ensure();
				if (wp) setCustomThumb(wp.thumb);
				setActive("custom");
			};
			const items = ORDER.concat(["none"]).map((id) => {
				const none = id === "none";
				const wp = WALLPAPERS[id];
				return React.createElement(
					"button",
					{
						key: id,
						type: "button",
						className: none ? "ks-thumb ks-none" : "ks-thumb",
						title: none ? "移除皮肤壁纸（配色仍然保留）" : wp.label + " — " + wp.hint,
						"data-active": String(active === id),
						"aria-pressed": active === id,
						style: none ? undefined : { backgroundImage: 'url("' + wp.thumb + '")' },
						onClick: () => choose(id)
					},
					React.createElement("span", null, none ? "无壁纸" : wp.label)
				);
			});
			return React.createElement(
				"div",
				{ className: "ks-row" },
				React.createElement(
					"div",
					{ className: "ks-head" },
					React.createElement("span", { className: "ks-title" }, "Makise Kurisu"),
					React.createElement("span", { className: "ks-sub" }, "Amadeus 配色 · 壁纸与界面同步")
				),
				React.createElement("div", { className: "ks-thumbs" }, items),
				React.createElement(
					"div",
					{ className: "ks-glassRow" },
					React.createElement("span", { className: "ks-glassLabel" }, "自定义壁纸"),
					React.createElement(
						"button",
						{
							type: "button",
							className: customThumb ? "ks-thumb" : "ks-thumb ks-none",
							style: customThumb
								? { backgroundImage: 'url("' + customThumb + '")', width: "104px", height: "60px" }
								: { width: "auto", height: "30px", padding: "0 12px" },
							title: "选一张本机图片当壁纸（会缩放存进浏览器）",
							"data-active": String(active === "custom"),
							onClick: () => { pickFile(); }
						},
						React.createElement("span", null, customThumb ? "自定义" : "＋ 选择图片…")
					),
					customThumb
						? React.createElement(
							"button",
							{
								type: "button",
								className: "ks-seg",
								style: { padding: "0 10px", height: "26px" },
								title: "清除已保存的自定义壁纸",
								onClick: async () => {
									await ctrl.custom.drop();
									setCustomThumb(null);
									if (active === "custom") choose(DEFAULT_WALLPAPER);
								}
							},
							React.createElement("span", null, "清除")
						)
						: null,
					React.createElement("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						style: { display: "none" },
						onChange: onFile
					})
				),
				React.createElement(
					"div",
					{ className: "ks-glassRow" },
					React.createElement("span", { className: "ks-glassLabel" }, "面板透明度"),
					React.createElement(
						"div",
						{ className: "ks-seg", role: "group", "aria-label": "面板透明度" },
						GLASS_LEVELS.map((level) =>
							React.createElement(
								"button",
								{
									key: level,
									type: "button",
									"data-on": String(glass === level),
									"aria-pressed": glass === level,
									title: "左栏 / 会话框 / 输入框 / 代码块：" + GLASS_LABELS[level],
									onClick: () => {
										setGlass(level);
										ctrl.glass.save(level);
										ctrl.glass.apply(level);
									}
								},
								GLASS_LABELS[level]
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "ks-glassRow" },
					React.createElement("span", { className: "ks-glassLabel" }, "壁纸浓度"),
					React.createElement(
						"div",
						{ className: "ks-seg", role: "group", "aria-label": "壁纸浓度" },
						DENSITY_LEVELS.map((level) =>
							React.createElement(
								"button",
								{
									key: level,
									type: "button",
									"data-on": String(density === level),
									"aria-pressed": density === level,
									title: "壁纸的浓淡：" + DENSITY_LABELS[level],
									onClick: () => {
										setDensity(level);
										ctrl.density.save(level);
										ctrl.density.apply(level);
									}
								},
								DENSITY_LABELS[level]
							)
						)
					)
				),
				React.createElement(
					"p",
					{ className: "ks-hint" },
					active === "none"
						? "当前只启用配色，不显示壁纸。"
						: active === "custom"
							? "正在用你选的图；换一张或点「清除」回到内置壁纸。"
							: "每张壁纸深浅色都用同一张；也可以选一张自己的图。"
				),
				React.createElement(
					"button",
					{
						type: "button",
						className: "ks-toggle",
						"data-on": String(polishOn),
						"aria-pressed": polishOn,
						title: "图标辉光、按钮渐变、CRT 扫描线、辉光管与启动动画",
						onClick: () => {
							const next = !polishOn;
							setPolishOn(next);
							ctrl.polish.save(next);
							ctrl.polish.apply(next);
						}
					},
					React.createElement("span", { className: "ks-toggle-knob" }),
					React.createElement("span", null, "图标 / 按钮 / 动效"),
					React.createElement("span", { className: "ks-toggle-state" }, polishOn ? "开" : "关")
				)
			);
		}

		// A small Steins;Gate divergence meter, parked in the sidebar footer's
		// list slot. Tube rendering is the v4 Web Component from
		// steins-gate-nixie-assets (src/sg-nixie.inline.js); this file only drives
		// its value and load progress. β 世界线按 S;G 设定为 1.130205，7 位有效
		// 数字 + 1 支小数点管 = 8 支；不再在有效位之后补零。
		// 8 tubes = 1 integer + 1 dot + 6 decimals. Every worldline has exactly 7
		// significant digits, so digitsOf never pads with zeros; the component
		// leaves a missing position as a DARK tube rather than inventing a zero.
		const NIXIE_CELLS = 7;
		const V4_TUBES = NIXIE_CELLS + 1;
		const digitsOf = (value) => String(value).replace(/[^0-9]/g, "").slice(0, NIXIE_CELLS);
		const BETA_DIGITS = digitsOf("1.130205");

		// Both the host boot injection and the client plugin ship the same v4
		// source; the guard inside the component makes registration idempotent.
		const ensureNixieV4 = () => {
			try {
				if (typeof customElements === "undefined" || typeof SG_NIXIE_JS !== "string") return;
				if (customElements.get("sg-nixie")) return;
				const tag = document.createElement("script");
				tag.textContent = SG_NIXIE_JS;
				(document.head || document.documentElement).appendChild(tag);
			} catch (error) {}
		};

		// noignite=1 disables the component's own ignition animation so that the
		// boot boards can drive the tubes with the real --dsh-boot-arc progress.
		const makeV4Meter = (className, span) => {
			const el = document.createElement("sg-nixie");
			el.setAttribute("tubes", String(V4_TUBES));
			el.setAttribute("noignite", "1");
			el.setAttribute("value", "1.130205");
			if (className) el.className = className;
			if (span) el.style.setProperty("--nx-span", span);
			el.style.setProperty("--nx-gr", ".12");
			return el;
		};

		const convergeV4 = (meter, progress) => {
			if (!meter || typeof meter.lockProgress !== "function") return;
			meter.lockProgress(Math.max(0, Math.min(1, progress)), BETA_DIGITS);
		};

		// The sidebar divergence meter used to live here. It is gone: a Web
		// Component plus three infinite animations bought zero information.

		// ------------------------------------------------- splash takeover
		// The shipped product splash is built by the web shell *before* plugins
		// activate, and it stays on screen while they do. Its own spinner exposes
		// the real progress as `--dsh-boot-arc` (72deg..288deg), so the board can
		// converge in step with actual plugin loading instead of faking a timer.
		// Verified from the shell source: root gets `data-dsh-boot`, spinner gets
		// `data-dsh-boot-spinner`, and updateProgress writes that angle.
		// Same geometry as the KurisuMark component, as markup: the splash badge is
		// injected before React is available, so it cannot go through a React root.
		// Keep the two in sync if the badge art changes.
		let markHtmlSeq = 0;
		const MARK_HTML = () =>
			'<img class="ks-mark ks-amadeus" width="18" height="18" alt="" aria-hidden="true"' +
			' draggable="false" src="' + AMADEUS_MARK + '">';

		const takeOverSplash = () => {
			// The host plugin injects the load screen through the boot table, which is
			// strictly earlier than anything a client plugin can do. If it is already
			// on screen, do not draw a second one.
			if (document.getElementById("ks-loadscreen")) return true;
			const root = document.querySelector("[data-dsh-boot]");
			if (!root) return false;
			if (document.querySelector(".ks-splash")) return true;
			// Hides the shell's own card (CSS keys off this attribute) and marks the
			// takeover so we never run twice.
			root.setAttribute("data-ks-boot", "true");

			const spinner = root.querySelector("[data-dsh-boot-spinner]");

			const el = document.createElement("div");
			el.className = "ks-splash";
			el.setAttribute("role", "presentation");

			const brand = document.createElement("div");
			brand.className = "ks-splash-brand";
			brand.innerHTML = MARK_HTML();
			const word = document.createElement("span");
			word.className = "ks-splash-word";
			word.textContent = "HARNESS";
			brand.appendChild(word);

			const cap = document.createElement("div");
			cap.className = "ks-splash-cap";
			cap.textContent = "world line divergence";

			const row = document.createElement("div");
			row.className = "ks-splash-row";
			const meter = makeV4Meter("ks-v4-splash", "min(560px, 78vw)");
			row.appendChild(meter);

			const val = document.createElement("div");
			val.className = "ks-splash-val";
			val.textContent = "CONVERGING";

			const bar = document.createElement("div");
			bar.className = "ks-splash-bar";
			const fill = document.createElement("i");
			bar.appendChild(fill);

			const hint = document.createElement("div");
			hint.className = "ks-splash-hint";
			hint.textContent = "AMADEUS LINK · β";

			el.appendChild(brand);
			el.appendChild(cap);
			el.appendChild(row);
			el.appendChild(val);
			el.appendChild(bar);
			el.appendChild(hint);
			(document.body || document.documentElement).appendChild(el);

			const startedAt = Date.now();
			let finished = false;
			let ticker = 0;
			const timers = [];

			const finish = () => {
				if (finished) return;
				finished = true;
				if (ticker) window.clearInterval(ticker);
				el.setAttribute("data-out", "true");
				const timer = window.setTimeout(() => el.remove(), 440);
				timers.push(timer);
			};

			const step = () => {
				if (finished) return;
				const elapsed = Date.now() - startedAt;
				const real = splashProgress(spinner);
				const progress = real === null ? Math.min(1, elapsed / 2600) : real;
				convergeV4(meter, progress);
				fill.style.width = (progress * 100).toFixed(1) + "%";
				val.textContent = progress < 1
					? "CONVERGING " + String(Math.round(progress * 100)).padStart(3, " ") + "%"
					: "β  1.130205";
				// Hand back as soon as the shell tears its splash down. A short floor
				// keeps it from blinking out if the splash goes very early.
				if (!document.body.contains(root) && elapsed > 620) finish();
			};

			ticker = window.setInterval(step, 70);
			step();
			// Hard ceiling: never outlive the load screen.
			timers.push(window.setTimeout(finish, 9000));

			return true;
		};

		// A one-per-launch nixie board: 8 tubes spin, then lock left to right to
		// the β worldline digits as the progress bar fills, then fade out.
		// Skipped entirely under prefers-reduced-motion, when the polish layer is
		// off, or when this document already showed it this session.
		const BOOT_KEY = "{{SECRET_ksboot0001}}";

		const prefersReducedMotion = () => {
			try {
				return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			} catch (error) {
				return false;
			}
		};

		const bootAlreadyShown = () => {
			try {
				return window.sessionStorage.getItem(BOOT_KEY) === "1";
			} catch (error) {
				return false;
			}
		};

		const markBootShown = () => {
			try {
				window.sessionStorage.setItem(BOOT_KEY, "1");
			} catch (error) {
				/* ignore */
			}
		};

		// Once per page load: see armSplashHandoff().
		let splashHandoffFired = false;

		const showBootScreen = () => {
			if (prefersReducedMotion()) return function () {};
			if (!readPolish()) return function () {};
			if (bootAlreadyShown()) return function () {};
			markBootShown();

			const el = document.createElement("div");
			el.className = "ks-boot";
			el.setAttribute("role", "presentation");

			const row = document.createElement("div");
			row.className = "ks-boot-row";
			const meter = makeV4Meter("ks-v4-boot", "min(720px, 86vw)");
			row.appendChild(meter);

			const cap = document.createElement("div");
			cap.className = "ks-boot-cap";
			cap.textContent = "world line divergence";
			const val = document.createElement("div");
			val.className = "ks-boot-val";
			val.textContent = "CONVERGING";
			const bar = document.createElement("div");
			bar.className = "ks-boot-bar";
			const fill = document.createElement("i");
			bar.appendChild(fill);
			const hint = document.createElement("div");
			hint.className = "ks-boot-hint";
			hint.textContent = "CLICK OR ESC TO SKIP";

			el.appendChild(cap);
			el.appendChild(row);
			el.appendChild(val);
			el.appendChild(bar);
			el.appendChild(hint);
			document.body.appendChild(el);

			let finished = false;
			const timers = [];
			let ticker = 0;
			const cleanup = () => {
				document.removeEventListener("keydown", onKey);
				if (ticker) window.clearInterval(ticker);
				timers.forEach((t) => window.clearTimeout(t));
			};
			const finish = () => {
				if (finished) return;
				finished = true;
				el.setAttribute("data-out", "true");
				const t = window.setTimeout(() => {
					el.remove();
					cleanup();
				}, 620);
				timers.push(t);
			};
			const onKey = (event) => {
				if (event.key === "Escape") finish();
			};
			el.addEventListener("click", finish);
			document.addEventListener("keydown", onKey);
			// Hard safety: the board can never outlive this, whatever happens to
			// the ticker (throttled background tab, suspended renderer, ...).
			timers.push(window.setTimeout(finish, 8000));

			// Timers rather than rAF: a backgrounded window throttles rAF to a
			// standstill, which would leave the board frozen on screen forever.
			const DURATION = 2600;
			const started = Date.now();
			const step = () => {
				if (finished) return;
				const elapsed = Date.now() - started;
				const progress = Math.min(1, elapsed / DURATION);
				convergeV4(meter, progress);
				fill.style.width = (progress * 100).toFixed(1) + "%";
				val.textContent = progress < 1
					? "CONVERGING " + String(Math.round(progress * 100)).padStart(3, " ") + "%"
					: "β  1.130205";
				if (progress < 1) return;
				convergeV4(meter, 1);
				window.clearInterval(ticker);
				ticker = 0;
				timers.push(window.setTimeout(finish, 640));
			};
			ticker = window.setInterval(step, 70);
			step();
			return () => {
				finished = true;
				el.remove();
				cleanup();
			};
		};

		// ---------------------------------------------------------------- plugin
		const name = "dsh-skin-kurisu";
		const inject = ["theme", "slots"];

		// ---------------------------------------------------------- first frame
		// There is one unavoidable frame the skin cannot own: the shell paints its
		// own splash before any plugin runs. Dropping an opaque mask synchronously
		// on activation turns that hand-off from "white HARNESS flashes, then goes
		// dark" into "goes dark once, then the themed board lights up".
		// Inline styles only: it must not depend on our stylesheet being injected.
		const dropFirstFrameMask = () => {
			if (prefersReducedMotion()) return function () {};
			// The host-injected load screen is already an opaque full-viewport layer,
			// so a mask on top of it would only hide the thing we want seen.
			if (document.getElementById("ks-loadscreen")) return function () {};
			const mask = document.createElement("div");
			mask.setAttribute("aria-hidden", "true");
			mask.style.cssText = [
				"position:fixed", "inset:0", "z-index:2147483600",
				"pointer-events:none", "opacity:1", "will-change:opacity",
				"transition:opacity .34s ease",
				"background:radial-gradient(130% 96% at 50% 42%,#101728 0%,#080b14 52%,#03050a 100%)"
			].join(";");
			(document.body || document.documentElement).appendChild(mask);
			let released = false;
			const release = () => {
				if (released) return;
				released = true;
				mask.style.opacity = "0";
				window.setTimeout(() => mask.remove(), 380);
			};
			// Two frames so the themed splash has painted underneath, then hand over.
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.setTimeout(release, 260)));
			} else {
				window.setTimeout(release, 300);
			}
			// Never let it outlive this.
			window.setTimeout(release, 1400);
			return release;
		};

		// ------------------------------------------------------- splash hand-off
		// The asar-native + host-injected #ks-loadscreen is ONE continuous layer.
		// When it starts dissolving, the host sets data-ks-ready="1" on <html>;
		// ignite the sidebar meter so the 1.130205 reading visibly travels from
		// the centre of the screen into its permanent home in the sidebar.
		// The splash used to hand the reading off to a sidebar meter. The meter is
		const syncSplashTheme = () => {
			try {
				const mount = document.getElementById("ks-loadscreen");
				if (!mount) return;
				const body = document.body;
				let dark = !window.matchMedia("(prefers-color-scheme: light)").matches;
				if (body && body.hasAttribute("data-ds-dark-theme")) dark = true;
				if (dark) mount.removeAttribute("data-ks-light");
				else mount.setAttribute("data-ks-light", "1");
				// Keep the boot layer on exactly the wallpaper the skin is showing,
				// so the 700ms dissolve reveals the same picture (not a different
				// wallpaper fading out underneath it).
				const wall = readSaved();
				if (wall === "none") mount.setAttribute("data-ks-wall", "none");
				else mount.setAttribute("data-ks-wall", wall);
			} catch (error) {}
		};
		const armSplashHandoff = () => {
			try {
				const root = document.documentElement;
				// Module-scope latch, NOT a closure local. apply() runs again on a
				// plugin reload / HMR within the same page, and a per-call flag let
				// the 15s hard stop re-fire the whole hand-off hours later: it
				// re-flushed the full boot timeline to the probe collector three
				// times in one session and re-pulsed the sidebar meter for no
				// reason. The hand-off is once per page load.
				const fire = () => {
					if (splashHandoffFired) return;
					splashHandoffFired = true;
					// Close the boot timeline: the sidebar meter has received the
					// 1.130205 reading, so the hand-off is complete end-to-end.
					try {
						if (window.KS_PROBE && typeof window.KS_PROBE.mark === "function") {
							window.KS_PROBE.mark("client-handoff");
							window.KS_PROBE.flush("client-handoff");
						}
					} catch (error) {}
					// The unified splash already did this launch's boot animation.
					// Mark it so a later plugin reload cannot replay the standalone
					// board once #ks-loadscreen has been removed.
					try { markBootShown(); } catch (error) {}
				};
				if (root.getAttribute("data-ks-ready") === "1") { fire(); return; }
				syncSplashTheme();
				const obs = new MutationObserver(() => {
					if (root.getAttribute("data-ks-ready") === "1") {
						fire();
						obs.disconnect();
					} else {
						syncSplashTheme();
					}
				});
				obs.observe(root, { attributes: true, attributeFilter: ["data-ks-ready", "data-ks-wall"] });
				// Keep the splash wallpaper in step with a theme flip while it is
				// still on screen. The 15s timer is a hard stop, not a trigger.
				const themeObs = new MutationObserver(syncSplashTheme);
				if (document.body) themeObs.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
				window.setTimeout(() => { fire(); obs.disconnect(); themeObs.disconnect(); }, 15000);
			} catch (error) {}
		};

		function apply(ctx) {
		ensureNixieV4();
			armSplashHandoff();
			const releaseFirstFrame = dropFirstFrameMask();
			ctx.effect(() => () => releaseFirstFrame(), "kurisu-skin: first frame mask");
			ctx.effect(() => {
				applyPolish(readPolish());
				return () => document.documentElement.removeAttribute("data-ks-polish");
			}, "kurisu-skin: polish flag");
			ctx.effect(() => {
				applyGlass(readGlass());
				return () => document.documentElement.removeAttribute("data-ks-glass");
			}, "kurisu-skin: glass level");
			ctx.effect(() => {
				applyDensity(readDensity());
				return () => document.documentElement.removeAttribute("data-ks-density");
			}, "kurisu-skin: wallpaper density");
			ctx.effect(() => {
				wallStyleEl = document.createElement("style");
				wallStyleEl.dataset.plugin = "dsh-skin-kurisu";
				wallStyleEl.dataset.pluginCss = "dsh-skin-kurisu/wallpaper.css";
				document.head.appendChild(wallStyleEl);
				applyWallpaper(readSaved());
				return () => clearWallpaper();
			}, "kurisu-skin: wallpaper stylesheet");

			ctx.effect(() => {
				const tag = document.createElement("style");
				tag.dataset.plugin = "dsh-skin-kurisu";
				tag.dataset.pluginCss = "dsh-skin-kurisu/skin.css";
				tag.textContent = CSS;
				document.head.appendChild(tag);
				return () => tag.remove();
			}, "kurisu-skin: stylesheet");

			ctx.effect(() => {
				const tag = document.createElement("style");
				tag.dataset.plugin = "dsh-skin-kurisu";
				tag.dataset.pluginCss = "dsh-skin-kurisu/polish.css";
				tag.textContent = POLISH_CSS;
				document.head.appendChild(tag);
				return () => tag.remove();
			}, "kurisu-skin: icon/button/motion polish");

			// Registered after the stylesheets above so the board mounts with its
			// CSS already in the document, then one frame later so it lands on a
			// laid-out UI instead of a blank document.
			ctx.effect(() => {
				// The product splash is up right now (we are being activated inside
				// it). Re-skin it and drive its board from real load progress; only
				// fall back to the standalone post-load board when it is gone.
				if (takeOverSplash()) {
					return () => {};
				}
				let dispose = null;
				const timer = window.setTimeout(() => {
					dispose = showBootScreen();
				}, 140);
				return () => {
					window.clearTimeout(timer);
					if (typeof dispose === "function") dispose();
				};
			}, "kurisu-skin: nixie boot");

			const releaseTokens = ctx.theme.overrideTokens("dsh-skin-kurisu", TOKENS);
			ctx.effect(() => releaseTokens, "kurisu-skin: token layer");

			const releaseDark = ctx.theme.register({
				id: "kurisu-amadeus",
				colorScheme: "dark",
				tokens: flatten("dark")
			});
			ctx.effect(() => releaseDark, "kurisu-skin: dark theme registration");

			const releaseLight = ctx.theme.register({
				id: "kurisu-amadeus-day",
				colorScheme: "light",
				tokens: flatten("light")
			});
			ctx.effect(() => releaseLight, "kurisu-skin: light theme registration");

			ctx.slots.inject("settings.general.item", () => {
				try {
					return ctx.slots.register(
						{
							name: "settings.general.item",
							id: "kurisu-skin",
							order: 12,
							label: "Kurisu 皮肤"
						},
						(props) => React.createElement(KurisuRow, props)
					);
				} catch (error) {
					return function () {};
				}
			});

			// (The sidebar divergence meter is gone — it was decoration that cost
			// a Web Component plus three infinite animations for no information.)

			// single brand-mark extension point: replaces the shipped fish logo.
			// "single" slots allow one occupant per priority, and the lowest
			// priority renders — so we register at a negative priority to shadow
			// the official brand plugin if it is enabled, and never throw.
			ctx.slots.inject("sidebar.brand.mark", () => {
				try {
					return ctx.slots.register(
						{
							name: "sidebar.brand.mark",
							id: "kurisu-brand-mark",
							priority: -10,
							order: 1,
							label: "Amadeus 徽记"
						},
						(props) => React.createElement(KurisuMark, props)
					);
				} catch (error) {
					return function () {};
				}
			});

			// The empty-session hero renders its own brand mark from the same
			// single-slot pattern ("conversation.hero.brand.mark", props
			// { size: 34, className }), with the shipped fish as fallback. Without
			// this the sidebar shows the Amadeus badge while the hero still shows
			// the stock glyph — the exact mismatch a themed skin must not have.
			ctx.slots.inject("conversation.hero.brand.mark", () => {
				try {
					return ctx.slots.register(
						{
							name: "conversation.hero.brand.mark",
							id: "kurisu-hero-brand-mark",
							priority: -10,
							order: 1,
							label: "Amadeus 徽记（Hero）"
						},
						(props) => React.createElement(KurisuMark, props)
					);
				} catch (error) {
					return function () {};
				}
			});

			[400, 1500, 4000, 8000].forEach(function (ms) {
				window.setTimeout(tagBotChip, ms);
			});
			window.setTimeout(reportBootTimeline, 600);
			[400, 1500, 4000, 8000].forEach(function (ms) {
				window.setTimeout(ksToggleMirror, ms);
			});
			// 5s was needless: the inline MutationObserver below already catches the
			// icon swap, so the slow tick only needs to heal a re-created toggle.
			window.setInterval(ksToggleMirror, 30000);
		}

		// Marks the sidebar "DS Bot" chip so CSS can theme its glyph. Retried a few
		// times because the sidebar paints after activation.
		// Marks the sidebar "DS Bot" chip so CSS can theme its glyph. Retried a few
		// times because the sidebar paints after activation.
		const tagBotChip = () => {
			try {
				const hits = [];
				const labeled = document.querySelectorAll('[aria-label*="DS Bot"], [title*="DS Bot"]');
				Array.prototype.forEach.call(labeled, (el) => hits.push(el));
				// Text walk scoped to the sidebar: a full `body *` sweep ran on every
				// retry at boot and touched every node in the app just to find one chip.
				const sidebar = document.querySelector('div[class*="_sidebarCol"], #root > div > div[class*="_sidebarCol"]');
				if (sidebar) {
					const walker = document.createTreeWalker(sidebar, NodeFilter.SHOW_TEXT, null);
					let node;
					while ((node = walker.nextNode())) {
						const txt = String(node.nodeValue || "").replace(/\s+/g, " ").trim();
						if (!txt.startsWith("DS Bot")) continue;
						const el = node.parentElement;
						if (!el) continue;
						const r = el.getBoundingClientRect();
						if (r.height < 10 || r.height > 60) continue;
						hits.push(el);
						break;
					}
				}
				if (!hits.length) return false;
				hits.forEach((hit) => {
					let node = hit;
					let depth = 0;
					while (node && node !== document.body && depth < 3) {
						node.classList.add("ks-bot-chip");
						node = node.parentElement;
						depth += 1;
					}
				});
				return true;
			} catch (error) {
				return false;
			}
		};

				// Re-posts the boot timeline the injected load screen left in localStorage, so a
		// restart can be diagnosed even if the sink was unreachable at boot time.
		const reportBootTimeline = () => {
			try {
				const stored = localStorage.getItem("ks-boot-tl");
				if (!stored) return;
				if (stored.indexOf("consumed:") === 0) return;
				// Opt-in: the collector only exists on the author's machine, so a normal
				// install would fire a doomed request on every boot.
				if (localStorage.getItem("ks-boot-probe") === "1") {
					fetch("http://127.0.0.1:8791/report", { method: "POST", mode: "no-cors", body: stored }).catch(function () {});
				}
				localStorage.setItem("ks-boot-tl", "consumed:" + stored);
			} catch (error) {}
		};

		// Mounts a first-row mirror of the sidebar collapse toggle. The source stays
		// where React put it, so its delegated click handler keeps working.
		const ksToggleMirror = () => {
			try {
				// macOS: the real button already lives at the sidebar's top-right, and
				// mirroring it to the viewport corner parks it on the traffic lights.
				if (document.documentElement.getAttribute("data-platform") === "darwin") {
					const stale = document.querySelector(".ks-toggle-mirror");
					if (stale) stale.remove();
					return true;
				}
				const src = document.querySelector('[class*="_toggle"]:not(.ks-toggle-mirror)');
				if (!src) return false;
				let mirror = document.querySelector('.ks-toggle-mirror');
				if (!mirror) {
					mirror = src.cloneNode(true);
					mirror.classList.add('ks-toggle-mirror');
					mirror.removeAttribute('id');
					mirror.addEventListener('click', function (ev) {
						ev.preventDefault(); ev.stopPropagation();
						const live = document.querySelector('[class*="_toggle"]:not(.ks-toggle-mirror)') || src;
						live.click();
						window.setTimeout(function () { mirror.innerHTML = live.innerHTML; }, 120);
					});
					document.body.appendChild(mirror);
					try {
						const obs = new MutationObserver(function () {
							const live = document.querySelector('[class*="_toggle"]:not(.ks-toggle-mirror)');
							if (live && mirror.innerHTML !== live.innerHTML) mirror.innerHTML = live.innerHTML;
						});
						obs.observe(src, { childList: true, subtree: true, attributes: true });
					} catch (e) {}
				}
				src.classList.add('ks-toggle-source');
				// Only touch the DOM when the glyph actually changed: the previous
				// version reassigned innerHTML on every 5s tick, which re-parsed the
				// icon set and rebuilt the node even when nothing had moved.
				if (mirror.innerHTML !== src.innerHTML) mirror.innerHTML = src.innerHTML;
				["aria-label", "title", "aria-expanded"].forEach(function (a) {
					const v = src.getAttribute(a);
					if (v) mirror.setAttribute(a, v);
				});
				return true;
			} catch (error) {
				return false;
			}
		};

		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});
