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

	let api = $state<any>();
	let events = $state<CalendarEvent[]>([]);
	let date = $state(new Date());
	let loading = $state(true);
	let error = $state<string | null>(null);
	let calendars = $state<{ id: string; label: string; css: string }[]>([]);

	const provider = new CalDAVDataProvider();

	onMount(async () => {
		try {
			const result = await provider.getData();
			events = result;

			const calInfo = provider.getCalendars();
			calendars = calInfo.map((c) => ({
				id: c.url,
				label: c.displayName,
				css: `cal-${c.url.replace(/[^a-zA-Z0-9]/g, "")}`,
			}));

			const style = document.createElement("style");
			for (const c of calInfo) {
				const cls = `cal-${c.url.replace(/[^a-zA-Z0-9]/g, "")}`;
				style.textContent += `.${cls} { --wx-event-border: ${c.color}; --wx-event-bg: ${c.color}22; }`;
				style.textContent += `.${cls}.wx-calendar-name::before { background: ${c.color}; }`;
			}
			document.head.appendChild(style);
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	});

	function init(obj: any) {
		console.log("[CalDAV] init called, setting next handler", typeof obj, obj);
		obj.setNext(provider);
		console.log("[CalDAV] provider wired");
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
		<Calendar bind:this={api} {init} {events} {date} eventCss={cssByCalendar}>
			<CalendarPanel {calendars} accessor="calendarId" />
		</Calendar>
		{#if api}
			<Editor {api} />
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
</style>
