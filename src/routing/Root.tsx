import { t } from "i18next"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { Outlet } from "react-router-dom"
import Footer from "../components/organisms/Footer"
import { Loading } from "../components/organisms/Loading"
import NavBar from "../components/organisms/NavBar"
import { SideBar } from "../components/organisms/SideBar"
import { authCtx } from "../context/auth-and-perm/auth"

export const Root = () => {
  const { isLoggedIn, isLoadingUpdatedUserData } = useContext(authCtx)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true })
    }
  }, [isLoggedIn])

  if (isLoggedIn && !isLoadingUpdatedUserData) {
    return (
      <div className="grid h-screen grid-cols-view grid-rows-view bg-flatWhite">
        <nav className="col-start-1 col-end-3 row-start-1 row-end-2 bg-white">
          <NavBar />
        </nav>

        <SideBar />

        <main className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-auto p-10">
          <Outlet />
        </main>

        <Footer />
      </div>
    )
  }
  return <Loading mainTitle={t("loading")} />
}
