/*
 * @Author: Lalit Bagga
 * @Date: 2023-08-20 21:50:54
 * @Last Modified by: Lalit Bagga
 * @Last Modified time: 2023-08-21 16:42:07
 */

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

async function createAccount(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            userId,
            accountName,
            accountType,
            startingBalance,
            currentBalance,
        } = req.body

        const account = await prisma.account.create({
            data: {
                userId,
                accountName,
                accountType,
                startingBalance,
                currentBalance,
            },
        })

        res.status(201).json(account)
    } catch (error) {
        console.error('Error creating account:', error)
        res.status(500).json({
            error: 'An error occurred while creating the account.',
        })
    }
}

async function getAccounts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const accounts = await prisma.account.findMany()
        res.status(200).json(accounts)
    } catch (error) {
        console.error('Error fetching accounts:', error)
        res.status(500).json({
            error: 'An error occurred while fetching accounts.',
        })
    }
}

async function deleteAccount(req: NextApiRequest, res: NextApiResponse) {
    try {
        const accountId = req.body.accountId
        const deletedAccount = await prisma.account.delete({
            where: { id: accountId },
        })
        res.status(200).json(deletedAccount)
    } catch (error) {
        console.error('Error deleting account:', error)
        res.status(500).json({
            error: 'An error occurred while deleting the account.',
        })
    }
}

async function updateAccount(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            accountId,
            accountName,
            accountType,
            startingBalance,
            currentBalance,
        } = req.body

        const updatedAccount = await prisma.account.update({
            where: { id: accountId },
            data: {
                accountName,
                accountType,
                startingBalance,
                currentBalance,
            },
        })

        res.status(200).json(updatedAccount)
    } catch (error) {
        console.error('Error updating account:', error)
        res.status(500).json({
            error: 'An error occurred while updating the account.',
        })
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        createAccount(req, res)
    } else if (req.method === 'GET') {
        getAccounts(req, res)
    } else if (req.method === 'DELETE') {
        deleteAccount(req, res)
    } else if (req.method === 'PUT') {
        updateAccount(req, res)
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
