import { Button, List, Modal, Typography } from 'antd'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../main.jsx'
import { deleteEmployee, getEmployees } from '../api/api.js'
import { useState } from 'react'
import { AddEmployee } from '../components/AddEmployee.jsx'

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

export const EmployeePage = () => {
  const { data, isFetching } = useQuery('employee_list', getEmployees)
  const { list: employees } = data || {}

  const [removingId, setRemovingId] = useState(null)
  const { isLoading: deleting, mutate: deleteMutate } = useMutation(deleteEmployee, {
    onSuccess: () => {
      setRemovingId(null)
      // Invalidate and refetch
      queryClient.invalidateQueries('employee_list')
    }
  })
  const removeEmployee = (id) => () => {
    setRemovingId(id)
    deleteMutate(id)
  }

  const [addModalOpen, setAddModalOpen] = useState(false)
  const { isLoading: saving, mutate: addMutate } = useMutation(deleteEmployee, {
    onSuccess: () => {
      setAddModalOpen(false)
      // Invalidate and refetch
      queryClient.invalidateQueries('employee_list')
    }
  })
  const onSave = (values) => {
    addMutate(values)
  }

  return (
    <section>
      <StyledContainer>
        <StyledTitle level={2}>Исполнители</StyledTitle>
        <Button type='primary' onClick={() => setAddModalOpen(true)}>Добавить</Button>
      </StyledContainer>
      <List
        loading={isFetching}
        itemLayout='horizontal'
        dataSource={employees}
        renderItem={({ id, iin, name }) => (
          <List.Item
            key={id}
            actions={[
              <Button
                type='text'
                key='remove'
                onClick={removeEmployee(id)}
                loading={deleting && removingId === id}
                disabled={deleting && removingId === id}
              >
                Удалить
              </Button>]}
          >
            <List.Item.Meta
              title={name}
              description={iin}
            />
          </List.Item>
        )}
      />
      <Modal
        title={<Title level={4}>Добавление исполнителя</Title>}
        open={addModalOpen}
        footer={null}
        onCancel={() => setAddModalOpen(false)}
      >
        <AddEmployee onSave={onSave} pending={saving} />
      </Modal>
    </section>
  )
}
