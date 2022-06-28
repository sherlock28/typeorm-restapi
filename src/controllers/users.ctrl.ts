import { Request, Response } from 'express';
import { ServiceResponse } from '../abstractions/ServiceResponse';
import { HttpStatusCode as Http } from '../abstractions/HttpStatusCode';
import { User } from '../entities';
import { handlerErrors } from '../handlers/handlerErrors';

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find();
        const serviceResponse = new ServiceResponse(users, true, "User created successfully.", null);
        return res.status(Http.OK).json(serviceResponse.JSON());
    } catch (error) {
        return handlerErrors(error, req, res, "Could not get users.");
    }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findOneBy({ id: +req.params.id });
        if (!user) {
            const serviceResponse = new ServiceResponse(null, true, "User not found.", null);
            return res.status(Http.OK).json(serviceResponse.JSON());
        }
        const serviceResponse = new ServiceResponse(user, true, "User obtained successfully.", null);
        return res.status(Http.OK).json(serviceResponse.JSON());
    } catch (error) {
        return handlerErrors(error, req, res, "Could not get user.");
    }
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
        return handlerErrors(error, req, res,  "Failed to create user.");
    }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { firstname, lastname, age, isactive } = req.body;
    try {
        const user = await User.findOneBy({ id: +req.params.id });
        if (!user) {
            const serviceResponse = new ServiceResponse(null, true, "User not found.", null);
            return res.status(Http.OK).json(serviceResponse.JSON());
        }
        user.first_name = firstname;
        user.last_name = lastname;
        user.age = age;
        user.is_active = isactive;
        await user.save();
        const serviceResponse = new ServiceResponse(user, true, "User updated successfully.", null);
        return res.status(Http.OK).json(serviceResponse.JSON());
    } catch (error) {
        return handlerErrors(error, req, res,  "Failed to update user.");
    }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await User.delete({ id: +req.params.id });
        if (result.affected == 0) {
            const serviceResponse = new ServiceResponse(null, true, "User not found.", null);
            return res.status(Http.OK).json(serviceResponse.JSON());
        }
        const serviceResponse = new ServiceResponse(null, true, "User deleted successfully.", null);
        return res.status(Http.OK).json(serviceResponse.JSON());
    } catch (error) {
        return handlerErrors(error, req, res,  "Failed to delete user.");
    }
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}