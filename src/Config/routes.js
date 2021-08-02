import SignIn from '../Pages/SignIn/SignIn';
import Courses from '../Pages/Courses/Courses';

// Error 404
import Error404 from '../Pages/Error404';

// layout

import LayoutBasic from '../Layouts/LayoutBasic';

const routes = [
    // CONFIGURACION DE USUARIO NORMAL:
    {
        path: '/',
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: '/',
                component: SignIn,
                exact: true
            },
            {
                path: '/courses',
                component: Courses,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
];

export default routes;
