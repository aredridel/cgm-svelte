<script>
    export let data;
</script>

<svg viewBox="0 0 100 20">
    {#each data as entry, index}
        <g>
            <title>{entry.sgv} — {entry.direction} - {entry.device}</title>
            <circle r="1" cx={index * 5} cy={200 / entry.sgv * 10} fill="#000" />
        </g>
    {/each}
</svg>
