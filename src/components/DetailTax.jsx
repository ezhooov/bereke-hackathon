import { Descriptions, List, Skeleton } from 'antd'
import { useQuery } from 'react-query'
import { getTaxById } from '../api/api.js'
import { taxNamesMap } from '../utils/dictionaries.js'

export const DetailTax = ({ id }) => {
  const { data: tax, isFetching } = useQuery({
    queryKey: ['tax_detail', id],
    queryFn: () => getTaxById(id)
  })

  return (
    <section>
      <Descriptions column={1}>
        <Descriptions.Item label='Наименование налога'>
          <Skeleton loading={isFetching} paragraph={false}>
            {taxNamesMap[tax?.name] || ''}
          </Skeleton>
        </Descriptions.Item>
        <Descriptions.Item label='Общая сумма'>
          <Skeleton loading={isFetching} paragraph={false}>
            {tax?.sum || ''}
          </Skeleton>
        </Descriptions.Item>
      </Descriptions>
      <List
        loading={isFetching}
        itemLayout='horizontal'
        dataSource={tax?.employees || []}
        renderItem={({ id, sum = '', name = '' }) => (
          <List.Item
            key={id}
          >
            <List.Item.Meta
              title={name}
              description={sum}
            />
          </List.Item>
        )}
      />
    </section>
  )
}
