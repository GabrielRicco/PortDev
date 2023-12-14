package com.br.portdev.PortdevServer.Model.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "tb_users")
public class UserModel {
  @Id
  @Column(unique = true)
  private String id;

  @Column(unique = true)
  private String login;
  private String name;
  private String bio;
  private String avatar_url;

  private String instagram;
  private String github;
  private String linkedin;
}
