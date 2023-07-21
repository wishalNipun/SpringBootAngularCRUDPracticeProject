package lk.epic.spring.controller;

import lk.epic.spring.dto.UserDTO;
import lk.epic.spring.service.UserService;
import lk.epic.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService service;



    @PostMapping
    public ResponseUtil saveUser(@RequestBody UserDTO dto){
        service.addUser(dto);
        return new ResponseUtil("200",dto.getId()+ " Added.!",null);
    }

    @DeleteMapping(params = "id")
    public ResponseUtil deleteUser(String id){
        service.deleteUser(id);
        return new ResponseUtil("200",id+ " Deleted.!",null);

    }

    @PutMapping
    public ResponseUtil updateUser(@RequestBody UserDTO dto){
        service.updateUser(dto);
        return new ResponseUtil("200",dto.getId()+": Updated.!",null);

    }

    @GetMapping
    public ResponseUtil getAllUser(){
        ArrayList<UserDTO> allUsers = service.getAllUsers();
        return new ResponseUtil("200"," Success.!",allUsers);
    }
    @GetMapping (params = "id")
    public ResponseUtil existUSer(String id){
        boolean b = service.existUser(id);
        if (b){
            return new ResponseUtil("200",id+ " UserExist.!",true);
        }else {
            return new ResponseUtil("200",id+ " UserExist.!",false);
        }

    }

    @GetMapping(path = "login")
    public ResponseUtil checkLogUser(String id,String password) {

            boolean userUsingIdAndPassword = service.findUserUsingIdAndPassword(id, password);
            return new ResponseUtil("200", "Login Success", userUsingIdAndPassword);



    }

    @GetMapping(path = "uSet")
    public ResponseUtil getCustomer(String id){

        UserDTO customer = service.getCustomer(id);
        return new ResponseUtil("200"," Success.!",customer);
    }
}
