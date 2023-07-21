package lk.epic.spring.service;

import lk.epic.spring.dto.UserDTO;


import java.util.ArrayList;

public interface UserService {
    public void addUser(UserDTO dto);

    public void deleteUser(String id);

    public UserDTO getCustomer(String id);

    public boolean existUser(String id);

    public void updateUser(UserDTO dto);

    public ArrayList<UserDTO> getAllUsers();

    public boolean findUserUsingIdAndPassword(String id,String password);

}
