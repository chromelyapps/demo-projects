import { library } from '@fortawesome/fontawesome-svg-core';
import Vue from 'vue';

// See https://fontawesome.com/icons?d=gallery for all icons
import { faBars, faCog, faFile, faFolder, faFolderOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';

// register the fa-icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default function setup_icons() {
    library.add(faBars, faSpinner, faCog, faFolder, faFolderOpen, faFile);
    Vue.component('fa-icon', FontAwesomeIcon);
}
