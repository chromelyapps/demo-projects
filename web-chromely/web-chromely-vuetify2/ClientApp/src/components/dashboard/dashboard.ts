import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import SideBar from './sidebar/sidebar.vue';
import TopNavBar from './topnavbar/topnavbar.vue';
import SideBarComponent from './sidebar/sidebar'

@Component({
  components: {
    'sidebar-component': SideBar,
    'topnavbar-component': TopNavBar,
  },
})
export default class DashBoardComponent extends Vue {

  public toggle_sidebar() {
    const sidebar1 = this['$refs'].sidebar1 as SideBarComponent;
    sidebar1.toggle_sidebar();
  }

  public created() {
    const vuetifyprops = this['$vuetify'];
    vuetifyprops.theme.dark = true;
  }
}
