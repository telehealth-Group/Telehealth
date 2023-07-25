<script>
  // @ts-nocheck

  import Header from "./UI/Header.svelte";
  import Overview from "./UI/Overview.svelte";
  import Login from "./UI/Login.svelte";
  import axios from "axios";
  import Signup from "./UI/Signup.svelte";
  import { onMount } from "svelte";
  import { hospitals, patients } from "./store.js";

  let receivedData = undefined;
  let isVisible = "login";
  let name, role;

  function handleDataReceived(event) {
    receivedData = event.detail;
    name = receivedData.user.name;
    role = receivedData.user.role;
    console.log(receivedData);
  }

  onMount(async () => {
    try {
      const responseHospitals = await axios.get(
        "http://127.0.0.1:3000/api/users/hospital"
      );
      console.log("Hospitals:", responseHospitals.data);
      hospitals.set(responseHospitals.data);

    } catch (error) {
      console.error(error);
    }
  });
</script>

<div class="container">
  {#if receivedData === undefined && isVisible === "login"}
  <Login
    on:dataReceived={handleDataReceived}
    on:signup={() => (isVisible = "signup")}
  />
  {:else if receivedData === undefined && isVisible === "signup"}
  <Signup on:signUpDataReceived={handleDataReceived} />
  {:else}
  <Header {name} {role} />
  <Overview {role} data={receivedData} user={receivedData}/>
  {/if}
</div>

<style>
 
</style>
