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

export const createOrder = (order) => {
  console.log('@@ order', order)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const updateOrder = (order) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const getEmployees = () => {
  const list = [
    {
      id: 1,
      name: 'Иван',
      iin: 123012300123
    },
    {
      id: 2,
      name: 'Станислав',
      iin: 12301231231
    },
    {
      id: 3,
      name: 'Айгерим',
      iin: 12301212313
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

export const deleteEmployee = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const addEmployee = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}
