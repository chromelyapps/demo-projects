import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import SideBarMenu from '../sidebarmenu/sidebarmenu.vue';

@Component({
  components: {
    'sidebarmenu-component': SideBarMenu,
  },
})
export default class SideBarComponent extends Vue {
  public sidebar_visible:boolean = true;

  @Emit()
  public toggle_sidebar() {
    this.sidebar_visible = !this.sidebar_visible;
  }

}
