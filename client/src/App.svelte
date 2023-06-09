<script>
  // @ts-nocheck

  import Header from "./UI/Header.svelte";
  import Overview from "./UI/Overview.svelte";
  import Login from "./UI/Login.svelte";
  import axios from "axios";
  import Signup from "./UI/Signup.svelte";
  import {onMount} from 'svelte'
  import { hospitals,appointments,patients } from './store.js';

  let receivedData = undefined;
  let isVisible = "login";
  let name,role
  function handleDataReceived(event) {
    receivedData = event.detail;
    name = receivedData.user.name;
    role = receivedData.user.role;
    console.log(receivedData);
  }

   async function fetchData() {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/users/hospital/');
      const { data } = await response.json();
      const currentItems = $hospitals;
      hospitals.set([...currentItems, ...data.hospitals]);
    } catch (error) {
      console.error(error);
    }
  }

  onMount(fetchData);
</script>

<div class="container">
  {#if receivedData === undefined && isVisible === "login"}
    <Login
      on:dataReceived={handleDataReceived}
      on:signup={() => (isVisible = "signup")}
    />
  {:else if receivedData === undefined && isVisible === "signup"}
    <Signup on:signUpDataReceived={handleDataReceived}/>
  {:else}
  <Header {name} {role} />
    <Overview {role} data={receivedData}/>
  {/if}
</div>

<style>
</style>
