package com.kurukali.Hotelsanket.service.interfac;

import com.kurukali.Hotelsanket.dto.LoginRequest;
import com.kurukali.Hotelsanket.dto.Response;
import com.kurukali.Hotelsanket.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
