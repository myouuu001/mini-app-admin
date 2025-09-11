/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
    roles:["admin","editor","guest"]
  },
  {
    title: "权限管理",
    path: "/auth",
    icon: "key",
    roles:["admin"],
    children: [
      {
        title: "角色管理",
        path: "/auth/roles",
        roles:["admin"],
      },
      {
        title: "用户管理",
        path: "/auth/user",
        roles:["admin"],
      },
    ],
  },
  {
    title: "用户管理",
    path: "/user",
    icon: "usergroup-add",
    roles:["admin"],
    children: [
      {
        title: "用户列表",
        path: "/user/list",
        roles:["admin"],
      },
      {
        title: "主播列表",
        path: "/user/streamer",
        roles:["admin"],
      }
    ]
  },
  {
    title: "订单管理",
    path: "/order",
    icon: "property-safety",
    roles:["admin"],
    children: [
      {
        title: "订单流水",
        path: "/order/list",
        roles:["admin"],
      },
      {
        title: "支付流水",
        path: "/order/bill",
        roles:["admin"],
      },
    ]
  },
  {
    title: "审核管理",
    path: "/audit",
    icon: "control",
    roles:["admin"],
    children: [
      {
        title: "主播资料审核",
        path: "/audit/streamer",
        roles:["admin"],
      },
      {
        title: "用户资料审核",
        path: "/audit/user",
        roles:["admin"],
      },
    ]
  },
  {
    title: "配置管理",
    path: "/config",
    icon: "control",
    roles:["admin"],
    children: [
      {
        title: "标签管理",
        path: "/config/tags",
        roles:["admin"],
      },
      {
        title: "商品管理",
        path: "/config/product",
        roles:["admin"],
      },
      {
        title: "渠道管理",
        path: "/config/channel",
        roles:["admin"],
      }
    ]
  },
  {
    title: "数据中心",
    path: "/charts",
    icon: "area-chart",
    roles:["admin","editor"],
    children: [
      {
        title: "键盘图表",
        path: "/charts/keyboard",
        roles:["admin","editor"],
      },
      {
        title: "折线图",
        path: "/charts/line",
        roles:["admin","editor"],
      },
      {
        title: "混合图表",
        path: "/charts/mix-chart",
        roles:["admin","editor"],
      },
    ],
  },
  {
    title: "日志管理",
    path: "/log",
    icon: "cluster",
    roles:["admin","editor"],
    children: [
      {
        title: "登录日志",
        path: "/log/login",
      },
      {
        title: "操作日志",
        path: "/log/operation",
      },
    ],
  },
  // {
  //   title: "Excel",
  //   path: "/excel",
  //   icon: "file-excel",
  //   roles:["admin","editor"],
  //   children: [
  //     {
  //       title: "导出Excel",
  //       path: "/excel/export",
  //       roles:["admin","editor"]
  //     },
  //     {
  //       title: "上传Excel",
  //       path: "/excel/upload",
  //       roles:["admin","editor"]
  //     }
  //   ],
  // },
];
export default menuList;
