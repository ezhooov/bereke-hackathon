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
    id: 3,
    name: 'Заказ 3',
    employee: 2,
    sum: 100,
    status: 'fulfilled'
  }
]

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

const employees = [
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

export const getOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...orders])
    }, 400)
  })
}

export const createOrder = (order) => {
  const newOrder = { ...order }
  newOrder.id = orders?.length > 0 ? orders[orders?.length - 1] : 0
  newOrder.status = 'new'

  orders.push(newOrder)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const updateOrder = (order) => {
  const updatingOrder = { ...order }
  const index = orders.findIndex(item => item.id === order.id)

  orders.splice(index, 1, updatingOrder)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const getEmployees = () => {
  const list = [...employees]

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
  const index = employees.findIndex(item => item.id === id)

  employees.splice(index, 1)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const addEmployee = (employee) => {
  const newEmployee = { ...employee }
  newEmployee.id = employees?.length > 0 ? employees[employees?.length - 1] : 0

  employees.push(newEmployee)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const countTax = (values) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 400)
  })
}

export const getTaxes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...taxes])
    }, 400)
  })
}

export const updateTax = (tax) => {
  const updatingTax = { ...tax }
  const index = taxes.findIndex(item => item.id === taxes.id)

  taxes.splice(index, 1, updatingTax)

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
