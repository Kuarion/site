package com.kuarion.backend.entities;

import jakarta.persistence.*;

@Entity
public class UserStatistics {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
  /*
    @OneToOne
    @JoinColumn(name = "user_id")  // Esta é a coluna de FK na tabela user_statistics
    private User user;
    */
    private String dado1;
    private String dado2;
    private String dado3;
    private String dado4;
    private String dado5;
    

    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDado1() {
		return dado1;
	}

	public void setDado1(String dado1) {
		this.dado1 = dado1;
	}

	public String getDado2() {
		return dado2;
	}

	public void setDado2(String dado2) {
		this.dado2 = dado2;
	}

	public String getDado3() {
		return dado3;
	}

	public void setDado3(String dado3) {
		this.dado3 = dado3;
	}

	public String getDado4() {
		return dado4;
	}

	public void setDado4(String dado4) {
		this.dado4 = dado4;
	}

	public String getDado5() {
		return dado5;
	}

	public void setDado5(String dado5) {
		this.dado5 = dado5;
	}

	public UserStatistics() {
		super();
	}

	/*
	public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    } */
    //aaaaaaaaaaaa
	
	
}