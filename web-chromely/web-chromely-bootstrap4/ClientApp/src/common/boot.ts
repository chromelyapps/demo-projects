import BootstrapVue from 'bootstrap-vue';
import { Component, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(BootstrapVue);

// theme selection
import "../../css/themes/theme1.scss";
//import "../../css/themes/theme2.scss";
//import "../../css/theme3/theme3.css";


// Load in bootstrap vue controls
import 'bootstrap-vue/dist/bootstrap-vue.css';

// This will bring in the font files for fontawesome
// import '../../css/fontawesome.scss';
// This will bring in the svg files for fontawesome
import setup_icons from './svgicon';
setup_icons();

// Destnation routes for different urls
import { routes } from './routes';

// Root component
@Component({
    render: (h: any) => h(require('../components/dashboard/dashboard.vue').default),
    router: new VueRouter({ mode: 'history', routes }),
})
export default class BootComponent extends Vue {
}

// see https://vuejs.org/v2/api/#vm-mount for root component
new BootComponent().$mount('#app-root');
