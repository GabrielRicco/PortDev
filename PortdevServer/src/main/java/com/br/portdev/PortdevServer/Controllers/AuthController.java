package com.br.portdev.PortdevServer.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.br.portdev.PortdevServer.Model.Entities.UserModel;
import com.br.portdev.PortdevServer.Model.Repositories.IUserRepository;
import com.fasterxml.jackson.databind.JsonNode;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private IUserRepository userRepository;

  private final String githubClientId = "SEU CLIENT ID";
  private final String githubClientSecret = "SEU CLIENT SECRET ID";

  @PostMapping("/")
  public ResponseEntity<?> exchangeCodeForAccessToken(@RequestBody JsonNode code) {
    String newCode = code.get("code").asText();
    System.out.println(newCode);
    String githubTokenUrl = "https://github.com/login/oauth/access_token";
    RestTemplate restTemplate = new RestTemplate();

    MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
    requestBody.add("client_id", githubClientId);
    requestBody.add("client_secret", githubClientSecret);
    requestBody.add("code", newCode);

    ResponseEntity<String> response = restTemplate.postForEntity(githubTokenUrl, requestBody, String.class);

    String responseBody = response.getBody();
    String accessToken = responseBody.split("&")[0].split("=")[1];
    System.out.println(accessToken);

    String githubApiUrl = "https://api.github.com/user";
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);
    HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

    ResponseEntity<UserModel> userResponse = restTemplate.exchange(githubApiUrl, HttpMethod.GET, entity, UserModel.class);
    UserModel userDetails = userResponse.getBody();
    System.out.println(userDetails);

    var user = this.userRepository.findById(userDetails.getId());
    if(user.isEmpty()) {
      UserModel userModel = new UserModel();
        userModel.setId(userDetails.getId());
        userModel.setLogin(userDetails.getLogin());
        userModel.setName(userDetails.getName());
        userModel.setBio(userDetails.getBio());
        userModel.setAvatar_url(userDetails.getAvatar_url());
  
        userRepository.save(userModel);

        return ResponseEntity.status(200).body(userModel);
    }

    return ResponseEntity.status(200).body(userDetails);
  }
}
