import { readFile, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const DATA = new URL('../lib/centres.json', import.meta.url);
const USER_AGENT = 'find-care-bc/1.0 (childcare directory; contact: hello@findcarebc.ca)';
const RATE_LIMIT_MS = 1100;

function hasStreetAddress(centre) {
  const address = centre.address.trim().toLowerCase();
  const city = centre.city.trim().toLowerCase();

  return address !== city && address !== `${city}, bc` && address !== `${city}, british columbia`;
}

function streetAddress(address) {
  return address.replace(/^.*\s+-\s+(?=\d)/, '').trim();
}

function isExpectedLocation(hit, city) {
  const location = hit.display_name.toLowerCase();
  return location.includes(city.toLowerCase()) && location.includes('british columbia');
}

async function bcGeocode(street, city) {
  const url = `https://geocoder.api.gov.bc.ca/addresses.json?${new URLSearchParams({
    addressString: `${street}, ${city}, BC`,
    maxResults: '3',
    outputSRS: '4326',
  })}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  const hit = data.features?.find((feature) =>
    feature.properties.score >= 90 &&
    feature.properties.fullAddress.toLowerCase().includes(city.toLowerCase())
  );
  return hit ? [Number(hit.geometry.coordinates[1]), Number(hit.geometry.coordinates[0])] : null;
}

async function nominatim(params, city) {
  const url = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
    format: 'json',
    limit: '5',
    countrycodes: 'ca',
    ...params,
  })}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const hits = await res.json();
  const hit = hits.find((candidate) => isExpectedLocation(candidate, city));
  return hit ? [Number(hit.lat), Number(hit.lon)] : null;
}

async function resolve(centre) {
  const street = streetAddress(centre.address);
  const official = await bcGeocode(street, centre.city);
  if (official) return official;

  const structured = await nominatim({
    street,
    city: centre.city,
    state: 'British Columbia',
  }, centre.city);
  if (structured) return structured;

  await sleep(RATE_LIMIT_MS);
  return nominatim({ q: `${street}, ${centre.city}, BC, Canada` }, centre.city);
}

const centres = JSON.parse(await readFile(DATA, 'utf8'));
const failures = [];

for (const [i, centre] of centres.entries()) {
  if (!hasStreetAddress(centre)) {
    console.log(`[${i + 1}/${centres.length}] skip ${centre.name}`);
    continue;
  }

  try {
    const coords = await resolve(centre);
    if (coords) {
      [centre.lat, centre.lng] = coords;
      console.log(`[${i + 1}/${centres.length}] ok   ${centre.name}`);
    } else {
      failures.push(centre.name);
      console.log(`[${i + 1}/${centres.length}] MISS ${centre.name} — ${centre.address}, ${centre.city}`);
    }
  } catch (err) {
    failures.push(centre.name);
    console.log(`[${i + 1}/${centres.length}] ERR  ${centre.name} — ${err.message}`);
  }
  await sleep(RATE_LIMIT_MS);
}

await writeFile(DATA, `${JSON.stringify(centres, null, 2)}\n`);

const unique = new Set(centres.map((c) => `${c.lat},${c.lng}`)).size;
console.log(`\nDone. ${centres.length} centres, ${unique} unique coordinates, ${failures.length} unresolved.`);
if (failures.length) console.log(failures.join('\n'));
