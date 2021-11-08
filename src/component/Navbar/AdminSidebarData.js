import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const AdminSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: <FaIcons.FaClipboardList />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reservation',
        path: '/Dashboard/Reservation',
        icon: <FaIcons.FaCalendarAlt />,
        cName: 'sub-nav'
      },
      {
        title: 'Accounts',
        path: '/Dashboard/Accounts',
        icon: <FaIcons.FaUserAlt />,
        cName: 'sub-nav'
      },
      {
        title: 'Pet',
        path: '/Dashboard/Pet',
        icon: <FaIcons.FaDog />
      },
      {
        title: 'Suggestions',
        path: '/Dashboard/Suggestion',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Visitor',
        path: '/Dashboard/Visitor',
        icon: <FaIcons.FaVoteYea />
      },
      {
        title: 'Vehicle',
        path: '/Dashboard/Vehicle',
        icon: <FaIcons.FaCarAlt />
      },
      {
        title: 'Transactions',
        path: '/Dashboard/AdminTransaction',
        icon: <FaIcons.FaExchangeAlt />
      },
    ]
  },
  {
    title: 'Messages',
    path: '/Messages',
    icon: <FaIcons.FaEnvelopeOpenText />,  
  },
];

