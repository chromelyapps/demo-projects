import { Component, Vue } from 'vue-property-decorator';
import NavBar from '../sidebarmenu/sidebarmenu.vue';
import { TopNavBarEvents } from 'common/eventbus';

@Component({
  components: {
    'navbar-component': NavBar,
  },
})
export default class SideBarComponent extends Vue {

  public toggsidebar_mobile = false;
  public toggsidebar_desktop = true;

  private mounted() {

    // Handle click event from top navbar
    TopNavBarEvents.$on('toggle-sidebar-desktop', () => {
      this.toggsidebar_desktop = !this.toggsidebar_desktop;
    });
    // Handle click event from top navbar
    TopNavBarEvents.$on('toggle-sidebar-mobile', () => {
      this.toggsidebar_mobile = !this.toggsidebar_mobile;
    });

  }
}
