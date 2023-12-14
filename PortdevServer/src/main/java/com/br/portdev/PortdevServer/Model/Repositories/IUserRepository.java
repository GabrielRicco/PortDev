package com.br.portdev.PortdevServer.Model.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.portdev.PortdevServer.Model.Entities.UserModel;

public interface IUserRepository extends JpaRepository<UserModel, String> {
  UserModel findByLogin(String login);
}
