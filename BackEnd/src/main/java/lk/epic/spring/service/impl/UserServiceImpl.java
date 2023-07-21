package lk.epic.spring.service.impl;

import lk.epic.spring.dto.UserDTO;

import lk.epic.spring.entity.User;
import lk.epic.spring.repo.UserRepo;
import lk.epic.spring.security.PasswordConfig;
import lk.epic.spring.service.UserService;
import lk.epic.spring.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo repo;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private PasswordConfig passwordConfig;


    @Override
    public void addUser(UserDTO dto) {
        String hashedPassword = passwordConfig.passwordEncoder().encode(dto.getPassword());
        dto.setPassword(hashedPassword);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd  HH:mm");

        if (repo.existsById(dto.getId())) {
            throw new RuntimeException("Customer "+dto.getId()+" Already Exist..!");
        }
        LocalDateTime currentDateAndTime = LocalDateTime.now();
        String formattedDateAndTime = currentDateAndTime.format(formatter);
        dto.setCreateDate(formattedDateAndTime);
        repo.save(mapper.map(dto, User.class));

    }

    @Override
    public void deleteUser(String id) {
        if (!repo.existsById(id)){
            throw new RuntimeException("Customer "+id+" Not Available to Delete..!");
        }
        repo.deleteById(id);
    }

    @Override
    public UserDTO getCustomer(String id) {
        if (!repo.existsById(id)){
            throw new RuntimeException("Customer "+id+" Not Available!");
        }
        Optional<User> byId = repo.findById(id);
        return mapper.map(byId,UserDTO.class);
    }

    @Override
    public boolean existUser(String id) {
        return repo.existsById(id);
    }

    @Override
    public void updateUser(UserDTO dto) {
        String hashedPassword = passwordConfig.passwordEncoder().encode(dto.getPassword());
        dto.setPassword(hashedPassword);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd  HH:mm");
        Optional<User> byId = repo.findById(dto.getId());
        if (!repo.existsById(dto.getId())){
            throw new RuntimeException("Customer "+dto.getId()+" Not Available to Update..!");
        }
        dto.setCreateDate(byId.get().getCreateDate());
        LocalDateTime currentDateAndTime = LocalDateTime.now();
        String formattedDateAndTime = currentDateAndTime.format(formatter);
        dto.setUpdateDate(formattedDateAndTime);
        repo.save( mapper.map(dto, User.class));
    }

    @Override
    public ArrayList<UserDTO> getAllUsers() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<UserDTO>>() {
        }.getType());
    }

    @Override
    public boolean findUserUsingIdAndPassword(String id, String password) {

        if (!repo.existsById(id)){
            throw new NoSuchElementException ("User  Not Available Error..!");
        }

           Optional<User> byId = repo.findById(id);
           String password1 = byId.get().getPassword();
           boolean matches = passwordConfig.passwordEncoder().matches(password, password1);
           return matches;
    }


}
