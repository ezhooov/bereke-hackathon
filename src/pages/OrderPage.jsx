import { Typography, List, Skeleton, Button, Divider } from 'antd'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { getOrders } from '../api/api.js'
import { Link } from 'react-router-dom'

const { Title } = Typography

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderPage = () => {
  const { data, isLoading } = useQuery('order_list', getOrders)

  return (
    <section>
      <StyledContainer>
        <Title level={2}>Заказы</Title>
        <Button type='primary'>Создать</Button>
      </StyledContainer>
      <List
        loading={isLoading}
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[<Link key={item.id} to={`/orders/${item.id}`}>Редактировать</Link>]}
          >
            <Skeleton title loading={item.loading} active>
              <List.Item.Meta
                title={item.title}
                description={item.assignee}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </section>
  )
}
