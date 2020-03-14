<template>
  <div>
    <h1>Counter</h1>

    <p>This is a simple example of a Vue.js component. <fa-icon icon="cog"></fa-icon></p>

    <p>Current count: <strong>{{ currentcount }}</strong></p>

    <b-btn @click="incrementCounter">Increment</b-btn>
  </div>
</template>

<script src="./counter.ts"></script>
