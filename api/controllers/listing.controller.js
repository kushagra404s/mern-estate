import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res,next) => {
    try {
        const listing=await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
    const listing=await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'));
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(403, 'You are not allowed to delete this listing'));
    }
    try{
     await Listing.findByIdAndDelete(req.params.id);
     res.status(200).json("Listing has been deleted successfully!");
    }
    catch(error) {
        return next(error);
    }
}

export const updateListing = async (req, res, next) => {
    if(req.user.id !== req.body.userRef) {
        return next(errorHandler(403, 'You are not allowed to update this listing'));
    }
     if(req.user.id!==listing.userRef){
        return next(errorHandler(403, 'You are not allowed to delete this listing'));
    }
    try {
        await Listing.findByIdAndUpdate(req.params.id, req.body,  {new:true});
        res.status(200).json("Listing has been updated successfully!");
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => {
    try{
        const listing=await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        res.status(200).json(listing);
    }
    catch(error) {
        next(error);
    }
}