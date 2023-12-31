import SuccessCart from "./components/views/success-cart/SuccessCart";
import { ROUTE_PATHS } from "./constants/url-config";
import { PERMISSION } from "./guards/role-guard";
import CartPage from "./pages/cart/Cart";
import CheckoutPage from "./pages/checkout/Checkout";
import HistoryCartPage from "./pages/history-cart/HistoryCart";
import HomePage from './pages/home/home';
import ProductDetail from "./pages/product-detail/ProductDetail";
import ShopPage from "./pages/shop/Shop";
import SignIn from './pages/sign-in/sign-in';
import SignUp from "./pages/sign-up/sign-up";

export interface Route {
    groupIndex?: number
    href: string
    exact: boolean
    component: any
    title: string
    hidden?: boolean
    icon?: any
    forAdmin?: boolean
    loginRequired?: boolean
    permissions: PERMISSION[]
    subMenu?: SubMenu[]
    isLayout?: boolean
}

interface SubMenu {
    href: string
    title: string
}

const anonymousPage: Route[] = [
    {
        href: ROUTE_PATHS.SignIn,
        title: "",
        exact: true,
        component: SignIn,
        hidden: true,
        permissions: [],
        loginRequired: true,
    },
    
]

const authorizedPage: Route[] = [
    {
        href: ROUTE_PATHS.Home,
        exact: true,
        component: HomePage,
        title: "Home",
        permissions: [],
        loginRequired: false,
    },
    {
        href: ROUTE_PATHS.SignUp,
        title: "",
        exact: true,
        component: SignUp,
        hidden: true,
        permissions: [],
        loginRequired: false,
        isLayout: true
    },
    {
        href: ROUTE_PATHS.Shop,
        exact: true,
        component: ShopPage,
        title: "Shop",
        permissions: [],
        loginRequired: false,
    },
    {
        href: ROUTE_PATHS.Cart,
        exact: true,
        component: CartPage,
        title: "Cart",
        permissions: [],
        loginRequired: false,
    },
    {
        href: ROUTE_PATHS.Checkout,
        exact: true,
        component: CheckoutPage,
        title: "Cart",
        permissions: [],
        loginRequired: false,
    },
    {
        href: ROUTE_PATHS.ProductDetail,
        exact: true,
        component: ProductDetail,
        title: "ProductDetail",
        permissions: [],
        loginRequired: false,
    },
    {
        href: ROUTE_PATHS.History,
        exact: true,
        component: HistoryCartPage,
        title: "HistoryCartPage",
        permissions: [],
        loginRequired: false,
    },
    {
        href: ROUTE_PATHS.SuccessCart,
        exact: true,
        component: SuccessCart,
        title: "SuccessCart",
        permissions: [],
        loginRequired: false,
    },
]

export const routes: Route[] = [...anonymousPage, ...authorizedPage]