<script context="module">
	import { db, syncs } from "@@app/db";
	import { empty } from "rxjs";

	export async function preload(page, session) {
		const sync = await syncs;
		const sgv = sync.sgv ? sync.sgv : { change$: empty() };
		return { db: await db, sgvSync: sgv };
	}

</script>

<script>
	import { interval } from "rxjs";
	import { switchMap, map, distinctUntilKeyChanged } from "rxjs/operators";
	import Chart from "../components/Chart.svelte";

	export let db, sgvSync;
	const change = sgvSync.change$;
	const timeSinceChange = change.pipe(switchMap(() => interval(1000)))

	const latest = db.collections.sgv.find()
		.sort('-ts')
		.limit(120)
		.$
			

	const latest20 = db.collections.sgv.find()
		.sort('-ts')
		.limit(20)
		.$
</script>

<svelte:head>
	<title>Stored Glucose Values</title>
</svelte:head>

{#if $timeSinceChange > 15}
	Last change {$timeSinceChange} seconds ago
{/if}

{#if $latest20}
	<Chart data={$latest20} />
{/if}

{#if $latest}
	<table>
		{#each $latest as entry}
			<tr><th>{new Date(entry.ts).toLocaleTimeString()}</th><td>{entry.sgv}</td></tr>
		{/each}
	</table>
{/if}

