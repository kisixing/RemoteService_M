import { IRoute } from 'umi-types';


const r: IRoute = {
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
        {
            name: 'success',
            icon: 'smile',
            path: '/result/success',
            component: './result/success',
        },
        {
            name: 'fail',
            icon: 'smile',
            path: '/result/fail',
            component: './result/fail',
        },
    ],
}
export default r