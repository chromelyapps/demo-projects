// Setup the routes for the different pages
const routes = [
    { path: '/', component: require('../components/pages/home.vue').default },
    { path: '/staticpage', component: require('../components/pages/staticpage/staticpage.vue').default },
    { path: '/counter', component: require('../components/pages/counter/counter.vue').default },
    { path: '/fetchdata', component: require('../components/pages/fetchdata/fetchdata.vue').default },
    { path: '/weather', component: require('../components/pages/weather/weather.vue').default },
];

export { routes };
