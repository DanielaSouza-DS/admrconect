package com.admr.admrconect.dto;

import com.admr.admrconect.enums.Perfil;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String nome;
    private String email;
    private Perfil tipoUsuario;
}