import renderUI from './renderUI'
import '@/reset.less'

const Vue = window.Vue;
let vueApp;
const render = (props) => {
    const { container } = props;
    const root = (container || document).querySelector('#mybricks-page-root')
    /** publish template style */
    root.style.width = '100%';
    root.style.height = '100%';
    vueApp = Vue.createApp(renderUI({ ...props, renderType: 'vue3' })).mount(root)
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('vue3 app bootstrap');
}

export async function mount(props) {
    render(props);
}

export async function unmount(props) {
    vueApp.unmount();
    vueApp.$el.innerHTML = '';
}