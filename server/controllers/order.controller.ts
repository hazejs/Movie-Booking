import { Request, Response } from 'express';
import Order from '../models/order.model';
import Movie from '../models/movie.model';
import Showtime from '../models/showtime.model';

export const createOrder = async (req: any, res: Response) => {
  try {
    const { movieId, userId, seatRow, seatNumber, showtimeId } = req.body;

    // Retrieve the specific Showtime entity for seat availability and booking
    const showtime = await Showtime.findOne({
      _id: showtimeId,
    });

    if (!showtime) {
      return res.status(400).json({ message: 'Invalid movie or showtime' });
    }

    if (!isSeatAvailable(showtime.seats, seatRow, seatNumber)) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }

    // Book the seat in the Showtime entity
    bookSeat(showtime.seats, seatRow, seatNumber);
    await showtime.save();

    const date = new Date();
    const newOrder = new Order({ movieId, userId, seatRow, seatNumber, date });
    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating order' });
  }
};

// Define seat availability and booking functions within the controller
function isSeatAvailable(seats: any[][], row: number, seat: number): boolean {
  return (
    !seats[row - 1][seat - 1].isBooked && seats[row - 1][seat - 1].isAvailable
  );
}

function bookSeat(seats: any[][], row: number, seat: number) {
  seats[row - 1][seat - 1] = {
    ...seats[row - 1][seat - 1],
    isBooked: true,
    isAvailable: false,
  };
}

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('movieId'); // Populate movie details
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('movieId'); // Populate movie details
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching order' });
  }
};

// Update an order by ID (implement logic as needed)
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const update = req.body;

    // Implement update logic here, potentially validating data and performing movie lookups
    const updatedOrder = await Order.findByIdAndUpdate(orderId, update, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating order' });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting order' });
  }
};

// Get all orders by user ID
export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching orders' });
  }
};
