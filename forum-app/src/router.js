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

import { useHeaderStore } from '@/stores/header.js';

const routes = [
    { path: '/', component: HomePage, props: {customHeader: 'Hello world', }, },
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


router.beforeEach((to, from) => {
    const headerStore = useHeaderStore();
    switch(to.path) {
        case '/':
            headerStore.updateHeaderName('Home');
            break;
        case '/profile':
            headerStore.updateHeaderName('Profile');
            break;
        case '/community':
            headerStore.updateHeaderName('Communities');
            break;
        case '/topics':
            headerStore.updateHeaderName('Topics');
            break;
        case '/post':
            headerStore.updateHeaderName('Post');
            break;
        case '/quiz':
            headerStore.updateHeaderName('Quiz');
            break;
        case '/chatrooms':
            headerStore.updateHeaderName('Chat Rooms');
            break;
        case '/community-finder':
            headerStore.updateHeaderName('Find a community');
            break;
        case '/create-post':
            headerStore.updateHeaderName('Create a post');
            break;
        case '/friend-messages':
            headerStore.updateHeaderName('Friends');
            break;
        case '/about':
            headerStore.updateHeaderName('About us');
            break;
        case '/privacy-policy':
            headerStore.updateHeaderName('Privacy Policy');
            break;
        case '/cookie-policy':
            headerStore.updateHeaderName('Cookies');
            break;
        case '/terms-of-use':
            headerStore.updateHeaderName('Terms of use');
            break;
        

    }
    
    
})


export default router;
