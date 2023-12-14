package com.br.portdev.PortdevServer.Model.Repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.portdev.PortdevServer.Model.Entities.ProjectModel;
import com.br.portdev.PortdevServer.Model.Entities.UserModel;

import java.util.List;

public interface IProjectRepository extends JpaRepository<ProjectModel, UUID> {
  List<ProjectModel> findByUser(UserModel user);
}
