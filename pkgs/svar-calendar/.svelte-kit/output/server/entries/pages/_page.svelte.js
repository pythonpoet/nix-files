import { n as onDestroy } from "../../chunks/index-server.js";
import { D as escape_html, E as clsx, T as attr, _ as getContext, a as ensure_array_like, c as spread_props, i as derived, n as attr_style, o as head, p as html, r as bind_props, t as attr_class, u as stringify, y as setContext } from "../../chunks/server.js";
import "../../chunks/index-server2.js";
import { setEnv, setID, uid } from "@svar-ui/lib-dom";
import "@svar-ui/calendar-locales";
import "@svar-ui/core-locales";
import "@svar-ui/lib-state";
import "@svar-ui/calendar-store";
import { env as env$1 } from "@svar-ui/lib-svelte";
import { parseICal, serializeICal } from "@svar-ui/calendar-ical";
import { RestDataProvider } from "@svar-ui/calendar-provider";
//#region node_modules/@svar-ui/svelte-toolbar/src/helpers.js
var handlers$2 = {};
function getItemHandler(type) {
	return handlers$2[type] || type;
}
function registerToolbarItem$1(type, handler) {
	handlers$2[type] = handler;
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/buttons/Separator.svelte
function Separator$1($$renderer, $$props) {
	let { menu = false } = $$props;
	$$renderer.push(`<div${attr_class(`wx-separator${menu ? "-menu" : ""}`, "svelte-1r0dt0v")}> </div>`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/buttons/Spacer.svelte
function Spacer$1($$renderer) {
	$$renderer.push(`<div class="wx-spacer svelte-i5gjts"></div>`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/components/BarComponent.svelte
function BarComponent($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { item = {}, menu = false, values, onclick, onchange } = $$props;
		let itemComponent = derived(() => getItemHandler(item.comp || "label"));
		function onClick() {
			if (item.handler) item.handler(item);
			onclick && onclick({ item });
		}
		let value = derived(() => item.key ? values[item.key] : void 0);
		function detectChange({ value }) {
			if (item.handler) item.handler(item, value);
			onchange && onchange({
				value,
				item
			});
		}
		const text = derived(() => menu ? item.menuText || item.text : item.text);
		if (item.comp == "spacer") {
			$$renderer.push("<!--[0-->");
			Spacer$1($$renderer, {});
		} else if (item.comp == "separator") {
			$$renderer.push("<!--[1-->");
			Separator$1($$renderer, { menu });
		} else {
			$$renderer.push("<!--[-1-->");
			const SvelteComponent = itemComponent();
			$$renderer.push(`<div${attr_class(`wx-tb-element ${stringify(item.css || "")}`, "svelte-wcbgnj", {
				"wx-spacer": item.spacer,
				"wx-menu": menu
			})}${attr("data-id", setID(item.id))}>`);
			if (SvelteComponent) {
				$$renderer.push("<!--[-->");
				SvelteComponent($$renderer, spread_props([
					{
						value: value(),
						onchange: detectChange,
						onclick: onClick,
						menu
					},
					item,
					{ text: text() }
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/components/Button.svelte
function Button$2($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type = "", css = "", icon = "", disabled = false, title = "", text = "", children, onclick } = $$props;
		let buttonCss = derived(() => {
			let cssType = type ? type.split(" ").filter((a) => a !== "").map((x) => "wx-" + x).join(" ") : "";
			return css + (css ? " " : "") + cssType;
		});
		$$renderer.push(`<button${attr("title", title)}${attr_class(`wx-button ${buttonCss()}`, "svelte-1gdo8eb", { "wx-icon": icon && !children })}${attr("disabled", disabled, true)}>`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i${attr_class(clsx(icon), "svelte-1gdo8eb")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (children) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(text)}`);
		}
		$$renderer.push(`<!--]--></button>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/components/Popup.svelte
function Popup($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { left = 0, top = 0, at = "bottom", parent = null, width = "auto", css = "", oncancel, children, trackScroll = false } = $$props;
		$$renderer.push(`<div${attr_class(`wx-popup ${stringify(css)}`, "svelte-1fl9pq9")}${attr_style(`position:absolute;top:${stringify(0)}px;left:${stringify(0)}px;width:${stringify("auto")};`)}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/components/helpers/InlineDropdown.svelte
function InlineDropdown($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { position = "bottom", align = "start", autoFit = true, oncancel = null, width = "100%", css = "", children } = $$props;
		$$renderer.push(`<div${attr_class(`wx-dropdown ${`wx-${position}-${align}`} ${stringify(css)}`, "svelte-9noiw1")}${attr_style(`width:${stringify(width)}`)}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/components/Dropdown.svelte
function Dropdown($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { position = "bottom", align = "start", autoFit = true, inline = false, oncancel, width = "100%", $$slots, $$events, ...props } = $$props;
		let target = void 0;
		const at = derived(() => `${position}-${align}`);
		if (inline) {
			$$renderer.push("<!--[0-->");
			InlineDropdown($$renderer, spread_props([{
				oncancel,
				position,
				align,
				autoFit,
				width
			}, props]));
		} else {
			$$renderer.push("<!--[-1-->");
			Portal($$renderer, {
				children: ($$renderer) => {
					Popup($$renderer, spread_props([{
						parent: target,
						at: at(),
						oncancel,
						width
					}, props]));
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--> <span class="wx-portal-node svelte-x4xo5c"></span>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/components/Portal.svelte
function Portal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { theme = "", target, children } = $$props;
		let handlers = [];
		const mount = (h) => {
			if (handlers) handlers.push(h);
		};
		if (theme === "") theme = getContext("wx-theme");
		onDestroy(() => {});
		$$renderer.push(`<div class="wx-portal svelte-jkl1y1"><div${attr_class(`wx-${stringify(theme)}-theme`, "svelte-jkl1y1")}>`);
		children?.($$renderer, { mount });
		$$renderer.push(`<!----></div></div>`);
		bind_props($$props, {
			theme,
			mount
		});
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/themes/FontOpenSans.svelte
function FontOpenSans($$renderer) {
	$$renderer.push(`${html(`<style>
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/500.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/regular.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/600.woff') format('woff');
}
@font-face {
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
src: local(''),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff2') format('woff2'),
      url('https://cdn.svar.dev/fonts/open-sans/700.woff') format('woff');
}
  </style>`)}`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/themes/Willow.svelte
function Willow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { fonts = true, children } = $$props;
		setContext("wx-theme", "willow");
		head("1msxdmv", $$renderer, ($$renderer) => {
			if (fonts) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<link rel="preconnect" href="https://cdn.svar.dev" crossorigin=""/> `);
				FontOpenSans($$renderer, {});
				$$renderer.push(`<!----> <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
		if (children) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="wx-theme wx-willow-theme" style="height:100%">`);
			children($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-core/src/index.js
setEnv(env$1);
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/components/Group.svelte
function Group_1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { item, values = null, menu = false, onchange, onclick } = $$props;
		let collapsedState = true;
		const onClick = (ev) => {
			oncancel();
			onclick && onclick(ev);
		};
		const oncancel = () => collapsedState = true;
		$$renderer.push(`<div${attr_class(`wx-tb-group ${stringify(item.css || "")}`, "svelte-1xew6ii", {
			"wx-column": item.layout == "column",
			"wx-group-collapsed": item.collapsed && !menu
		})}>`);
		if (item.collapsed && !menu) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="wx-collapsed svelte-1xew6ii">`);
			if (item.icon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<i${attr_class(`icon ${stringify(item.icon)}`, "svelte-1xew6ii")}></i>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.text) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="wx-label-text">${escape_html(item.text)}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.text && !item.icon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<i class="wx-label-arrow wxi-angle-down"></i>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (!collapsedState) {
				$$renderer.push("<!--[0-->");
				Dropdown($$renderer, {
					width: "",
					oncancel,
					children: ($$renderer) => {
						$$renderer.push(`<div class="wx-drop-group">`);
						Group_1($$renderer, {
							item: {
								...item,
								text: "",
								collapsed: false
							},
							values,
							menu,
							onchange,
							onclick: onClick
						});
						$$renderer.push(`<!----></div>`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="wx-tb-body svelte-1xew6ii"><!--[-->`);
			const each_array = ensure_array_like(item.items);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let sub = each_array[$$index];
				if (sub.items) {
					$$renderer.push("<!--[0-->");
					Group_1($$renderer, {
						item: sub,
						values,
						onclick: onClick,
						onchange
					});
				} else {
					$$renderer.push("<!--[-1-->");
					BarComponent($$renderer, {
						item: sub,
						values,
						onclick: onClick,
						onchange
					});
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (item.text) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="wx-label svelte-1xew6ii">${escape_html(item.text)}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/buttons/Button.svelte
function Button_1$1($$renderer, $$props) {
	let { icon, text = "", css, type, disabled, menu, onclick } = $$props;
	if (menu) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="wx-item svelte-1s3wiw0"><i${attr_class(`${stringify(icon || "wxi-empty")} ${stringify(css || "")}`, "svelte-1s3wiw0")}></i> ${escape_html(text)}</div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		Button$2($$renderer, {
			icon,
			type,
			css,
			text,
			disabled,
			onclick
		});
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/buttons/Label.svelte
function Label$1($$renderer, $$props) {
	const { text, value, children } = $$props;
	if (children) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="wx-label svelte-hf53ue">`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="wx-label svelte-hf53ue">${escape_html(value || text)}</div>`);
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/buttons/Icon.svelte
function Icon$1($$renderer, $$props) {
	let { icon, text, css, type, disabled, menu, onclick } = $$props;
	if (menu) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="wx-item svelte-1ajar0v">`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i${attr_class(`${stringify(icon)} ${stringify(css)}`, "svelte-1ajar0v")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> ${escape_html(text)}</div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		Button$2($$renderer, {
			icon,
			type,
			css,
			title: text,
			disabled,
			onclick
		});
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/buttons/Item.svelte
function Item$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id = "", text = "", css = "", icon = "", onclick } = $$props;
		$$renderer.push(`<div${attr_class(`wx-label ${stringify(css)}`, "svelte-v98dh1")}>`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i${attr_class(clsx(icon), "svelte-v98dh1")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> ${escape_html(text)}</div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-toolbar/src/index.js
registerToolbarItem$1("button", Button_1$1);
registerToolbarItem$1("separator", Separator$1);
registerToolbarItem$1("spacer", Spacer$1);
registerToolbarItem$1("label", Label$1);
registerToolbarItem$1("item", Item$1);
registerToolbarItem$1("icon", Icon$1);
//#endregion
//#region node_modules/@svar-ui/svelte-editor/src/helpers.js
var handlers$1 = {};
function registerEditorItem(type, handler) {
	handlers$1[type] = handler;
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/components/helpers/getInputId.js
function getInputId(id) {
	const contextId = getContext("wx-input-id");
	return id || contextId || uid();
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/components/TextArea.svelte
function TextArea($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = "", id, placeholder = "", title = "", disabled = false, error = false, readonly = false, onchange } = $$props;
		const inputId = getInputId(id);
		$$renderer.push(`<textarea${attr_class("wx-textarea svelte-1xo65ao", void 0, { "wx-error": error })}${attr("id", inputId)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)}${attr("readonly", readonly, true)}${attr("title", title)}>`);
		const $$body = escape_html(value);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/components/Button.svelte
function Button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type = "", css = "", icon = "", disabled = false, title = "", text = "", children, onclick } = $$props;
		let buttonCss = derived(() => {
			let cssType = type ? type.split(" ").filter((a) => a !== "").map((x) => "wx-" + x).join(" ") : "";
			return css + (css ? " " : "") + cssType;
		});
		$$renderer.push(`<button${attr("title", title)}${attr_class(`wx-button ${buttonCss()}`, "svelte-1gh1nb6", { "wx-icon": icon && !children })}${attr("disabled", disabled, true)}>`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i${attr_class(clsx(icon), "svelte-1gh1nb6")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (children) {
			$$renderer.push("<!--[0-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(text)}`);
		}
		$$renderer.push(`<!--]--></button>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/components/Checkbox.svelte
function Checkbox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id, label = "", inputValue = "", value = false, style = "", disabled = false, onchange } = $$props;
		const inputId = getInputId(id);
		$$renderer.push(`<div${attr_style(style)} class="wx-checkbox svelte-45xt61"><input type="checkbox"${attr("id", inputId)}${attr("disabled", disabled, true)}${attr("checked", value, true)}${attr("value", inputValue)} class="svelte-45xt61"/> <label${attr("for", inputId)} class="svelte-45xt61"><span class="svelte-45xt61"></span> `);
		if (label) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="svelte-45xt61">${escape_html(label)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></label></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/components/Text.svelte
function Text($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = "", id, readonly = false, focus = false, select = false, type = "text", placeholder = "", disabled = false, error = false, inputStyle = "", title = "", css = "", icon = "", clear = false, onchange } = $$props;
		const inputId = getInputId(id);
		let cssString = derived(() => icon && css.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + css : css);
		let hasLeftIcon = derived(() => icon && css.indexOf("wx-icon-left") !== -1);
		$$renderer.push(`<div${attr_class(`wx-text ${stringify(cssString())}`, "svelte-1gq7uyn", {
			"wx-error": error,
			"wx-disabled": disabled,
			"wx-clear": clear
		})}>`);
		if (type == "password") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<input${attr("value", value)}${attr("id", inputId)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)} type="password"${attr_style(inputStyle)}${attr("title", title)} class="svelte-1gq7uyn"/>`);
		} else if (type == "number") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<input${attr("value", value)}${attr("id", inputId)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)} type="number"${attr_style(inputStyle)}${attr("title", title)} class="svelte-1gq7uyn"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<input${attr("value", value)}${attr("id", inputId)}${attr("readonly", readonly, true)}${attr("disabled", disabled, true)}${attr("placeholder", placeholder)}${attr("title", title)}${attr_style(inputStyle)} class="svelte-1gq7uyn"/>`);
		}
		$$renderer.push(`<!--]--> `);
		if (clear && !disabled && value) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i class="wx-icon wxi-close svelte-1gq7uyn"></i> `);
			if (hasLeftIcon()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<i${attr_class(`wx-icon ${stringify(icon)}`, "svelte-1gq7uyn")}></i>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else if (icon) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<i${attr_class(`wx-icon ${stringify(icon)}`, "svelte-1gq7uyn")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/components/Field.svelte
function Field($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { label = "", position = "", width = "", error = false, type = "", required = false, id, children } = $$props;
		const inputId = id === void 0 ? uid() : id;
		setContext("wx-input-id", inputId);
		$$renderer.push(`<div${attr_class(`wx-field wx-${stringify(position)}`, "svelte-13s1vr6", {
			"wx-error": error,
			"wx-required": required
		})}${attr_style(width ? `width: ${width}` : "")}>`);
		if (label) {
			$$renderer.push("<!--[0-->");
			if (inputId) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<label class="wx-label svelte-13s1vr6"${attr("for", inputId)}>${escape_html(label)}</label>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="wx-label svelte-13s1vr6">${escape_html(label)}</div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(`wx-field-control wx-${stringify(type)}`, "svelte-13s1vr6")}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div></div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-core/src/index.js
setEnv(env$1);
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/helpers.js
var handlers = {};
function registerToolbarItem(type, handler) {
	handlers[type] = handler;
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/buttons/Separator.svelte
function Separator($$renderer, $$props) {
	let { menu = false } = $$props;
	$$renderer.push(`<div${attr_class(`wx-separator${menu ? "-menu" : ""}`, "svelte-ikyg1i")}> </div>`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/buttons/Spacer.svelte
function Spacer($$renderer) {
	$$renderer.push(`<div class="wx-spacer svelte-92l321"></div>`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/buttons/Button.svelte
function Button_1($$renderer, $$props) {
	let { icon, text = "", css, type, disabled, menu, onclick } = $$props;
	if (menu) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="wx-item svelte-kdnr09"><i${attr_class(`${stringify(icon || "wxi-empty")} ${stringify(css || "")}`, "svelte-kdnr09")}></i> ${escape_html(text)}</div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		Button($$renderer, {
			icon,
			type,
			css,
			text,
			disabled,
			onclick
		});
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/buttons/Label.svelte
function Label($$renderer, $$props) {
	const { text, value, children } = $$props;
	if (children) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="wx-label svelte-1msp7kz">`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="wx-label svelte-1msp7kz">${escape_html(value || text)}</div>`);
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/buttons/Icon.svelte
function Icon($$renderer, $$props) {
	let { icon, text, css, type, disabled, menu, onclick } = $$props;
	if (menu) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="wx-item svelte-dxzumu">`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i${attr_class(`${stringify(icon)} ${stringify(css)}`, "svelte-dxzumu")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> ${escape_html(text)}</div>`);
	} else {
		$$renderer.push("<!--[-1-->");
		Button($$renderer, {
			icon,
			type,
			css,
			title: text,
			disabled,
			onclick
		});
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/buttons/Item.svelte
function Item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id = "", text = "", css = "", icon = "", onclick } = $$props;
		$$renderer.push(`<div${attr_class(`wx-label ${stringify(css)}`, "svelte-13cxkhc")}>`);
		if (icon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<i${attr_class(clsx(icon), "svelte-13cxkhc")}></i>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> ${escape_html(text)}</div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/node_modules/@svar-ui/svelte-toolbar/src/index.js
registerToolbarItem("button", Button_1);
registerToolbarItem("separator", Separator);
registerToolbarItem("spacer", Spacer);
registerToolbarItem("label", Label);
registerToolbarItem("item", Item);
registerToolbarItem("icon", Icon);
//#endregion
//#region node_modules/@svar-ui/svelte-editor/src/components/sections/ReadOnly.svelte
function ReadOnly($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const _ = getContext("wx-i18n").getGroup("editor");
		let { value, options, label } = $$props;
		let text = derived(() => {
			let text = value;
			if (typeof value === "boolean") text = value ? _("Yes") : _("No");
			if (options) {
				const option = options.find((o) => o.id === value);
				if (option) text = option.label;
			}
			return text;
		});
		if (text() || text() === 0) {
			$$renderer.push("<!--[0-->");
			Field($$renderer, {
				label,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(text())}`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/src/components/sections/Section.svelte
function Section($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { key, label, activeSection, onclick } = $$props;
		$$renderer.push(`<div${attr_class("wx-section svelte-80lbjp", void 0, { "wx-section-active": activeSection })}><h3>${escape_html(label)}</h3> <i${attr_class(`wxi-angle-${activeSection ? "down" : "right"} wx-icon`, "svelte-80lbjp")}></i></div>`);
	});
}
//#endregion
//#region node_modules/@svar-ui/svelte-editor/src/index.js
registerEditorItem("text", Text);
registerEditorItem("textarea", TextArea);
registerEditorItem("checkbox", Checkbox);
registerEditorItem("readonly", ReadOnly);
registerEditorItem("section", Section);
setEnv(env$1);
//#endregion
//#region node_modules/@svar-ui/svelte-calendar/dist/themes/Willow.svelte
function Willow_1($$renderer, $$props) {
	let { fonts = true, children } = $$props;
	if (children) {
		$$renderer.push("<!--[0-->");
		Willow($$renderer, {
			fonts,
			children: ($$renderer) => {
				children($$renderer);
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
	} else {
		$$renderer.push("<!--[-1-->");
		Willow($$renderer, { fonts });
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region src/lib/caldav.ts
var CALDAV_BASE = "/caldav";
function resolveUrl(path) {
	if (path.startsWith("/caldav/")) return path;
	if (path.startsWith("http")) return path;
	return CALDAV_BASE + (path.startsWith("/") ? path : "/" + path);
}
async function caldavFetch(path, method, body, headers) {
	const url = resolveUrl(path);
	const finalHeaders = { ...headers };
	if (body) finalHeaders["Content-Type"] = "application/xml; charset=utf-8";
	return fetch(url, {
		method,
		headers: finalHeaders,
		body
	});
}
function parseXml(text) {
	return new DOMParser().parseFromString(text, "text/xml");
}
function nsText(parent, localName) {
	return parent.getElementsByTagNameNS("*", localName)[0]?.textContent?.trim() || null;
}
function nsAll(parent, localName) {
	return Array.from(parent.getElementsByTagNameNS("*", localName));
}
function formatDateCalDAV(date) {
	return `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}T${String(date.getUTCHours()).padStart(2, "0")}${String(date.getUTCMinutes()).padStart(2, "0")}${String(date.getUTCSeconds()).padStart(2, "0")}Z`;
}
async function discoverCalendarsAt(href) {
	const resp = await caldavFetch(href, "PROPFIND", `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav" xmlns:apple="http://apple.com/ns/ical/">
  <d:prop>
    <d:resourcetype/>
    <d:displayname/>
    <apple:calendar-color/>
  </d:prop>
</d:propfind>`, { Depth: "1" });
	if (!resp.ok) throw new Error(`PROPFIND calendars at ${href} failed: ${resp.status}`);
	const doc = parseXml(await resp.text());
	const calendars = [];
	for (const response of nsAll(doc, "response")) {
		const href = nsText(response, "href");
		if (!href) continue;
		const prop = nsAll(response, "prop")[0];
		if (!prop) continue;
		const rt = nsAll(prop, "resourcetype")[0];
		if (!(rt ? nsAll(rt, "calendar").length > 0 : false)) continue;
		const displayName = nsText(prop, "displayname") || "Calendar";
		const color = nsText(prop, "calendar-color") || "#3079ED";
		calendars.push({
			url: href,
			displayName,
			color
		});
	}
	return calendars;
}
async function discoverCalendars() {
	const resp1 = await caldavFetch("/", "PROPFIND", `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:">
  <d:prop><d:current-user-principal/></d:prop>
</d:propfind>`, { Depth: "0" });
	if (!resp1.ok) throw new Error(`PROPFIND root failed: ${resp1.status}`);
	const principalEl = nsAll(parseXml(await resp1.text()), "current-user-principal")[0];
	const principalHref = principalEl ? nsText(principalEl, "href") : null;
	if (!principalHref) throw new Error("No current-user-principal found");
	const resp2 = await caldavFetch(principalHref, "PROPFIND", `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop><c:calendar-home-set/></d:prop>
</d:propfind>`, { Depth: "0" });
	if (!resp2.ok) throw new Error(`PROPFIND principal failed: ${resp2.status}`);
	const homeSetEl = nsAll(parseXml(await resp2.text()), "calendar-home-set")[0];
	const homeSetHref = homeSetEl ? nsText(homeSetEl, "href") : null;
	if (!homeSetHref) throw new Error("No calendar-home-set found");
	const calendars = await discoverCalendarsAt(homeSetHref);
	const sharedHref = "/shared/";
	try {
		const sharedCals = await discoverCalendarsAt(sharedHref);
		calendars.push(...sharedCals);
	} catch {}
	return calendars;
}
async function getEvents(calendarUrl, start, end) {
	const resp = await caldavFetch(calendarUrl, "REPORT", `<?xml version="1.0" encoding="UTF-8"?>
<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop>
    <d:getetag/>
    <c:calendar-data/>
  </d:prop>
  <c:filter>
    <c:comp-filter name="VCALENDAR">
      <c:comp-filter name="VEVENT">
        <c:time-range start="${formatDateCalDAV(start)}" end="${formatDateCalDAV(end)}"/>
      </c:comp-filter>
    </c:comp-filter>
  </c:filter>
</c:calendar-query>`, { Depth: "1" });
	if (!resp.ok) throw new Error(`REPORT failed: ${resp.status}`);
	const doc = parseXml(await resp.text());
	const events = [];
	for (const response of nsAll(doc, "response")) {
		const href = nsText(response, "href");
		const etag = nsText(response, "getetag");
		const icalData = nsText(response, "calendar-data");
		if (href && etag && icalData) events.push({
			href,
			etag,
			icalData
		});
	}
	return events;
}
async function createCalendar(homeSetUrl, name) {
	const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "calendar";
	const resp = await caldavFetch(homeSetUrl.endsWith("/") ? homeSetUrl + slug + "/" : homeSetUrl + "/" + slug + "/", "MKCALENDAR", `<?xml version="1.0" encoding="UTF-8"?>
<c:mkcalendar xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:set>
    <d:prop>
      <d:displayname>${name}</d:displayname>
    </d:prop>
  </d:set>
</c:mkcalendar>`);
	if (!resp.ok && resp.status !== 409) throw new Error(`MKCALENDAR failed: ${resp.status}`);
}
async function ensureDefaultCalendar() {
	const resp1 = await caldavFetch("/", "PROPFIND", `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:">
  <d:prop><d:current-user-principal/></d:prop>
</d:propfind>`, { Depth: "0" });
	if (!resp1.ok) throw new Error(`PROPFIND root failed: ${resp1.status}`);
	const principalEl = nsAll(parseXml(await resp1.text()), "current-user-principal")[0];
	const principalHref = principalEl ? nsText(principalEl, "href") : null;
	if (!principalHref) throw new Error("No current-user-principal found");
	const resp2 = await caldavFetch(principalHref, "PROPFIND", `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop><c:calendar-home-set/></d:prop>
</d:propfind>`, { Depth: "0" });
	if (!resp2.ok) throw new Error(`PROPFIND principal failed: ${resp2.status}`);
	const homeSetEl = nsAll(parseXml(await resp2.text()), "calendar-home-set")[0];
	const homeSetHref = homeSetEl ? nsText(homeSetEl, "href") : null;
	if (!homeSetHref) throw new Error("No calendar-home-set found");
	await createCalendar(homeSetHref, "Personal");
}
//#endregion
//#region src/lib/provider.ts
function hrefToUid(href) {
	const parts = href.split("/");
	return parts[parts.length - 1].replace(/\.ics$/, "");
}
var CalDAVDataProvider = class extends RestDataProvider {
	calendars = [];
	etags = /* @__PURE__ */ new Map();
	eventCalendarIds = /* @__PURE__ */ new Map();
	constructor() {
		super();
	}
	async getData() {
		this.calendars = await discoverCalendars();
		if (this.calendars.length === 0) {
			await ensureDefaultCalendar();
			this.calendars = await discoverCalendars();
		}
		const now = /* @__PURE__ */ new Date();
		const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
		const end = new Date(now.getFullYear(), now.getMonth() + 4, 0);
		const allEvents = [];
		for (const cal of this.calendars) {
			const rawEvents = await getEvents(cal.url, start, end);
			for (const raw of rawEvents) {
				const parsed = parseICal(raw.icalData);
				for (const ev of parsed) {
					const event = {
						...ev,
						id: raw.href,
						calendarId: cal.url
					};
					this.etags.set(raw.href, raw.etag);
					this.eventCalendarIds.set(raw.href, cal.url);
					allEvents.push(event);
				}
			}
		}
		return allEvents;
	}
	getHandlers() {
		return {
			"add-event": {
				ignoreID: true,
				handler: async (data) => {
					console.log("[CalDAV] add-event", data);
					const event = data.event;
					const uid = crypto.randomUUID();
					const calendar = this.calendars[0];
					if (!calendar) throw new Error("No calendar available");
					const icalData = serializeICal([{
						...event,
						id: uid
					}]);
					const href = calendar.url.endsWith("/") ? calendar.url + uid + ".ics" : calendar.url + "/" + uid + ".ics";
					const resp = await fetch(href, {
						method: "PUT",
						headers: {
							"Content-Type": "text/calendar; charset=utf-8",
							"If-None-Match": "*"
						},
						body: icalData
					});
					if (!resp.ok) {
						console.error("[CalDAV] PUT failed", resp.status, await resp.text());
						throw new Error(`PUT failed: ${resp.status}`);
					}
					console.log("[CalDAV] add-event OK", href);
					const etag = resp.headers.get("etag");
					if (etag) this.etags.set(href, etag);
					this.eventCalendarIds.set(href, calendar.url);
					return { id: href };
				}
			},
			"update-event": {
				debounce: 500,
				handler: async (data) => {
					console.log("[CalDAV] update-event", data);
					const id = data.id;
					const etag = this.etags.get(id) || "";
					const uid = hrefToUid(id);
					const icalData = serializeICal([{
						...data.event,
						id: uid
					}]);
					const headers = { "Content-Type": "text/calendar; charset=utf-8" };
					if (etag) headers["If-Match"] = etag;
					const resp = await fetch(id, {
						method: "PUT",
						headers,
						body: icalData
					});
					if (!resp.ok) {
						console.error("[CalDAV] PUT failed", resp.status, await resp.text());
						throw new Error(`PUT failed: ${resp.status}`);
					}
					console.log("[CalDAV] update-event OK", id);
					const newEtag = resp.headers.get("etag");
					if (newEtag) this.etags.set(id, newEtag);
				}
			},
			"delete-event": { handler: async (data) => {
				console.log("[CalDAV] delete-event", data);
				const id = data.id;
				const etag = this.etags.get(id) || "";
				const headers = {};
				if (etag) headers["If-Match"] = etag;
				const resp = await fetch(id, {
					method: "DELETE",
					headers
				});
				if (!resp.ok && resp.status !== 404) {
					console.error("[CalDAV] DELETE failed", resp.status, await resp.text());
					throw new Error(`DELETE failed: ${resp.status}`);
				}
				console.log("[CalDAV] delete-event OK", id);
				this.etags.delete(id);
				this.eventCalendarIds.delete(id);
			} }
		};
	}
	getCalendars() {
		return this.calendars;
	}
};
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		new CalDAVDataProvider();
		Willow_1($$renderer, {
			children: ($$renderer) => {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="state svelte-1uha8ag">Loading calendars…</div>`);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
export { _page as default };
