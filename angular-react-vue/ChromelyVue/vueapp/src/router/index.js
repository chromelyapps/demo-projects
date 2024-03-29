import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../components/Home.vue'
import TmdbMovies from '../components/TmdbMovies.vue'
import TodoList from '../components/TodoList.vue'
import MessageRouterDemo from '../components/MessageRouterDemo.vue'
import AjaxXhrDemo from '../components/AjaxXhrDemo.vue'
import JavasSriptDemo from '../components/JavasSriptDemo.vue'
import Html5Tests from '../components/Html5Tests.vue'
import Html6Tests from '../components/Html6Tests.vue'
import GoogleShakaTests from '../components/GoogleShakaTests.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/tmdbmovies', name: 'tmdb', component: TmdbMovies },
  { path: '/todolist', name: 'todolist', component: TodoList },
  { path: '/msgrouter', name: 'msgrouter', component: MessageRouterDemo },
  { path: '/ajax', name: 'ajax', component: AjaxXhrDemo },
  { path: '/javascriptdemo', name: 'javascriptdemo', component: JavasSriptDemo },
  { path: '/html5tests', name: 'html5tests', component: Html5Tests },
  { path: '/html6tests', name: 'html6tests', component: Html6Tests },
  { path: '/shakatests', name: 'shakatests', component: GoogleShakaTests }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;