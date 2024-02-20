import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 3000


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*")
    next();
})

app.use(express.json())
app.use(cors('http://localhost:5173/'))

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (user.password === password) {
        res.json(user)
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

app.post('/clients', async (req, res) => {
    const data = req.body
    const client = await prisma.client.create({
        data: {
            ...data,
            user: {
                connect: {
                    id: 1
                }
            }
        }
    })

    res.json(client)
})

app.get('/clients', async (req, res) => {
    const { nome } = req.query

    const query = nome ? {
        where: {
            nome: {
                contains: String(nome)
            }
        }
    } : {}

    const clients = await prisma.client.findMany(query)
    
    res.json(clients)
})

app.get('/clients/:id', async (req, res) => {
    const { id } = req.params
    const client = await prisma.client.findMany({
        where: {
            id: Number(id)
        }
    })

    res.json(client[0])
})

app.put('/clients/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body
    const client = await prisma.client.update({
        where: {
            id: Number(id)
        },
        data
    })

    res.json(client)
})

app.delete('/clients/:id', async (req, res) => {
    const { id } = req.params
    const client = await prisma.client.delete({
        where: {
            id: Number(id)
        }
    })

    res.json(client)
})

app.post('/orders', async (req, res) => {
    const data = req.body
    const order = await prisma.order.create({
        data: {
            codVenda: data.codVenda,
            date: data.date,
            valor: data.valor,
            comentario: data.comentario,
            client: {
                connect: {
                    id: data.client
                }
            },
            user: {
                connect: {
                    id: 1
                }
            },
            categoria: {
                connect: {
                    id: data.category
                }
            }
        }
    })

    res.json(order)
})

app.get('/orders/expires', async (req, res) => {
    const orders = await prisma.order.findMany({
        where: {
            date: {
                lt: new Date(new Date().setMonth(new Date().getMonth() - 4))
            },
        },
        include: {
            client: true,
            categoria: true
        }
    })

    res.json(orders)
})

app.get('/orders', async (req, res) => {
    const order = await prisma.order.findMany({
        include: {
            client: true,
            categoria: true
        }
    })
      
    res.json(order)
})

app.get('/orders/:id', async (req, res) => {
    const { id } = req.params
    const order = await prisma.order.findMany({
        where: {
            id: Number(id)
        },
        include: {
            client: true,
            categoria: true
        }
    })
   
    res.json(order)
})

app.put('/orders/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body
    const order = await prisma.order.update({
        data: {
            codVenda: data.codVenda,
            date: data.date,
            valor: data.valor,
            comentario: data.comentario,
            client: {
                connect: {
                    id: data.client
                }
            },
            user: {
                connect: {
                    id: 1
                }
            },
            categoria: {
                connect: {
                    id: data.categoria
                }
            }
        },
        where: {
            id: Number(id)
        },
    })

    res.json(order)
})

app.delete('/orders/:id', async (req, res) => {
    const { id } = req.params
    const order = await prisma.order.delete({
        where: {
            id: Number(id)
        }
    })

    res.json(order)
})

app.post('/categories', async (req, res) => {
    const data = req.body
    const category = await prisma.category.create({ data })

    res.json(category)
})

app.get('/categories', async (req, res) => {
    const category = await prisma.category.findMany({})
    
    res.json(category)
})

app.get('/categories/:id', async (req, res) => {
    const { id } = req.params
    const category = await prisma.category.findMany({})
    
    res.json(category)
})

app.listen(port, () => {
    console.log(`API running on port http://localhost:${port}`)
})