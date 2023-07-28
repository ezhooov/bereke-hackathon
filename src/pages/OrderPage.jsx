import { Typography, Button, Table, Modal } from 'antd'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-query'
import { getOrders, getEmployees, saveOrder } from '../api/api.js'
import { useState } from 'react'
import { CreateOrder } from '../components/CreateOrder.jsx'
import { queryClient } from '../main.jsx'

const { Title } = Typography

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const statusMap = {
  new: 'Новый',
  in_progress: 'В работе',
  fullfiled: 'Выполнен',
  payed: 'Оплачен',
  cancelled: 'Отменен'
}

export const OrderPage = () => {
  const { data: orders } = useQuery('order_list', getOrders)
  const { data: employees } = useQuery('employee_list', getEmployees)

  const { list: employeeList, dictionary: employeeMap } = employees || {}
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const { isLoading: saving, mutateAsync: saveMutation } = useMutation(saveOrder, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('order_list')
      queryClient.invalidateQueries('employee_list')
    }
  })

  const getTableColumns = (employeeDictionary) => ([
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Исполнитель',
      key: 'employee',
      dataIndex: 'employee',
      render: (_, { employee }) => (
        <>{(employeeDictionary[employee] && employeeDictionary[employee].name) || 'Не назначен'}</>
      )
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum'
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>{statusMap[status] || ''}</>
      )
    }
  ])

  const onSave = async (values) => {
    await saveMutation(values)
    setCreateModalOpen(false)
  }

  return (
    <section>
      <StyledContainer>
        <Title level={2}>Заказы</Title>
        <Button type='primary' onClick={() => setCreateModalOpen(true)}>Создать</Button>
      </StyledContainer>

      <Table
        loading={!orders && !employeeMap}
        columns={getTableColumns(employeeMap || {})}
        dataSource={orders}
        pagination={false}
      />
      <Modal
        title={<Title level={4}>Создание заказа</Title>}
        open={createModalOpen}
        footer={null}
        onCancel={() => setCreateModalOpen(false)}
      >
        <CreateOrder onSave={onSave} pending={saving} />
      </Modal>
    </section>
  )
}
