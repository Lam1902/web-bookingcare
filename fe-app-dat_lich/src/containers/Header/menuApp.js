export const adminMenu = [
  {
    //manage-user
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-account",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      //   {
      //     name: "menu.admin.crud",
      //     link: "/system/user-manage",
      //   },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        //quản lí kế hoạch khám bệnh của bác sĩ
       
            name: "menu.doctor.manage-schedule",
            link: "/doctor/manage-schedule",
         
      },
    ],
  },
  {
    //manage-clinic
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    //manage-specialty
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    //manage-handbook
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/user-manage",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
            name: "menu.doctor.manage-schedule",
            link: "/doctor/manage-schedule",
      },
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
  },
    ],
  },
];
