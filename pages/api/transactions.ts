/*
 * @Author: Lalit Bagga
 * @Date: 2023-08-21 16:44:48
 * @Last Modified by: Lalit Bagga
 * @Last Modified time: 2023-08-21 16:47:46
 */
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

async function createTransaction(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            userId,
            accountId,
            categoryId,
            date,
            payee,
            transactionType,
            transactionAmount,
            note,
            cleared,
            transactionReconciled,
        } = req.body

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                accountId,
                categoryId,
                date,
                payee,
                transactionType,
                transactionAmount,
                note,
                cleared,
                transactionReconciled,
            },
        })

        res.status(201).json(transaction)
    } catch (error) {
        console.error('Error creating transaction:', error)
        res.status(500).json({
            error: 'An error occurred while creating the transaction.',
        })
    }
}

async function getTransactions(req: NextApiRequest, res: NextApiResponse) {
    try {
        const transactions = await prisma.transaction.findMany()
        res.status(200).json(transactions)
    } catch (error) {
        console.error('Error fetching transactions:', error)
        res.status(500).json({
            error: 'An error occurred while fetching transactions.',
        })
    }
}

async function updateTransaction(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            transactionId,
            userId,
            accountId,
            categoryId,
            date,
            payee,
            transactionType,
            transactionAmount,
            note,
            cleared,
            transactionReconciled,
        } = req.body

        const updatedTransaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: {
                userId,
                accountId,
                categoryId,
                date,
                payee,
                transactionType,
                transactionAmount,
                note,
                cleared,
                transactionReconciled,
            },
        })

        res.status(200).json(updatedTransaction)
    } catch (error) {
        console.error('Error updating transaction:', error)
        res.status(500).json({
            error: 'An error occurred while updating the transaction.',
        })
    }
}

async function deleteTransaction(req: NextApiRequest, res: NextApiResponse) {
    try {
        const transactionId = req.body.transactionId
        const deletedTransaction = await prisma.transaction.delete({
            where: { id: transactionId },
        })
        res.status(200).json(deletedTransaction)
    } catch (error) {
        console.error('Error deleting transaction:', error)
        res.status(500).json({
            error: 'An error occurred while deleting the transaction.',
        })
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            createTransaction(req, res)
            break
        case 'GET':
            getTransactions(req, res)
            break
        case 'PUT':
            updateTransaction(req, res)
            break
        case 'DELETE':
            deleteTransaction(req, res)
            break
        default:
            res.status(405).json({ error: 'Method not allowed' })
    }
}
