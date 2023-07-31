<!-- HospitalDashboard.svelte -->
<script>
  export let data;
    let hospital = data.user
</script>

<main>
  <h1>{hospital.name} Dashboard</h1>

  <section class="info-section">
    <h2>Available Times</h2>
    {#if hospital.availableTimes && hospital.availableTimes.length > 0}
      <ul>
        {#each hospital.availableTimes as time}
          <li>{time}</li>
        {/each}
      </ul>
    {:else}
      <p>No available times at the moment.</p>
    {/if}
  </section>

  <!-- Add other sections here with appropriate class names -->

</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 28px;
  }

  .info-section {
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  section {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }

  section:last-child {
    border-bottom: none;
  }
</style>
