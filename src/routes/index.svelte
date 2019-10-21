<script>
	import { onMount } from 'svelte';

	let db;
	onMount(async () => {
		db = await import('../clientdb.js');
	  })
		

</script>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{db}
