package com.admr.admrconect.repository;

import com.admr.admrconect.enums.StatusPedido;
import com.admr.admrconect.model.Pedido;
import com.admr.admrconect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByStatus(StatusPedido status);

    List<Pedido> findByVendedor(Usuario vendedor);

    List<Pedido> findByVendedorAndStatus(Usuario vendedor, StatusPedido status);
}
