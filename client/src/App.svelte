<script>
// @ts-nocheck

  import Header from "./UI/Header.svelte";
  import Overview from "./UI/Overview.svelte";
  import Login from "./UI/Login.svelte";

  let receivedData=undefined
  function handleDataReceived(event) {
    receivedData = event.detail;
    console.log(receivedData);
  }
</script>

<div class="container">
  {#if receivedData === undefined}
  <Login on:dataReceived={handleDataReceived}/>
  {:else}
  <Header />
  <Overview />
  {/if}
</div>


<style>
  
</style>