import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'order',
    icon: 'book',
    path: '/order',
    routes: [
        {
            name: 'list',
            icon: 'smile',
            path: '/order/list',
            component: './order/list',
        }
    ],
}

export default r