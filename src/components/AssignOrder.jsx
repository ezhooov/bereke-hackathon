import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Button, Select } from 'antd'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;
  gap: 16px;
`

export const AssignOrder = ({ order, onAssignSubmit, pending, employeeList }) => {
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    if (!pending) {
      setEmployee(null)
    }
  }, [pending])

  const onClick = () => {
    onAssignSubmit({ ...order, employee, status: 'in_progress' })
  }

  return (
    <StyledForm>
      <Select options={employeeList.map(item => ({ value: item.id, label: item.name }))} value={employee} onChange={setEmployee} />
      <Button size='large' type='primary' onClick={onClick} disabled={pending} loading={pending}>Назначить испольнителя</Button>
    </StyledForm>
  )
}
