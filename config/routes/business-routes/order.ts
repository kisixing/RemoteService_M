import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'order',
    icon: 'pay-circle',
    path: '/order',
    routes: [
        {
            name: 'list',
            icon: 'ordered-list',
            path: '/order/list',
            component: './order/list',
        },
        {
            hideInMenu: true,
            path: '/order/detail',
            component: './order/detail',
        },
    ],
}

export default r