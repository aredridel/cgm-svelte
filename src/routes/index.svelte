<script context="module">
	import db from "@app/db";
	console.log('wat');

	export async function preload(page, session) {
		return { db: await db }
	}
</script>

<script>
	import { onMount } from 'svelte';
	export let db;
</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{#each Object.keys(db.collections.items) as x}
{x}<br>
{/each}

