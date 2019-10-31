<script context="module">
	import db from "@app/db";

	export async function preload(page, session) {
		return { db: await db }
	}

</script>

<script>
	import { onMount } from 'svelte';
	export let db;
	const latest = db.collections.sgv.$;
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>


{#if $latest}
	Latest {$latest.sgv}
{/if}

