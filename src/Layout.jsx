import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
      <header>
        header
      </header>
      <section>
        <Outlet />
      </section>
      <footer>
        footer
      </footer>
    </div>
  )
}
