package com.admr.admrconect.repository;

import com.admr.admrconect.model.Cliente;
import com.admr.admrconect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Busca todos os clientes de um vendedor especifico
    List<Cliente> findByVendedor(Usuario vendedor);

    // Busca por nome contendo o texto (busca parcial)
    List<Cliente> findByNomeContainingIgnoreCase(String nome);

    boolean existsByTelefone(String telefone);
}
