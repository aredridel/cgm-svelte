<script context="module">
	import db from "@@app/db";

	export async function preload(page, session) {
		return { db: await db }
	}

</script>

<script>
	export let db;
	const latest = db.collections.sgv.find({
		ts: {$gte: null}
	})
		.sort('-ts')
		.limit(120)
		.$

	const latest20 = db.collections.sgv.find({
		ts: {$gte: null}
	})
		.sort('-ts')
		.limit(20)
		.$
</script>

<svelte:head>
	<title>Stored Glucose Values</title>
</svelte:head>


{#if $latest20}
	<svg viewBox="0 0 100 20">
		{#each $latest20 as entry, index}
			<circle r="1" cx={index * 5} cy={200 / entry.sgv * 10} fill="#000" />
		{/each}
	</svg>
{/if}

{#if $latest}
	<table>
		{#each $latest as entry}
			<tr><th>{new Date(entry.ts).toLocaleTimeString()}</th><td>{entry.sgv}</td></tr>
		{/each}
	</table>
{/if}

