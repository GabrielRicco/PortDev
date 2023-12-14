package com.br.portdev.PortdevServer.Model.Entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "tb_projects")
public class ProjectModel {
  @Id
  @GeneratedValue(generator = "UUID")
  private UUID id;

  private String name;
  private String photo;
  private String description;

  @ManyToOne
  private UserModel user;
}
