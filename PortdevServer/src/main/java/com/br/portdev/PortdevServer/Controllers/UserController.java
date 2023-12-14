package com.br.portdev.PortdevServer.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.portdev.PortdevServer.Model.Entities.UserModel;
import com.br.portdev.PortdevServer.Model.Repositories.IUserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
  @Autowired
  private IUserRepository userRepository;

  @PostMapping("/")
  public ResponseEntity<?> create(@RequestBody UserModel userModel) {
    var user = this.userRepository.findByLogin(userModel.getLogin());

    if(user != null) {
      return ResponseEntity.status(400).body("Usuário já existe");
    }

    var userCreated = this.userRepository.save(userModel);
    return ResponseEntity.status(200).body(userCreated);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> update(@RequestBody UserModel userModel, @PathVariable String id) {
    var user = this.userRepository.findById(id);

    if(user.isPresent()) {
      UserModel newUserModel = user.get();
      newUserModel.setInstagram(userModel.getInstagram());
      newUserModel.setGithub(userModel.getGithub());
      newUserModel.setLinkedin(userModel.getLinkedin());

      var userUpdated = this.userRepository.save(newUserModel); 

      return ResponseEntity.status(200).body(userUpdated);
    } else {
      return ResponseEntity.status(400).body("Usuário não encontrado");
    }
  }

  @GetMapping("/") 
  public List<UserModel> list() {
    List<UserModel> users = this.userRepository.findAll();

    return users;
  }
  

  @GetMapping("/{id}")
  public ResponseEntity<?> getUser(@PathVariable String id) {
    var user = this.userRepository.findById(id);
    
    if(user == null) {
      return ResponseEntity.status(400).body("Usuário não encontrado");
    }

    return ResponseEntity.status(200).body(user);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable String id) {
    var project = this.userRepository.findById(id).orElse(null);

    if(project == null) {
      return ResponseEntity.status(400).body("Projeto não encontrado");
    }

    this.userRepository.delete(project);

    return ResponseEntity.status(200).body("Usuário deletado com sucesso!");
  }
}
