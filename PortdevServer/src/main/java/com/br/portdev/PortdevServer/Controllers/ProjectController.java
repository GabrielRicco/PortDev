package com.br.portdev.PortdevServer.Controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.portdev.PortdevServer.Model.Entities.ProjectModel;
import com.br.portdev.PortdevServer.Model.Entities.UserModel;
import com.br.portdev.PortdevServer.Model.Repositories.IProjectRepository;

@RestController
@RequestMapping("/projects")
public class ProjectController {
  @Autowired
  private IProjectRepository projectRepository;

  @PostMapping("/")
  public ResponseEntity<?> create(@RequestBody ProjectModel projectModel) {
    var project = this.projectRepository.save(projectModel);
    return ResponseEntity.status(200).body(project);
  }

  @GetMapping("/")
  public List<ProjectModel> list() {
    List<ProjectModel> projects = this.projectRepository.findAll();

    return projects;
  }

  @GetMapping("/user/{userId}")
  public List<ProjectModel> listByUser(@PathVariable String userId) {
    UserModel user = new UserModel();
    user.setId(userId);

    List<ProjectModel> projects = this.projectRepository.findByUser(user);

    return projects;
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getProject(@PathVariable UUID id) {
    var project = this.projectRepository.findById(id).orElse(null);

    if(project == null) {
      return ResponseEntity.status(400).body("Projeto não encontrado");
    }

    return ResponseEntity.status(200).body(project);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable UUID id) {
    var project = this.projectRepository.findById(id).orElse(null);

    if(project == null) {
      return ResponseEntity.status(400).body("Projeto não encontrado");
    }

    this.projectRepository.delete(project);

    return ResponseEntity.status(200).body("Projeto deletado com sucesso!");
  }
}
