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

export const countTax = (values) => {
  console.log('@@', values)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const getTaxes = (values) => {
  const taxes = [
    {
      id: 1,
      name: 'Пенсионные взносы',
      sum: 10000,
      isPayed: true
    },
    {
      id: 2,
      name: 'Подоходный налог',
      sum: 20000,
      isPayed: false
    }
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taxes)
    }, 400)
  })
}

export const updateTax = (values) => {
  console.log('@@', values)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const getTaxById = (id) => {
  console.log('@ getById', id)

  const tax = {
    id,
    name: 'OPV',
    sum: 30000,
    employees: [
      {
        id: 1,
        name: 'Иван',
        sum: 10000
      },
      {
        id: 2,
        name: 'Станислав',
        sum: 20000
      }
    ]
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tax)
    }, 400)
  })
}
