export const getOrders = () => {
  const orders = [
    {
      id: 1,
      name: 'Заказ 1',
      sum: 100,
      status: 'new'
    },
    {
      id: 2,
      name: 'Заказ 1',
      employee: 1,
      sum: 100,
      status: 'in_progress'
    }
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orders)
    }, 400)
  })
}

export const getEmployees = () => {
  const list = [
    {
      id: 1,
      name: 'Иван'
    },
    {
      id: 2,
      name: 'Станислав'
    },
    {
      id: 3,
      name: 'Айгерим'
    }
  ]

  const dictionary = list.reduce((accum, item) => {
    accum[item.id] = item

    return accum
  }, {})

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ list, dictionary })
    }, 400)
  })
}

export const saveOrder = (values) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}
