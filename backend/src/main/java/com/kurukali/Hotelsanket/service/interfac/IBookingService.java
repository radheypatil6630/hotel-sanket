package com.kurukali.Hotelsanket.service.interfac;

import com.kurukali.Hotelsanket.dto.Response;
import com.kurukali.Hotelsanket.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}
