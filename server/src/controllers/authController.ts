// // src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import MasterProduct from "@models/masterproducts";
export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    const fetchAllProducts = async () => {
        try {
            const products = await MasterProduct.findAll({
                limit: 10
            });
            console.log('Products:', products);
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    (async () => {
        try {
            if (username === 'admin' && password === 'password') {
                const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
                let results = await fetchAllProducts()
                res.json({ token, results });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })()
};
