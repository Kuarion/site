package com.kuarion.backend.dtos;

import java.util.List;

import com.kuarion.backend.entities.Enterprise;
import com.kuarion.backend.entities.EnterpriseAnswer;

public class EnterpriseDTO {
    private String name;
    private String cnpj;
    private String ownerName; 
 
    public static EnterpriseDTO fromEntity(Enterprise enterprise) {
        EnterpriseDTO dto = new EnterpriseDTO();
        dto.setName(enterprise.getName());
        dto.setCnpj(enterprise.getCnpj());
        dto.setOwnerName(enterprise.getOwnerName());
        
       
        return dto;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
    
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }


    
}