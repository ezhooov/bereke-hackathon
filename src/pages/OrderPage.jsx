import { Typography, Button, Table, Modal } from 'antd'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-query'
import { getOrders, getEmployees, createOrder, updateOrder } from '../api/api.js'
import { useState } from 'react'
import { CreateOrder } from '../components/CreateOrder.jsx'
import { queryClient } from '../main.jsx'
import { AssignOrder } from '../components/AssignOrder.jsx'

const { Title } = Typography

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledTitle = styled(Title)`
  margin-bottom: 0 !important;
  padding: 12px 0;
`

const StyledButton = styled(Button)`
  width: 120px
`

const statusMap = {
  new: 'Новый',
  in_progress: 'В работе',
  fulfilled: 'Выполнен',
  payed: 'Оплачен',
  cancelled: 'Отменен'
}

export const OrderPage = () => {
  const { data: orders, isFetching: isFetchingOrders } = useQuery('order_list', getOrders)
  const { data: employees, isFetching: isFetchingEmployees } = useQuery('employee_order_list', getEmployees)

  const { list: employeeList, dictionary: employeeMap } = employees || {}

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const onSave = async (values) => {
    await saveMutation(values)
    setCreateModalOpen(false)
  }

  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [orderToAssign, setOrderToAssign] = useState(null)
  const { isLoading: saving, mutateAsync: saveMutation } = useMutation(createOrder, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('order_list')
      queryClient.invalidateQueries('employee_order_list')
    }
  })
  const assign = (order) => () => {
    setAssignModalOpen(true)
    setOrderToAssign(order)
  }
  const { isLoading: assigning, mutate: assignMutation } = useMutation(updateOrder, {
    onSuccess: () => {
      setAssignModalOpen(false)

      // Invalidate and refetch
      queryClient.invalidateQueries('order_list')
      queryClient.invalidateQueries('employee_order_list')
    }
  })

  const [payingId, setPayingId] = useState(null)
  const { isLoading: paying, mutateAsync: payMutation } = useMutation(createOrder, {
    onSuccess: () => {
      setPayingId(null)
      // Invalidate and refetch
      queryClient.invalidateQueries('order_list')
      queryClient.invalidateQueries('employee_order_list')
    }
  })
  const pay = (order) => () => {
    setPayingId(order.id)
    payMutation({ ...order, status: 'payed' })
  }

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
      render: (_, { employee = '' }) => (
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
      render: (_, { status = '' }) => (
        <>{statusMap[status] || ''}</>
      )
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'actions',
      width: 120,
      render: (_, order) => {
        if (order.status === 'new') {
          return <StyledButton type='primary' onClick={assign(order)}>Назначить</StyledButton>
        }

        if (order.status === 'fulfilled') {
          return (
            <StyledButton
              type='primary'
              onClick={pay(order)}
              disabled={paying && order.id === payingId}
              loading={paying && order.id === payingId}
            >
              Оплатить
            </StyledButton>
          )
        }
      },
      align: 'right'
    }
  ])

  return (
    <section>
      <StyledContainer>
        <StyledTitle level={2}>Заказы</StyledTitle>
        <Button type='primary' onClick={() => setCreateModalOpen(true)}>Создать</Button>
      </StyledContainer>

      <Table
        loading={isFetchingOrders || isFetchingEmployees}
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
      <Modal
        title={<Title level={4}>Назначение исполнителя</Title>}
        open={assignModalOpen}
        footer={null}
        onCancel={() => { setAssignModalOpen(false); setOrderToAssign(null) }}
      >
        <AssignOrder
          order={orderToAssign}
          onAssignSubmit={assignMutation}
          pending={assigning}
          employeeList={employeeList || []}
        />
      </Modal>
    </section>
  )
}
