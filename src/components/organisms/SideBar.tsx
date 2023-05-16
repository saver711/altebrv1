/////////// IMPORTS
///
import { Link, useLocation, useNavigate } from "react-router-dom"
// components
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar"
import { useIsRTL } from "../../hooks/useIsRTL"
// helpers
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { MenuItem_TP, sideBarItems } from "../../data/sidebar"

type OpenMenus_TP = {
  [key: string]: boolean
}

export const SideBar = () => {
  /////////// CUSTOM HOOKS
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const isRTL = useIsRTL()
  const [opened, setOpened] = useState<OpenMenus_TP>({})
  const { collapseSidebar, collapsed } = useProSidebar()

  const path = location.pathname

  const goTo = (e: any, link: string) => {
    console.log("🚀 ~ file: SideBar.tsx:35 ~ goTo ~ link:", link)
    // e.preventDefault()
    // // left click
    // if (e.button === 0) {
    //   // ctrl + left click
    //   if (e.ctrlKey) {
    //     window.open(link, "_blank")
    //   } else {
    //     navigate(link)
    //   }
    // } else if (e.button === 1) {
    //   // middle click
    //   window.open(link, "_blank")
    // }
  }

  const findPathParentMenu = (path: string) => {
    var opened: OpenMenus_TP = {}
    sideBarItems.forEach((item: MenuItem_TP) => {
      // check if item has link
      if (item.link) {
        if (item.link === path) {
          opened[item.id] = true
        }
      }
      // check if item has items
      if (item.items) {
        item.items.forEach((innerItem) => {
          if (innerItem.link) {
            if (innerItem.link === path) {
              opened[item.id] = true
            }
          } else if (innerItem.items) {
            innerItem.items.forEach((innerInnerItem) => {
              if (innerInnerItem.link) {
                if (innerInnerItem.link === path) {
                  opened[item.id] = true
                  opened[innerItem.id] = true
                }
              }
            })
          }
        })
      }
    })
    return opened
  }

  useEffect(() => {
    setOpened(findPathParentMenu(path))
  }, [path])

  const isOpen = (id: string) => {
    if (collapsed) return false
    return opened[id]
  }
  // find path parent menu

  const generateItem = (Item: MenuItem_TP) => {
    return Item.items ? (
      <SubMenu
        defaultOpen={isOpen(Item.id)}
        className={
          location.pathname === Item.link
            ? "bg-mainGreen font-bold text-white"
            : "font-bold text-mainBlack"
        }
        key={Item.id}
        label={t(Item.label)}
        icon={<Item.icon size={20} />}
      >
        {Item.items.map((innerItem) => generateItem(innerItem))}
      </SubMenu>
    ) : (
      <MenuItem
        className={
          location.pathname === Item.link
            ? " font-bold text-white  hover:text-mainGreen  [&>a]:rounded-md [&>a]:bg-mainGreen"
            : "font-bold text-mainBlack  hover:[&>a]:bg-lightGray"
        }
        key={Item.id}
        onClick={(e) => {
          if (e.button === 0) {
              // ctrl + left click
              if (!!!e.ctrlKey) 
                navigate(Item.link)
        }}}
        icon={<Item.icon size={20} />}
        active={location.pathname === Item.link}
      >
           <Link to={`${Item.link}`}><div>{t(Item.label)}</div></Link>
      </MenuItem>
    )
  }

  ///
  return (
    <Sidebar
      rtl={isRTL}
      className="col-start-1 col-end-2 row-start-2 row-end-3"
      transitionDuration={270}
      onMouseEnter={(e) => {
        e.preventDefault()
        collapseSidebar(false)
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
        collapseSidebar(true)
      }}
    >
      <Menu>
        {sideBarItems.map((Item) =>
          Item.items ? (
            <SubMenu
              defaultOpen={isOpen(Item.id)}
              className={
                location.pathname === Item.link
                  ? "bg-LightGreen font-bold text-mainOrange"
                  : "font-bold text-mainBlack"
              }
              key={Item.id}
              label={t(Item.label)}
              icon={<Item.icon size={20} />}
              active={location.pathname === Item.link}
            >
              {Item.items.map((innerItem) => generateItem(innerItem))}
            </SubMenu>
          ) : (
            generateItem(Item)
          )
        )}
      </Menu>
    </Sidebar>
  )
}
