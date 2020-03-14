import { TopNavBarEvents } from 'common/eventbus';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopNavBarComponent extends Vue {

  // Throw an event up to the parent control

  // Used for larger non-mobile screens
  private toggle_sidebar_desktop_click(event: Event) {
    TopNavBarEvents.$emit('toggle-sidebar-desktop');
  }

  // Used for mobile screens
  private toggle_sidebar_mobile_click(event: Event) {
    TopNavBarEvents.$emit('toggle-sidebar-mobile');
  }
}
