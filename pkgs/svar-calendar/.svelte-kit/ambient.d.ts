
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SVELTEKIT_FORK: string;
	export const NODE_ENV: string;
	export const depsHostHostPropagated: string;
	export const TERM_PROGRAM: string;
	export const nativeBuildInputs: string;
	export const OLDPWD: string;
	export const RANLIB: string;
	export const npm_node_execpath: string;
	export const X_PRIVILEGED_WAYLAND_SOCKET: string;
	export const X11_EXTRA_RULES_XML: string;
	export const QT_PLUGIN_PATH: string;
	export const depsBuildTargetPropagated: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const CC: string;
	export const QT_ENABLE_HIGHDPI_SCALING: string;
	export const npm_config_node_gyp: string;
	export const propagatedBuildInputs: string;
	export const PATH: string;
	export const TMP: string;
	export const OBJDUMP: string;
	export const GDK_BACKEND: string;
	export const OPENCODE_DISABLE_AUTOUPDATE: string;
	export const XDG_DATA_DIRS: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const NIXOS_XDG_OPEN_USE_PORTAL: string;
	export const X11_BASE_RULES_XML: string;
	export const npm_package_json: string;
	export const XCURSOR_THEME: string;
	export const COSMIC_PANEL_ANCHOR: string;
	export const OBJCOPY: string;
	export const depsBuildTarget: string;
	export const XDG_RUNTIME_DIR: string;
	export const npm_execpath: string;
	export const PANEL_NOTIFICATIONS_FD: string;
	export const TERMINFO_DIRS: string;
	export const __structuredAttrs: string;
	export const COSMIC_PANEL_OUTPUT: string;
	export const XDG_SESSION_ID: string;
	export const buildInputs: string;
	export const XDG_VTNR: string;
	export const SKIM_ALT_C_OPTS: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const NM: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const SHLVL: string;
	export const DISPLAY: string;
	export const MANPAGER: string;
	export const NIX_AUTO_RUN: string;
	export const AR: string;
	export const XDG_PROJECTS_DIR: string;
	export const out: string;
	export const NIX_LD: string;
	export const ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE: string;
	export const _: string;
	export const REQUESTY_API_KEY: string;
	export const enableParallelInstalling: string;
	export const NIXPKGS_CONFIG: string;
	export const mesonFlags: string;
	export const XDG_DOCUMENTS_DIR: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const TERMINFO: string;
	export const XDG_SESSION_DESKTOP: string;
	export const __HM_ZSH_SESS_VARS_SOURCED: string;
	export const NIX_LD_LIBRARY_PATH: string;
	export const SSH_ASKPASS: string;
	export const npm_package_version: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const GST_PLUGIN_SYSTEM_PATH_1_0: string;
	export const npm_config_init_module: string;
	export const COSMIC_PANEL_PADDING_OVERLAP: string;
	export const QML2_IMPORT_PATH: string;
	export const npm_config_globalconfig: string;
	export const LESSKEYIN_SYSTEM: string;
	export const LESSHISTFILE: string;
	export const EDITOR: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const npm_config_local_prefix: string;
	export const npm_package_name: string;
	export const COLOR: string;
	export const STARSHIP_SHELL: string;
	export const stdenv: string;
	export const name: string;
	export const LOCALE_ARCHIVE_2_27: string;
	export const PWD: string;
	export const builder: string;
	export const NIX_BUILD_CORES: string;
	export const configureFlags: string;
	export const COLORTERM: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const depsBuildBuild: string;
	export const DIRENV_LOG_FORMAT: string;
	export const XDG_SESSION_TYPE: string;
	export const XDG_VIDEOS_DIR: string;
	export const npm_config_userconfig: string;
	export const CONFIG_SHELL: string;
	export const depsTargetTarget: string;
	export const STRIP: string;
	export const npm_lifecycle_event: string;
	export const COSMIC_PANEL_SIZE: string;
	export const GDK_PIXBUF_MODULE_FILE: string;
	export const __NIXOS_SET_ENVIRONMENT_DONE: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const depsBuildBuildPropagated: string;
	export const SYSTEMD_XKB_DIRECTORY: string;
	export const npm_command: string;
	export const shell: string;
	export const DELTA_PAGER: string;
	export const LOCALE_ARCHIVE: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const NIX_PROFILES: string;
	export const NIX_LDFLAGS: string;
	export const LOGNAME: string;
	export const SHELL: string;
	export const XDG_CONFIG_HOME: string;
	export const SKIM_DEFAULT_COMMAND: string;
	export const XDG_CONFIG_DIRS: string;
	export const patches: string;
	export const npm_config_cache: string;
	export const NODE: string;
	export const TERM: string;
	export const SOURCE_DATE_EPOCH: string;
	export const JAVA_HOME: string;
	export const LIBEXEC_PATH: string;
	export const GTK_PATH: string;
	export const outputs: string;
	export const __HM_SESS_VARS_SOURCED: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const npm_config_prefix: string;
	export const XDG_BIN_HOME: string;
	export const enableParallelChecking: string;
	export const GHOSTTY_BIN_DIR: string;
	export const depsHostHost: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const SSH_AUTH_SOCK: string;
	export const COSMIC_PANEL_SPACING: string;
	export const STRINGS: string;
	export const XDG_DATA_HOME: string;
	export const X_MINIMIZE_APPLET: string;
	export const XCURSOR_PATH: string;
	export const TEMPDIR: string;
	export const buildCommandPath: string;
	export const passAsFile: string;
	export const XDG_PICTURES_DIR: string;
	export const NIX_CC: string;
	export const system: string;
	export const HOST_PATH: string;
	export const enableParallelBuilding: string;
	export const XDG_SCREENSHOTS_DIR: string;
	export const MANROFFOPT: string;
	export const GTK2_RC_FILES: string;
	export const IN_NIX_SHELL: string;
	export const NIX_PATH: string;
	export const GI_TYPELIB_PATH: string;
	export const GHOSTTY_SHELL_FEATURES: string;
	export const STARSHIP_CONFIG: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const LD: string;
	export const XDG_PUBLICSHARE_DIR: string;
	export const NIX_HARDENING_ENABLE: string;
	export const NIX_BINTOOLS: string;
	export const LESSKEY: string;
	export const NIX_BUILD_TOP: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const LANG: string;
	export const CXX: string;
	export const doCheck: string;
	export const depsTargetTargetPropagated: string;
	export const TMPDIR: string;
	export const STARSHIP_CACHE: string;
	export const cmakeFlags: string;
	export const XDG_SEAT: string;
	export const GIO_EXTRA_MODULES: string;
	export const USER: string;
	export const npm_config_noproxy: string;
	export const XDG_DOWNLOAD_DIR: string;
	export const doInstallCheck: string;
	export const LS_COLORS: string;
	export const STARSHIP_SESSION_KEY: string;
	export const XDG_MUSIC_DIR: string;
	export const npm_config_global_prefix: string;
	export const COSMIC_PANEL_NAME: string;
	export const XDG_TEMPLATES_DIR: string;
	export const PAGER: string;
	export const DCONF_PROFILE: string;
	export const ZDOTDIR: string;
	export const AS: string;
	export const READELF: string;
	export const TEMP: string;
	export const INIT_CWD: string;
	export const QT_QPA_PLATFORM: string;
	export const npm_config_user_agent: string;
	export const XDG_CACHE_HOME: string;
	export const COSMIC_PANEL_BACKGROUND: string;
	export const INFOPATH: string;
	export const XCURSOR_SIZE: string;
	export const npm_lifecycle_script: string;
	export const XAUTHORITY: string;
	export const npm_config_npm_version: string;
	export const XDG_DESKTOP_DIR: string;
	export const __ETC_PROFILE_DONE: string;
	export const FLAKE: string;
	export const NIX_STORE: string;
	export const SIZE: string;
	export const TERM_PROGRAM_VERSION: string;
	export const HOME: string;
	export const propagatedNativeBuildInputs: string;
	export const strictDeps: string;
	export const XDG_STATE_HOME: string;
	export const WAYLAND_DISPLAY: string;
	export const TZDIR: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SVELTEKIT_FORK: string;
		NODE_ENV: string;
		depsHostHostPropagated: string;
		TERM_PROGRAM: string;
		nativeBuildInputs: string;
		OLDPWD: string;
		RANLIB: string;
		npm_node_execpath: string;
		X_PRIVILEGED_WAYLAND_SOCKET: string;
		X11_EXTRA_RULES_XML: string;
		QT_PLUGIN_PATH: string;
		depsBuildTargetPropagated: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		CC: string;
		QT_ENABLE_HIGHDPI_SCALING: string;
		npm_config_node_gyp: string;
		propagatedBuildInputs: string;
		PATH: string;
		TMP: string;
		OBJDUMP: string;
		GDK_BACKEND: string;
		OPENCODE_DISABLE_AUTOUPDATE: string;
		XDG_DATA_DIRS: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		NIXOS_XDG_OPEN_USE_PORTAL: string;
		X11_BASE_RULES_XML: string;
		npm_package_json: string;
		XCURSOR_THEME: string;
		COSMIC_PANEL_ANCHOR: string;
		OBJCOPY: string;
		depsBuildTarget: string;
		XDG_RUNTIME_DIR: string;
		npm_execpath: string;
		PANEL_NOTIFICATIONS_FD: string;
		TERMINFO_DIRS: string;
		__structuredAttrs: string;
		COSMIC_PANEL_OUTPUT: string;
		XDG_SESSION_ID: string;
		buildInputs: string;
		XDG_VTNR: string;
		SKIM_ALT_C_OPTS: string;
		QTWEBKIT_PLUGIN_PATH: string;
		NM: string;
		MOZ_ENABLE_WAYLAND: string;
		SHLVL: string;
		DISPLAY: string;
		MANPAGER: string;
		NIX_AUTO_RUN: string;
		AR: string;
		XDG_PROJECTS_DIR: string;
		out: string;
		NIX_LD: string;
		ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE: string;
		_: string;
		REQUESTY_API_KEY: string;
		enableParallelInstalling: string;
		NIXPKGS_CONFIG: string;
		mesonFlags: string;
		XDG_DOCUMENTS_DIR: string;
		NIX_ENFORCE_NO_NATIVE: string;
		TERMINFO: string;
		XDG_SESSION_DESKTOP: string;
		__HM_ZSH_SESS_VARS_SOURCED: string;
		NIX_LD_LIBRARY_PATH: string;
		SSH_ASKPASS: string;
		npm_package_version: string;
		XDG_CURRENT_DESKTOP: string;
		GST_PLUGIN_SYSTEM_PATH_1_0: string;
		npm_config_init_module: string;
		COSMIC_PANEL_PADDING_OVERLAP: string;
		QML2_IMPORT_PATH: string;
		npm_config_globalconfig: string;
		LESSKEYIN_SYSTEM: string;
		LESSHISTFILE: string;
		EDITOR: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		npm_config_local_prefix: string;
		npm_package_name: string;
		COLOR: string;
		STARSHIP_SHELL: string;
		stdenv: string;
		name: string;
		LOCALE_ARCHIVE_2_27: string;
		PWD: string;
		builder: string;
		NIX_BUILD_CORES: string;
		configureFlags: string;
		COLORTERM: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		depsBuildBuild: string;
		DIRENV_LOG_FORMAT: string;
		XDG_SESSION_TYPE: string;
		XDG_VIDEOS_DIR: string;
		npm_config_userconfig: string;
		CONFIG_SHELL: string;
		depsTargetTarget: string;
		STRIP: string;
		npm_lifecycle_event: string;
		COSMIC_PANEL_SIZE: string;
		GDK_PIXBUF_MODULE_FILE: string;
		__NIXOS_SET_ENVIRONMENT_DONE: string;
		QT_QPA_PLATFORMTHEME: string;
		depsBuildBuildPropagated: string;
		SYSTEMD_XKB_DIRECTORY: string;
		npm_command: string;
		shell: string;
		DELTA_PAGER: string;
		LOCALE_ARCHIVE: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		NIX_PROFILES: string;
		NIX_LDFLAGS: string;
		LOGNAME: string;
		SHELL: string;
		XDG_CONFIG_HOME: string;
		SKIM_DEFAULT_COMMAND: string;
		XDG_CONFIG_DIRS: string;
		patches: string;
		npm_config_cache: string;
		NODE: string;
		TERM: string;
		SOURCE_DATE_EPOCH: string;
		JAVA_HOME: string;
		LIBEXEC_PATH: string;
		GTK_PATH: string;
		outputs: string;
		__HM_SESS_VARS_SOURCED: string;
		NIX_CFLAGS_COMPILE: string;
		npm_config_prefix: string;
		XDG_BIN_HOME: string;
		enableParallelChecking: string;
		GHOSTTY_BIN_DIR: string;
		depsHostHost: string;
		GHOSTTY_RESOURCES_DIR: string;
		SSH_AUTH_SOCK: string;
		COSMIC_PANEL_SPACING: string;
		STRINGS: string;
		XDG_DATA_HOME: string;
		X_MINIMIZE_APPLET: string;
		XCURSOR_PATH: string;
		TEMPDIR: string;
		buildCommandPath: string;
		passAsFile: string;
		XDG_PICTURES_DIR: string;
		NIX_CC: string;
		system: string;
		HOST_PATH: string;
		enableParallelBuilding: string;
		XDG_SCREENSHOTS_DIR: string;
		MANROFFOPT: string;
		GTK2_RC_FILES: string;
		IN_NIX_SHELL: string;
		NIX_PATH: string;
		GI_TYPELIB_PATH: string;
		GHOSTTY_SHELL_FEATURES: string;
		STARSHIP_CONFIG: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		LD: string;
		XDG_PUBLICSHARE_DIR: string;
		NIX_HARDENING_ENABLE: string;
		NIX_BINTOOLS: string;
		LESSKEY: string;
		NIX_BUILD_TOP: string;
		NIX_USER_PROFILE_DIR: string;
		LANG: string;
		CXX: string;
		doCheck: string;
		depsTargetTargetPropagated: string;
		TMPDIR: string;
		STARSHIP_CACHE: string;
		cmakeFlags: string;
		XDG_SEAT: string;
		GIO_EXTRA_MODULES: string;
		USER: string;
		npm_config_noproxy: string;
		XDG_DOWNLOAD_DIR: string;
		doInstallCheck: string;
		LS_COLORS: string;
		STARSHIP_SESSION_KEY: string;
		XDG_MUSIC_DIR: string;
		npm_config_global_prefix: string;
		COSMIC_PANEL_NAME: string;
		XDG_TEMPLATES_DIR: string;
		PAGER: string;
		DCONF_PROFILE: string;
		ZDOTDIR: string;
		AS: string;
		READELF: string;
		TEMP: string;
		INIT_CWD: string;
		QT_QPA_PLATFORM: string;
		npm_config_user_agent: string;
		XDG_CACHE_HOME: string;
		COSMIC_PANEL_BACKGROUND: string;
		INFOPATH: string;
		XCURSOR_SIZE: string;
		npm_lifecycle_script: string;
		XAUTHORITY: string;
		npm_config_npm_version: string;
		XDG_DESKTOP_DIR: string;
		__ETC_PROFILE_DONE: string;
		FLAKE: string;
		NIX_STORE: string;
		SIZE: string;
		TERM_PROGRAM_VERSION: string;
		HOME: string;
		propagatedNativeBuildInputs: string;
		strictDeps: string;
		XDG_STATE_HOME: string;
		WAYLAND_DISPLAY: string;
		TZDIR: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
