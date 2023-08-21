/*
 * @Author: Lalit Bagga
 * @Date: 2023-08-21 16:50:27
 * @Last Modified by: Lalit Bagga
 * @Last Modified time: 2023-08-21 16:55:29
 */
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            return createCategory(req, res)
        case 'GET':
            return getCategories(req, res)
        case 'PUT':
            return updateCategory(req, res)
        case 'DELETE':
            return deleteCategory(req, res)
        default:
            return res.status(405).json({ error: 'Method not allowed' })
    }
}

async function createCategory(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, categoryName, budgetedAmount } = req.body
        const category = await prisma.category.create({
            data: {
                userId,
                categoryName,
                budgetedAmount,
            },
        })
        res.status(201).json(category)
    } catch (error) {
        handleError(res, 'Error creating category:', error as Error)
    }
}

async function getCategories(_: NextApiRequest, res: NextApiResponse) {
    try {
        const categories = await prisma.category.findMany()
        res.status(200).json(categories)
    } catch (error) {
        handleError(res, 'Error fetching categories:', error as Error)
    }
}

async function updateCategory(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { categoryId, userId, categoryName, budgetedAmount } = req.body
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: {
                userId,
                categoryName,
                budgetedAmount,
            },
        })
        res.status(200).json(updatedCategory)
    } catch (error) {
        handleError(res, 'Error updating category:', error as Error)
    }
}

async function deleteCategory(req: NextApiRequest, res: NextApiResponse) {
    try {
        const categoryId = req.body.categoryId
        const deletedCategory = await prisma.category.delete({
            where: { id: categoryId },
        })
        res.status(200).json(deletedCategory)
    } catch (error) {
        handleError(res, 'Error deleting category:', error as Error)
    }
}

function handleError(res: NextApiResponse, message: string, error: Error) {
    console.error(message, error)
    res.status(500).json({ error: `An error occurred: ${error.message}` })
}
