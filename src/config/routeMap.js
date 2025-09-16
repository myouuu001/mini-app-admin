import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Explanation = Loadable({loader: () => import(/*webpackChunkName:'Explanation'*/'@/views/permission'),loading: Loading});
const AdminPage = Loadable({loader: () => import(/*webpackChunkName:'AdminPage'*/'@/views/permission/adminPage'),loading: Loading});
const GuestPage = Loadable({loader: () => import(/*webpackChunkName:'GuestPage'*/'@/views/permission/guestPage'),loading: Loading});
const EditorPage = Loadable({loader: () => import(/*webpackChunkName:'EditorPage'*/'@/views/permission/editorPage'),loading: Loading});
const RichTextEditor = Loadable({loader: () => import(/*webpackChunkName:'RichTextEditor'*/'@/views/components-demo/richTextEditor'),loading: Loading});
const Markdown = Loadable({loader: () => import(/*webpackChunkName:'Markdown'*/'@/views/components-demo/Markdown'),loading: Loading});
const Draggable = Loadable({loader: () => import(/*webpackChunkName:'Draggable'*/'@/views/components-demo/draggable'),loading: Loading});
const KeyboardChart = Loadable({loader: () => import(/*webpackChunkName:'KeyboardChart'*/'@/views/charts/keyboard'),loading: Loading});
const LineChart = Loadable({loader: () => import(/*webpackChunkName:'LineChart'*/'@/views/charts/line'),loading: Loading});
const MixChart = Loadable({loader: () => import(/*webpackChunkName:'MixChart'*/'@/views/charts/mixChart'),loading: Loading});
const Menu1_1 = Loadable({loader: () => import(/*webpackChunkName:'Menu1_1'*/'@/views/nested/menu1/menu1-1'),loading: Loading});
const Menu1_2_1 = Loadable({loader: () => import(/*webpackChunkName:'Menu1_2_1'*/'@/views/nested/menu1/menu1-2/menu1-2-1'),loading: Loading});
const Table = Loadable({loader: () => import(/*webpackChunkName:'Table'*/'@/views/table'),loading: Loading});
const ExportExcel = Loadable({loader: () => import(/*webpackChunkName:'ExportExcel'*/'@/views/excel/exportExcel'),loading: Loading});
const UploadExcel = Loadable({ loader: () => import(/*webpackChunkName:'UploadExcel'*/'@/views/excel/uploadExcel'),loading: Loading });
const Zip = Loadable({loader: () => import(/*webpackChunkName:'Zip'*/'@/views/zip'),loading: Loading});
const Clipboard = Loadable({loader: () => import(/*webpackChunkName:'Clipboard'*/'@/views/clipboard'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});
const User = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/user'),loading: Loading});
const UserStreamer = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/user/streamer'),loading: Loading});
const Auth = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/role'),loading: Loading});
const AuthUser = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/role/user'),loading: Loading});
const Order = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/order/list'),loading: Loading});
const Bill = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/order/bill'),loading: Loading});
const AuditStreamer = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/audit/streamer'),loading: Loading});
const AuditUser = Loadable({loader: () => import(/*webpackChunkName:'About'*/'@/views/audit/user'),loading: Loading});
const Tags = Loadable({loader: () => import(/*webpackChunkName:'Bug'*/'@/views/system/tags'),loading: Loading});
const Product = Loadable({loader: () => import(/*webpackChunkName:'Bug'*/'@/views/system/product'),loading: Loading});
const Channel = Loadable({loader: () => import(/*webpackChunkName:'Bug'*/'@/views/system/channel'),loading: Loading});
const LogLogin = Loadable({loader: () => import(/*webpackChunkName:'Bug'*/'@/views/log/login'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin","editor","guest"] },
  { path: "/permission/explanation", component: Explanation, roles: ["admin"] },
  { path: "/permission/adminPage", component: AdminPage, roles: ["admin"] },
  { path: "/permission/guestPage", component: GuestPage, roles: ["guest"] },
  { path: "/permission/editorPage", component: EditorPage, roles: ["editor"] },
  { path: "/components/richTextEditor", component: RichTextEditor, roles: ["admin","editor"] },
  { path: "/components/Markdown", component: Markdown, roles: ["admin","editor"] },
  { path: "/components/draggable", component: Draggable, roles: ["admin","editor"] },
  { path: "/charts/keyboard", component: KeyboardChart, roles: ["admin","editor"] },
  { path: "/charts/line", component: LineChart, roles: ["admin","editor"] },
  { path: "/charts/mix-chart", component: MixChart, roles: ["admin","editor"] },
  { path: "/nested/menu1/menu1-1", component: Menu1_1, roles: ["admin","editor"] },
  { path: "/nested/menu1/menu1-2/menu1-2-1", component: Menu1_2_1, roles: ["admin","editor"] },
  { path: "/table", component: Table, roles: ["admin","editor"] },
  { path: "/excel/export", component: ExportExcel, roles: ["admin","editor"] },
  { path: "/excel/upload", component: UploadExcel, roles: ["admin","editor"] },
  { path: "/zip", component: Zip, roles: ["admin","editor"] },
  { path: "/clipboard", component: Clipboard, roles: ["admin","editor"] },
  { path: "/user/list", component: User, roles: ["admin"] },
  { path: "/user/streamer", component: UserStreamer, roles: ["admin"] },
  { path: "/auth/roles", component: Auth, roles: ["admin"] },
  { path: "/auth/user", component: AuthUser, roles: ["admin"] },
  { path: "/error/404", component: Error404 },
  { path: "/order/list", component: Order, roles: ["admin"] },
  { path: "/order/bill", component: Bill, roles: ["admin"] },
  { path: "/audit/streamer", component: AuditStreamer, roles: ["admin"] },
  { path: "/audit/user", component: AuditUser, roles: ["admin"] },
  { path: "/config/tags", component: Tags, roles: ["admin", "editor"] },
  { path: "/config/product", component: Product, roles: ["admin", "editor"] },
  { path: "/config/channel", component: Channel, roles: ["admin", "editor"] },
  { path: "/log/login", component: LogLogin, roles: ["admin"] },
];
