import { Button, Modal, Table, Typography } from 'antd'
import styled from 'styled-components'
import { CountTax } from '../components/CountTax.jsx'
import { DetailTax } from '../components/DetailTax.jsx'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { countTax, getEmployees, getTaxes, updateTax } from '../api/api.js'
import { queryClient } from '../main.jsx'
import { useOutletContext } from 'react-router-dom'

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
  const { notificationApi } = useOutletContext()
  const { data: employees = [], isFetching: isFetchingEmployees } = useQuery('taxes_employee_list', getEmployees)
  const { list: employeeList, dictionary: employeeMap } = employees || {}

  const { data: taxes = [], isFetching: isFetchingTaxes } = useQuery('taxes_list', getTaxes)

  const [countModalOpen, setCountModalOpen] = useState(false)
  const { isLoading: counting, mutate: countMutate } = useMutation(countTax, {
    onSuccess: () => {
      setCountModalOpen(false)
      queryClient.invalidateQueries('taxes_employee_list')
      queryClient.invalidateQueries('taxes_list')
    },
    onError: () => {
      notificationApi.error({
        message: 'Упс',
        description:
          'Что-то пошло не так!'
      })
    }
  })

  const [payingId, setPayingId] = useState(null)
  const { isLoading: paying, mutate: payMutate } = useMutation(updateTax, {
    onSuccess: () => {
      setPayingId(null)
      setCountModalOpen(false)
      queryClient.invalidateQueries('taxes_employee_list')
      queryClient.invalidateQueries('taxes_list')
    },
    onError: () => {
      notificationApi.error({
        message: 'Упс',
        description:
          'Что-то пошло не так!'
      })
    }
  })

  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [detailModalId, setDetailModalId] = useState(null)

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (_, tax) => {
        return (
          <Button
            type='link'
            onClick={() => { setDetailModalOpen(true); setDetailModalId(tax?.id) }}
          >
            {tax?.name || ''}
          </Button>
        )
      }
    },
    {
      title: 'Сумма',
      key: 'sum',
      dataIndex: 'sum'
    },
    {
      title: '',
      dataIndex: 'isPayed',
      key: 'isPayed',
      width: 70,
      aligh: 'right',
      render: (_, tax) => {
        const label = tax.isPayed ? 'Оплачено' : 'Оплатить'
        const disabled = tax.isPayed
        const loading = payingId === tax.id && paying

        return (
          <Button
            disabled={disabled || loading}
            loading={loading}
            onClick={() => { payMutate({ ...tax, isPayed: true }); setPayingId(tax.id) }}
          >
            {label}
          </Button>
        )
      }
    }
  ]

  return (
    <section>
      <StyledContainer>
        <StyledTitle level={2}>Налоги</StyledTitle>
        <Button type='primary' onClick={() => setCountModalOpen(true)}>Посчитать налоги</Button>
      </StyledContainer>
      <Table
        loading={isFetchingTaxes || isFetchingEmployees}
        columns={columns}
        dataSource={taxes}
        pagination={false}
      />
      <Modal
        title={<Title level={4}>Посчитать налоги</Title>}
        open={countModalOpen}
        footer={null}
        onCancel={() => setCountModalOpen(false)}
      >
        <CountTax
          pending={counting}
          employeeList={employeeList || []}
          employeeMap={employeeMap || {}}
          onSave={countMutate}
        />
      </Modal>
      <Modal
        title={<Title level={4}>Подробная информация</Title>}
        open={detailModalOpen}
        footer={null}
        onCancel={() => { setDetailModalOpen(false); setDetailModalId(null) }}
      >
        {detailModalOpen && (
          <DetailTax id={detailModalId} />
        )}
      </Modal>
    </section>
  )
}
