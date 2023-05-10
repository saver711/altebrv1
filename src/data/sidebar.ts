import { t } from "i18next";
import { AiFillGolden } from "react-icons/ai";
import { BiDiamond } from "react-icons/bi";
import { CiExport, CiImport, CiSettings } from "react-icons/ci";
import { GiCutDiamond } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { IoDocumentsOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdOutlineAttachMoney, MdOutlinePayments } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import { TbSmartHome } from "react-icons/tb";

export type MenuItem_TP = {
  id: string
  icon: IconType
  label: string
  link?: string

  items?: {
    id: string
    icon: IconType
    label: string
    link?: string
    items?: MenuItem_TP[]
  }[]
}

export const sideBarItems: MenuItem_TP[] = [
  {
    id: crypto.randomUUID(),
    icon: TbSmartHome,
    label: 'home',
    link: "/",
  },
  {
    id: crypto.randomUUID(),
    label: 'system establishment',
    link: "system",
    icon: CiSettings,
  },
  {
    id: crypto.randomUUID(),
    label: 'coding',
    icon: CiExport,
    items: [
      {
        id: crypto.randomUUID(),
        label: 'coded identities',
        link: "/coding",
        icon: RiVipCrownLine,
      },
      {
        id: crypto.randomUUID(),
        label: 'gold coding',
        link: "/coding/gold",
        icon: RiVipCrownLine,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    label: 'bonds',
    icon: IoDocumentsOutline,
    items: [
      {
        id: crypto.randomUUID(),
        label: 'supply',
        icon: CiExport,
        items: [
          {
            id: crypto.randomUUID(),
            label: 'bonds',
            link: "/bonds",
            icon: RiVipCrownLine,
          },
          {
            id: crypto.randomUUID(),
            label: 'gold bond supply',
            link: "/bonds/gold",
            icon: AiFillGolden,
          },
          // {
          //   id: crypto.randomUUID(),
          //   label: 'diamond bond supply',
          //   link: "/bonds/diamond",
          //   icon: GiCutDiamond,
          // },
          // {
          //   id: crypto.randomUUID(),
          //   label: 'accessories bond supply',
          //   link: "accessories",
          //   icon: BiDiamond,
          // },
        ],
      },
      // {
      //   id: crypto.randomUUID(),
      //   label: 'payment',
      //   icon: MdOutlineAttachMoney,

      //   items: [
      //     {
      //       id: crypto.randomUUID(),
      //       label: 'bond payment',
      //       link: "/return-payment",
      //       icon: CiImport,
      //     },
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   label: 'payoff',
      //   link: "Return",
      //   icon: MdOutlinePayments,
      //   items: [
      //     {
      //       id: crypto.randomUUID(),
      //       label: 'supply payoff',
      //       link: "return-table",
      //       icon: MdOutlinePayments,
      //     },
      //     {
      //       id: crypto.randomUUID(),
      //       label: 'gold payoff',
      //       link: "return-gold",
      //       icon: AiFillGolden,
      //     },
      //     {
      //       id: crypto.randomUUID(),
      //       label: 'diamond payoff',
      //       link: "return-diamond",
      //       icon: AiFillGolden,
      //     },
      //     {
      //       id: crypto.randomUUID(),
      //       label: 'accessories payoff',
      //       link: "return-accessories",
      //       icon: AiFillGolden,
      //     },
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   label: "employees",
      //   link: "/employees",
      //   icon: GrGroup,
      // }, 
      // {
      //   id: crypto.randomUUID(),
      //   label: 'reserve gold',
      //   link: "accessories",
      //   icon: MdOutlinePayments,
      // },
    ],
  },
  {
    id: crypto.randomUUID(),
    label: 'settings',
    link: "settings",
    icon: CiSettings,
  },
]