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
</script>

<svelte:head>
	<title>Stored Glucose Values</title>
</svelte:head>


{#if $latest}
	<table>
		{#each $latest as entry}
			<tr><th>{new Date(entry.ts).toLocaleTimeString()}</th><td>{entry.sgv}</td></tr>
		{/each}
	</table>
{/if}

