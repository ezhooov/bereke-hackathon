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
      name: 'Заказ 2',
      employee: 1,
      sum: 100,
      status: 'in_progress'
    },
    {
      id: 2,
      name: 'Заказ 3',
      employee: 2,
      sum: 100,
      status: 'fulfilled'
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

export const createOrder = (order) => {
  console.log('@@ order', order)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const updateOrder = (order) => {
  console.log('@@ order', order)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}
