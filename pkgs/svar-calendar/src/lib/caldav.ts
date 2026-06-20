const CALDAV_BASE = "/caldav";

export interface CalendarInfo {
	url: string;
	displayName: string;
	color: string;
}

export interface RawCalDAVEvent {
	href: string;
	etag: string;
	icalData: string;
}

function resolveUrl(path: string): string {
	if (path.startsWith("/caldav/")) return path;
	if (path.startsWith("http")) return path;
	return CALDAV_BASE + (path.startsWith("/") ? path : "/" + path);
}

async function caldavFetch(
	path: string,
	method: string,
	body?: string,
	headers?: Record<string, string>,
): Promise<Response> {
	const url = resolveUrl(path);
	const finalHeaders: Record<string, string> = { ...headers };
	if (body) finalHeaders["Content-Type"] = "application/xml; charset=utf-8";
	return fetch(url, { method, headers: finalHeaders, body });
}

function parseXml(text: string): Document {
	return new DOMParser().parseFromString(text, "text/xml");
}

function nsText(parent: Element, localName: string): string | null {
	const el = parent.getElementsByTagNameNS("*", localName)[0];
	return el?.textContent?.trim() || null;
}

function nsAll(parent: Element | Document, localName: string): Element[] {
	return Array.from(parent.getElementsByTagNameNS("*", localName));
}

function formatDateCalDAV(date: Date): string {
	const y = date.getUTCFullYear();
	const m = String(date.getUTCMonth() + 1).padStart(2, "0");
	const d = String(date.getUTCDate()).padStart(2, "0");
	const h = String(date.getUTCHours()).padStart(2, "0");
	const mi = String(date.getUTCMinutes()).padStart(2, "0");
	const s = String(date.getUTCSeconds()).padStart(2, "0");
	return `${y}${m}${d}T${h}${mi}${s}Z`;
}

export async function discoverCalendars(): Promise<CalendarInfo[]> {
	const propfind1 = `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:">
  <d:prop><d:current-user-principal/></d:prop>
</d:propfind>`;

	const resp1 = await caldavFetch("/", "PROPFIND", propfind1, { Depth: "0" });
	if (!resp1.ok) throw new Error(`PROPFIND root failed: ${resp1.status}`);
	const doc1 = parseXml(await resp1.text());

	const principalHref = nsText(doc1.documentElement, "href");
	if (!principalHref) throw new Error("No current-user-principal found");

	const propfind2 = `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop><c:calendar-home-set/></d:prop>
</d:propfind>`;

	const resp2 = await caldavFetch(principalHref, "PROPFIND", propfind2, { Depth: "0" });
	if (!resp2.ok) throw new Error(`PROPFIND principal failed: ${resp2.status}`);
	const doc2 = parseXml(await resp2.text());

	const homeSetHref = nsText(doc2.documentElement, "href");
	if (!homeSetHref) throw new Error("No calendar-home-set found");

	const propfind3 = `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav" xmlns:apple="http://apple.com/ns/ical/">
  <d:prop>
    <d:resourcetype/>
    <d:displayname/>
    <apple:calendar-color/>
  </d:prop>
</d:propfind>`;

	const resp3 = await caldavFetch(homeSetHref, "PROPFIND", propfind3, { Depth: "1" });
	if (!resp3.ok) throw new Error(`PROPFIND calendars failed: ${resp3.status}`);
	const doc3 = parseXml(await resp3.text());

	const calendars: CalendarInfo[] = [];
	for (const response of nsAll(doc3, "response")) {
		const href = nsText(response, "href");
		if (!href) continue;

		const prop = nsAll(response, "prop")[0];
		if (!prop) continue;

		const rt = nsAll(prop, "resourcetype")[0];
		const isCalendar = rt ? nsAll(rt, "calendar").length > 0 : false;
		if (!isCalendar) continue;

		const displayName = nsText(prop, "displayname") || "Calendar";
		const color = nsText(prop, "calendar-color") || "#3079ED";

		calendars.push({ url: href, displayName, color });
	}

	return calendars;
}

export async function getEvents(
	calendarUrl: string,
	start: Date,
	end: Date,
): Promise<RawCalDAVEvent[]> {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
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
</c:calendar-query>`;

	const resp = await caldavFetch(calendarUrl, "REPORT", body, { Depth: "1" });
	if (!resp.ok) throw new Error(`REPORT failed: ${resp.status}`);
	const doc = parseXml(await resp.text());

	const events: RawCalDAVEvent[] = [];
	for (const response of nsAll(doc, "response")) {
		const href = nsText(response, "href");
		const etag = nsText(response, "getetag");
		const icalData = nsText(response, "calendar-data");
		if (href && etag && icalData) {
			events.push({ href, etag, icalData });
		}
	}
	return events;
}

export async function createCalendar(homeSetUrl: string, name: string): Promise<void> {
	const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "calendar";
	const url = homeSetUrl.endsWith("/") ? homeSetUrl + slug + "/" : homeSetUrl + "/" + slug + "/";

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<c:mkcalendar xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:set>
    <d:prop>
      <d:displayname>${name}</d:displayname>
    </d:prop>
  </d:set>
</c:mkcalendar>`;

	const resp = await caldavFetch(url, "MKCALENDAR", body);
	if (!resp.ok && resp.status !== 409) throw new Error(`MKCALENDAR failed: ${resp.status}`);
}

export async function ensureDefaultCalendar(): Promise<void> {
	const propfind1 = `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:">
  <d:prop><d:current-user-principal/></d:prop>
</d:propfind>`;

	const resp1 = await caldavFetch("/", "PROPFIND", propfind1, { Depth: "0" });
	if (!resp1.ok) throw new Error(`PROPFIND root failed: ${resp1.status}`);
	const doc1 = parseXml(await resp1.text());
	const principalHref = nsText(doc1.documentElement, "href");
	if (!principalHref) throw new Error("No current-user-principal found");

	const propfind2 = `<?xml version="1.0" encoding="UTF-8"?>
<d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
  <d:prop><c:calendar-home-set/></d:prop>
</d:propfind>`;

	const resp2 = await caldavFetch(principalHref, "PROPFIND", propfind2, { Depth: "0" });
	if (!resp2.ok) throw new Error(`PROPFIND principal failed: ${resp2.status}`);
	const doc2 = parseXml(await resp2.text());
	const homeSetHref = nsText(doc2.documentElement, "href");
	if (!homeSetHref) throw new Error("No calendar-home-set found");

	await createCalendar(homeSetHref, "Personal");
}
