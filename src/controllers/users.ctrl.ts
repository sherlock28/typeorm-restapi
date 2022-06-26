import { Request, Response } from 'express';
import { ServiceResponse } from '../abstractions/ServiceResponse';
import { HttpStatusCode as Http } from '../abstractions/HttpStatusCode';
import { User } from '../entities';

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find();
        const serviceResponse = new ServiceResponse(users, true, "User created successfully.", null);
        return res.status(Http.OK).json(serviceResponse.JSON());
    } catch (error) {
        console.error(error);
        const errMsg = error instanceof Error ? error.message : "Internal server error"
		const errorServiceResponse = new ServiceResponse(null, false, "Could not get users.", errMsg);
		return res.status(Http.INTERNAL_SERVER_ERROR).json(errorServiceResponse.JSON());
    }
};

const getUserById = async (_req: Request, res: Response) => {
    return res.status(Http.OK).json({ msg: "Get user by id" });
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstname, lastname, age } = req.body;
        const user = new User();
        user.first_name = firstname;
        user.last_name = lastname;
        user.age = age;
        await user.save();
        const serviceResponse = new ServiceResponse(user, true, "User created successfully.", null);
        return res.status(Http.OK).json(serviceResponse.JSON());
    } catch (error) {
        console.error(error);
        const errMsg = error instanceof Error ? error.message : "Internal server error"
		const errorServiceResponse = new ServiceResponse(null, false, "Failed to create user.", errMsg);
		return res.status(Http.INTERNAL_SERVER_ERROR).json(errorServiceResponse.JSON());
    }
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