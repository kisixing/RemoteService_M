import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'pregnancyBook',
    icon: 'book',
    path: '/packpregnancyBookage',
    routes: [
        {
            name: 'center',
            icon: 'smile',
            path: '/pregnancyBook/center',
            component: './pregnancyBook/center',
        },
        {
            name: 'settings',
            icon: 'smile',
            path: '/pregnancyBook/settings',
            component: './pregnancyBook/settings',
        },
    ],
}

export default r