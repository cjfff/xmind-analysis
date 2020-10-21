import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    locale: false,
  },
  base: '/xmind-analysis',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/jsmind', component: '@/pages/jsmind', name: 'jsmind' },
    // {
    //   path: '/mymind',
    //   hidden: true,
    //   component: '@/pages/mymind',
    //   name: 'mymind',
    // },
    {
      path: '/mind-elixir-core',
      component: '@/pages/mind-elixir-core',
      name: 'mind-elixir-core',
    },
    // { path: '/gg-editor', component: '@/pages/gg-editor', name: 'gg-editor' },
    // {
    //   path: '/g6-learn',
    //   hidden: true,
    //   component: '@/pages/g6-learn',
    //   name: 'g6-learn',
    // },
    // { path: '/g6', hidden: true, component: '@/pages/g6', name: 'g6' },
    {
      path: '/g6-normal',
      hidden: true,
      component: '@/pages/g6-normal',
      name: 'g6-normal',
    },
    { path: '/g6-xmind', component: '@/pages/g6-xmind', name: 'g6-xmind' },
  ],
});
