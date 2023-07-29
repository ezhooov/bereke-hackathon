import styled from 'styled-components'
import { Button, Select } from 'antd'
import { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;
  gap: 16px;
`

const StyledSelect = styled(Select)`
  flex-grow: 1;
`

const StyledSelectContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const taxSelectOptions = [
  {
    label: 'Пенсионные взносы',
    value: 'OPV'
  },
  {
    label: 'Взносы на обязательное мед.страхование',
    value: 'VOCMC'
  },
  {
    label: 'Подоходный налог',
    value: 'IPN'
  }
]

export const CountTax = ({ onSave, pending, employeeList, employeeMap }) => {
  const [name, setName] = useState(null)
  const [employees, setEmployees] = useState([null])

  const employeeOptions = employeeList.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  useEffect(() => {
    if (!pending) {
      setName(null)
      setEmployees([null])
    }
  }, [pending])
  const onClick = () => {
    const fullEmployees = employees.map(item => employeeMap[item])

    const result = {
      name,
      employees: fullEmployees
    }

    onSave(result)
  }

  const onChange = (index) => (value) => {
    setEmployees(prevEmployee => {
      const result = [...prevEmployee]

      result[index] = value

      return result
    })
  }

  const removeEmployee = (index) => () => {
    setEmployees(prevState => prevState.filter((item, itemIndex) => itemIndex !== index))
  }

  return (
    <StyledForm>
      <Select size='large' options={taxSelectOptions} value={name} onChange={setName} placeholder='Наименование налога' />
      {employees.map((item, index) => (
        <StyledSelectContainer key={item}>
          <StyledSelect key={item} size='large' options={employeeOptions} value={item} onChange={onChange(index)} placeholder='Исполнитель' />
          <Button type='text' icon={<MinusCircleOutlined />} onClick={removeEmployee(index)} disabled={employees.length === 1} />
        </StyledSelectContainer>
      ))}
      <Button
        type='dashed'
        onClick={() => setEmployees(prevState => [...prevState, null])}
        icon={<PlusOutlined />}
      >
        Добавить исполнителя
      </Button>
      <Button type='primary' size='large' disabled={pending} loading={pending} onClick={onClick}>Сформировать</Button>
    </StyledForm>
  )
}
