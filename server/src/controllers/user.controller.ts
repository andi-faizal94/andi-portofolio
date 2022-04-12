import * as express from "express";
import { User } from "../entity/User";

// create user
export const store = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { firstName: firstName, lastName: lastName, age: age } = req.body;
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
    });
    await user.save();
    return res.status(201).json({
      message: "created user succesfully",
      data: [user],
    });
  } catch (error) {
    next(error);
  }
};

// get all data
export const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const page = Number(req.query.page) || 1;
    const take = Number(req.query.limit) || 10;
    const skip = (page - 1) * take;
    const user = await User.find({
      take: take,
      skip: skip,
    });

    return res.status(200).json({
      message: "get user succesfully",
      page: page,
      take: take,
      skip: skip,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// get user by id
export const show = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id: id } = req.params;

    const UserById = await User.findOne(id);
    if (!UserById) {
      return res.status(404).json({ message: "it's not id" });
    }

    return res
      .status(200)
      .json({ message: "get user by id is succesfully", data: UserById });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update user
export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const {
      firstName: firstName,
      lastName: lastName,
      age: age,
      addres: addres,
    } = req.body;
    const { id: id } = req.params;

    await User.update(id, {
      firstName: firstName,
      lastName: lastName,
      age: age,
    });
    const user = await User.find({
      id: id,
    });

    if (!user) {
      return res.status(404).json({ message: "it's not id" });
    }
    return res.status(200).json({
      message: "update user succesfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// delete user
export const destroy = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id: id } = req.params;
    const user = await User.find({
      id: id,
    });

    if (!user) {
      return res.status(404).json({ message: "it's not id" });
    }
    const userId = await User.remove(user);
    return res.status(200).json({
      message: `delete user ${id} succesfully`,
      data: userId,
    });
  } catch (error) {
    next(error);
  }
};
