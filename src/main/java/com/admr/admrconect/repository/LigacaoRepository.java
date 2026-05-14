package com.admr.admrconect.repository;

import com.admr.admrconect.model.Ligacao;
import com.admr.admrconect.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LigacaoRepository extends JpaRepository<Ligacao, Long> {

    List<Ligacao> findByCliente(Cliente cliente);
}
