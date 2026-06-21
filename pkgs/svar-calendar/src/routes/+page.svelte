<script lang="ts">
	import { onMount } from "svelte";
	import {
		Calendar,
		CalendarPanel,
		Editor,
		Willow,
		type CalendarEvent,
	} from "@svar-ui/svelte-calendar";
	import { CalDAVDataProvider } from "$lib/provider";
	import { createSharedCalendar } from "$lib/caldav";

	let api = $state<any>();
	let events = $state<CalendarEvent[]>([]);
	let date = $state(new Date());
	let loading = $state(true);
	let error = $state<string | null>(null);
	let calendars = $state<{ id: string; label: string; css: string }[]>([]);
	let showCreateDialog = $state(false);
	let newCalName = $state("");
	let creating = $state(false);

	const provider = new CalDAVDataProvider();

	async function loadCalendars() {
		try {
			const result = await provider.getData();
			events = result;

			const calInfo = provider.getCalendars();
			calendars = calInfo.map((c) => ({
				id: c.url,
				label: c.displayName,
				css: `cal-${c.url.replace(/[^a-zA-Z0-9]/g, "")}`,
			}));

			const existingStyle = document.getElementById("cal-styles");
			if (existingStyle) existingStyle.remove();
			const style = document.createElement("style");
			style.id = "cal-styles";
			for (const c of calInfo) {
				const cls = `cal-${c.url.replace(/[^a-zA-Z0-9]/g, "")}`;
				style.textContent += `.${cls} { --wx-event-border: ${c.color}; --wx-event-bg: ${c.color}22; }`;
				style.textContent += `.${cls}.wx-calendar-name::before { background: ${c.color}; }`;
			}
			document.head.appendChild(style);
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		}
	}

	onMount(async () => {
		loading = true;
		await loadCalendars();
		loading = false;
	});

	async function createShared() {
		const name = newCalName.trim();
		if (!name) return;
		creating = true;
		try {
			await createSharedCalendar(name);
			showCreateDialog = false;
			newCalName = "";
			await loadCalendars();
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			creating = false;
		}
	}

	function init(obj: any) {
		obj.setNext(provider);
	}

	function cssByCalendar(obj: any): string {
		const calId = obj.event?.calendarId;
		if (!calId) return "";
		return `cal-${calId.replace(/[^a-zA-Z0-9]/g, "")}`;
	}
</script>

<Willow>
	{#if loading}
		<div class="state">Loading calendars…</div>
	{:else if error}
		<div class="state error">
			<p>{error}</p>
			<p>Make sure you are logged in and CalDAV is reachable at <code>/caldav/</code>.</p>
		</div>
	{:else}
		<div class="toolbar">
			<button class="btn-create" onclick={() => (showCreateDialog = true)}>
				+ Shared Calendar
			</button>
		</div>

		<Calendar bind:this={api} {init} {events} {date} eventCss={cssByCalendar}>
			<CalendarPanel {calendars} accessor="calendarId" />
		</Calendar>
		{#if api}
			<Editor {api} />
		{/if}

		{#if showCreateDialog}
			<div class="modal-overlay" onclick={() => (showCreateDialog = false)} role="presentation">
				<form class="modal" onsubmit={(e) => { e.preventDefault(); createShared(); }} onclick={(e) => e.stopPropagation()} role="presentation">
					<h3>Create Shared Calendar</h3>
					<input
						type="text"
						bind:value={newCalName}
						placeholder="Calendar name (e.g. Family)"
						disabled={creating}
					/>
					<div class="modal-actions">
						<button type="button" class="btn-cancel" onclick={() => (showCreateDialog = false)} disabled={creating}>
							Cancel
						</button>
						<button type="submit" class="btn-submit" disabled={creating || !newCalName.trim()}>
							{creating ? "Creating…" : "Create"}
						</button>
					</div>
				</form>
			</div>
		{/if}
	{/if}
</Willow>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
	}
	.state {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		font-size: 1.2rem;
		color: #666;
	}
	.state.error {
		flex-direction: column;
		gap: 0.5rem;
		color: #c0392b;
		text-align: center;
	}
	.state.error code {
		background: #f0f0f0;
		padding: 0.1em 0.3em;
		border-radius: 3px;
	}
	.toolbar {
		display: flex;
		justify-content: flex-end;
		padding: 0.5rem 1rem;
	}
	.btn-create {
		border: 1px solid #3079ed;
		background: #fff;
		color: #3079ed;
		padding: 0.4rem 0.9rem;
		border-radius: 6px;
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.15s;
	}
	.btn-create:hover {
		background: #3079ed11;
	}
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}
	.modal {
		background: #fff;
		border-radius: 10px;
		padding: 1.5rem;
		width: 360px;
		max-width: 90vw;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}
	.modal h3 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
	}
	.modal input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem 0.7rem;
		border: 1px solid #ccc;
		border-radius: 6px;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
	.btn-cancel {
		border: 1px solid #ccc;
		background: #fff;
		padding: 0.4rem 1rem;
		border-radius: 6px;
		font-size: 0.85rem;
		cursor: pointer;
	}
	.btn-submit {
		border: none;
		background: #3079ed;
		color: #fff;
		padding: 0.4rem 1.2rem;
		border-radius: 6px;
		font-size: 0.85rem;
		cursor: pointer;
	}
	.btn-submit:disabled {
		opacity: 0.5;
		cursor: default;
	}
</style>
