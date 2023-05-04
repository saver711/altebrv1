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
    label: "الرئيسيه",
    link: "/",
  },
  {
    id: crypto.randomUUID(),
    label: "اعدادات النظام ",
    link: "system",
    icon: CiSettings,
  },
  {
    id: crypto.randomUUID(),
    label: "الترقيم",
    icon: CiExport,
    items: [
      {
        id: crypto.randomUUID(),
        label: "الهويات المرقمة",
        link: "/coding",
        icon: RiVipCrownLine,
      },
      {
        id: crypto.randomUUID(),
        label: "ترقيم الذهب",
        link: "/coding/gold",
        icon: RiVipCrownLine,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    label: "السندات",
    icon: IoDocumentsOutline,
    items: [
      {
        id: crypto.randomUUID(),
        label: "التوريد",
        icon: CiExport,
        items: [
          {
            id: crypto.randomUUID(),
            label: "السندات",
            link: "/bonds",
            icon: RiVipCrownLine,
          },
          {
            id: crypto.randomUUID(),
            label: "سند توريد ذهب ",
            link: "/bonds/gold",
            icon: AiFillGolden,
          },
          {
            id: crypto.randomUUID(),
            label: "سند توريد الماس  ",
            link: "/bonds/diamond",
            icon: GiCutDiamond,
          },
          {
            id: crypto.randomUUID(),
            label: "سند توريد متفرقات ",
            link: "accessories",
            icon: BiDiamond,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        label: "السداد ",
        icon: MdOutlineAttachMoney,

        items: [
          {
            id: crypto.randomUUID(),
            label: "سند السداد ",
            link: "/return-payment",
            icon: CiImport,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        label: "المردود",
        link: "Return",
        icon: MdOutlinePayments,
        items: [
          {
            id: crypto.randomUUID(),
            label: " مردود توريد",
            link: "return-table",
            icon: MdOutlinePayments,
          },
          {
            id: crypto.randomUUID(),
            label: " مردود ذهب",
            link: "return-gold",
            icon: AiFillGolden,
          },
          {
            id: crypto.randomUUID(),
            label: " مردود الماس",
            link: "return-diamond",
            icon: AiFillGolden,
          },
          {
            id: crypto.randomUUID(),
            label: " مردود متفرقات",
            link: "return-accessories",
            icon: AiFillGolden,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        label: t("employees"),
        link: "/employees",
        icon: GrGroup,
      }, {
        id: crypto.randomUUID(),
        label: "حجز الذهب ",
        link: "accessories",
        icon: MdOutlinePayments,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    label: "الاعدادات ",
    link: "settings",
    icon: CiSettings,
  },
]