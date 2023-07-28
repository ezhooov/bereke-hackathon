import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;
  gap: 16px;
`

export const AddEmployee = ({ onSave, pending }) => {
  const [name, setName] = useState('')
  const [iin, setIin] = useState('')

  useEffect(() => {
    if (!pending) {
      setName('')
      setIin('')
    }
  }, [pending])

  const onClick = () => {
    onSave({ name, iin })
  }

  return (
    <StyledForm>
      <Input size='large' placeholder='Имя' value={name} onChange={e => setName(e.target.value)} />
      <Input size='large' placeholder='ИИН' value={iin} onChange={e => setIin(e.target.value)} />
      <Button size='large' type='primary' onClick={onClick} disabled={pending} loading={pending}>Добавить</Button>
    </StyledForm>
  )
}
