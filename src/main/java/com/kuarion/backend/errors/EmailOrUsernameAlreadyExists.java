package com.kuarion.backend.errors;

public class EmailOrUsernameAlreadyExists extends Exception {
  public EmailOrUsernameAlreadyExists(String message) {
    super(message);
  }
}
