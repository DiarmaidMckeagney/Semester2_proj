import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components for each route
import HomePage from './components/HomePage.vue';
import ProfilePage from './components/ProfilePage.vue';
import QuizPage from './components/QuizPage.vue';
import PostPage from './components/PostPage.vue';
import ChatroomPage from './components/ChatroomsPage.vue';
import CommunityFinderPage from './components/CommunityFinderPage.vue';
import CreatePostPage from './components/CreatePostPage.vue';
import FriendsMessagePage from './components/FriendsMessagePage.vue';
import TopicsPage from './components/TopicsPage.vue';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.vue';
import CookiePolicyPage from './components/CookiePolicyPage.vue';
import TermsOfUsePage from './components/TermsOfUsePage.vue';
import CommunityPage from './components/CommunityPage.vue';
import AboutPage from './components/About.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/profile', component: ProfilePage },
    { path: '/community', component: CommunityPage },
    { path: '/post', component: PostPage },
    { path: '/quiz', component: QuizPage },
    { path: '/chatrooms', component: ChatroomPage },
    { path: '/community-finder', component: CommunityFinderPage },
    { path: '/create-post', component: CreatePostPage },
    { path: '/friend-messages', component: FriendsMessagePage },
    { path: '/topics', component: TopicsPage },
    { path: '/about', component: AboutPage },
    { path: '/privacy-policy', component: PrivacyPolicyPage },
    { path: '/cookie-policy', component: CookiePolicyPage },
    { path: '/terms-of-use', component: TermsOfUsePage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
