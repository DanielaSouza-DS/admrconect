// ─────────────────────────────────────────────────────
// UsuarioRepository.java
// ─────────────────────────────────────────────────────
// CRIE ESTE ARQUIVO EM: repository/UsuarioRepository.java

package com.admr.admrconect.repository;

import com.admr.admrconect.enums.Perfil;
import com.admr.admrconect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// JpaRepository ja vem com: save, findAll, findById, deleteById, etc.
// Os metodos abaixo o Spring cria automaticamente pelo nome!
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Usuario> findByTipoUsuario(Perfil perfil);

    List<Usuario> findByAtivoTrue();
}
