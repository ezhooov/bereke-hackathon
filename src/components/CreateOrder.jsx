import { Button, Input, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;
  gap: 16px;
`

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`

export const CreateOrder = ({ onSave, pending }) => {
  const [name, setName] = useState('')
  const [sum, setSum] = useState(null)

  useEffect(() => {
    if (!pending) {
      setName('')
      setSum(null)
    }
  }, [pending])

  const onClick = () => {
    onSave({ name, sum })
  }

  return (
    <StyledForm>
      <Input size='large' placeholder='Наименование' value={name} onChange={e => setName(e.target.value)} />
      <StyledInputNumber size='large' placeholder='Сумма' value={sum} onChange={setSum} />
      <Button size='large' type='primary' onClick={onClick} disabled={pending} loading={pending}>Создать</Button>
    </StyledForm>
  )
}
