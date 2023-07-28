export const getOrders = () => {
  const orders = [
    {
      id: 1,
      title: 'Заказ 1',
      assignee: 'Иван'
    },
    {
      id: 2,
      title: 'Заказ 2',
      assignee: 'Станислав'
    },
    {
      id: 3,
      title: 'Заказ 3',
      assignee: 'Айгерим'
    }
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orders)
    }, 400)
  })
}
