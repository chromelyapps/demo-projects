/*
  This represents a global message bus that vue components can use to talk to one another
  without the parent / child relationship
  https://alligator.io/vuejs/global-event-bus/
*/

import Vue from 'vue';

/* Used for events from the top navbar */
export const TopNavBarEvents = new Vue();
