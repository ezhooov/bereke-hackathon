import { Button, Modal, Typography } from 'antd'
import styled from 'styled-components'
import { CountTax } from '../components/CountTax.jsx'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getEmployees } from '../api/api.js'

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

export const TaxPage = () => {
  const { data: employees } = useQuery('taxes_employee_list', getEmployees)
  const { list: employeeList, dictionary: employeeMap } = employees || {}

  const [countModalOpen, setCountModalOpen] = useState(true)

  return (
    <section>
      <StyledContainer>
        <StyledTitle level={2}>Налоги</StyledTitle>
        <Button type='primary' onClick={() => setCountModalOpen(true)}>Посчитать налоги</Button>
      </StyledContainer>

      <Modal
        title={<Title level={4}>Посчитать налоги</Title>}
        open={countModalOpen}
        footer={null}
        onCancel={() => setCountModalOpen(false)}
      >
        <CountTax employeeList={employeeList || []} employeeMap={employeeMap || {}} />
      </Modal>
    </section>
  )
}
