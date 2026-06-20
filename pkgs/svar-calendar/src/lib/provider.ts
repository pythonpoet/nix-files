import {
	RestDataProvider,
	parseICal,
	serializeICal,
	type CalendarEvent,
} from "@svar-ui/svelte-calendar";
import {
	discoverCalendars,
	getEvents,
	ensureDefaultCalendar,
	type CalendarInfo,
} from "./caldav";

function hrefToUid(href: string): string {
	const parts = href.split("/");
	const last = parts[parts.length - 1];
	return last.replace(/\.ics$/, "");
}

export class CalDAVDataProvider extends RestDataProvider {
	private calendars: CalendarInfo[] = [];
	private etags = new Map<string, string>();
	private eventCalendarIds = new Map<string, string>();

	constructor() {
		super();
	}

	async getData(): Promise<CalendarEvent[]> {
		this.calendars = await discoverCalendars();
		if (this.calendars.length === 0) {
			await ensureDefaultCalendar();
			this.calendars = await discoverCalendars();
		}

		const now = new Date();
		const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
		const end = new Date(now.getFullYear(), now.getMonth() + 4, 0);

		const allEvents: CalendarEvent[] = [];
		for (const cal of this.calendars) {
			const rawEvents = await getEvents(cal.url, start, end);
			for (const raw of rawEvents) {
				const parsed = parseICal(raw.icalData);
				for (const ev of parsed) {
					const event: CalendarEvent = {
						...ev,
						id: raw.href,
						calendarId: cal.url,
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
				handler: async (data: any) => {
					const event = data.event as CalendarEvent;
					const uid = crypto.randomUUID();
					const calendar = this.calendars[0];
					if (!calendar) throw new Error("No calendar available");

					const icalData = serializeICal([{ ...event, id: uid }]);
					const href = calendar.url.endsWith("/")
						? calendar.url + uid + ".ics"
						: calendar.url + "/" + uid + ".ics";

					const resp = await fetch(href, {
						method: "PUT",
						headers: {
							"Content-Type": "text/calendar; charset=utf-8",
							"If-None-Match": "*",
						},
						body: icalData,
					});

					if (!resp.ok) throw new Error(`PUT failed: ${resp.status}`);

					const etag = resp.headers.get("etag");
					if (etag) this.etags.set(href, etag);
					this.eventCalendarIds.set(href, calendar.url);

					return { id: href };
				},
			},
			"update-event": {
				debounce: 500,
				handler: async (data: any) => {
					const id = data.id as string;
					const etag = this.etags.get(id) || "";

					const uid = hrefToUid(id);
					const event = { ...data.event, id: uid } as CalendarEvent;
					const icalData = serializeICal([event]);

					const headers: Record<string, string> = {
						"Content-Type": "text/calendar; charset=utf-8",
					};
					if (etag) headers["If-Match"] = etag;

					const resp = await fetch(id, {
						method: "PUT",
						headers,
						body: icalData,
					});

					if (!resp.ok) throw new Error(`PUT failed: ${resp.status}`);

					const newEtag = resp.headers.get("etag");
					if (newEtag) this.etags.set(id, newEtag);
				},
			},
			"delete-event": {
				handler: async (data: any) => {
					const id = data.id as string;
					const etag = this.etags.get(id) || "";

					const headers: Record<string, string> = {};
					if (etag) headers["If-Match"] = etag;

					const resp = await fetch(id, { method: "DELETE", headers });

					if (!resp.ok && resp.status !== 404)
						throw new Error(`DELETE failed: ${resp.status}`);

					this.etags.delete(id);
					this.eventCalendarIds.delete(id);
				},
			},
		};
	}

	getCalendars(): CalendarInfo[] {
		return this.calendars;
	}
}
