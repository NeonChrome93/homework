import {Request, Response, Router} from "express";

const addresses = [{id: 1,value: 'Vasumy 16'},{id: 2,value: 'Stolichnay 11'}]

export const addressesRouter = Router({})

addressesRouter.get('/', (req : Request, res: Response) => {

    if (req.query.value) {
        let  searchString = req.query.value.toString()
        res.send(addresses.find(p => p.value.indexOf(searchString) > -1))
    }
    else res.send(addresses)
})

addressesRouter.get('/:id', (req : Request, res: Response) => {
    let product = addresses.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    }
    else res.send(404)
})

addressesRouter.post('/', (req : Request, res: Response) => {
    const newProduct =
        {   id: +(new Date()),
            value: req.body.value
        }

    addresses.push(newProduct)
    res.status(201).send(newProduct)
})

addressesRouter.put('/:id', (req : Request, res: Response) => {
    let product = addresses.find(p => p.id === +req.params.id)
    if (product) {
        product.value = req.body.value
        res.send(product)
    }
    else res.send(404)
})

addressesRouter.delete('/:id', (req : Request, res: Response) => {
    for (let i =0; addresses.length > i;i++)
    {
        if (addresses[i].id ===  +req.params.id) {
            addresses.splice(i, 1)
            res.send(204)
            return;
        }
        else  res.send(404)
    }
})

