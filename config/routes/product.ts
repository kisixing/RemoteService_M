import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'product',
    icon: 'shopping',
    path: '/product',
    routes: [
        {
            name: 'list',
            icon: 'ordered-list',
            path: '/product/list',
            component: './product',
        }
    ],
}

export default r