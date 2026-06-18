package com.admr.admrconect.controller;

import com.admr.admrconect.dto.LoginRequest;
import com.admr.admrconect.dto.LoginResponse;
import com.admr.admrconect.model.Usuario;
import com.admr.admrconect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());

        if (usuarioOpt.isEmpty() || !passwordEncoder.matches(request.getSenha(), usuarioOpt.get().getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha invalidos");
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.isAtivo()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario inativo");
        }

        LoginResponse response = new LoginResponse(
                usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getTipoUsuario());

        return ResponseEntity.ok(response);
    }
}