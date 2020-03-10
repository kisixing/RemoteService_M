import { IRoute } from 'umi-types';



const r: IRoute = {
    name: 'package',
    icon: 'shopping-cart',
    path: '/package',
    routes: [
        {
            name: 'list',
            icon: 'ordered-list',
            path: '/package/list',
            component: './package',
        }
    ],
}

export default r