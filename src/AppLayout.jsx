import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Layout, Menu, theme, Typography } from 'antd'
import styled from 'styled-components'
import { SmileOutlined } from '@ant-design/icons'

const { Title } = Typography

const { Content, Sider, Header } = Layout

const menu = [
  {
    key: '/orders',
    label: <Link to='/orders'>Заказы</Link>
  },
  {
    key: '/employees',
    label: <Link to='/employees'>Исполнители</Link>
  }
]

const StyledSider = styled(Sider)`
  background: ${props => props.colorBgContainer};
`

const StyledContentLayout = styled(Layout)`
  padding: 0 24px 24px;
`

const StyledMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
`

const StyledContent = styled(Content)`
  padding: 24px;
  margin: 16px;
  min-height: 280px;
  background: ${props => props.background};
  border-radius: 6px;
`

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`

const StyledHeader = styled(Header)`
  background: ${props => props.background};
  padding-inline: 24px;
  display: flex;
  align-items: center;
`

const StyledLogo = styled(SmileOutlined)`
  color: ${props => props.color};
  font-size: 32px;
`

const StyledTitle = styled(Title)`
  color: ${props => props.color} !important;
  margin-bottom: 0 !important;
`

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AppLayout = () => {
  const {
    token: { colorBgContainer, colorPrimary }
  } = theme.useToken()
  const location = useLocation()

  const selectedMenuKeys = menu.map((menuItem) => menuItem.key).filter(path => location.pathname === path)

  return (
    <StyledLayout>
      <StyledHeader background={colorPrimary}>
        <StyledLogoContainer>
          <StyledLogo color={colorBgContainer} />
          <StyledTitle color={colorBgContainer} level={2}>BBusiness</StyledTitle>
        </StyledLogoContainer>
      </StyledHeader>
      <Layout>
        <StyledSider
          width={200}
          colorBgContainer={colorBgContainer}
        >
          <StyledMenu
            mode='inline'
            items={menu}
            selectedKeys={selectedMenuKeys}
          />
        </StyledSider>
        <StyledContentLayout>
          <StyledContent
            background={colorBgContainer}
          >
            <Outlet />
          </StyledContent>
        </StyledContentLayout>
      </Layout>
    </StyledLayout>
  )
}
