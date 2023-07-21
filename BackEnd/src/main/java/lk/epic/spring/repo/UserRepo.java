package lk.epic.spring.repo;

import lk.epic.spring.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,String> {
    User findByIdAndPassword(String id,String password);
}
