import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import PropertyPage from '../pages/PropertyPage.vue';
import PropertyDetailPage from '../pages/PropertyDetailPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactPage from '../pages/ContactPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/property', component: PropertyPage },
    { path: '/property/:id', component: PropertyDetailPage },
    { path: '/about', component: AboutPage },
    { path: '/contact', component: ContactPage },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
