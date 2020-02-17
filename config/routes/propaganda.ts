import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'propaganda',
    icon: 'book',
    path: '/propaganda',
    routes: [
        {
            name: 'center',
            icon: 'smile',
            path: '/propaganda/center',
            component: './propaganda/center',
        },
        {
            name: 'settings',
            icon: 'smile',
            path: '/propaganda/settings',
            component: './propaganda/settings',
        },
    ],
}

export default r