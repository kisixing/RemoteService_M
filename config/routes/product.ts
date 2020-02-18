import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'product',
    icon: 'setting',
    path: '/product',
    routes: [
        {
            name: 'list',
            icon: 'smile',
            path: '/product/list',
            component: './product/list',
        }
    ],
}

export default r