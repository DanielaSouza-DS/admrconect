package com.admr.admrconect.repository;

import com.admr.admrconect.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Optional<Produto> findByCodigo(String codigo);

    boolean existsByCodigo(String codigo);

    // Retorna produtos com estoque abaixo do minimo
    List<Produto> findByQuantidadeLessThan(int quantidade);
}
