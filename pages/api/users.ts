/*
 * @Author: Lalit Bagga
 * @Date: 2023-08-21 17:12:44
 * @Last Modified by:   Lalit Bagga
 * @Last Modified time: 2023-08-21 17:12:44
 */
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            return createUser(req, res)
        case 'GET':
            return getUsers(req, res)
        case 'PUT':
            return updateUser(req, res)
        case 'DELETE':
            return deleteUser(req, res)
        default:
            return res.status(405).json({ error: 'Method not allowed' })
    }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password, firstName, lastName, registrationDate } =
            req.body
        const user = await prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName,
                registrationDate,
            },
        })
        res.status(201).json(user)
    } catch (error) {
        handleError(res, 'Error creating user:', error as Error)
    }
}

async function getUsers(_: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        handleError(res, 'Error fetching users:', error as Error)
    }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            userId,
            email,
            password,
            firstName,
            lastName,
            registrationDate,
        } = req.body
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                email,
                password,
                firstName,
                lastName,
                registrationDate,
            },
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        handleError(res, 'Error updating user:', error as Error)
    }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userId = req.body.userId
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        })
        res.status(200).json(deletedUser)
    } catch (error) {
        handleError(res, 'Error deleting user:', error as Error)
    }
}

function handleError(res: NextApiResponse, message: string, error: Error) {
    console.error(message, error)
    res.status(500).json({ error: `An error occurred: ${error.message}` })
}
