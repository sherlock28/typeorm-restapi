import { Request, Response } from 'express';
import { ServiceResponse } from '../abstractions/ServiceResponse';
import { HttpStatusCode as Http } from '../abstractions/HttpStatusCode';

const getAllUsers = async (_req: Request, res: Response) => {
    return res.status(Http.OK).json({ msg: "Get all users" });
};

const getUserById = async (_req: Request, res: Response) => {
    return res.status(Http.OK).json({ msg: "Get user by id" });
};

const createUser = async (_req: Request, res: Response) => {
    return res.status(Http.OK).json({ msg: "Create new user" });
};

const updateUser = async (_req: Request, res: Response) => {
    return res.status(Http.OK).json({ msg: "Update user" });
};

const deleteUser = async (_req: Request, res: Response) => {
    return res.status(Http.OK).json({ msg: "Delete user" });
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}